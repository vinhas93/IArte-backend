/*
  Warnings:

  - You are about to drop the `bulk_update_records` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bulk_update_records" DROP CONSTRAINT "bulk_update_records_fk0";

-- DropForeignKey
ALTER TABLE "bulk_update_records" DROP CONSTRAINT "bulk_update_records_fk1";

-- DropTable
DROP TABLE "bulk_update_records";

-- CreateTable
CREATE TABLE "batch_update_records" (
    "id" SERIAL NOT NULL,
    "old_price" DOUBLE PRECISION NOT NULL,
    "new_price" DOUBLE PRECISION NOT NULL,
    "user_id" INTEGER NOT NULL,
    "canva_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "batch_update_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batch_update_status" (
    "id" SERIAL NOT NULL,
    "total_itens_update" INTEGER NOT NULL,
    "successes" INTEGER NOT NULL DEFAULT 0,
    "failures" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batch_update_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "batch_update_records" ADD CONSTRAINT "batch_update_records_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch_update_records" ADD CONSTRAINT "batch_update_records_fk1" FOREIGN KEY ("canva_id") REFERENCES "canvas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
