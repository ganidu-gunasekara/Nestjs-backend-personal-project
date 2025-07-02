/*
  Warnings:

  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `composition` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fit` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "composition" SET NOT NULL,
ALTER COLUMN "fit" SET NOT NULL;
