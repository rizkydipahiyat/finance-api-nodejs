-- AlterTable
ALTER TABLE `transactions` MODIFY `transaction_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `transaction_type` ENUM('INCOME', 'EXPENSE', 'TRANSFER') NOT NULL;
