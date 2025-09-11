/*
  Warnings:

  - You are about to drop the column `customerId` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_customerId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_store_id_fkey";

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "customerId",
ADD COLUMN     "customerEmail" TEXT,
ADD COLUMN     "customerName" TEXT,
ADD COLUMN     "customerPhone" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "store_id";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Store";
