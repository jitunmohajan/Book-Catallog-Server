/*
  Warnings:

  - Made the column `orderedBooks` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "orderedBooks" SET NOT NULL;
