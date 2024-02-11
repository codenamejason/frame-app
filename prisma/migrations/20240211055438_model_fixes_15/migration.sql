/*
  Warnings:

  - The primary key for the `Metadata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Metadata` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `metadataId` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_metadataId_fkey";

-- AlterTable
ALTER TABLE "Metadata" DROP CONSTRAINT "Metadata_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "metadataId",
ADD COLUMN     "metadataId" INTEGER;

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "Metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;
