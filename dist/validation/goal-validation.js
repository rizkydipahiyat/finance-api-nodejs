"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalValidation = void 0;
const zod_1 = require("zod");
class GoalValidation {
}
exports.GoalValidation = GoalValidation;
GoalValidation.CREATE = zod_1.z.object({
    user_id: zod_1.z.string(),
    goal_name: zod_1.z.string(),
    current_amount: zod_1.z.number().positive(),
    target_amount: zod_1.z.number().positive(),
    deadline: zod_1.z.string().pipe(zod_1.z.coerce.date())
});
GoalValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.string(),
    user_id: zod_1.z.string(),
    goal_name: zod_1.z.string().optional(),
    current_amount: zod_1.z.number().positive().optional(),
    target_amount: zod_1.z.number().positive().optional(),
    deadline: zod_1.z.string().pipe(zod_1.z.coerce.date()).optional()
});
GoalValidation.GET = zod_1.z.object({
    id: zod_1.z.string(),
    user_id: zod_1.z.string(),
});
