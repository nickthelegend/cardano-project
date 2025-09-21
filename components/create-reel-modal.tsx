"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { Button } from "@/components/ui/button"
import { Upload, Video, Coins, X } from "lucide-react"
import { useWallet } from "@meshsdk/react"
import { BlockfrostProvider } from "@meshsdk/core";

const ModalOverlay = styled.div<{ $show: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  visibility: ${(props) => (props.$show ? "visible" : "hidden")};
  transition: all 0.3s ease;
`

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`

const UploadArea = styled.div<{ $isDragOver: boolean }>`
  border: 2px dashed ${({ theme, $isDragOver }) => $isDragOver ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  background: ${({ $isDragOver }) => $isDragOver ? "rgba(99, 219, 154, 0.1)" : "rgba(0, 0, 0, 0.2)"};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: all 0.2s ease;
  cursor: pointer;
`

const UploadIcon = styled.div`
  font-size: 2rem;
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
  max-height: 300px;
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
  font-size: 0.8rem;
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
  font-size: 0.8rem;
  color: #ffd700;
  word-break: break-all;
`

interface CreateReelModalProps {
  show: boolean
  onClose: () => void
}

export function CreateReelModal({ show, onClose }: CreateReelModalProps) {
  const { connected, name, wallet, connect, address } = useWallet()
  const [connectionAttempted, setConnectionAttempted] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [ipfsUrl, setIpfsUrl] = useState<string>("") 
  const [txHash, setTxHash] = useState<string>("")

  useEffect(() => {
    if (!connected && !connectionAttempted) {
      setConnectionAttempted(true)
      connect("utxos").catch((err) => {
        console.error("Failed to connect wallet:", err)
      })
    }
  }, [connected, connect, connectionAttempted])

  // useEffect(() => {
  //   if (connected && wallet) {
  //     wallet.getAddress().then((addr) => {
  //       setAddress(addr)
  //     }).catch((err) => {
  //       console.error("Failed to get wallet address:", err)
  //     })
  //   }
  // }, [connected, wallet])

  const user = {
    username: name ? `User_${String(name).slice(0, 8)}` : "Wallet User",
    walletAddress: address || "",
  }

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith("video/")) {
      setSelectedFile(file)
      setIpfsUrl("")
      setTxHash("")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const uploadAndMint = async () => {
    if (!selectedFile || !connected) return

    setIsProcessing(true)
    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const uploadResponse = await fetch("/api/pinata", {
        method: "POST",
        body: formData,
      })

      const uploadResult = await uploadResponse.json()
      
      if (uploadResult.error) {
        throw new Error(uploadResult.error)
      }
      
      setIpfsUrl(uploadResult.url)

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

      const mintResult = await mintResponse.json()
      
      if (mintResult.error) {
        throw new Error(mintResult.error)
      }

      // Step 3: Sign and submit transaction
      console.log("Step 3: Signing transaction...")
      if (mintResult.sponsoredTx?.success && mintResult.sponsoredTx?.data && wallet) {
        try {
          const txHex = mintResult.sponsoredTx.data
          const signedTx = await wallet.signTx(txHex,true)
          const provider = new BlockfrostProvider("preprodFzYIfO6BdUE1PvHWIiekgYE1ixMa9XF9");

          // Submit the signed transaction
          const submittedTxHash = await provider.submitTx(signedTx)
          setTxHash(submittedTxHash)
          console.log("NFT Minted! Transaction Hash:", submittedTxHash)
        } catch (signError) {
          console.error("Failed to sign transaction:", signError)
          // setTxHash("Transaction signing failed: " + signError)
        }
      } else {
        setTxHash("Transaction prepared - wallet signing not available")
      }
    } catch (error) {
      console.error("Upload and mint failed:", error)
      // setTxHash("Transaction failed: " + error.message)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <ModalOverlay $show={show} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>

        <Title>Create New Reel</Title>
        
        {connected ? (
          <div style={{ marginBottom: "1rem", padding: "1rem", background: "rgba(99, 219, 154, 0.1)", borderRadius: "8px" }}>
            <p>Connected: {name}</p>
            <p>Address: {address.slice(0, 20)}...</p>
          </div>
        ) : (
          <p style={{ marginBottom: "1rem", padding: "1rem", background: "rgba(255, 255, 255, 0.1)", borderRadius: "8px" }}>Connecting...</p>
        )}
        
        <UploadArea
          $isDragOver={isDragOver}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("modal-file-input")?.click()}
        >
          <UploadIcon>
            {selectedFile ? <Video size={32} /> : <Upload size={32} />}
          </UploadIcon>
          <UploadText>
            {selectedFile ? selectedFile.name : "Drop video here or click to select"}
          </UploadText>
          <FileInput
            id="modal-file-input"
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
      </ModalContent>
    </ModalOverlay>
  )
}