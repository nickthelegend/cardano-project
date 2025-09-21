import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { uploadedBy, tokenId, txnHash, ipfsCid } = await request.json()

    if (!uploadedBy || !tokenId || !txnHash || !ipfsCid) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const reel = await prisma.reel.create({
      data: {
        uploadedBy,
        tokenId,
        txnHash,
        ipfsCid,
      },
    })

    return NextResponse.json({ success: true, reel })
  } catch (error) {
    console.error('Failed to create reel:', error)
    return NextResponse.json(
      { error: 'Failed to create reel' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const reels = await prisma.reel.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ reels })
  } catch (error) {
    console.error('Failed to fetch reels:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reels' },
      { status: 500 }
    )
  }
}