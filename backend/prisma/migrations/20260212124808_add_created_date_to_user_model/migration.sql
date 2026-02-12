-- DropIndex
DROP INDEX "User_username_idx";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "User_username_createdAt_idx" ON "User"("username", "createdAt" DESC);
