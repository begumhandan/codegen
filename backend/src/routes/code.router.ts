import { db } from "../db";
import { serialNumber } from "../db/schema";
import { codeInsertSchema, codeUpdateSchema } from "../validators";
import { and, desc, eq, like } from "drizzle-orm";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { users } from "../db/schema";

const router = new Hono();

//get all codes
router.get("/", async (c) => {
  const serialNumbers = await db.query.serialNumber.findMany();
  return c.json(serialNumbers);
});

// Tüm kullanıcıların belirli prefixteki kodlarını getir
router.get("/all", async (c) => {
  try {
    const { prefix } = c.req.query();
    console.log("All codes request with prefix:", prefix);

    let whereCondition;

    if (prefix) {
      // Prefix belirtilmişse, o prefix ile başlayan kodları filtrele
      whereCondition = like(serialNumber.code, `${prefix}-%`);
    }

    const codes = await db.query.serialNumber.findMany({
      where: whereCondition,
      orderBy: desc(serialNumber.createdAt), // En yeni kodlar önce
    });

    const mappedCodes = codes.map((code) => ({
      ...code,
      createdBy: code.created_by, //İlk sayfada kodlar gelirken createdBy undf old için mapledim.
    }));

    return c.json({
      success: true,
      codes: mappedCodes,
      data: mappedCodes,
    });
  } catch (error) {
    console.error("Get all codes error:", error);
    return c.json(
      {
        success: false,
        error: "Database error",
      },
      500
    );
  }
});

//kullanıcın ürettiği bell, bir prefixe göre getirme
router.get("/:userId", async (c) => {
  try {
    const { userId } = c.req.param();
    const { prefix } = c.req.query();
    console.log("codes request for user:", userId, "with prefix:", prefix);

    let whereCondition;

    if (prefix) {
      // Prefix belirtilmişse, o prefix ile başlayan kodları filtrele
      whereCondition = and(eq(serialNumber.created_by, Number(userId)), like(serialNumber.code, `${prefix}-%`));
    }

    const codes = await db.query.serialNumber.findMany({
      where: whereCondition,
      orderBy: desc(serialNumber.createdAt),
    });
    const mappedCodes = codes.map((code) => ({
      ...code,
      createdBy: code.created_by, //İlk sayfada kodlar gelirken createdBy undf old için mapledim.
    }));

    return c.json({
      success: true,
      codes: mappedCodes,
      data: mappedCodes,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: "Database error",
      },
      500
    );
  }
});

//yeni kod ekle
router.post("/", async (c) => {
  try {
    const body = await c.req.json();

    const { user_id, code } = body;

    // Kullanıcıyı kontrol et
    const user = await db.query.users.findFirst({
      where: eq(users.id, user_id),
    });

    if (!user) {
      console.log("Kullanıcı bulunamadı:", user_id);
      return c.json({ error: "Kullanıcı bulunamadı" }, 404);
    }

    console.log("Kullanıcı bulundu:", user.id);

    // Kod çakışması kontrolü
    const existingCode = await db.query.serialNumber.findFirst({
      where: eq(serialNumber.code, code),
    });

    if (existingCode) {
      console.log("Kod zaten mevcut:", code);
      return c.json({ error: "Bu kod zaten kullanılıyor" }, 409);
    }

    // Yeni kodu kaydet
    const newProcess = await db
      .insert(serialNumber)
      .values({
        code: code,
        created_by: user_id,
      })
      .returning();

    console.log("Kod başarıyla kaydedildi:", newProcess[0]);

    return c.json({
      success: true,
      message: "Kod başarıyla kaydedildi",
      code: code,
      serialNumber: newProcess[0],
    });
  } catch (error) {
    console.error("POST /code hatası:", error);
    return c.json(
      {
        error: "Kod kaydedilemedi",
        details: error.message,
      },
      500
    );
  }
});

//Code Güncelleme
router.patch("/:id", zValidator("json", codeUpdateSchema), async (c) => {
  const { id } = c.req.param();
  const updatedCode = c.req.valid("json");

  const result = await db
    .update(serialNumber)
    .set(updatedCode)
    .where(eq(serialNumber.id, Number(id)))
    .returning();

  return c.json(result);
});

// router.post("/generate", async (c) => {
//   try {
//     console.log("POST /code/generate isteği alındı");

//     const { user_id, prefix } = await c.req.json();

//     if (!user_id) {
//       return c.json({ error: "User ID gerekli" }, 400);
//     }

//     const user = await db.query.users.findFirst({
//       where: eq(users.id, user_id),
//     });

//     if (!user) {
//       return c.json({ error: "Kullanıcı bulunamadı" }, 404);
//     }

//     // Kodu kaydet
//     const newProcess = await db
//       .insert(serialNumber)
//       .values({
//         code: code,
//         created_by: user_id,
//       })
//       .returning();

//     console.log("Kod üretildi ve kaydedildi:", code);

//     return c.json({
//       success: true,
//       code: code,
//       serialNumber: newProcess[0],
//     });
//   } catch (error) {
//     console.error("Generate error:", error);
//     return c.json(
//       {
//         error: "Kod üretilemedi",
//         details: error.message,
//       },
//       500
//     );
//   }
// });

// Code sil
router.delete("/:code", async (c) => {
  try {
    console.log("DELETE request received");
    const { code } = c.req.param();
    const { user_id } = await c.req.json();

    console.log("Code to delete:", code);
    console.log("Requesting user:", user_id);

    const existingProcess = await db.query.serialNumber.findFirst({
      where: eq(serialNumber.code, code),
    });

    if (!existingProcess) {
      return c.json({ error: "Kod bulunamadı" }, 404);
    }

    if (existingProcess.created_by !== user_id) {
      return c.json(
        {
          error: "Bu kodu silme yetkiniz yok. Sadece kodu oluşturan kullanıcı silebilir.",
        },
        403
      );
    }

    const deleted = await db.delete(serialNumber).where(eq(serialNumber.code, code)).returning();

    console.log("Code deleted successfully!");
    return c.json({ message: "Kod başarıyla silindi" });
  } catch (error) {
    console.error("Delete error:", error);
    return c.json({ error: "Silme işlemi başarısız" }, 500);
  }
});

export default router;
