"use client"

import { useState } from "react"
import styled from "styled-components"
import { Button } from "@/components/ui/button"
import { Upload, Video } from "lucide-react"

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
`

export default function CreateReelPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [ipfsUrl, setIpfsUrl] = useState<string>("")

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

  const uploadToPinata = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch("/api/pinata", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      
      if (result.error) {
        throw new Error(result.error)
      }
      
      setIpfsUrl(result.url)
      console.log("IPFS URL:", result.url)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Container>
      <Title>Create New Reel</Title>
      
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
        <VideoPreview controls>
          <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
        </VideoPreview>
      )}

      {selectedFile && (
        <Button 
          onClick={uploadToPinata} 
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? "Uploading..." : "Upload to IPFS"}
        </Button>
      )}

      {ipfsUrl && (
        <ResultSection>
          <h3 style={{ marginBottom: "16px", color: "#ffffff" }}>Upload Successful!</h3>
          <IpfsUrl>{ipfsUrl}</IpfsUrl>
        </ResultSection>
      )}
    </Container>
  )
}