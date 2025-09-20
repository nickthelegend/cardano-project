"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface WalletContextType {
  lucid: any | null;
  walletAddress: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [lucid, setLucid] = useState<any | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const connect = async () => {
    if (!isClient) return;
    
    try {
      if (!window.cardano?.eternl) {
        throw new Error('Eternl wallet not found. Please install Eternl wallet extension.');
      }

      console.log('Connecting to Eternl wallet...');
      const walletApi = await window.cardano.eternl.enable();
      
      if (!walletApi) {
        throw new Error('Failed to enable Eternl wallet. Please try again.');
      }

      // Dynamic import to avoid SSR issues
      const { Lucid, Blockfrost } = await import('lucid-cardano');
      
      const lucidInstance = await Lucid.new(
        new Blockfrost('https://cardano-preprod.blockfrost.io/api/v0', process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY),
        'Preprod'
      );
      
      lucidInstance.selectWallet(walletApi);
      
      const address = await lucidInstance.wallet.address();
      
      setLucid(lucidInstance);
      setWalletAddress(address);
      setIsConnected(true);

    } catch (error) {
      console.error('Failed to connect Eternl wallet:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Could not connect to Eternl wallet'}`);
    }
  };

  const disconnect = () => {
    setLucid(null);
    setWalletAddress(null);
    setIsConnected(false);
  };

  const value = { lucid, walletAddress, isConnected, connect, disconnect };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};