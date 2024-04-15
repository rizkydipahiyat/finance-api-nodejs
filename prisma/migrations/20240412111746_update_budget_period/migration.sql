-- AlterTable
ALTER TABLE `budgets` MODIFY `period` ENUM('WEEKLY', 'MONTHLY', 'YEARLY') NOT NULL;
