-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Owner', 'Manager', 'SalesPerson', 'Customer');

-- CreateTable
CREATE TABLE "canvas" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "genre" TEXT,
    "description" VARCHAR(300),
    "in_stock" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "category_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "canvas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER,
    "price_sum" DOUBLE PRECISION,
    "final_price" DOUBLE PRECISION NOT NULL,
    "total_discount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "costumer_id" INTEGER NOT NULL,
    "voucher_id" INTEGER,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(300),
    "cost" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "password" VARCHAR(15) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "wallet" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guidelines" (
    "id" SERIAL NOT NULL,
    "about_us" VARCHAR(500) NOT NULL,
    "privacy_policy" VARCHAR(500),
    "refund_policy" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guidelines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "erased" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "canva_id" INTEGER,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "updated_canvas" (
    "id" SERIAL NOT NULL,
    "old_price" DOUBLE PRECISION NOT NULL,
    "new_price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "canva_id" INTEGER NOT NULL,

    CONSTRAINT "updated_canvas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "image" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'SalesPerson',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vouchers" (
    "id" SERIAL NOT NULL,
    "discount_rate" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "start_date" DATE,
    "max_quantity" INTEGER,
    "interval" INTEGER NOT NULL,
    "end_date" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vouchers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "canvas" ADD CONSTRAINT "canvas_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "categories"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_costumer_id_fkey" FOREIGN KEY ("costumer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_voucher_id_fkey" FOREIGN KEY ("voucher_id") REFERENCES "vouchers"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_canva_id_fkey" FOREIGN KEY ("canva_id") REFERENCES "canvas"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "updated_canvas" ADD CONSTRAINT "updateCanva_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "updated_canvas" ADD CONSTRAINT "updateCanva_fk1" FOREIGN KEY ("canva_id") REFERENCES "canvas"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
