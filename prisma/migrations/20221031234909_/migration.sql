/*
  Warnings:

  - The `genre` column on the `canvas` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CanvaGenre" AS ENUM ('Others', 'Realism', 'Abstract', 'Fantasy', 'Gothic', 'PopArt');

-- DropForeignKey
ALTER TABLE "bulk_update_records" DROP CONSTRAINT "bulk_update_records_fk0";

-- DropForeignKey
ALTER TABLE "bulk_update_records" DROP CONSTRAINT "bulk_update_records_fk1";

-- AlterTable
ALTER TABLE "canvas" DROP COLUMN "genre",
ADD COLUMN     "genre" "CanvaGenre" NOT NULL DEFAULT 'Others';

-- AddForeignKey
ALTER TABLE "bulk_update_records" ADD CONSTRAINT "bulk_update_records_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bulk_update_records" ADD CONSTRAINT "bulk_update_records_fk1" FOREIGN KEY ("canva_id") REFERENCES "canvas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
