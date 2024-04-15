"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionValidation = void 0;
const zod_1 = require("zod");
var TransactionType;
(function (TransactionType) {
    TransactionType["INCOME"] = "INCOME";
    TransactionType["EXPENSE"] = "EXPENSE";
    TransactionType["TRANSFER"] = "TRANSFER";
})(TransactionType || (TransactionType = {}));
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
class TransactionValidation {
}
exports.TransactionValidation = TransactionValidation;
TransactionValidation.CREATE = zod_1.z.object({
    account_id: zod_1.z.string(),
    user_id: zod_1.z.string(),
    amount: zod_1.z.number().positive(),
    description: zod_1.z.string(),
    transaction_type: zod_1.z.nativeEnum(TransactionType),
    category: zod_1.z.nativeEnum(Category),
});
TransactionValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.string(),
    account_id: zod_1.z.string(),
    user_id: zod_1.z.string(),
    transaction_date: zod_1.z.date().transform((val) => val || new Date()).optional(),
    amount: zod_1.z.number().optional(),
    description: zod_1.z.string().optional(),
    transaction_type: zod_1.z.nativeEnum(TransactionType).optional(),
    category: zod_1.z.nativeEnum(Category).optional(),
});
TransactionValidation.GET = zod_1.z.object({
    id: zod_1.z.string(),
    user_id: zod_1.z.string(),
    account_id: zod_1.z.string(),
});
