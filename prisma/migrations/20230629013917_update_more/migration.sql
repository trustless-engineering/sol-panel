/*
  Warnings:

  - You are about to drop the column `instanceConfigTemplate` on the `Consumer` table. All the data in the column will be lost.
  - You are about to drop the column `pluginId` on the `Consumer` table. All the data in the column will be lost.
  - You are about to drop the column `instanceConfigTemplate` on the `Producer` table. All the data in the column will be lost.
  - You are about to drop the column `pluginId` on the `Producer` table. All the data in the column will be lost.
  - You are about to drop the `ConsumerInstance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProducerInstance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ConsumerInstanceToStream` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProducerInstanceToStream` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `providerId` to the `Producer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Consumer" DROP CONSTRAINT "Consumer_pluginId_fkey";

-- DropForeignKey
ALTER TABLE "ConsumerInstance" DROP CONSTRAINT "ConsumerInstance_consumerId_fkey";

-- DropForeignKey
ALTER TABLE "Pipeline" DROP CONSTRAINT "Pipeline_pluginId_fkey";

-- DropForeignKey
ALTER TABLE "Producer" DROP CONSTRAINT "Producer_pluginId_fkey";

-- DropForeignKey
ALTER TABLE "ProducerInstance" DROP CONSTRAINT "ProducerInstance_producerId_fkey";

-- DropForeignKey
ALTER TABLE "_ConsumerInstanceToStream" DROP CONSTRAINT "_ConsumerInstanceToStream_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConsumerInstanceToStream" DROP CONSTRAINT "_ConsumerInstanceToStream_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProducerInstanceToStream" DROP CONSTRAINT "_ProducerInstanceToStream_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProducerInstanceToStream" DROP CONSTRAINT "_ProducerInstanceToStream_B_fkey";

-- AlterTable
ALTER TABLE "Consumer" DROP COLUMN "instanceConfigTemplate",
DROP COLUMN "pluginId",
ADD COLUMN     "providerId" TEXT,
ADD COLUMN     "streamId" TEXT;

-- AlterTable
ALTER TABLE "Producer" DROP COLUMN "instanceConfigTemplate",
DROP COLUMN "pluginId",
ADD COLUMN     "providerId" TEXT NOT NULL,
ADD COLUMN     "streamId" TEXT;

-- DropTable
DROP TABLE "ConsumerInstance";

-- DropTable
DROP TABLE "ProducerInstance";

-- DropTable
DROP TABLE "_ConsumerInstanceToStream";

-- DropTable
DROP TABLE "_ProducerInstanceToStream";

-- CreateTable
CREATE TABLE "ProducerProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "config" JSONB,
    "configTemplate" JSONB,
    "pluginId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProducerProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsumerProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "config" JSONB,
    "pluginId" TEXT NOT NULL,
    "configTemplate" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConsumerProvider_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Producer" ADD CONSTRAINT "Producer_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "ProducerProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producer" ADD CONSTRAINT "Producer_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProducerProvider" ADD CONSTRAINT "ProducerProvider_pluginId_fkey" FOREIGN KEY ("pluginId") REFERENCES "Plugin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumer" ADD CONSTRAINT "Consumer_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "ConsumerProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumer" ADD CONSTRAINT "Consumer_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumerProvider" ADD CONSTRAINT "ConsumerProvider_pluginId_fkey" FOREIGN KEY ("pluginId") REFERENCES "Plugin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
