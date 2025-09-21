-- Create reels table manually
CREATE TABLE IF NOT EXISTS "reels" (
    "id" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "txnHash" TEXT NOT NULL,
    "ipfsCid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "reels_pkey" PRIMARY KEY ("id")
);

-- Create an index on uploadedBy for faster queries
CREATE INDEX IF NOT EXISTS "reels_uploadedBy_idx" ON "reels"("uploadedBy");

-- Create an index on createdAt for ordering
CREATE INDEX IF NOT EXISTS "reels_createdAt_idx" ON "reels"("createdAt");