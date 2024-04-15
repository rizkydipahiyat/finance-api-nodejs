import { Account, Budget, Goal, Transaction, User } from "@prisma/client";
import { prismaClient } from "../src/application/database";
import bcrypt from 'bcrypt';


export class UserTest {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        id: "1"
      }
    })
  }

  static async create() {
    const user = await prismaClient.user.create({
      data: {
        id: "1",
        name: "test",
        email: "test@gmail.com",
        password: await bcrypt.hash("password", 10),
        token: "test"
      }
    })
    return user.id
  }

  static async get(): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        id: "1"
      }
    })
    if(!user) {
      throw new Error("User is not found");
    }
    return user;
  }
}

export class AccountTest {
  static async deleteAll() {
    await prismaClient.account.deleteMany({
      where: {
        user_id: "1"
      }
    })
  }
  static async create() {
    const user = await UserTest.get()
    const account = await prismaClient.account.create({
      data: {
        id: "3",
        user_id: user.id as string,
        account_name: "test account",
        balance: 100,
      }
    })
    return account.id as string;
  }

  static async get(): Promise<Account> {
    const account = await prismaClient.account.findFirst({
      where: {
        id: "3"
      }
    })
    if(!account) {
      throw new Error("Account is not found");
    }
    return account;
  }
}

export class TransactionTest {
  static async deleteAll() {
    await prismaClient.transaction.deleteMany({
      where: {
        account: {
          id: "3"
        }
      }
    })
  }
  static async create() {
    const account = await AccountTest.get();
    await prismaClient.transaction.create({
      data: {
        id: "1",
        account_id: account.id as string,
        user_id: account.user_id as string,
        amount: 10,
        description: "Jajan",
        transaction_type: "EXPENSE",
        category: "Foods"
      }
    })
  }
  static async get(): Promise<Transaction> {
    const transaction = await prismaClient.transaction.findFirst({
      where: {
        id: "1"
      }
    })
    if(!transaction) {
      throw new Error("Transaction is not found");
    }
    return transaction;
  }

}

export class BudgetTest {
  static async deleteAll() {
    const user = await UserTest.get();
    await prismaClient.budget.deleteMany({
      where: {
        user_id: user.id as string
      }
    })
  }
  static async create() {
    const user = await UserTest.get()
    const account = await AccountTest.get()
    const budget = await prismaClient.budget.create({
      data: {
        id: "1",
        user_id: user.id as string,
        account_id: account.id as string,
        category: "Foods",
        amount: 10,
        period: "WEEKLY",
      }
    })
    return budget.id as string;
  }
  static async get(): Promise<Budget> {
    const budget = await prismaClient.budget.findFirst({
      where: {
        id: "1"
      }
    })
    if(!budget) {
      throw new Error("Budget is not found");
    }
    return budget;
  }
}

export class GoalTest {
  static async deleteAll() {
    const user = await UserTest.get();
    await prismaClient.goal.deleteMany({
      where: {
        user_id: user.id as string
      }
    })
  }
  static async create() {
    const user = await UserTest.get()
    const goal = await prismaClient.goal.create({
      data: {
        id: "1",
        user_id: user.id as string,
        goal_name: "Mobil",
        target_amount: 200,
        current_amount: 10,
        deadline: "2024-04-15T05:54:06.351Z",
      }
    })
    return goal.id as string;
  }
  static async get(): Promise<Goal> {
    const goal = await prismaClient.goal.findFirst({
      where: {
        id: "1"
      }
    })
    if(!goal) {
      throw new Error("Budget is not found");
    }
    return goal;
  }
}