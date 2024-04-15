import { User } from "@prisma/client";
import { CreateGoalRequest, GoalResponse, RemoveGoalRequest, UpdateGoalRequest, toGoalResponse } from "../model/goal-model";
import { GoalValidation } from "../validation/goal-validation";
import { Validation } from "../validation/validation";
import { UserService } from "./user-service";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";


export class GoalService {
  static async create(user: User, request: CreateGoalRequest): Promise<GoalResponse> {
    const createRequest = Validation.validate(GoalValidation.CREATE, request);

    await UserService.checkUserMustExist(user.id);

    const goals = await prismaClient.goal.create({
      data: createRequest
    });

    return toGoalResponse(goals);
  }
  static async update(user: User, request: UpdateGoalRequest): Promise<GoalResponse> {
    const updateRequest = Validation.validate(GoalValidation.UPDATE, request);

    await UserService.checkUserMustExist(user.id);

    const goals = await prismaClient.goal.update({
      where: {
        id: updateRequest.id,
        user_id: updateRequest.user_id
      },
      data: updateRequest
    });

    return toGoalResponse(goals);
  }

  static async list(user: User, userId: string): Promise<Array<GoalResponse>> {
    await UserService.checkUserMustExist(user.id);

    
    if(userId !== user.id) {
      throw new ResponseError(404, 'User is not found')
    }

    const goals = await prismaClient.goal.findMany({
      where: {
        user_id: userId
      }
    })

    return goals.map((goal) => toGoalResponse(goal));
  }

  static async delete(user: User, request: RemoveGoalRequest): Promise<GoalResponse> {
    const removeRequest = Validation.validate(GoalValidation.GET, request);

    await UserService.checkUserMustExist(user.id);

    
    if(removeRequest.user_id !== user.id) {
      throw new ResponseError(404, 'User is not found')
    }

    const goals = await prismaClient.goal.delete({
      where: {
        id: removeRequest.id
      }
    });

    return toGoalResponse(goals);
  }
}