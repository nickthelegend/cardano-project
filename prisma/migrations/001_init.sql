-- CreateTable
CREATE TABLE "reels" (
    "id" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "txnHash" TEXT NOT NULL,
    "ipfsCid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reels_pkey" PRIMARY KEY ("id")
);