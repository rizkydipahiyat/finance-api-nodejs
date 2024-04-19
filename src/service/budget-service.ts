import { Budget, User } from "@prisma/client";
import { BudgetResponse, CreateBudgetRequest, GetBudgetRequest, RemoveBudgetRequest, UpdateBudgetRequest, toBudgetResponse } from "../model/budget-model";
import { UserService } from "./user-service";
import { prismaClient } from "../application/database";
import { Validation } from "../validation/validation";
import { BudgetValidation } from "../validation/budget-validation";
import { ResponseError } from "../error/response-error";


export class BudgetService {
  static async create(user: User, request: CreateBudgetRequest): Promise<BudgetResponse> {
    const createRequest = Validation.validate(BudgetValidation.CREATE, request);

    await UserService.checkUserMustExist(user.id);

    if (createRequest.period === "WEEKLY") {
      // Menghitung tanggal awal dan akhir untuk weekly
      const currentDate = new Date();
      const startOfWeek = currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1);
      const endOfWeek = startOfWeek + 6;
      const startDate = new Date(currentDate.setDate(startOfWeek));
      const endDate = new Date(currentDate.setDate(endOfWeek));
  
      createRequest.start_date = startDate;
      createRequest.end_date = endDate;
    } else if(createRequest.period === "MONTHLY") {
      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
      createRequest.start_date = startDate;
      createRequest.end_date = endDate;
    } else if(createRequest.period === "YEARLY") {
      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), 0, 1);
      const endDate = new Date(currentDate.getFullYear(), 11, 31);
    
      createRequest.start_date = startDate;
      createRequest.end_date = endDate;
    }

    const budgets = await prismaClient.budget.create({
      data: createRequest
    })
    return toBudgetResponse(budgets);
  }
  static async update(user: User, request: UpdateBudgetRequest): Promise<BudgetResponse> {
    const updateRequest = Validation.validate(BudgetValidation.UPDATE, request);

    await UserService.checkUserMustExist(user.id as string)

    
    if (updateRequest.period === "WEEKLY") {
      // Menghitung tanggal awal dan akhir untuk weekly
      const currentDate = new Date();
      const startOfWeek = currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1);
      const endOfWeek = startOfWeek + 6;
      const startDate = new Date(currentDate.setDate(startOfWeek));
      const endDate = new Date(currentDate.setDate(endOfWeek));
  
      updateRequest.start_date = startDate;
      updateRequest.end_date = endDate;
    } else if(updateRequest.period === "MONTHLY") {
      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
      updateRequest.start_date = startDate;
      updateRequest.end_date = endDate;
    } else if(updateRequest.period === "YEARLY") {
      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), 0, 1);
      const endDate = new Date(currentDate.getFullYear(), 11, 31);
    
      updateRequest.start_date = startDate;
      updateRequest.end_date = endDate;
    }

    const budgets = await prismaClient.budget.update({
      where: {
        id: updateRequest.id,
        user_id: updateRequest.user_id
      },
      data: updateRequest
    })

    return toBudgetResponse(budgets)
  }

  static async list(user: User, userId: string): Promise<Array<BudgetResponse>> {
    await UserService.checkUserMustExist(userId);

    const budgets = await prismaClient.budget.findMany({
      where: {
        user_id: user.id
      }
    })

    console.log(budgets)

    return budgets.map((budget) => toBudgetResponse(budget));
  }

  static async checkBudgetMustExist(budgetId: number, userId: string): Promise<Budget> {
    
    const budget = await prismaClient.budget.findFirst({
      where: {
        id: budgetId,
        user_id: userId
      },
      include: {
        user: true
      }
    })

    
    if(!budget) {
      throw new ResponseError(404, "Budget is not found")
    }

    return budget
  }

  static async get(user: User, request: GetBudgetRequest): Promise<BudgetResponse> {
    const getRequest = Validation.validate(BudgetValidation.GET, request);
  
    await UserService.checkUserMustExist(user.id);

    if(getRequest.user_id !== user.id) {
      throw new ResponseError(404, "User not found")
    }

    const budget = await this.checkBudgetMustExist(getRequest.id, getRequest.user_id)

    const transactions = await prismaClient.transaction.findMany({
      where: {
        user_id: budget.user_id,
        category: budget.category,
        transaction_type: 'EXPENSE'
      }
    });
    
    // const totalTransaction = transactions.reduce((total, transaction) => total + transaction.amount, 0)


    const budgetResponse: BudgetResponse = {
      ...budget,
      transaction: transactions
    };

    return budgetResponse;

  }

  static async delete(user: User, request: RemoveBudgetRequest): Promise<BudgetResponse> {
    const removeRequest = Validation.validate(BudgetValidation.GET, request);

    await UserService.checkUserMustExist(user.id);

    if(removeRequest.user_id !== user.id) {
      throw new ResponseError(404, 'User is not found')
    }

    const budget = await prismaClient.budget.delete({
      where: {
        id: removeRequest.id
      }
    })
    return toBudgetResponse(budget);
  }
}