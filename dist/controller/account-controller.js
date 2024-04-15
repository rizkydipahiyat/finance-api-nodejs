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
exports.AccountController = void 0;
const account_service_1 = require("../service/account-service");
class AccountController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.user_id = req.params.userId;
                const response = yield account_service_1.AccountService.create(req.user, request);
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
                request.id = req.params.accountId;
                request.user_id = req.params.userId;
                const response = yield account_service_1.AccountService.update(req.user, request);
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
                    id: req.params.accountId,
                    user_id: req.params.userId
                };
                yield account_service_1.AccountService.delete(req.user, request);
                res.status(200).json({
                    data: "OK"
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    // get by id
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    id: req.params.accountId,
                    user_id: req.params.userId
                };
                const response = yield account_service_1.AccountService.get(req.user, request);
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    // get list of account by user id
    static list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const response = yield account_service_1.AccountService.list(req.user, userId);
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
exports.AccountController = AccountController;
