import supertest from "supertest";
import { AccountTest, TransactionTest, UserTest } from "./test-util";
import { app } from "../src/application/app";
import { logger } from "../src/application/logging";


describe('POST /api/accounts/:accountId/user/:userId/transactions', () => {
  beforeEach(async () => {
    await UserTest.create()
    await AccountTest.create()
  });

  afterEach(async () => {
    await TransactionTest.deleteAll();
    await AccountTest.deleteAll();
    await UserTest.delete()
  });
  it('should reject add new transaction if request is invalid', async () => {
    const account = await AccountTest.get();
    const response = await supertest(app)
      .post(`/api/accounts/${account.id}/user/${account.user_id}/transactions`)
      .set('X-API-TOKEN', "test")
      .send({
        amount: "",
        description: "",
        transaction_type: "INCOME",
        category: "Investment"
      })
    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })
  it('should reject add new transaction if account is not found', async () => {
    const account = await AccountTest.get();
    const response = await supertest(app)
      .post(`/api/accounts/${account.id}-1/user/${account.user_id}/transactions`)
      .set('X-API-TOKEN', "test")
      .send({
        amount: 10,
        description: "Tabungan investasi 10 dolar",
        transaction_type: "INCOME",
        category: "Investment"
      })
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should reject add new transaction if user is not found', async () => {
    const account = await AccountTest.get();
    const response = await supertest(app)
      .post(`/api/accounts/${account.id}/user/${account.user_id}-1/transactions`)
      .set('X-API-TOKEN', "test")
      .send({
        amount: 10,
        description: "Tabungan investasi 10 dolar",
        transaction_type: "INCOME",
        category: "Investment"
      })
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should be able to add new transaction', async () => {
    const account = await AccountTest.get();
    // const user = await UserTest.get();
    const response = await supertest(app)
      .post(`/api/accounts/${account.id}/user/${account.user_id}/transactions`)
      .set('X-API-TOKEN', "test")
      .send({
        amount: 10,
        description: "Tabungan investasi 10 dolar",
        transaction_type: "EXPENSE",
        category: "Foods"
      })
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.amount).toBe(10)
    expect(response.body.data.description).toBe("Tabungan investasi 10 dolar")
    expect(response.body.data.transaction_type).toBe("EXPENSE")
    expect(response.body.data.category).toBe("Foods")
  })
})

describe('PATCH /api/accounts/:accountId/user/:userId/transactions/:transactionId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await AccountTest.create()
    await TransactionTest.create()
  });

  afterEach(async () => {
    await TransactionTest.deleteAll();
    await AccountTest.deleteAll();
    await UserTest.delete()
  });

  it('should reject update transaction if request is invalid', async () => {
    const account = await AccountTest.get();
    const transaction = await TransactionTest.get()
    const response = await supertest(app)
      .patch(`/api/accounts/${account.id}/user/${account.user_id}/transactions/${transaction.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        amount: "",
        description: "",
        transaction_type: "",
        category: ""
      })
    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  it('should reject update transaction if user is not found', async () => {
    const account = await AccountTest.get();
    const transaction = await TransactionTest.get()
    const response = await supertest(app)
      .patch(`/api/accounts/${account.id}/user/${account.user_id}-1/transactions/${transaction.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        amount: 10,
        description: "Tabungan investasi 10 dolar",
        transaction_type: "INCOME",
        category: "Investment"
      })
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should reject update transaction if account is not found', async () => {
    const account = await AccountTest.get();
    const transaction = await TransactionTest.get()
    const response = await supertest(app)
      .patch(`/api/accounts/${account.id}-1/user/${account.user_id}/transactions/${transaction.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        amount: 10,
        description: "Tabungan investasi 10 dolar",
        transaction_type: "INCOME",
        category: "Investment"
      })
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should be able to update transaction', async () => {
    const account = await AccountTest.get();
    const transaction = await TransactionTest.get()
    const response = await supertest(app)
      .patch(`/api/accounts/${account.id}/user/${account.user_id}/transactions/${transaction.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        amount: 15,
        description: "Tabungan investasi 10 dolar",
        transaction_type: 'TRANSFER',
        category: "Investment"
      })
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.amount).toBe(15)
    expect(response.body.data.description).toBe("Tabungan investasi 10 dolar")
    expect(response.body.data.transaction_type).toBe("TRANSFER")
    expect(response.body.data.category).toBe("Investment")
  })
})


describe('DELETE /api/accounts/:accountId/user/:userId/transactions/:transactionId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await AccountTest.create()
    await TransactionTest.create()
  });

  afterEach(async () => {
    await TransactionTest.deleteAll();
    await AccountTest.deleteAll();
    await UserTest.delete()
  });

  it('should be able to delete transactions', async () => {
    const account = await AccountTest.get();
    const user = await UserTest.get();
    const transaction = await TransactionTest.get();
    const response = await supertest(app)
      .delete(`/api/accounts/${account.id}/user/${user.id}/transactions/${transaction.id}`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data).toBe("OK")
  })
})

describe('GET /api/accounts/:accountId/transactions', () => {
  beforeEach(async () => {
    await UserTest.create()
    await AccountTest.create()
    await TransactionTest.create()
  });

  afterEach(async () => {
    await TransactionTest.deleteAll();
    await AccountTest.deleteAll();
    await UserTest.delete()
  });

  it('should be able to get transaction account', async () => {
    const account = await AccountTest.get();
    const response = await supertest(app)
      .get(`/api/accounts/${account.id}/transactions`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.length).toBe(1);
  })

  it('should reject get list transaction if account is not found', async () => {
    const account = await AccountTest.get();
    const response = await supertest(app)
      .get(`/api/accounts/${account.id}-12/transactions`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
})