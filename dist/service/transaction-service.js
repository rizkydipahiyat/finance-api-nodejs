"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const transaction_model_1 = require("../model/transaction-model");
const validation_1 = require("../validation/validation");
const transaction_validation_1 = require("../validation/transaction-validation");
const user_service_1 = require("./user-service");
const database_1 = require("../application/database");
const account_service_1 = require("./account-service");
const response_error_1 = require("../error/response-error");
class TransactionService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(transaction_validation_1.TransactionValidation.CREATE, request);
            // Validasi User
            yield user_service_1.UserService.checkUserMustExist(user.id);
            // Validasi Account
            let account = yield account_service_1.AccountService.checkAccountMustExist(createRequest.account_id, createRequest.user_id);
            let transactions = yield database_1.prismaClient.transaction.create({
                data: createRequest
            });
            let newBalance;
            if (transactions.transaction_type === 'INCOME') {
                newBalance = account.balance + transactions.amount;
            }
            else if (transactions.transaction_type === 'EXPENSE') {
                newBalance = account.balance - transactions.amount;
            }
            yield database_1.prismaClient.account.update({
                where: {
                    id: account.id
                },
                data: {
                    balance: newBalance
                }
            });
            return (0, transaction_model_1.toTransactionResponse)(transactions);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(transaction_validation_1.TransactionValidation.UPDATE, request);
            // Validasi User
            yield user_service_1.UserService.checkUserMustExist(user.id);
            // Validasi Account
            let account = yield account_service_1.AccountService.checkAccountMustExist(updateRequest.account_id, updateRequest.user_id);
            const transactions = yield database_1.prismaClient.transaction.update({
                where: {
                    id: updateRequest.id,
                    account_id: updateRequest.account_id,
                    user_id: updateRequest.user_id,
                },
                data: updateRequest
            });
            // Pastikan untuk menunggu hingga transaksi selesai diperbarui
            if (!transactions) {
                throw new response_error_1.ResponseError(404, 'Transaction is not found');
            }
            let newBalance;
            if (transactions.transaction_type === 'INCOME') {
                newBalance = account.balance + transactions.amount;
            }
            else if (transactions.transaction_type === 'EXPENSE') {
                newBalance = account.balance - transactions.amount;
            }
            else if (transactions.transaction_type === 'TRANSFER') {
                newBalance = account.balance + transactions.amount;
            }
            yield database_1.prismaClient.account.update({
                where: {
                    id: account.id
                },
                data: {
                    balance: newBalance
                }
            });
            return (0, transaction_model_1.toTransactionResponse)(transactions);
        });
    }
    static delete(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const removeRequest = validation_1.Validation.validate(transaction_validation_1.TransactionValidation.GET, request);
            // Validasi User
            yield user_service_1.UserService.checkUserMustExist(user.id);
            // Validasi Account
            let account = yield account_service_1.AccountService.checkAccountMustExist(removeRequest.account_id, removeRequest.user_id);
            const deletedTransaction = yield database_1.prismaClient.transaction.delete({
                where: {
                    id: removeRequest.id
                }
            });
            // Update saldo akun berdasarkan jenis transaksi yang dihapus
            let newBalance;
            if (deletedTransaction.transaction_type === 'INCOME') {
                newBalance = account.balance - deletedTransaction.amount;
            }
            else if (deletedTransaction.transaction_type === 'EXPENSE') {
                newBalance = account.balance + deletedTransaction.amount;
            }
            else if (deletedTransaction.transaction_type === 'TRANSFER') {
                // Untuk transfer, perlu dikembalikan jumlah ke akun asal
                if (deletedTransaction.account_id === account.id) {
                    newBalance = account.balance + deletedTransaction.amount;
                }
                else {
                    newBalance = account.balance - deletedTransaction.amount;
                }
            }
            // Perbarui saldo akun setelah menghapus transaksi
            yield database_1.prismaClient.account.update({
                where: {
                    id: account.id
                },
                data: {
                    balance: newBalance
                }
            });
            return (0, transaction_model_1.toTransactionResponse)(deletedTransaction);
        });
    }
    static list(user, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_service_1.UserService.checkUserMustExist(user.id);
            yield account_service_1.AccountService.checkAccountMustExist(accountId, user.id);
            const transactions = yield database_1.prismaClient.transaction.findMany({
                where: {
                    account_id: accountId
                }
            });
            return transactions.map((transaction) => (0, transaction_model_1.toTransactionResponse)(transaction));
        });
    }
}
exports.TransactionService = TransactionService;
