import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";

import { Cmm_process, electrical_testing_process, users } from "../db/schema";
import { z } from "zod";
export const userInsertSchema = createInsertSchema(users);

export const cmm_SelectSchema = createSelectSchema(Cmm_process);
export const cmm_InsertSchema = createInsertSchema(Cmm_process);
export const cmm_UpdateSchema = createUpdateSchema(Cmm_process);

export type Cmm_process = z.infer<typeof cmm_SelectSchema>;

export const electrical_testing_process_SelectSchema = createSelectSchema(electrical_testing_process);
export const electrical_testing_process_InsertSchema = createInsertSchema(electrical_testing_process);
export const electrical_testing_process_UpdateSchema = createUpdateSchema(electrical_testing_process);

export type ElectricalTestingProcess = z.infer<typeof electrical_testing_process_SelectSchema>;
export type CmmProcess = z.infer<typeof cmm_SelectSchema>;
