"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetValidation = void 0;
const zod_1 = require("zod");
var BudgetPeriod;
(function (BudgetPeriod) {
    BudgetPeriod["WEEKLY"] = "WEEKLY";
    BudgetPeriod["MONTHLY"] = "MONTHLY";
    BudgetPeriod["YEARLY"] = "YEARLY";
})(BudgetPeriod || (BudgetPeriod = {}));
var Category;
(function (Category) {
    Category["Foods"] = "Foods";
    Category["Shopping"] = "Shopping";
    Category["Transportation"] = "Transportation";
    Category["Investment"] = "Investment";
    Category["Housing"] = "Housing";
    Category["Entertainment"] = "Entertainment";
    Category["Others"] = "Others";
})(Category || (Category = {}));
class BudgetValidation {
}
exports.BudgetValidation = BudgetValidation;
BudgetValidation.CREATE = zod_1.z.object({
    user_id: zod_1.z.string(),
    account_id: zod_1.z.string(),
    category: zod_1.z.nativeEnum(Category),
    amount: zod_1.z.number().positive(),
    period: zod_1.z.nativeEnum(BudgetPeriod).optional(),
    start_date: zod_1.z.date().transform((val) => val || new Date()).optional(),
    end_date: zod_1.z.date().transform((val) => val || new Date()).optional(),
});
BudgetValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.string(),
    user_id: zod_1.z.string(),
    account_id: zod_1.z.string().optional(),
    category: zod_1.z.nativeEnum(Category).optional(),
    amount: zod_1.z.number().positive().optional(),
    period: zod_1.z.nativeEnum(BudgetPeriod).optional(),
    start_date: zod_1.z.date().transform((val) => val || new Date()).optional(),
    end_date: zod_1.z.date().transform((val) => val || new Date()).optional(),
});
BudgetValidation.GET = zod_1.z.object({
    id: zod_1.z.string(),
    user_id: zod_1.z.string(),
});
