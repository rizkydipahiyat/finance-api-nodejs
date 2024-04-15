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
exports.AccountService = void 0;
const account_model_1 = require("../model/account-model");
const validation_1 = require("../validation/validation");
const account_validation_1 = require("../validation/account-validation");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const user_service_1 = require("./user-service");
class AccountService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(account_validation_1.AccountValidation.CREATE, request);
            yield user_service_1.UserService.checkUserMustExist(user.id);
            const account = yield database_1.prismaClient.account.create({
                data: createRequest
            });
            return (0, account_model_1.toAccountResponse)(account);
        });
    }
    static checkAccountMustExist(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield database_1.prismaClient.account.findUnique({
                where: {
                    id: id,
                    user_id: userId
                },
                include: {
                    user: true
                }
            });
            if (!account) {
                throw new response_error_1.ResponseError(404, "Account not found");
            }
            return account;
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(account_validation_1.AccountValidation.UPDATE, request);
            yield user_service_1.UserService.checkUserMustExist(user.id);
            yield this.checkAccountMustExist(updateRequest.id, updateRequest.user_id);
            const account = yield database_1.prismaClient.account.update({
                where: {
                    id: updateRequest.id,
                    user_id: updateRequest.user_id
                },
                data: updateRequest
            });
            return (0, account_model_1.toAccountResponse)(account);
        });
    }
    static delete(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const removeRequest = validation_1.Validation.validate(account_validation_1.AccountValidation.GET, request);
            yield user_service_1.UserService.checkUserMustExist(user.id);
            yield this.checkAccountMustExist(removeRequest.id, removeRequest.user_id);
            const account = yield database_1.prismaClient.account.delete({
                where: {
                    id: removeRequest.id
                }
            });
            return (0, account_model_1.toAccountResponse)(account);
        });
    }
    static get(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const getRequest = validation_1.Validation.validate(account_validation_1.AccountValidation.GET, request);
            yield user_service_1.UserService.checkUserMustExist(user.id);
            const account = yield this.checkAccountMustExist(getRequest.id, getRequest.user_id);
            return (0, account_model_1.toAccountResponse)(account);
        });
    }
    static list(user, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_service_1.UserService.checkUserMustExist(userId);
            const accounts = yield database_1.prismaClient.account.findMany({
                where: {
                    user_id: user.id
                }
            });
            return accounts.map((account) => (0, account_model_1.toAccountResponse)(account));
        });
    }
}
exports.AccountService = AccountService;
