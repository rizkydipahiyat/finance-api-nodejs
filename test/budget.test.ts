import supertest from "supertest";
import { AccountTest, BudgetTest, TransactionTest, UserTest } from "./test-util";
import { app } from "../src/application/app";
import { logger } from "../src/application/logging";


describe('POST /api/budgets/:userId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await AccountTest.create()
  });

  afterEach(async () => {
    await BudgetTest.deleteAll();
    await AccountTest.deleteAll();
    await UserTest.delete()
  });
  it('should reject create budget if request is invalid', async () => {
    const user = await UserTest.get();
    const response = await supertest(app)
      .post(`/api/budgets/${user.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        category: "Foods",
        account_id: "",
        amount: "",
        period: "WEEKLY",
      })
    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })
  it('should be able to create budgets', async () => {
    const user = await UserTest.get();
    const account = await AccountTest.get();
    const response = await supertest(app)
      .post(`/api/budgets/${user.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        category: "Foods",
        account_id: account.id as string,
        amount: 10,
        period: "WEEKLY",
      })
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.category).toBe("Foods")
    expect(response.body.data.account_id).toBe(account.id)
    expect(response.body.data.amount).toBe(10)
    expect(response.body.data.period).toBe("WEEKLY")
  })
})


describe('PATCH /api/budgets/:budgetId/:userId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await AccountTest.create()
    await BudgetTest.create();
  });

  afterEach(async () => {
    await BudgetTest.deleteAll();
    await AccountTest.deleteAll();
    await UserTest.delete()
  });
  it('should reject update budget if request is invalid', async () => {
    const budget = await BudgetTest.get();
    const user = await UserTest.get();
    const response = await supertest(app)
      .patch(`/api/budgets/${budget.id}/${user.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        category: "",
        account_id: "",
        amount: "",
        period: "",
      })
    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })
  it('should be able to update budget', async () => {
    const budget = await BudgetTest.get();
    const user = await UserTest.get();
    const account = await AccountTest.get();
    const response = await supertest(app)
      .patch(`/api/budgets/${budget.id}/${user.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        category: "Foods",
        account_id: account.id as string,
        amount: 20,
        period: "MONTHLY",
      })
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.category).toBe("Foods")
    expect(response.body.data.account_id).toBe(account.id)
    expect(response.body.data.amount).toBe(20)
    expect(response.body.data.period).toBe("MONTHLY")
  })
})

describe('GET /api/budgets/:userId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await AccountTest.create()
    await BudgetTest.create();
  });

  afterEach(async () => {
    await BudgetTest.deleteAll();
    await AccountTest.deleteAll();
    await UserTest.delete()
  });

  it('should reject get list budget if user is not foud', async () => {
    const user = await UserTest.get();
    const response = await supertest(app)
      .get(`/api/budgets/${user.id}11`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should be able to get list budget', async () => {
    const user = await UserTest.get();
    const response = await supertest(app)
      .get(`/api/budgets/${user.id}`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.length).toBe(1);
  })
})


describe('DELETE /api/budgets/:budgetId/:userId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await AccountTest.create()
    await BudgetTest.create();
  });

  afterEach(async () => {
    await BudgetTest.deleteAll();
    await AccountTest.deleteAll();
    await UserTest.delete()
  });
  it('should be able to delete budget', async () => {
    const budget = await BudgetTest.get();
    const user = await UserTest.get();
    const response = await supertest(app)
      .delete(`/api/budgets/${budget.id}/${user.id}`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data).toBe("OK");
  })
  it('should reject remove budget if user is not foud', async () => {
    const user = await UserTest.get();
    const budget = await BudgetTest.get();
    const response = await supertest(app)
      .delete(`/api/budgets/${budget.id}/${user.id}11`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
})

describe('GET /api/budgets/:budgetId/:userId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await AccountTest.create()
    await BudgetTest.create();
    await TransactionTest.create();
  });

  afterEach(async () => {
    await BudgetTest.deleteAll();
    await TransactionTest.deleteAll();
    await AccountTest.deleteAll();
    await UserTest.delete()
  });

  it('should be able to get budget', async () => {
    const user = await UserTest.get();
    const budget = await BudgetTest.get();
    const response = await supertest(app)
      .get(`/api/budgets/${budget.id}/${user.id}`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.account_id).toBe(budget.account_id);
    expect(response.body.data.category).toBe(budget.category);
    expect(response.body.data.amount).toBe(budget.amount);
    expect(response.body.data.period).toBe(budget.period);
  })
})