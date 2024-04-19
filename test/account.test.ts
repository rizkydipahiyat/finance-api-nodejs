import supertest from "supertest";
import { AccountTest, UserTest } from "./test-util";
import { app } from '../src/application/app'
import { logger } from "../src/application/logging";


describe('POST /api/accounts/:userId', () => {
  beforeEach(async () => {
    await UserTest.create()
  });

  afterEach(async () => {
    await AccountTest.deleteAll();
    await UserTest.delete()
  });
  it('should be able to create new account', async () => {
    const user = await UserTest.get();
    const response = await supertest(app)
      .post(`/api/accounts/${user.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        account_name: "Investment",
        balance: 100000
      })
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.account_name).toBe("Investment")
    expect(response.body.data.balance).toBe(100000)
  })
})


describe('PATCH /api/accounts/:accountId/user/:userId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await AccountTest.create()
  });

  afterEach(async () => {
    await AccountTest.deleteAll();
    await UserTest.delete()
  });

  it('should reject update account if account is not found ', async () => {
    const user = await UserTest.get();
    const account = await AccountTest.get();
    const response = await supertest(app)
      .patch(`/api/accounts/${account.id + 1}/user/${user.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        account_name: "test",
        balance: 200
      })
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should reject update account if user is not found ', async () => {
    const user = await UserTest.get();
    const account = await AccountTest.get();
    const response = await supertest(app)
      .patch(`/api/accounts/${account.id}/user/${user.id}-123`)
      .set('X-API-TOKEN', "test")
      .send({
        account_name: "test",
        balance: 200
      })
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should reject update account if data is invalid ', async () => {
    const user = await UserTest.get();
    const account = await AccountTest.get();
    const response = await supertest(app)
      .patch(`/api/accounts/${account.id}/user/${user.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        account_name: "test",
        balance: ""
      })
    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  it('should be able update account', async () => {
    const user = await UserTest.get();
    const account = await AccountTest.get();
    const response = await supertest(app)
      .patch(`/api/accounts/${account.id}/user/${user.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        account_name: "test aja",
        balance: 200
      })
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.account_name).toBe("test aja")
    expect(response.body.data.balance).toBe(200)
  })
})

describe('DELETE /api/accounts/:accountId/user/:userId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await AccountTest.create()
  });

  afterEach(async () => {
    await AccountTest.deleteAll();
    await UserTest.delete()
  });
  it('should reject delete account if account is not found', async () => {
    const account = await AccountTest.get();
    const user = await UserTest.get();
    const response = await supertest(app)
      .delete(`/api/accounts/${account.id + 1}/user/${user.id}`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should reject delete account if user is not found', async () => {
    const account = await AccountTest.get();
    const user = await UserTest.get();
    const response = await supertest(app)
      .delete(`/api/accounts/${account.id}/user/${user.id}-123`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })

  it('should be able to delete account', async () => {
    const account = await AccountTest.get();
    const user = await UserTest.get();
    const response = await supertest(app)
      .delete(`/api/accounts/${account.id}/user/${user.id}`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data).toBe("OK")
  })
})

describe('GET /api/accounts/:accountId/user/:userId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await AccountTest.create()
  });

  afterEach(async () => {
    await AccountTest.deleteAll();
    await UserTest.delete()
  });
  it('should be able to get account', async () => {
    const account = await AccountTest.get();
    const user = await UserTest.get();
    const response = await supertest(app)
      .get(`/api/accounts/${account.id}/user/${user.id}`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.account_name).toBe(account.account_name)
    expect(response.body.data.balance).toBe(account.balance)
  })
  it('should reject get account if account is not found', async () => {
    const account = await AccountTest.get();
    const user = await UserTest.get();
    const response = await supertest(app)
      .get(`/api/accounts/${account.id + 1}/user/${user.id}`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should reject get account if user is not found', async () => {
    const account = await AccountTest.get();
    const user = await UserTest.get();
    const response = await supertest(app)
      .get(`/api/accounts/${account.id}/user/${user.id}-123`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
})

describe('GET /api/accounts/:userId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await AccountTest.create()
  });

  afterEach(async () => {
    await AccountTest.deleteAll();
    await UserTest.delete()
  });
  it('should be able to list account', async () => {
    const user = await UserTest.get();
    const response = await supertest(app)
        .get(`/api/accounts/${user.id}`)
        .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.length).toBe(1);
  })

  it('should reject get list account if user is not found', async () => {
    const user = await UserTest.get();
    const response = await supertest(app)
      .get(`/api/accounts/${user.id}-123`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors);
  })
})