"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toGoalResponse = void 0;
function toGoalResponse(goal) {
    return {
        id: goal.id,
        goal_name: goal.goal_name,
        target_amount: goal.target_amount,
        current_amount: goal.current_amount,
        deadline: goal.deadline ? new Date(goal.deadline) : new Date(0),
    };
}
exports.toGoalResponse = toGoalResponse;
