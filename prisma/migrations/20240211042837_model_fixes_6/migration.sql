/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `PickedPair` table. All the data in the column will be lost.
  - The `userId` column on the `PickedPair` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `projectId` column on the `Ranking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[address,id]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,email,address]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pickedAt` to the `PickedPair` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PickedPair" DROP CONSTRAINT "PickedPair_userId_fkey";

-- DropForeignKey
ALTER TABLE "Ranking" DROP CONSTRAINT "Ranking_projectId_fkey";

-- DropIndex
DROP INDEX "Project_id_idx";

-- DropIndex
DROP INDEX "User_id_email_key";

-- DropIndex
DROP INDEX "User_id_idx";

-- AlterTable
CREATE SEQUENCE pickedpair_id_seq;
ALTER TABLE "PickedPair" DROP COLUMN "updatedAt",
ADD COLUMN     "pickedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('pickedpair_id_seq'),
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER;
ALTER SEQUENCE pickedpair_id_seq OWNED BY "PickedPair"."id";

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
ADD COLUMN     "address" TEXT DEFAULT 'The project has not connected an address yet.',
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "description" SET DEFAULT 'No description has been provided yet.',
ALTER COLUMN "status" SET DEFAULT 'ACTIVE',
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AlterTable
CREATE SEQUENCE ranking_id_seq;
ALTER TABLE "Ranking" ALTER COLUMN "id" SET DEFAULT nextval('ranking_id_seq'),
DROP COLUMN "projectId",
ADD COLUMN     "projectId" INTEGER;
ALTER SEQUENCE ranking_id_seq OWNED BY "Ranking"."id";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "address" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Project_id_address_idx" ON "Project"("id", "address");

-- CreateIndex
CREATE UNIQUE INDEX "Project_address_id_key" ON "Project"("address", "id");

-- CreateIndex
CREATE INDEX "User_id_address_idx" ON "User"("id", "address");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_email_address_key" ON "User"("id", "email", "address");

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickedPair" ADD CONSTRAINT "PickedPair_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
