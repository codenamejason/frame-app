/*
  Warnings:

  - You are about to drop the column `parentId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `pickedPairId` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "parentId",
DROP COLUMN "pickedPairId";
