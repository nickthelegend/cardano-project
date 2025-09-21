"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { Button } from "@/components/ui/button"
import { Upload, Video, Coins } from "lucide-react"
import { useWallet } from "@meshsdk/react"
import { AppShell } from "@/components/app-shell"


const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`

const UploadArea = styled.div<{ $isDragOver: boolean }>`
  border: 2px dashed ${({ theme, $isDragOver }) => $isDragOver ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  background: ${({ $isDragOver }) => $isDragOver ? "rgba(99, 219, 154, 0.1)" : "rgba(0, 0, 0, 0.2)"};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: all 0.2s ease;
`

const UploadIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
`

const UploadText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const FileInput = styled.input`
  display: none;
`

const VideoPreview = styled.video`
  width: 100%;
  max-height: 400px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const ResultSection = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const IpfsUrl = styled.div`
  background: rgba(99, 219, 154, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  font-family: monospace;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  word-break: break-all;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const TxHash = styled.div`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid #ffd700;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  font-family: monospace;
  font-size: 0.9rem;
  color: #ffd700;
  word-break: break-all;
`

export default function CreateReelPage() {
  const { connected, name, wallet, connect } = useWallet()
  const [address, setAddress] = useState<string>("")
  const [connectionAttempted, setConnectionAttempted] = useState(false)

  useEffect(() => {
    // Only attempt connection once when component mounts
    if (!connected && !connectionAttempted) {
      setConnectionAttempted(true)
      connect("utxos").catch((err) => {
        console.error("Failed to connect wallet:", err)
        console.error("Make sure UTXOS wallet is installed and available")
      })
    }
  }, [connected, connect, connectionAttempted])

  useEffect(() => {
    // If connected, retrieve the wallet address
    if (connected && wallet) {
      wallet.getAddress().then((addr) => {
        setAddress(addr)
      }).catch((err) => {
        console.error("Failed to get wallet address:", err)
      })
    }
  }, [connected, wallet])

  console.log("CreateReelPage - Connected:", connected)
  console.log("CreateReelPage - Name:", name)
  console.log("CreateReelPage - Wallet:", wallet)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const user = {
    username: name ? `User_${String(name).slice(0, 8)}` : "Wallet User",
    walletAddress: address || "",
  }
  
  // console.log("CreateReelPage - User:", user)
  // console.log("CreateReelPage - Wallet:", wallet)
  // console.log("CreateReelPage - Wallet type:", typeof wallet)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [ipfsUrl, setIpfsUrl] = useState<string>("") 
  const [txHash, setTxHash] = useState<string>("")

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith("video/")) {
      setSelectedFile(file)
      setIpfsUrl("")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const uploadAndMint = async () => {
    console.log("Starting upload and mint process...")
    console.log("Selected file:", selectedFile?.name, selectedFile?.size)
    console.log("User:", user?.walletAddress)
    console.log("Wallet:", wallet)
    console.log("Wallet exists:", !!wallet)
    console.log("Wallet type:", typeof wallet)
    
    if (!selectedFile || !connected) {
      console.error("Missing requirements:", { selectedFile: !!selectedFile, connected })
      return
    }

    setIsProcessing(true)
    try {
      // Step 1: Upload to IPFS
      console.log("Step 1: Uploading to IPFS...")
      const formData = new FormData()
      formData.append("file", selectedFile)

      const uploadResponse = await fetch("/api/pinata", {
        method: "POST",
        body: formData,
      })

      console.log("Upload response status:", uploadResponse.status)
      const uploadResult = await uploadResponse.json()
      console.log("Upload result:", uploadResult)
      
      if (uploadResult.error) {
        throw new Error(uploadResult.error)
      }
      
      setIpfsUrl(uploadResult.url)
      console.log("IPFS URL set:", uploadResult.url)

      // Step 2: Mint NFT with IPFS URL
      console.log("Step 2: Minting NFT...")
      const mintResponse = await fetch("/api/mint-nft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receivingAddress: user?.walletAddress || address,
          ipfsUrl: uploadResult.url,
          fileName: selectedFile?.name || "Reel Video",
        }),
      })

      console.log("Mint response status:", mintResponse.status)
      const mintResult = await mintResponse.json()
      console.log("Mint result:", mintResult)
      
      if (mintResult.error) {
        throw new Error(mintResult.error)
      }

      console.log("Signing transaction...")
      // For now, just log the sponsored transaction since wallet instance is not available
      console.log("Sponsored transaction:", mintResult.sponsoredTx)
      setTxHash("Transaction prepared - wallet signing not implemented yet")
      
      // setTxHash(submittedTxHash)
      // console.log("NFT Minted! Transaction Hash:", submittedTxHash)
    } catch (error) {
      console.error("Upload and mint failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <AppShell>
      <Container>
      <Title>Create New Reel</Title>
      
      {connected ? (
        <div style={{ marginBottom: "1rem", padding: "1rem", background: "rgba(99, 219, 154, 0.1)", borderRadius: "8px" }}>
          <p>Connected Wallet: {name}</p>
          <p>Wallet Address: {address}</p>
        </div>
      ) : (
        <p style={{ marginBottom: "1rem", padding: "1rem", background: "rgba(255, 255, 255, 0.1)", borderRadius: "8px" }}>Connecting to wallet...</p>
      )}
      
      <UploadArea
        $isDragOver={isDragOver}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <UploadIcon>
          {selectedFile ? <Video size={48} /> : <Upload size={48} />}
        </UploadIcon>
        <UploadText>
          {selectedFile ? selectedFile.name : "Drop video here or click to select"}
        </UploadText>
        <FileInput
          id="file-input"
          type="file"
          accept="video/*"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
        />
      </UploadArea>

      {selectedFile && (
        <VideoPreview controls key={selectedFile.name}>
          <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
          Your browser does not support the video tag.
        </VideoPreview>
      )}

      {selectedFile && (
        <Button 
          onClick={uploadAndMint} 
          disabled={isProcessing}
          className="w-full"
        >
          <Coins className="mr-2" size={16} />
          {isProcessing ? "Uploading & Minting..." : "Upload & Mint NFT"}
        </Button>
      )}

      {(ipfsUrl || txHash) && (
        <ResultSection>
          {ipfsUrl && (
            <div>
              <h3 style={{ marginBottom: "16px", color: "#ffffff" }}>Upload Successful!</h3>
              <IpfsUrl>{ipfsUrl}</IpfsUrl>
            </div>
          )}
          
          {txHash && (
            <div>
              <h4 style={{ marginBottom: "8px", color: "#ffd700" }}>NFT Minted Successfully!</h4>
              <TxHash>{txHash}</TxHash>
            </div>
          )}
        </ResultSection>
      )}
      </Container>
    </AppShell>
  )
}