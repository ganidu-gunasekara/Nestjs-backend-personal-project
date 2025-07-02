/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productNo]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mainImageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productNo` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "imageUrl",
ADD COLUMN     "colors" TEXT[],
ADD COLUMN     "composition" TEXT,
ADD COLUMN     "discountPrice" DOUBLE PRECISION,
ADD COLUMN     "fit" TEXT,
ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "mainImageUrl" TEXT NOT NULL,
ADD COLUMN     "productNo" TEXT NOT NULL,
ADD COLUMN     "sizes" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Product_productNo_key" ON "Product"("productNo");
