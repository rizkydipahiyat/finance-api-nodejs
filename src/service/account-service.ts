import { Account, User } from "@prisma/client";
import { AccountResponse, CreateAccountRequest, GetAccountRequest, RemoveAccountRequest, UpdateAccountRequest, toAccountResponse } from "../model/account-model";
import { Validation } from "../validation/validation";
import { AccountValidation } from "../validation/account-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { UserService } from "./user-service";


export class AccountService {
  static async create(user: User, request: CreateAccountRequest): Promise<AccountResponse> {
    const createRequest = Validation.validate(AccountValidation.CREATE, request);

    await UserService.checkUserMustExist(user.id);

    const account = await prismaClient.account.create({
      data: createRequest
    });

    return toAccountResponse(account)

  }

  static async checkAccountMustExist(id: string, userId: string): Promise<Account> {
    const account = await prismaClient.account.findUnique({
      where: {
        id: id,
        user_id: userId
      },
      include: {
        user: true
      }
    })
    if(!account) {
      throw new ResponseError(404, "Account not found")
    }
    return account
  }
  
  static async update(user: User, request: UpdateAccountRequest): Promise<AccountResponse> {
    const updateRequest = Validation.validate(AccountValidation.UPDATE, request);

    await UserService.checkUserMustExist(user.id);

    await this.checkAccountMustExist(updateRequest.id, updateRequest.user_id);

    const account = await prismaClient.account.update({
      where: {
        id: updateRequest.id,
        user_id: updateRequest.user_id
      },
      data: updateRequest
    })


    return toAccountResponse(account);
  }

  static async delete(user: User, request: RemoveAccountRequest): Promise<AccountResponse> {
    const removeRequest = Validation.validate(AccountValidation.GET,  request);

    await UserService.checkUserMustExist(user.id);

    await this.checkAccountMustExist(removeRequest.id, removeRequest.user_id);

    const account = await prismaClient.account.delete({
      where: {
        id: removeRequest.id
      }
    })
    return toAccountResponse(account);
  }

  static async get(user: User, request: GetAccountRequest): Promise<AccountResponse> {
    const getRequest = Validation.validate(AccountValidation.GET, request);
  
    await UserService.checkUserMustExist(user.id);

    const account = await this.checkAccountMustExist(getRequest.id, getRequest.user_id);

    return toAccountResponse(account);
  }

  static async list(user: User, userId: string): Promise<Array<AccountResponse>> {
    await UserService.checkUserMustExist(userId)

    const accounts = await prismaClient.account.findMany({
      where: {
        user_id: user.id
      }
    })

    return accounts.map((account) => toAccountResponse(account));
  }
}