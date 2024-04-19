import { z, ZodType } from "zod";

export class AccountValidation {
  static readonly CREATE: ZodType = z.object({
    user_id: z.string(),
    account_name: z.string().min(1).max(100),
    balance: z.number()
  })
  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    user_id: z.string(),
    account_name: z.string().min(1).max(100).optional(),
    balance: z.number().optional()
  })
  static readonly GET : ZodType = z.object({
    id: z.number().positive(),
    user_id: z.string(),
  })
}