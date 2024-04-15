import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateGoalRequest, GetGoalRequest, UpdateGoalRequest } from "../model/goal-model";
import { GoalService } from "../service/goal-service";


export class GoalController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateGoalRequest = req.body as CreateGoalRequest;
      request.user_id = req.params.userId
      const response = await GoalService.create(req.user!, request);
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e);
    }
  }
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateGoalRequest = req.body as UpdateGoalRequest;
      request.user_id = req.params.userId
      request.id = req.params.goalId
      const response = await GoalService.update(req.user!, request);
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e);
    }
  }
  static async list(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId
      const response = await GoalService.list(req.user!, userId);
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e);
    }
  }
  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: GetGoalRequest = {
        id: req.params.goalId,
        user_id: req.params.userId
      }
      await GoalService.delete(req.user!, request);
      res.status(200).json({
        data: "OK"
      })
    } catch (e) {
      next(e);
    }
  }
}