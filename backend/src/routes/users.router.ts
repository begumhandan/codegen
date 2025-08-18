import { Hono } from "hono";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
const router = new Hono();

const userInsertSchema = createInsertSchema(users);

//kullanıcıların hepsini getirme
router.get("/", async (c) => {
  try {
    console.log("Users GET request received");
    const users = await db.query.users.findMany();
    console.log("Users found:", users.length);
    console.log("Users data:", users);
    return c.json(users);
  } catch (error) {
    console.error("Error in users GET:", error);
    return c.json({ error: "Database error" }, 500);
  }
});
//kullanıcı id'sine göre getirme
router.get("/:id", async (c) => {
  const { id } = c.req.param();
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, Number(id)),
  });
  return c.json(user);
});

//log in
router.post("/login", async (c) => {
  try {
    console.log("Login request received");
    const { email, password } = await c.req.json();
    console.log("Login attempt for email:", email);

    // Kullanıcıyı email ile ara
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      console.log("User not found");
      return c.json({ error: "User not found" }, 401);
    }

    // Şifre kontrolü (plain text - production'da hash kullanın)
    if (password !== user.password) {
      console.log("Password mismatch");
      return c.json({ error: "Invalid password" }, 401);
    }

    console.log("Login successful for user:", user.email);

    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Server error" }, 500);
  }
});
//kullanıcı ekleme
router.post("/", async (c) => {
  try {
    console.log("POST users request received");
    const body = await c.req.json();
    console.log("Request body:", body);

    const userData = {
      email: body.email,
      password: body.password,
      role: body.role,
    };

    const [user] = await db.insert(users).values(userData).returning();
    console.log("User created:", user);

    return c.json(user);
  } catch (error) {
    console.error("Error in POST users:", error);
    return c.json({ error: error instanceof Error ? error.message : "An unknown error occurred" }, 500);
  }
});

//kullanıcı silme
router.delete("/:id", async (c) => {
  const { id } = c.req.param();
  const user = await db.delete(users).where(eq(users.id, Number(id)));
  return c.json({ user });
});
export default router;
