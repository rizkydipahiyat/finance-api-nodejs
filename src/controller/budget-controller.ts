import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateBudgetRequest, GetBudgetRequest, UpdateBudgetRequest } from "../model/budget-model";
import { BudgetService } from "../service/budget-service";


export class BudgetController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateBudgetRequest = req.body as CreateBudgetRequest;
      request.user_id = req.params.userId
      const response = await BudgetService.create(req.body!, request);
      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e)
    }
  }
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateBudgetRequest = req.body as UpdateBudgetRequest;
      request.user_id = req.params.userId
      request.id = parseInt(req.params.budgetId)
      const response = await BudgetService.update(req.body!, request);
      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e)
    }
  }
  static async list(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId
      const response = await BudgetService.list(req.body!, userId);
      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e)
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: GetBudgetRequest = {
        id: parseInt(req.params.budgetId),
        user_id: req.params.userId
      }
      await BudgetService.delete(req.user!, request);
      res.status(200).json({
        data: "OK"
      })
    } catch (e) {
      next(e)
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: GetBudgetRequest = {
        id: parseInt(req.params.budgetId),
        user_id: req.params.userId
      }
      const response = await BudgetService.get(req.user!, request);
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }
}