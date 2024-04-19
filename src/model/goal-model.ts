import { Goal } from '@prisma/client'

export type GoalResponse = {
  id: number;
  goal_name: string;
  target_amount: number;
  current_amount: number;
  deadline: string | Date;
}

export type CreateGoalRequest = {
  user_id: string;
  goal_name: string;
  target_amount: number;
  current_amount: number;
  deadline: string | Date;
}


export type GetGoalRequest = {
  user_id: string;
  id: number;
}

export type RemoveGoalRequest = GetGoalRequest

export type UpdateGoalRequest = {
  id: number;
  user_id: string;
  goal_name?: string;
  target_amount?: number;
  current_amount?: number;
  deadline?: string | Date;
}

export function toGoalResponse(goal: Goal): GoalResponse {
  return {
    id: goal.id,
    goal_name: goal.goal_name,
    target_amount: goal.target_amount,
    current_amount: goal.current_amount,
    deadline: goal.deadline ? new Date(goal.deadline) : new Date(0),
  }
}
