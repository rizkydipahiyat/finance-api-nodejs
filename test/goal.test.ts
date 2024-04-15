import supertest from "supertest";
import { GoalTest, UserTest } from "./test-util";
import { app } from "../src/application/app";
import { logger } from "../src/application/logging";


describe('POST /api/goals/:userId', () => {
  beforeEach(async () => {
    await UserTest.create()
  });

  afterEach(async () => {
    await GoalTest.deleteAll();
    await UserTest.delete()
  });
  it('should reject create goal if request is invalid', async () => {
    const user = await UserTest.get();
    const response = await supertest(app)
      .post(`/api/goals/${user.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        goal_name: "",
        target_amount: "",
        current_amount: "",
        deadline: "",
      })
    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })
  it('should be able to create goals', async () => {
    const user = await UserTest.get();
    const response = await supertest(app)
      .post(`/api/goals/${user.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        goal_name: "Mobil",
        target_amount: 200,
        current_amount: 10,
        deadline: "2024-04-15T05:54:06.351Z",
      })
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.goal_name).toBe("Mobil")
    expect(response.body.data.target_amount).toBe(200)
    expect(response.body.data.current_amount).toBe(10)
    expect(response.body.data.deadline).toBe("2024-04-15T05:54:06.351Z")
  })
})


describe('PATCH /api/goals/:goalId/:userId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await GoalTest.create();
  });

  afterEach(async () => {
    await GoalTest.deleteAll();
    await UserTest.delete()
  });
  it('should reject update goal if request is invalid', async () => {
    const goal = await GoalTest.get();
    const user = await UserTest.get();
    const response = await supertest(app)
      .patch(`/api/goals/${goal.id}/${user.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        goal_name: "",
        target_amount: "",
        current_amount: "",
        deadline: "",
      })
    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })
  it('should be able to update goals', async () => {
    const goal = await GoalTest.get();
    const user = await UserTest.get();
    const response = await supertest(app)
      .patch(`/api/goals/${goal.id}/${user.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        goal_name: "Motor",
        target_amount: 200,
        current_amount: 10,
        deadline: "2024-04-15T05:54:06.351Z",
      })
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.goal_name).toBe("Motor")
    expect(response.body.data.target_amount).toBe(200)
    expect(response.body.data.current_amount).toBe(10)
    expect(response.body.data.deadline).toBe("2024-04-15T05:54:06.351Z")
  })
})


describe('GET /api/goals/:userId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await GoalTest.create();
  });

  afterEach(async () => {
    await GoalTest.deleteAll();
    await UserTest.delete()
  });
  it('should reject get list goal if user is not foud', async () => {
    const user = await UserTest.get();
    const response = await supertest(app)
      .get(`/api/goals/${user.id}11`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should be able to get list goal', async () => {
    const user = await UserTest.get();
    const response = await supertest(app)
      .get(`/api/goals/${user.id}`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.length).toBe(1);
  })
})


describe('DELETE /api/goals/:goalId/:userId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await GoalTest.create();
  });

  afterEach(async () => {
    await GoalTest.deleteAll();
    await UserTest.delete()
  });
  it('should reject delete goal if user is not found', async () => {
    const goal = await GoalTest.get();
    const user = await UserTest.get();
    const response = await supertest(app)
    .delete(`/api/goals/${goal.id}/${user.id}11`)
    .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should be able to delete goal', async () => {
    const goal = await GoalTest.get();
    const user = await UserTest.get();
    const response = await supertest(app)
      .delete(`/api/goals/${goal.id}/${user.id}`)
      .set('X-API-TOKEN', "test")
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data).toBe("OK");
  })
})