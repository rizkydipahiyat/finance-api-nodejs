import {Budget, BudgetPeriod, Category, Transaction } from '@prisma/client'

export type BudgetResponse = {
  id: number;
  account_id: number;
  category: Category;
  amount: number;
  period?: BudgetPeriod | null;
  start_date?: Date | null;
  end_date?: Date | null;
  transaction?: Transaction[]
}

export type CreateBudgetRequest = {
  user_id: string;
  account_id: number;
  category: Category;
  amount: number;
  period?: BudgetPeriod;
  start_date?: Date;
  end_date?: Date;
}


export type GetBudgetRequest = {
  user_id: string;
  id: number;
}

export type RemoveBudgetRequest = GetBudgetRequest

export type UpdateBudgetRequest = {
  id: number;
  user_id: string;
  account_id: number;
  category?: Category;
  amount?: number;
  period?: BudgetPeriod;
  start_date?: Date;
  end_date?: Date;
}

export function toBudgetResponse(budget: Budget): BudgetResponse {
  return {
    id: budget.id,
    account_id: budget.account_id,
    category: budget.category,
    amount: budget.amount,
    period: budget.period,
    start_date: budget.start_date ? new Date(budget.start_date) : new Date(0),
    end_date: budget.end_date ? new Date(budget.end_date) : new Date(0),
  }
}
