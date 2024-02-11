-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('COLLECTION', 'INDIVIDUAL');

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ranking" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rankGiven" INTEGER NOT NULL,
    "pickedPairId" INTEGER,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metadata" (
    "protocol" INTEGER NOT NULL,
    "pointer" TEXT NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "name" TEXT NOT NULL,
    "description" TEXT DEFAULT 'No description has been provided yet.',
    "status" "Status" DEFAULT 'ACTIVE',
    "type" "Type" DEFAULT 'INDIVIDUAL',
    "address" TEXT,
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadataId" INTEGER,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pickedPairId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "pickedId" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PickedPair" (
    "id" SERIAL NOT NULL,
    "pickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectPairIds" INTEGER[],

    CONSTRAINT "PickedPair_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_id_address_idx" ON "User"("id", "address");

-- CreateIndex
CREATE INDEX "Ranking_id_idx" ON "Ranking"("id");

-- CreateIndex
CREATE INDEX "Project_id_address_idx" ON "Project"("id", "address");

-- CreateIndex
CREATE INDEX "Vote_id_pickedPairId_idx" ON "Vote"("id", "pickedPairId");

-- CreateIndex
CREATE INDEX "PickedPair_id_projectPairIds_idx" ON "PickedPair"("id", "projectPairIds");

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_pickedPairId_fkey" FOREIGN KEY ("pickedPairId") REFERENCES "PickedPair"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "Metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;
