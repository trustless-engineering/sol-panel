-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "instanceConfigTemplate" JSONB;

-- AlterTable
ALTER TABLE "Producer" ADD COLUMN     "instanceConfigTemplate" JSONB;
