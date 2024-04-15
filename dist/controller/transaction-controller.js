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
exports.TransactionController = void 0;
const transaction_service_1 = require("../service/transaction-service");
class TransactionController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.account_id = req.params.accountId;
                request.user_id = req.params.userId;
                const response = yield transaction_service_1.TransactionService.create(req.user, request);
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.account_id = req.params.accountId;
                request.user_id = req.params.userId;
                request.id = req.params.transactionId;
                const response = yield transaction_service_1.TransactionService.update(req.user, request);
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    id: req.params.transactionId,
                    account_id: req.params.accountId,
                    user_id: req.params.userId
                };
                yield transaction_service_1.TransactionService.delete(req.user, request);
                res.status(200).json({
                    data: "OK"
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountId = req.params.accountId;
                const response = yield transaction_service_1.TransactionService.list(req.user, accountId);
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.TransactionController = TransactionController;
