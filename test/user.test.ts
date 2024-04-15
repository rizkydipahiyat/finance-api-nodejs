import supertest from "supertest"
import { app } from '../src/application/app'
import { logger } from "../src/application/logging"
import { UserTest } from "./test-util"
import bcrypt from 'bcrypt'


describe('POST /api/users', () => {
  afterEach(async () => {
    await UserTest.delete();
  })
  it('should register new user', async () => {
    const response = await supertest(app)
      .post('/api/users')
      .send({
        name: "test",
        email: "test@gmail.com",
        password: "password"
      })

      logger.debug(response.body);
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe("test")
        expect(response.body.data.email).toBe("test@gmail.com")
  })
  it('should reject register new user if request is invalid', async () => {
    const response = await supertest(app)
      .post('/api/users')
      .send({
        name: "",
        email: "",
        password: ""
      })

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  })
})


describe('POST /api/users/login', () => {
  
  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete();
  })
  it('should be able to login', async () => {
    const response = await supertest(app)
      .post('/api/users/login')
      .send({
        email: "test@gmail.com",
        password: "password"
      })

      logger.debug(response.body);
      expect(response.status).toBe(200)
      expect(response.body.data.name).toBe("test")
      expect(response.body.data.email).toBe("test@gmail.com")
      expect(response.body.data.token).toBeDefined()
  })
  it('should reject login user if email is wrong', async () => {
    const response = await supertest(app)
      .post('/api/users/login')
      .send({
        email: "teh@gmail.com",
        password: "password"
      })

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  })
})


describe('PATCH /api/users/current', () => {
  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete();
  })
  it('should reject update user if request is invalid', async () => {
      const response = await supertest(app)
        .patch('/api/users/current')
        .set('X-API-TOKEN', 'test')
        .send({
          password: "",
          name: ""
        })
    logger.debug(response.body)
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  })

  it('should reject update user if token is wrong', async () => {
    const response = await supertest(app)
        .patch('/api/users/current')
        .set('X-API-TOKEN', "salah")
        .send({
          password: "benar",
          name: "benar"
        })
    
    logger.debug(response.body)
    expect(response.status).toBe(401)
    expect(response.body.errors).toBeDefined()
  })

  it('should be able to update user name', async () => {
    const response = await supertest(app)
        .patch('/api/users/current')
        .set('X-API-TOKEN', "test")
        .send({
          name: "benar"
        })
    
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.name).toBe("benar")
  })
  it('should be able to update user password', async () => {
    const response = await supertest(app)
        .patch('/api/users/current')
        .set('X-API-TOKEN', "test")
        .send({
          password: "passwordtest"
        })
    
    logger.debug(response.body)
    expect(response.status).toBe(200)
    
    const user = await UserTest.get();
    expect(await bcrypt.compare("passwordtest", user.password)).toBe(true);
  })
}) 

describe('DELETE /api/users/current', () => {
  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete();
  })
  it('should be able to logout', async () => {
    const response = await supertest(app)
        .delete("/api/users/current")
        .set("X-API-TOKEN", "test")
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");

    const user = await UserTest.get()
    expect(user.token).toBeNull();
  })

  it('should reject logout user if token is wrong', async () => {
    const response = await supertest(app)
        .delete("/api/users/current")
        .set("X-API-TOKEN", "salah")
    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  })
})