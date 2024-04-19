import { z, ZodType } from "zod";


export class GoalValidation {
  static readonly CREATE: ZodType = z.object({
    user_id: z.string(),
    goal_name: z.string(),
    current_amount: z.number().positive(),
    target_amount: z.number().positive(),
    deadline: z.string().pipe(z.coerce.date())
  })
  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    user_id: z.string(),
    goal_name: z.string().optional(),
    current_amount: z.number().positive().optional(),
    target_amount: z.number().positive().optional(),
    deadline: z.string().pipe(z.coerce.date()).optional()
  })
  static readonly GET : ZodType = z.object({
    id: z.number().positive(),
    user_id: z.string(),
  })
}