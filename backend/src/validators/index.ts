import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";

import { serialNumber, users } from "../db/schema";
import { z } from "zod";
export const userInsertSchema = createInsertSchema(users);

export const codeSelectSchema = createSelectSchema(serialNumber);
export const codeInsertSchema = createInsertSchema(serialNumber);
export const codeUpdateSchema = createUpdateSchema(serialNumber);

export type serialNumber = z.infer<typeof codeSelectSchema>;
