/*
  Warnings:

  - You are about to drop the column `userId` on the `Purchase` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_userId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "userId";
