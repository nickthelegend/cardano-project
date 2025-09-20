import { NextRequest, NextResponse } from "next/server"
import { BlockfrostProvider } from "@meshsdk/provider"
import { Web3Sdk } from "@meshsdk/web3-sdk"
import { MeshTxBuilder, ForgeScript, resolveScriptHash, stringToHex } from "@meshsdk/core"

export async function POST(request: NextRequest) {
  try {
    const { receivingAddress, ipfsUrl, fileName } = await request.json()

    if (!receivingAddress || !ipfsUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const provider = new BlockfrostProvider(`/api/blockfrost/preprod/`)
    
    const sdk = new Web3Sdk({
      projectId: process.env.NEXT_PUBLIC_UTXOS_PROJECT_ID!,
      apiKey: process.env.UTXOS_API_KEY!,
      network: "testnet",
      privateKey: process.env.UTXOS_PRIVATE_KEY!,
      fetcher: provider,
      submitter: provider,
    })

    const txBuilder = new MeshTxBuilder({
      fetcher: provider,
    })

    const forgingScript = ForgeScript.withOneSignature(receivingAddress)
    
    const demoAssetMetadata = {
      name: fileName,
      image: ipfsUrl,
      mediaType: "video/mp4",
      description: "ScrollVibe Reel NFT - Minted via ScrollVibe platform",
    }

    const policyId = resolveScriptHash(forgingScript)
    const tokenName = `ScrollVibe${Date.now()}`
    const tokenNameHex = stringToHex(tokenName)
    const metadata = { [policyId]: { [tokenName]: { ...demoAssetMetadata } } }

    const staticInfo = sdk.sponsorship.getStaticInfo()

    txBuilder
      .mint("1", policyId, tokenNameHex)
      .mintingScript(forgingScript)
      .metadataValue(721, metadata)
      .txOut(receivingAddress, [{ unit: policyId + tokenNameHex, quantity: "1" }])
      .changeAddress(staticInfo.changeAddress)
      .txIn(
        staticInfo.utxo.input.txHash,
        staticInfo.utxo.input.outputIndex,
        staticInfo.utxo.output.amount,
        staticInfo.utxo.output.address,
        0,
      )
      .txInCollateral(
        staticInfo.collateral.input.txHash,
        staticInfo.collateral.input.outputIndex,
        staticInfo.collateral.output.amount,
        staticInfo.collateral.output.address,
      )

    const unsignedTx = await txBuilder.complete()

    const sponsoredTx = await sdk.sponsorship.sponsorTx({
      sponsorshipId: process.env.UTXOS_SPONSORSHIP_ID!,
      tx: unsignedTx,
    })

    console.log("NFT transaction prepared successfully")
    
    return NextResponse.json({ 
      sponsoredTx,
      policyId,
      tokenName,
      metadata 
    })
  } catch (error) {
    console.error("Mint NFT error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Minting failed" },
      { status: 500 }
    )
  }
}