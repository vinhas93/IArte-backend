/*
  Warnings:

  - You are about to drop the column `quantity` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the `updated_canvas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "updated_canvas" DROP CONSTRAINT "updateCanva_fk0";

-- DropForeignKey
ALTER TABLE "updated_canvas" DROP CONSTRAINT "updateCanva_fk1";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "quantity",
ADD COLUMN     "volume_of_products" INTEGER;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "quantity" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "recoverPasswordToken" TEXT;

-- DropTable
DROP TABLE "updated_canvas";

-- CreateTable
CREATE TABLE "bulk_update_records" (
    "id" SERIAL NOT NULL,
    "old_price" DOUBLE PRECISION NOT NULL,
    "new_price" DOUBLE PRECISION NOT NULL,
    "user_id" INTEGER NOT NULL,
    "canva_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bulk_update_records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bulk_update_records" ADD CONSTRAINT "bulk_update_records_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bulk_update_records" ADD CONSTRAINT "bulk_update_records_fk1" FOREIGN KEY ("canva_id") REFERENCES "canvas"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
