/*
  Warnings:

  - You are about to drop the column `installments` on the `Expenses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "installments",
ADD COLUMN     "additionalInfo" TEXT;
