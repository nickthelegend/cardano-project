const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testConnection() {
  try {
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    // Try to create the table if it doesn't exist
    await prisma.$executeRaw`
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
    `
    console.log('✅ Reels table created successfully')
    
    // Test inserting a record
    const testReel = await prisma.reel.create({
      data: {
        uploadedBy: 'test_address',
        tokenId: 'test_token_123',
        txnHash: 'test_hash_456',
        ipfsCid: 'test_cid_789'
      }
    })
    console.log('✅ Test record created:', testReel.id)
    
    // Clean up test record
    await prisma.reel.delete({
      where: { id: testReel.id }
    })
    console.log('✅ Test record cleaned up')
    
  } catch (error) {
    console.error('❌ Database error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()