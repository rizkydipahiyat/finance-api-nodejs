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
exports.GoalService = void 0;
const goal_model_1 = require("../model/goal-model");
const goal_validation_1 = require("../validation/goal-validation");
const validation_1 = require("../validation/validation");
const user_service_1 = require("./user-service");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
class GoalService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(goal_validation_1.GoalValidation.CREATE, request);
            yield user_service_1.UserService.checkUserMustExist(user.id);
            const goals = yield database_1.prismaClient.goal.create({
                data: createRequest
            });
            return (0, goal_model_1.toGoalResponse)(goals);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(goal_validation_1.GoalValidation.UPDATE, request);
            yield user_service_1.UserService.checkUserMustExist(user.id);
            const goals = yield database_1.prismaClient.goal.update({
                where: {
                    id: updateRequest.id,
                    user_id: updateRequest.user_id
                },
                data: updateRequest
            });
            return (0, goal_model_1.toGoalResponse)(goals);
        });
    }
    static list(user, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_service_1.UserService.checkUserMustExist(user.id);
            if (userId !== user.id) {
                throw new response_error_1.ResponseError(404, 'User is not found');
            }
            const goals = yield database_1.prismaClient.goal.findMany({
                where: {
                    user_id: userId
                }
            });
            return goals.map((goal) => (0, goal_model_1.toGoalResponse)(goal));
        });
    }
    static delete(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const removeRequest = validation_1.Validation.validate(goal_validation_1.GoalValidation.GET, request);
            yield user_service_1.UserService.checkUserMustExist(user.id);
            if (removeRequest.user_id !== user.id) {
                throw new response_error_1.ResponseError(404, 'User is not found');
            }
            const goals = yield database_1.prismaClient.goal.delete({
                where: {
                    id: removeRequest.id
                }
            });
            return (0, goal_model_1.toGoalResponse)(goals);
        });
    }
}
exports.GoalService = GoalService;
