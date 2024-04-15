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
exports.GoalController = void 0;
const goal_service_1 = require("../service/goal-service");
class GoalController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.user_id = req.params.userId;
                const response = yield goal_service_1.GoalService.create(req.user, request);
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
                request.user_id = req.params.userId;
                request.id = req.params.goalId;
                const response = yield goal_service_1.GoalService.update(req.user, request);
                res.status(200).json({
                    data: response
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
                const userId = req.params.userId;
                const response = yield goal_service_1.GoalService.list(req.user, userId);
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
                    id: req.params.goalId,
                    user_id: req.params.userId
                };
                yield goal_service_1.GoalService.delete(req.user, request);
                res.status(200).json({
                    data: "OK"
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.GoalController = GoalController;
