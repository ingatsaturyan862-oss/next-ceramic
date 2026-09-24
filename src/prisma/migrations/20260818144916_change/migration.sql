/*
  Warnings:

  - A unique constraint covering the columns `[basketId,productId]` on the table `BasketCard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BasketCard_basketId_productId_key" ON "BasketCard"("basketId", "productId");
