/*
  Warnings:

  - Added the required column `at_status` to the `batch_update_records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_message` to the `batch_update_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "batch_update_records" ADD COLUMN     "at_status" INTEGER NOT NULL,
ADD COLUMN     "status_message" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "batch_update_records" ADD CONSTRAINT "batch_update_records_fk2" FOREIGN KEY ("at_status") REFERENCES "batch_update_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
