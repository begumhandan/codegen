import { z } from "zod";

export const CmmSchema = z.object({
  code: z.string(),
  created_by: z.number(),
  created_at: z.string().transform((val: string) => new Date(val)),
});
