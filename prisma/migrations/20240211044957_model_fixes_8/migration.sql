/*
  Warnings:

  - You are about to drop the column `pickedPairId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Ranking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_pickedPairId_fkey";

-- DropForeignKey
ALTER TABLE "Ranking" DROP CONSTRAINT "Ranking_projectId_fkey";

-- AlterTable
ALTER TABLE "PickedPair" ADD COLUMN     "projectPairIds" INTEGER[];

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "pickedPairId";

-- AlterTable
ALTER TABLE "Ranking" DROP COLUMN "projectId",
ADD COLUMN     "pickedPairId" INTEGER;

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_pickedPairId_fkey" FOREIGN KEY ("pickedPairId") REFERENCES "PickedPair"("id") ON DELETE SET NULL ON UPDATE CASCADE;
