-- CreateEnum
CREATE TYPE "Category" AS ENUM ('AJ', 'NJ', 'CJ', 'FJ', 'RJ', 'L', 'M', 'PRG', 'ZSV', 'D', 'FY', 'BI', 'ZE', 'HU', 'VU', 'CH', 'OSTATNI');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'OSTATNI';
