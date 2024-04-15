"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAccountResponse = void 0;
function toAccountResponse(account) {
    return {
        id: account.id,
        account_name: account.account_name,
        balance: account.balance
    };
}
exports.toAccountResponse = toAccountResponse;
