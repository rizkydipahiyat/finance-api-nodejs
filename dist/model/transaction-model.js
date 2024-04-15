"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTransactionResponse = void 0;
function toTransactionResponse(transaction) {
    return {
        id: transaction.id,
        transaction_date: transaction.transaction_date ? new Date(transaction.transaction_date) : new Date(0),
        amount: transaction.amount,
        description: transaction.description,
        transaction_type: transaction.transaction_type,
        category: transaction.category
    };
}
exports.toTransactionResponse = toTransactionResponse;
