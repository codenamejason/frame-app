/*
  Warnings:

  - You are about to drop the column `progress` on the `Project` table. All the data in the column will be lost.
  - The `status` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id,email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('COLLECTION', 'INDIVIDUAL');

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "progress",
DROP COLUMN "status",
ADD COLUMN     "status" "Status",
ALTER COLUMN "hasRanking" SET DEFAULT false,
DROP COLUMN "type",
ADD COLUMN     "type" "Type" DEFAULT 'INDIVIDUAL';

-- CreateIndex
CREATE INDEX "PickedPair_id_idx" ON "PickedPair"("id");

-- CreateIndex
CREATE INDEX "Project_id_idx" ON "Project"("id");

-- CreateIndex
CREATE INDEX "Ranking_id_idx" ON "Ranking"("id");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_email_key" ON "User"("id", "email");
