import { NextRequest, NextResponse } from "next/server"
import { BlockfrostProvider } from "@meshsdk/core";
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
    const universalStaticUtxo = {
      input: {
        outputIndex: 0,
        txHash: "5a1edf7da58eff2059030abd456947a96cb2d16b9d8c3822ffff58d167ed8bfc",
      },
      output: {
        address:
          "addr_test1qrsj3xj6q99m4g9tu9mm2lzzdafy04035eya7hjhpus55r204nlu6dmhgpruq7df228h9gpujt0mtnfcnkcaj3wj457q5zv6kz",
        amount: [{ unit: "lovelace", quantity: "5000000" }],
      },
    };
     
    const universalStaticChangeAddress =
      "addr_test1qrsj3xj6q99m4g9tu9mm2lzzdafy04035eya7hjhpus55r204nlu6dmhgpruq7df228h9gpujt0mtnfcnkcaj3wj457q5zv6kz";
      const provider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY_PREPROD!);
    

      // const options: EnableWeb3WalletOptions = {
      //   networkId:  0, // 0: preprod, 1: mainnet
      //   fetcher: provider,
      //   submitter: provider,
      //   projectId: process.env.NEXT_PUBLIC_UTXOS_PROJECT_ID, // https://utxos.dev/dashboard
      // };
   
      // // Enable the wallet
      // const wallet = await Web3Wallet.enable(options);
    const sdk = new Web3Sdk({
      projectId: process.env.NEXT_PUBLIC_UTXOS_PROJECT_ID!,
      apiKey: process.env.UTXOS_API_KEY!,
      network: "testnet",
      privateKey: process.env.UTXOS_PRIVATE_KEY!,
      submitter: provider,
      fetcher: provider,


    })

    const txBuilder = new MeshTxBuilder({
      fetcher: provider,
    })

    const forgingScript = ForgeScript.withOneSignature(receivingAddress)
    
    const ipfsHash = ipfsUrl.replace("https://gateway.pinata.cloud/ipfs/", "")
    console.log("IPFS Hash:", ipfsHash)
    
    const demoAssetMetadata = {
      name: fileName.substring(0, 16),
      image: ipfsHash.substring(0, 46),
      type: "video",
      desc: "ScrollVibe",
    }
    console.log("Metadata:", demoAssetMetadata)

    const policyId = resolveScriptHash(forgingScript)
    const tokenName = `ScrollVibe${Date.now()}`
    const tokenNameHex = stringToHex(tokenName)
    const metadata = { [policyId]: { [tokenName]: { ...demoAssetMetadata } } }

    console.log("Getting static info...")
    console.log("SDK object:", Object.keys(sdk))
    console.log("SDK sponsorship exists:", !!sdk.sponsorship)
    console.log("SDK sponsorship methods:", sdk.sponsorship ? Object.getOwnPropertyNames(Object.getPrototypeOf(sdk.sponsorship)) : "N/A")
    console.log("Environment variables check:")
    console.log("UTXOS_SPONSORSHIP_ID:", process.env.UTXOS_SPONSORSHIP_ID)
    console.log("NEXT_PUBLIC_UTXOS_PROJECT_ID:", process.env.NEXT_PUBLIC_UTXOS_PROJECT_ID)
    console.log("UTXOS_API_KEY:", process.env.UTXOS_API_KEY ? "SET" : "NOT SET")
    console.log("UTXOS_PRIVATE_KEY:", process.env.UTXOS_PRIVATE_KEY ? "SET" : "NOT SET")
    
    // Skip getStaticInfo for now and use hardcoded values
    console.log("Skipping getStaticInfo due to error, using hardcoded values")
    const staticInfo = {
      changeAddress: "addr_test1qrsj3xj6q99m4g9tu9mm2lzzdafy04035eya7hjhpus55r204nlu6dmhgpruq7df228h9gpujt0mtnfcnkcaj3wj457q5zv6kz",
      utxo: {
        input: {
          txHash: "5a1edf7da58eff2059030abd456947a96cb2d16b9d8c3822ffff58d167ed8bfc",
          outputIndex: 0
        },
        output: {
          address: "addr_test1qrsj3xj6q99m4g9tu9mm2lzzdafy04035eya7hjhpus55r204nlu6dmhgpruq7df228h9gpujt0mtnfcnkcaj3wj457q5zv6kz",
          amount: [{ unit: "lovelace", quantity: "5000000" }]
        }
      },
      collateral: {
        input: {
          txHash: "5a1edf7da58eff2059030abd456947a96cb2d16b9d8c3822ffff58d167ed8bfc",
          outputIndex: 1
        },
        output: {
          address: "addr_test1qrsj3xj6q99m4g9tu9mm2lzzdafy04035eya7hjhpus55r204nlu6dmhgpruq7df228h9gpujt0mtnfcnkcaj3wj457q5zv6kz",
          amount: [{ unit: "lovelace", quantity: "5000000" }]
        }
      }
    }
    console.log("Using hardcoded static info:", staticInfo)

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
    // console.log("Sponsoring transaction...")
    // const sponsorshipWallet = new MeshWallet({
    //   key: { type: "mnemonic", words:["stomach", "affair", "snake", "pig", "basket", "unfair", "action", "ship", "pupil", "green", "dismiss", "fat", "pitch", "message", "tobacco"]},
    //   networkId: 0,
    //   fetcher: provider,
    // });
    // const sponsorshipUtxos = await sponsorshipWallet.getUtxos();
    // console.log("Sponsorship Wallet UTXOs:", sponsorshipUtxos);
    
    
    console.log("Transaction sponsored successfully")

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