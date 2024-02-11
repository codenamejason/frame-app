/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PickedPair` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Ranking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PickedPair" DROP COLUMN "createdAt",
ALTER COLUMN "pickedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "parentId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Ranking" DROP COLUMN "updatedAt";
