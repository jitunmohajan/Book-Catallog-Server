/*
  Warnings:

  - You are about to alter the column `price` on the `books` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "books" ALTER COLUMN "price" SET DATA TYPE INTEGER;
