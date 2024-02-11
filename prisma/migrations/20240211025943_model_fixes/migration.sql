/*
  Warnings:

  - You are about to drop the column `pairsId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Pair` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PickedPiars` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pair" DROP CONSTRAINT "Pair_pickedPiarsId_fkey";

-- DropForeignKey
ALTER TABLE "PickedPiars" DROP CONSTRAINT "PickedPiars_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_pairsId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "pairsId",
ADD COLUMN     "pickedPairId" INTEGER;

-- DropTable
DROP TABLE "Pair";

-- DropTable
DROP TABLE "PickedPiars";

-- CreateTable
CREATE TABLE "PickedPair" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "PickedPair_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_pickedPairId_fkey" FOREIGN KEY ("pickedPairId") REFERENCES "PickedPair"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickedPair" ADD CONSTRAINT "PickedPair_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
