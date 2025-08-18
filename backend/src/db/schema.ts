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

export const Cmm_process = pgTable("cmms", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  created_by: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});
export const electrical_testing_process = pgTable("electrical_testing_processes", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  created_by: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

//relations
export const usersRelations = relations(users, ({ many }) => ({
  cmmProcesses: many(Cmm_process),
  electricalProcesses: many(electrical_testing_process),
}));
export const cmmProcessRelations = relations(Cmm_process, ({ one }) => ({
  creator: one(users, {
    fields: [Cmm_process.created_by],
    references: [users.id],
  }),
}));
export const electricalTestingRelations = relations(electrical_testing_process, ({ one }) => ({
  creator: one(users, {
    fields: [electrical_testing_process.created_by],
    references: [users.id],
  }),
}));
