import { pgTable, unique, serial, text, foreignKey, integer, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	role: text().notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const serialNumber = pgTable("serial_number", {
	id: serial().primaryKey().notNull(),
	code: text().notNull(),
	createdBy: integer("created_by"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "serial_number_created_by_users_id_fk"
		}),
	unique("serial_number_code_unique").on(table.code),
]);
