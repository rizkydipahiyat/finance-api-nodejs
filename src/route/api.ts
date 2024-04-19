import express from "express"
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { AccountController } from "../controller/account-controller";
import { TransactionController } from "../controller/transaction-controller";
import { BudgetController } from "../controller/budget-controller";
import { GoalController } from "../controller/goal-controller";


export const apiRouter = express.Router();
apiRouter.use(authMiddleware);


// User Route
apiRouter.patch('/api/users/current', UserController.update)
apiRouter.delete('/api/users/current', UserController.logout)

// Account Route
apiRouter.post('/api/accounts/:userId', AccountController.create);
apiRouter.patch('/api/accounts/:accountId(\\d+)/user/:userId', AccountController.update);
apiRouter.delete('/api/accounts/:accountId(\\d+)/user/:userId', AccountController.delete);
apiRouter.get('/api/accounts/:accountId(\\d+)/user/:userId', AccountController.get);
apiRouter.get('/api/accounts/:userId', AccountController.list);

// Transaction Route
apiRouter.post('/api/accounts/:accountId(\\d+)/user/:userId/transactions', TransactionController.create);
apiRouter.get('/api/accounts/:accountId(\\d+)/transactions', TransactionController.list);
apiRouter.patch('/api/accounts/:accountId(\\d+)/user/:userId/transactions/:transactionId(\\d+)', TransactionController.update);
apiRouter.delete('/api/accounts/:accountId(\\d+)/user/:userId/transactions/:transactionId(\\d+)', TransactionController.delete);

// Budget Route
apiRouter.post('/api/budgets/:userId', BudgetController.create);
apiRouter.patch('/api/budgets/:budgetId(\\d+)/:userId', BudgetController.update);
apiRouter.get('/api/budgets/:userId', BudgetController.list);
apiRouter.get('/api/budgets/:budgetId(\\d+)/:userId', BudgetController.get);
apiRouter.delete('/api/budgets/:budgetId(\\d+)/:userId', BudgetController.delete);

// Goal Route
apiRouter.post('/api/goals/:userId', GoalController.create);
apiRouter.get('/api/goals/:userId', GoalController.list);
apiRouter.patch('/api/goals/:goalId(\\d+)/:userId', GoalController.update);
apiRouter.delete('/api/goals/:goalId(\\d+)/:userId', GoalController.delete);