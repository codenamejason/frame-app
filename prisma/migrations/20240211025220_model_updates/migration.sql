-- DropForeignKey
ALTER TABLE "Pair" DROP CONSTRAINT "Pair_userId_fkey";

-- AlterTable
ALTER TABLE "Pair" ADD COLUMN     "pickedAt" TIMESTAMP(3),
ADD COLUMN     "pickedPiarsId" INTEGER;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "metadataId" INTEGER;

-- CreateTable
CREATE TABLE "Metadata" (
    "id" INTEGER NOT NULL,
    "protocol" INTEGER NOT NULL,
    "pointer" TEXT NOT NULL,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PickedPiars" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "PickedPiars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "Metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pair" ADD CONSTRAINT "Pair_pickedPiarsId_fkey" FOREIGN KEY ("pickedPiarsId") REFERENCES "PickedPiars"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickedPiars" ADD CONSTRAINT "PickedPiars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
