/*
  Warnings:

  - Made the column `streamId` on table `Producer` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ProducerType" AS ENUM ('WEBHOOK', 'SCRIPT', 'CONTAINER');

-- DropForeignKey
ALTER TABLE "Producer" DROP CONSTRAINT "Producer_streamId_fkey";

-- AlterTable
ALTER TABLE "Producer" ALTER COLUMN "streamId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Producer" ADD CONSTRAINT "Producer_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
