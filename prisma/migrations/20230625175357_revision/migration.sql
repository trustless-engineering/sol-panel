/*
  Warnings:

  - You are about to drop the column `averageEventSize` on the `Producer` table. All the data in the column will be lost.
  - You are about to drop the column `eventsPerSecond` on the `Producer` table. All the data in the column will be lost.
  - You are about to drop the column `maxEvents` on the `Stream` table. All the data in the column will be lost.
  - Made the column `pluginId` on table `Consumer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Consumer" DROP CONSTRAINT "Consumer_pluginId_fkey";

-- AlterTable
ALTER TABLE "Consumer" ALTER COLUMN "pluginId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Producer" DROP COLUMN "averageEventSize",
DROP COLUMN "eventsPerSecond",
ADD COLUMN     "config" JSONB;

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "maxEvents";

-- AddForeignKey
ALTER TABLE "Consumer" ADD CONSTRAINT "Consumer_pluginId_fkey" FOREIGN KEY ("pluginId") REFERENCES "Plugin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
