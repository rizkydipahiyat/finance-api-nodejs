import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest, UserResponse, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from 'bcrypt'
import { v4 as uuid } from "uuid";

export class UserService {
  static async checkUserMustExist(id: string): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        id: id
      },
    })
    if(!user) {
      throw new ResponseError(404, "User not found")
    }
    return user
  }
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(UserValidation.REGISTER, request);

    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: registerRequest.email
      }
    })

    if(existingUser) {
      throw new ResponseError(400, "Email already exists");
    }

    // Hash password
    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest
    })

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    let user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.email
      }
    })

    if(!user) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    const isPasswordMatch = await bcrypt.compare(loginRequest.password, user.password);
    if(!isPasswordMatch) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    user = await prismaClient.user.update({
      where: {
        email: loginRequest.email
      },
      data: {
        token: uuid()
      }
    })

    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
    
  }

  static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    
    if(updateRequest.name) {
      user.name = updateRequest.name;
    }
    if(updateRequest.password) {
      user.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const result = await prismaClient.user.update({
      where: {
        id: user.id
      },
      data: user
    })
    return toUserResponse(result);
  }

  static async logout(user: User): Promise<UserResponse> {
    const result = await prismaClient.user.update({
      where: {
        id: user.id
      },
      data: {
        token: null
      }
    })
    return toUserResponse(result)
  }
}