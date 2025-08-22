import { integer } from "drizzle-orm/pg-core";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

//tanımlamalar
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(),
});

export const serialNumber = pgTable("serial_number", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  created_by: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

//relations
export const usersRelations = relations(users, ({ many }) => ({
  serialNumbers: many(serialNumber),
}));
export const uniqueCode = relations(serialNumber, ({ one }) => ({
  creator: one(users, {
    fields: [serialNumber.created_by],
    references: [users.id],
  }),
}));
