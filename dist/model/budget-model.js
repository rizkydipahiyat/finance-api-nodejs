"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBudgetResponse = void 0;
function toBudgetResponse(budget) {
    return {
        id: budget.id,
        account_id: budget.account_id,
        category: budget.category,
        amount: budget.amount,
        period: budget.period,
        start_date: budget.start_date ? new Date(budget.start_date) : new Date(0),
        end_date: budget.end_date ? new Date(budget.end_date) : new Date(0),
    };
}
exports.toBudgetResponse = toBudgetResponse;
