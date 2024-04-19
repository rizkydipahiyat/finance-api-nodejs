import { NextFunction, Response } from "express";
import { CreateTransactionRequest, RemoveTransactionRequest, UpdateTransactionRequest } from "../model/transaction-model";
import { TransactionService } from "../service/transaction-service";
import { UserRequest } from "../type/user-request";


export class TransactionController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateTransactionRequest = req.body as CreateTransactionRequest;
      request.account_id = parseInt(req.params.accountId);
      request.user_id = req.params.userId;
      const response = await TransactionService.create(req.user!, request);
      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e)
    }
  }
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateTransactionRequest = req.body as UpdateTransactionRequest;
      request.account_id = parseInt(req.params.accountId);
      request.user_id = req.params.userId;
      request.id = parseInt(req.params.transactionId);
      const response = await TransactionService.update(req.user!, request);
      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e)
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: RemoveTransactionRequest = {
        id: parseInt(req.params.transactionId),
        account_id: parseInt(req.params.accountId),
        user_id: req.params.userId
      }
      await TransactionService.delete(req.user!, request);
      res.status(200).json({
        data: "OK"
      })
    } catch (e) {
      next(e)
    }
  }

  static async list(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const accountId = parseInt(req.params.accountId);
      const response = await TransactionService.list(req.user!, accountId);
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }
}