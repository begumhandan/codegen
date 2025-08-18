import { Hono } from "hono";
import { electrical_testing_process } from "../db/schema";
import { db } from "../db";
import { zValidator } from "@hono/zod-validator";
import { electrical_testing_process_InsertSchema, electrical_testing_process_UpdateSchema } from "../validators";
import { eq } from "drizzle-orm";

const router = new Hono();

//yeni elektriksel test code ekleme
router.post("/save", async (c) => {
  try {
    console.log(" Electrical Testing Save request received");
    const { code, user_id } = await c.req.json();
    console.log(" Code to save:", code, "User:", user_id);

    const existingCode = await db.query.electrical_testing_process.findFirst({
      where: eq(electrical_testing_process.code, code),
    });

    if (existingCode) {
      return c.json({ error: "Bu kod zaten mevcut" }, 409);
    }

    const newProcess = await db
      .insert(electrical_testing_process)
      .values({
        code,
        created_by: user_id,
      })
      .returning();

    console.log(" Code saved successfully:", newProcess[0]);
    return c.json({ message: "Kod kaydedildi", process: newProcess[0] });
  } catch (error) {
    console.error(" Save error:", error);
    return c.json({ error: "Kaydetme başarısız" }, 500);
  }
});
//hepsini getirme
router.get("/", async (c) => {
  const electrical_testing = await db.query.electrical_testing_process.findMany();
  return c.json(electrical_testing);
});

//id ye göre getirme
router.get("/:id", async (c) => {
  const { id } = c.req.param();
  const electrical_testing = await db.query.electrical_testing_process.findFirst({
    where: (electrical_testing_process, { eq }) => eq(electrical_testing_process.id, Number(id)),
  });
  if (!electrical_testing) return c.json({ error: "elektriksel test bulunamadı" }, 404);
  return c.json(electrical_testing);
});

//yeni electriksel test ekle
router.post("/", zValidator("json", electrical_testing_process_InsertSchema), async (c) => {
  const newElectrical_testingData = c.req.valid("json");
  console.log(newElectrical_testingData);

  //eski codelar ile karşılaştırma
  const existing_electrical_testing = await db.query.electrical_testing_process.findFirst({
    where: (electrical_testing_process, { eq }) => eq(electrical_testing_process.code, newElectrical_testingData.code),
  });
  //eğer var olan bir code ile tekrar ekleme yapmaya çalışırsa hata alıcak
  if (existing_electrical_testing) {
    return c.json(
      {
        error: "Bu kod zaten kullanılıyor. Lütfen farklı bir kod girin",
      },
      400
    );
  }

  const [newElectrical_testing] = await db
    .insert(electrical_testing_process)
    .values(newElectrical_testingData)
    .returning();
  return c.json(newElectrical_testing);
});

//update electrical_testing
router.patch("/:id", zValidator("json", electrical_testing_process_UpdateSchema), async (c) => {
  const { id } = c.req.param();
  const newElectrical_testingData = c.req.valid("json");

  const updatedElectrical_testing = await db
    .update(electrical_testing_process)
    .set(newElectrical_testingData)
    .where(eq(electrical_testing_process.id, Number(id)))
    .returning();

  return c.json(updatedElectrical_testing);
});

//elektriksel testi silme
router.delete("/:code", async (c) => {
  try {
    console.log("DELETE request received");
    const { code } = c.req.param();
    const { user_id } = await c.req.json(); // User ID ile code silme işlemi

    console.log("Code to delete:", code);
    console.log("Requesting user:", user_id);

    // Kodu database'de bul
    const existingProcess = await db.query.electrical_testing_process.findFirst({
      where: eq(electrical_testing_process.code, code),
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
    const deleted = await db
      .delete(electrical_testing_process)
      .where(eq(electrical_testing_process.code, code))
      .returning();

    console.log("Code deleted successfully by owner");
    return c.json({ message: "Kod başarıyla silindi" });
  } catch (error) {
    console.error("Delete error:", error);
    return c.json({ error: "Silme işlemi başarısız" }, 500);
  }
});
router.get("/test", async (c) => {
  return c.json({ message: "Electrical Testing router working!" });
});
export default router;
