"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
const account_controller_1 = require("../controller/account-controller");
const transaction_controller_1 = require("../controller/transaction-controller");
const budget_controller_1 = require("../controller/budget-controller");
const goal_controller_1 = require("../controller/goal-controller");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(auth_middleware_1.authMiddleware);
// User Route
exports.apiRouter.patch('/api/users/current', user_controller_1.UserController.update);
exports.apiRouter.delete('/api/users/current', user_controller_1.UserController.logout);
// Account Route
exports.apiRouter.post('/api/accounts/:userId', account_controller_1.AccountController.create);
exports.apiRouter.patch('/api/accounts/:accountId/user/:userId', account_controller_1.AccountController.update);
exports.apiRouter.delete('/api/accounts/:accountId/user/:userId', account_controller_1.AccountController.delete);
exports.apiRouter.get('/api/accounts/:accountId/user/:userId', account_controller_1.AccountController.get);
exports.apiRouter.get('/api/accounts/:userId', account_controller_1.AccountController.list);
// Transaction Route
exports.apiRouter.post('/api/accounts/:accountId/user/:userId/transactions', transaction_controller_1.TransactionController.create);
exports.apiRouter.get('/api/accounts/:accountId/transactions', transaction_controller_1.TransactionController.list);
exports.apiRouter.patch('/api/accounts/:accountId/user/:userId/transactions/:transactionId', transaction_controller_1.TransactionController.update);
exports.apiRouter.delete('/api/accounts/:accountId/user/:userId/transactions/:transactionId', transaction_controller_1.TransactionController.delete);
// Budget Route
exports.apiRouter.post('/api/budgets/:userId', budget_controller_1.BudgetController.create);
exports.apiRouter.patch('/api/budgets/:budgetId/:userId', budget_controller_1.BudgetController.update);
exports.apiRouter.get('/api/budgets/:userId', budget_controller_1.BudgetController.list);
exports.apiRouter.get('/api/budgets/:budgetId/:userId', budget_controller_1.BudgetController.get);
exports.apiRouter.delete('/api/budgets/:budgetId/:userId', budget_controller_1.BudgetController.delete);
// Goal Route
exports.apiRouter.post('/api/goals/:userId', goal_controller_1.GoalController.create);
exports.apiRouter.get('/api/goals/:userId', goal_controller_1.GoalController.list);
exports.apiRouter.patch('/api/goals/:goalId/:userId', goal_controller_1.GoalController.update);
exports.apiRouter.delete('/api/goals/:goalId/:userId', goal_controller_1.GoalController.delete);
