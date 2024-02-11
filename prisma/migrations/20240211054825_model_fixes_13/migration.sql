/*
  Warnings:

  - You are about to drop the column `userId` on the `PickedPair` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PickedPair" DROP CONSTRAINT "PickedPair_userId_fkey";

-- DropIndex
DROP INDEX "PickedPair_id_idx";

-- AlterTable
ALTER TABLE "PickedPair" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pickedPairId" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Vote_id_pickedPairId_idx" ON "Vote"("id", "pickedPairId");

-- CreateIndex
CREATE INDEX "PickedPair_id_projectPairIds_idx" ON "PickedPair"("id", "projectPairIds");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_pickedPairId_fkey" FOREIGN KEY ("pickedPairId") REFERENCES "PickedPair"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
