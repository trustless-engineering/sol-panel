/*
  Warnings:

  - You are about to drop the column `pipelineId` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `producerId` on the `Stream` table. All the data in the column will be lost.
  - Added the required column `pluginId` to the `Pipeline` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_pipelineId_fkey";

-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_producerId_fkey";

-- AlterTable
ALTER TABLE "Pipeline" ADD COLUMN     "pluginId" TEXT NOT NULL,
ALTER COLUMN "config" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Plugin" ALTER COLUMN "config" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "pipelineId",
DROP COLUMN "producerId";

-- CreateTable
CREATE TABLE "Consumer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "config" JSONB,
    "pluginId" TEXT,

    CONSTRAINT "Consumer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProducerToStream" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ConsumerToStream" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PipelineToStream" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProducerToStream_AB_unique" ON "_ProducerToStream"("A", "B");

-- CreateIndex
CREATE INDEX "_ProducerToStream_B_index" ON "_ProducerToStream"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ConsumerToStream_AB_unique" ON "_ConsumerToStream"("A", "B");

-- CreateIndex
CREATE INDEX "_ConsumerToStream_B_index" ON "_ConsumerToStream"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PipelineToStream_AB_unique" ON "_PipelineToStream"("A", "B");

-- CreateIndex
CREATE INDEX "_PipelineToStream_B_index" ON "_PipelineToStream"("B");

-- AddForeignKey
ALTER TABLE "Consumer" ADD CONSTRAINT "Consumer_pluginId_fkey" FOREIGN KEY ("pluginId") REFERENCES "Plugin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_pluginId_fkey" FOREIGN KEY ("pluginId") REFERENCES "Plugin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProducerToStream" ADD CONSTRAINT "_ProducerToStream_A_fkey" FOREIGN KEY ("A") REFERENCES "Producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProducerToStream" ADD CONSTRAINT "_ProducerToStream_B_fkey" FOREIGN KEY ("B") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConsumerToStream" ADD CONSTRAINT "_ConsumerToStream_A_fkey" FOREIGN KEY ("A") REFERENCES "Consumer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConsumerToStream" ADD CONSTRAINT "_ConsumerToStream_B_fkey" FOREIGN KEY ("B") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PipelineToStream" ADD CONSTRAINT "_PipelineToStream_A_fkey" FOREIGN KEY ("A") REFERENCES "Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PipelineToStream" ADD CONSTRAINT "_PipelineToStream_B_fkey" FOREIGN KEY ("B") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
