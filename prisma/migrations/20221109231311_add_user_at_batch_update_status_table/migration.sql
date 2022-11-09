/*
  Warnings:

  - You are about to drop the column `user_id` on the `batch_update_records` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `batch_update_status` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "batch_update_records" DROP CONSTRAINT "batch_update_records_fk0";

-- AlterTable
ALTER TABLE "batch_update_records" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "batch_update_status" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- RenameForeignKey
ALTER TABLE "batch_update_records" RENAME CONSTRAINT "batch_update_records_fk1" TO "batch_update_records_fk0";

-- RenameForeignKey
ALTER TABLE "batch_update_records" RENAME CONSTRAINT "batch_update_records_fk2" TO "batch_update_records_fk1";

-- AddForeignKey
ALTER TABLE "batch_update_status" ADD CONSTRAINT "batch_update_status_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
