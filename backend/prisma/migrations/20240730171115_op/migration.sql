/*
  Warnings:

  - You are about to drop the column `isSettled` on the `Expenses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "isSettled",
ALTER COLUMN "splitType" DROP NOT NULL;
