/*
  Warnings:

  - Added the required column `colorId` to the `BasketCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BasketCard" ADD COLUMN     "colorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "BasketCard" ADD CONSTRAINT "BasketCard_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
