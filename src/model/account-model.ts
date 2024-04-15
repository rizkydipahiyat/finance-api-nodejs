import { Account } from '@prisma/client'

export type AccountResponse = {
  id: string;
  account_name: string;
  balance: number;
}

export type CreateAccountRequest = {
  user_id: string;
  account_name: string;
  balance: number;
}


export type GetAccountRequest = {
  user_id: string; 
  id: string;
}

export type RemoveAccountRequest = GetAccountRequest

export type UpdateAccountRequest = {
  id: string;
  user_id: string;
  account_name?: string;
  balance?: number;
}

export function toAccountResponse(account: Account): AccountResponse {
  return {
    id: account.id,
    account_name: account.account_name,
    balance: account.balance
  }
}
