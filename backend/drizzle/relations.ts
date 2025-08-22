import { relations } from "drizzle-orm/relations";
import { users, serialNumber } from "./schema";

export const serialNumberRelations = relations(serialNumber, ({one}) => ({
	user: one(users, {
		fields: [serialNumber.createdBy],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	serialNumbers: many(serialNumber),
}));