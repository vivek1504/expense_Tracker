/*
  Warnings:

  - Added the required column `expenseDate` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expenses" ADD COLUMN     "description" TEXT,
ADD COLUMN     "expenseDate" TEXT NOT NULL;
