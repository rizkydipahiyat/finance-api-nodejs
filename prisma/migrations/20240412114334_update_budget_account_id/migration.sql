/*
  Warnings:

  - Added the required column `account_id` to the `budgets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `budgets` ADD COLUMN `account_id` VARCHAR(191) NOT NULL;
