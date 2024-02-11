/*
  Warnings:

  - You are about to drop the column `rankingId` on the `Project` table. All the data in the column will be lost.
  - Added the required column `rankGiven` to the `Ranking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_rankingId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "rankingId";

-- AlterTable
ALTER TABLE "Ranking" ADD COLUMN     "projectId" INTEGER,
ADD COLUMN     "rankGiven" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
