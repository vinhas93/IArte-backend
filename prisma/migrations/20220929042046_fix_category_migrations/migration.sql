/*
  Warnings:

  - Added the required column `image` to the `canvas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "canvas" ADD COLUMN     "image" TEXT NOT NULL;
