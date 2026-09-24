-- DropIndex
DROP INDEX "BasketCard_basketId_productId_colorId_idx";

-- CreateIndex
CREATE INDEX "BasketCard_basketId_productId_idx" ON "BasketCard"("basketId", "productId");
