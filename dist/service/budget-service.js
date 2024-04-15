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
exports.BudgetService = void 0;
const budget_model_1 = require("../model/budget-model");
const user_service_1 = require("./user-service");
const database_1 = require("../application/database");
const validation_1 = require("../validation/validation");
const budget_validation_1 = require("../validation/budget-validation");
const response_error_1 = require("../error/response-error");
class BudgetService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(budget_validation_1.BudgetValidation.CREATE, request);
            yield user_service_1.UserService.checkUserMustExist(user.id);
            if (createRequest.period === "WEEKLY") {
                // Menghitung tanggal awal dan akhir untuk weekly
                const currentDate = new Date();
                const startOfWeek = currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1);
                const endOfWeek = startOfWeek + 6;
                const startDate = new Date(currentDate.setDate(startOfWeek));
                const endDate = new Date(currentDate.setDate(endOfWeek));
                createRequest.start_date = startDate;
                createRequest.end_date = endDate;
            }
            else if (createRequest.period === "MONTHLY") {
                const currentDate = new Date();
                const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                createRequest.start_date = startDate;
                createRequest.end_date = endDate;
            }
            else if (createRequest.period === "YEARLY") {
                const currentDate = new Date();
                const startDate = new Date(currentDate.getFullYear(), 0, 1);
                const endDate = new Date(currentDate.getFullYear(), 11, 31);
                createRequest.start_date = startDate;
                createRequest.end_date = endDate;
            }
            const budgets = yield database_1.prismaClient.budget.create({
                data: createRequest
            });
            return (0, budget_model_1.toBudgetResponse)(budgets);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(budget_validation_1.BudgetValidation.UPDATE, request);
            yield user_service_1.UserService.checkUserMustExist(user.id);
            if (updateRequest.period === "WEEKLY") {
                // Menghitung tanggal awal dan akhir untuk weekly
                const currentDate = new Date();
                const startOfWeek = currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1);
                const endOfWeek = startOfWeek + 6;
                const startDate = new Date(currentDate.setDate(startOfWeek));
                const endDate = new Date(currentDate.setDate(endOfWeek));
                updateRequest.start_date = startDate;
                updateRequest.end_date = endDate;
            }
            else if (updateRequest.period === "MONTHLY") {
                const currentDate = new Date();
                const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                updateRequest.start_date = startDate;
                updateRequest.end_date = endDate;
            }
            else if (updateRequest.period === "YEARLY") {
                const currentDate = new Date();
                const startDate = new Date(currentDate.getFullYear(), 0, 1);
                const endDate = new Date(currentDate.getFullYear(), 11, 31);
                updateRequest.start_date = startDate;
                updateRequest.end_date = endDate;
            }
            const budgets = yield database_1.prismaClient.budget.update({
                where: {
                    id: updateRequest.id,
                    user_id: updateRequest.user_id
                },
                data: updateRequest
            });
            return (0, budget_model_1.toBudgetResponse)(budgets);
        });
    }
    static list(user, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_service_1.UserService.checkUserMustExist(user.id);
            if (userId !== user.id) {
                throw new response_error_1.ResponseError(404, 'User is not found');
            }
            const budgets = yield database_1.prismaClient.budget.findMany({
                where: {
                    user_id: userId
                }
            });
            return budgets.map((budget) => (0, budget_model_1.toBudgetResponse)(budget));
        });
    }
    static checkBudgetMustExist(budgetId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const budget = yield database_1.prismaClient.budget.findFirst({
                where: {
                    id: budgetId,
                    user_id: userId
                },
                include: {
                    user: true
                }
            });
            if (!budget) {
                throw new response_error_1.ResponseError(404, "Budget is not found");
            }
            return budget;
        });
    }
    static get(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const getRequest = validation_1.Validation.validate(budget_validation_1.BudgetValidation.GET, request);
            yield user_service_1.UserService.checkUserMustExist(user.id);
            if (getRequest.user_id !== user.id) {
                throw new response_error_1.ResponseError(404, "User not found");
            }
            const budget = yield this.checkBudgetMustExist(getRequest.id, getRequest.user_id);
            const transactions = yield database_1.prismaClient.transaction.findMany({
                where: {
                    user_id: budget.user_id,
                    category: budget.category,
                    transaction_type: 'EXPENSE'
                }
            });
            // const totalTransaction = transactions.reduce((total, transaction) => total + transaction.amount, 0)
            const budgetResponse = Object.assign(Object.assign({}, budget), { transaction: transactions });
            return budgetResponse;
        });
    }
    static delete(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const removeRequest = validation_1.Validation.validate(budget_validation_1.BudgetValidation.GET, request);
            yield user_service_1.UserService.checkUserMustExist(user.id);
            if (removeRequest.user_id !== user.id) {
                throw new response_error_1.ResponseError(404, 'User is not found');
            }
            const budget = yield database_1.prismaClient.budget.delete({
                where: {
                    id: removeRequest.id
                }
            });
            return (0, budget_model_1.toBudgetResponse)(budget);
        });
    }
}
exports.BudgetService = BudgetService;
