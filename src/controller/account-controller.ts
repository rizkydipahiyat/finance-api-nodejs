import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateAccountRequest, GetAccountRequest, RemoveAccountRequest, UpdateAccountRequest } from "../model/account-model";
import { AccountService } from "../service/account-service";


export class AccountController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateAccountRequest = req.body as CreateAccountRequest;
      request.user_id = req.params.userId;
      const response = await AccountService.create(req.user!, request);
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e);
    }
  }
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateAccountRequest = req.body as UpdateAccountRequest;
      request.id = parseInt(req.params.accountId);
      request.user_id = req.params.userId;
      const response = await AccountService.update(req.user!, request);
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e);
    }
  }
  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: GetAccountRequest = {
        id: parseInt(req.params.accountId),
        user_id: req.params.userId
      }
      await AccountService.delete(req.user!, request);
      res.status(200).json({
        data: "OK"
      })
    } catch (e) {
      next(e)
    }
  }

  // get by id
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: GetAccountRequest = {
        id: parseInt(req.params.accountId),
        user_id: req.params.userId
      }
      const response = await AccountService.get(req.user!, request);
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }
  // get list of account by user id
  static async list(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId
      const response = await AccountService.list(req.user!, userId);
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }
}