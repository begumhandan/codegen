import { Hono } from "hono";
import cmmRouter from "./routes/cmm.router";

import electricalTestingRouter from "./routes/electrical_testing.router";
import usersRouter from "./routes/users.router";
const app = new Hono();

app.use("*", async (c, next) => {
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type");

  if (c.req.method === "OPTIONS") {
    return c.text("", 200);
  }

  await next();
});
try {
} catch (error) {
  console.error(" Error importing electrical testing router:", error);
}
// Routes
app.route("/cmm", cmmRouter);
app.route("/electrical_testing", electricalTestingRouter);
app.route("/users", usersRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
