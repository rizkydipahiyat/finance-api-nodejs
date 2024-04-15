import {Category, Transaction, TransactionType } from '@prisma/client'

export type TransactionResponse = {
  id: string;
  transaction_date: Date;
  amount: number;
  description: string;
  transaction_type: TransactionType;
  category: Category;
}

export type CreateTransactionRequest = {
  user_id: string;
  account_id: string;
  amount: number;
  description: string;
  transaction_type: TransactionType;
  category: Category;
}


export type GetTransactionRequest = {
  user_id: string; 
  account_id: string; 
  id: string;
}

export type RemoveTransactionRequest = GetTransactionRequest

export type UpdateTransactionRequest = {
  id: string;
  user_id: string;
  account_id: string;
  transaction_date?: Date | null;
  amount?: number | undefined;
  description?: string;
  transaction_type?: TransactionType;
  category?: Category;
}

export function toTransactionResponse(transaction: Transaction): TransactionResponse {
  return {
    id: transaction.id,
    transaction_date: transaction.transaction_date ? new Date(transaction.transaction_date) : new Date(0),
    amount: transaction.amount,
    description: transaction.description,
    transaction_type: transaction.transaction_type,
    category: transaction.category
  }
}
