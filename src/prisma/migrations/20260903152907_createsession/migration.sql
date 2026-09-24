/*
  Warnings:

  - A unique constraint covering the columns `[basketId,productId,colorId]` on the table `BasketCard` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BasketCard_basketId_productId_idx";

-- DropIndex
DROP INDEX "BasketCard_basketId_productId_key";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Verification" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "BasketCard_basketId_productId_colorId_key" ON "BasketCard"("basketId", "productId", "colorId");
