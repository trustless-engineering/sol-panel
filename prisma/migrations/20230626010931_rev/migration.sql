/*
  Warnings:

  - You are about to drop the `_ConsumerToStream` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProducerToStream` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ConsumerToStream" DROP CONSTRAINT "_ConsumerToStream_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConsumerToStream" DROP CONSTRAINT "_ConsumerToStream_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProducerToStream" DROP CONSTRAINT "_ProducerToStream_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProducerToStream" DROP CONSTRAINT "_ProducerToStream_B_fkey";

-- DropTable
DROP TABLE "_ConsumerToStream";

-- DropTable
DROP TABLE "_ProducerToStream";

-- CreateTable
CREATE TABLE "ProducerInstance" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "producerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "config" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProducerInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsumerInstance" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consumerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "config" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConsumerInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProducerInstanceToStream" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ConsumerInstanceToStream" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProducerInstanceToStream_AB_unique" ON "_ProducerInstanceToStream"("A", "B");

-- CreateIndex
CREATE INDEX "_ProducerInstanceToStream_B_index" ON "_ProducerInstanceToStream"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ConsumerInstanceToStream_AB_unique" ON "_ConsumerInstanceToStream"("A", "B");

-- CreateIndex
CREATE INDEX "_ConsumerInstanceToStream_B_index" ON "_ConsumerInstanceToStream"("B");

-- AddForeignKey
ALTER TABLE "ProducerInstance" ADD CONSTRAINT "ProducerInstance_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumerInstance" ADD CONSTRAINT "ConsumerInstance_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProducerInstanceToStream" ADD CONSTRAINT "_ProducerInstanceToStream_A_fkey" FOREIGN KEY ("A") REFERENCES "ProducerInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProducerInstanceToStream" ADD CONSTRAINT "_ProducerInstanceToStream_B_fkey" FOREIGN KEY ("B") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConsumerInstanceToStream" ADD CONSTRAINT "_ConsumerInstanceToStream_A_fkey" FOREIGN KEY ("A") REFERENCES "ConsumerInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConsumerInstanceToStream" ADD CONSTRAINT "_ConsumerInstanceToStream_B_fkey" FOREIGN KEY ("B") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
