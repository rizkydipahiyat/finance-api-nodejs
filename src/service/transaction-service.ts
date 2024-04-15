import { User } from "@prisma/client";
import { CreateTransactionRequest, RemoveTransactionRequest, TransactionResponse, UpdateTransactionRequest, toTransactionResponse } from "../model/transaction-model";
import { Validation } from "../validation/validation";
import { TransactionValidation } from "../validation/transaction-validation";
import { UserService } from "./user-service";
import { prismaClient } from "../application/database";
import { AccountService } from "./account-service";
import { ResponseError } from "../error/response-error";


export class TransactionService {
  static async create(user: User, request: CreateTransactionRequest): Promise<TransactionResponse> {
    const createRequest = Validation.validate(TransactionValidation.CREATE, request);

    // Validasi User
    await UserService.checkUserMustExist(user.id);

    // Validasi Account
    let account = await AccountService.checkAccountMustExist(createRequest.account_id, createRequest.user_id);

    let transactions = await prismaClient.transaction.create({
      data: createRequest
    });

    let newBalance;
    if(transactions.transaction_type === 'INCOME') {
      newBalance = account.balance + transactions.amount;
    } else if(transactions.transaction_type === 'EXPENSE') {
      newBalance = account.balance - transactions.amount;
    }

    await prismaClient.account.update({
      where: {
        id: account.id
      },
      data: {
        balance: newBalance
      }
    })

    return toTransactionResponse(transactions);
  }

  static async update(user: User, request: UpdateTransactionRequest): Promise<TransactionResponse> {
    const updateRequest = Validation.validate(TransactionValidation.UPDATE, request);

     // Validasi User
    await UserService.checkUserMustExist(user.id);

    // Validasi Account
    let account = await AccountService.checkAccountMustExist(updateRequest.account_id, updateRequest.user_id);
 
    const transactions = await prismaClient.transaction.update({
      where: {
        id: updateRequest.id,
        account_id: updateRequest.account_id,
        user_id: updateRequest.user_id,
      },
      data: updateRequest
    });

     // Pastikan untuk menunggu hingga transaksi selesai diperbarui
     if (!transactions) {
      throw new ResponseError(404, 'Transaction is not found');
    }

    let newBalance;
    if(transactions.transaction_type === 'INCOME') {
      newBalance = account.balance + transactions.amount;
    } else if(transactions.transaction_type === 'EXPENSE') {
      newBalance = account.balance - transactions.amount;
    } else if(transactions.transaction_type === 'TRANSFER') {
      newBalance = account.balance + transactions.amount;
    }

   await prismaClient.account.update({
      where: {
        id: account.id
      },
      data: {
        balance: newBalance
      }
    });
    return toTransactionResponse(transactions);
  }

  static async delete(user: User, request: RemoveTransactionRequest): Promise<TransactionResponse> {
    const removeRequest = Validation.validate(TransactionValidation.GET, request);

    // Validasi User
    await UserService.checkUserMustExist(user.id);

    // Validasi Account
    let account = await AccountService.checkAccountMustExist(removeRequest.account_id, removeRequest.user_id);
 
    const deletedTransaction  = await prismaClient.transaction.delete({
      where: {
        id: removeRequest.id
      }
    })

     // Update saldo akun berdasarkan jenis transaksi yang dihapus
     let newBalance;
     if (deletedTransaction.transaction_type === 'INCOME') {
         newBalance = account.balance - deletedTransaction.amount;
     } else if (deletedTransaction.transaction_type === 'EXPENSE') {
         newBalance = account.balance + deletedTransaction.amount;
     } else if (deletedTransaction.transaction_type === 'TRANSFER') {
         // Untuk transfer, perlu dikembalikan jumlah ke akun asal
         if (deletedTransaction.account_id === account.id) {
             newBalance = account.balance + deletedTransaction.amount;
         } else {
             newBalance = account.balance - deletedTransaction.amount;
         }
     }

     // Perbarui saldo akun setelah menghapus transaksi
    await prismaClient.account.update({
      where: {
        id: account.id
      },
      data: {
        balance: newBalance
      }
    });
    return toTransactionResponse(deletedTransaction);
  }

  static async list(user: User, accountId: string): Promise<Array<TransactionResponse>> {
    await UserService.checkUserMustExist(user.id);

    await AccountService.checkAccountMustExist(accountId, user.id);

    const transactions = await prismaClient.transaction.findMany({
      where: {
        account_id: accountId
      }
    });

    return transactions.map((transaction) => toTransactionResponse(transaction));

  }
}