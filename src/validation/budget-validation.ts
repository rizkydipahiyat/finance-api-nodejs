import { z, ZodType } from "zod";

enum BudgetPeriod {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

enum Category {
  Foods = 'Foods',
  Shopping = 'Shopping',
  Transportation = 'Transportation',
  Investment = 'Investment',
  Housing = 'Housing',
  Entertainment = 'Entertainment',
  Others = 'Others'
}

export class BudgetValidation {
  static readonly CREATE: ZodType = z.object({
    user_id: z.string(),
    account_id: z.string(),
    category: z.nativeEnum(Category),
    amount: z.number().positive(),
    period: z.nativeEnum(BudgetPeriod).optional(),
    start_date: z.date().transform((val) => val || new Date()).optional(),
    end_date: z.date().transform((val) => val || new Date()).optional(),
  })
  static readonly UPDATE: ZodType = z.object({
    id: z.string(),
    user_id: z.string(),
    account_id: z.string().optional(),
    category: z.nativeEnum(Category).optional(),
    amount: z.number().positive().optional(),
    period: z.nativeEnum(BudgetPeriod).optional(),
    start_date: z.date().transform((val) => val || new Date()).optional(),
    end_date: z.date().transform((val) => val || new Date()).optional(),
  })
  static readonly GET : ZodType = z.object({
    id: z.string(),
    user_id: z.string(),
  })
}