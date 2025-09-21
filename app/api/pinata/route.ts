import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("Starting Pinata upload...")
    
    if (!process.env.PINATA_JWT) {
      console.error("PINATA_JWT environment variable not set")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    
    if (!file) {
      console.error("No file provided")
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    console.log(`Uploading file: ${file.name}, size: ${file.size} bytes`)
    
    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: formData,
    })

    console.log(`Pinata API response status: ${response.status}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Pinata API error: ${response.status} - ${errorText}`)
      return NextResponse.json(
        { error: `Upload failed: ${response.status}` },
        { status: response.status }
      )
    }

    const result = await response.json()
    const url = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    
    console.log(`Upload successful! IPFS Hash: ${result.IpfsHash}`)
    console.log(`IPFS URL: ${url}`)
    
    return NextResponse.json({ url, hash: result.IpfsHash })
  } catch (error) {
    console.error("Pinata upload error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    )
  }
}