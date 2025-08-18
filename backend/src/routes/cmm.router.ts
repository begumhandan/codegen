import { db } from "../db";
import { Cmm_process } from "../db/schema";
import { cmm_InsertSchema, cmm_UpdateSchema } from "../validators";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { users } from "../db/schema";
import { generateCMMCode } from "../lib/utils";
const router = new Hono();

//Tüm Cmm'leri getirme
router.get("/", async (c) => {
  const cmmProcesses = await db.query.Cmm_process.findMany();
  return c.json(cmmProcesses);
});

//id'ye göre Cmm getirme
router.get("/:id", async (c) => {
  const { id } = c.req.param();
  const cmmProcess = await db.query.Cmm_process.findFirst({
    where: (Cmm_process, { eq }) => eq(Cmm_process.id, Number(id)),
  });
  if (!cmmProcess) return c.json({ error: "Cmm bulunamadı" }, 404);
  return c.json(cmmProcess);
});

//yeni Cmm ekle
router.post("/", async (c) => {
  try {
    const { user_id } = await c.req.json();

    const user = await db.query.users.findFirst({
      where: eq(users.id, user_id),
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    const code = generateCMMCode(user.role);

    const newProcess = await db
      .insert(Cmm_process)
      .values({
        code,
        created_by: user_id,
      })
      .returning();

    return c.json({
      success: true,
      code,
      process: newProcess[0],
    });
  } catch (error) {
    return c.json({ error: "Failed to generate CMM code" }, 500);
  }
});
//saveCmm için
// routes/cmm.router.ts
router.post("/save", async (c) => {
  try {
    console.log("CMM Save request received");
    const { code, user_id } = await c.req.json();
    console.log("Code to save:", code, "User:", user_id);

    // Kod zaten var mı kontrol et
    const existingCode = await db.query.Cmm_process.findFirst({
      where: eq(Cmm_process.code, code),
    });

    if (existingCode) {
      console.log("Code already exists");
      return c.json({ error: "Bu kod zaten mevcut" }, 409);
    }

    const newProcess = await db
      .insert(Cmm_process)
      .values({
        code,
        created_by: user_id,
      })
      .returning();

    console.log("Code saved successfully:", newProcess[0]);
    return c.json({ message: "Kod kaydedildi", process: newProcess[0] });
  } catch (error) {
    console.error("Save error:", error);
    return c.json({ error: "Kaydetme başarısız" }, 500);
  }
});
//Cmm Güncelleme
router.patch("/:id", zValidator("json", cmm_UpdateSchema), async (c) => {
  const { id } = c.req.param();

  const updatedCmmData = c.req.valid("json");

  const updatedCmm = await db
    .update(Cmm_process)
    .set(updatedCmmData)
    .where(eq(Cmm_process.id, Number(id)))
    .returning();

  return c.json(updatedCmm);
});

router.post("/generate", async (c) => {
  try {
    const { user_id } = await c.req.json();

    const user = await db.query.users.findFirst({
      where: eq(users.id, user_id),
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    const code = generateCMMCode(user.role);
    const existingCode = await db.query.Cmm_process.findFirst({
      where: eq(Cmm_process.code, code),
    });

    if (existingCode) {
      return c.json({ error: "Code conflict, try again" }, 409);
    }

    const newProcess = await db
      .insert(Cmm_process)
      .values({
        code,
        created_by: user_id,
      })
      .returning();

    return c.json({
      success: true,
      code,
      process: newProcess[0],
    });
  } catch (error) {
    console.error("CMM Generate error:", error);
    return c.json({ error: "Failed to generate CMM code" }, 500);
  }
});

// CMM kod sil
router.delete("/:code", async (c) => {
  try {
    console.log("DELETE request received");
    const { code } = c.req.param();
    const { user_id } = await c.req.json(); // User ID ile code silme işlemi

    console.log("Code to delete:", code);
    console.log("Requesting user:", user_id);

    // Kodu database'de bul
    const existingProcess = await db.query.Cmm_process.findFirst({
      where: eq(Cmm_process.code, code),
    });

    if (!existingProcess) {
      return c.json({ error: "Kod bulunamadı" }, 404);
    }

    // sadece oluşturan kullanıcı silebilir
    if (existingProcess.created_by !== user_id) {
      console.log(`Access denied: User ${user_id} tried to delete code created by ${existingProcess.created_by}`);
      return c.json(
        {
          error: "Bu kodu silme yetkiniz yok. Sadece kodu oluşturan kullanıcı silebilir.",
        },
        403
      );
    }

    // Silme işlemi
    const deleted = await db.delete(Cmm_process).where(eq(Cmm_process.code, code)).returning();

    console.log("Code deleted successfully by owner");
    return c.json({ message: "Kod başarıyla silindi" });
  } catch (error) {
    console.error("Delete error:", error);
    return c.json({ error: "Silme işlemi başarısız" }, 500);
  }
});
export default router;
