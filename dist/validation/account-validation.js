"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountValidation = void 0;
const zod_1 = require("zod");
class AccountValidation {
}
exports.AccountValidation = AccountValidation;
AccountValidation.CREATE = zod_1.z.object({
    user_id: zod_1.z.string(),
    account_name: zod_1.z.string().min(1).max(100),
    balance: zod_1.z.number()
});
AccountValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.string(),
    user_id: zod_1.z.string(),
    account_name: zod_1.z.string().min(1).max(100).optional(),
    balance: zod_1.z.number().optional()
});
AccountValidation.GET = zod_1.z.object({
    id: zod_1.z.string(),
    user_id: zod_1.z.string(),
});
