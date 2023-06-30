/*
  Warnings:

  - Added the required column `type` to the `Consumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ConsumerProvider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Producer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ProducerProvider` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ConsumerType" AS ENUM ('WEBHOOK', 'SCRIPT', 'CONTAINER');

-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "type" "ConsumerType" NOT NULL;

-- AlterTable
ALTER TABLE "ConsumerProvider" ADD COLUMN     "type" "ConsumerType" NOT NULL;

-- AlterTable
ALTER TABLE "Producer" ADD COLUMN     "type" "ProducerType" NOT NULL;

-- AlterTable
ALTER TABLE "ProducerProvider" ADD COLUMN     "type" "ProducerType" NOT NULL;
