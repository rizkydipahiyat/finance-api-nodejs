import { z, ZodType } from "zod";

enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER',
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

export class TransactionValidation {
  static readonly CREATE: ZodType = z.object({
    account_id: z.string(),
    user_id: z.string(),
    amount: z.number().positive(),
    description: z.string(),
    transaction_type: z.nativeEnum(TransactionType),
    category: z.nativeEnum(Category),
  })
  static readonly UPDATE: ZodType = z.object({
    id: z.string(),
    account_id: z.string(),
    user_id: z.string(),
    transaction_date: z.date().transform((val) => val || new Date()).optional(),
    amount: z.number().optional(),
    description: z.string().optional(),
    transaction_type: z.nativeEnum(TransactionType).optional(),
    category: z.nativeEnum(Category).optional(),
  })
  static readonly GET : ZodType = z.object({
    id: z.string(),
    user_id: z.string(),
    account_id: z.string(),
  })
}