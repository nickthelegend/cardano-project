"use client";

import { useState } from 'react';
import { useDonationModal } from '@/hooks/use-donation-modal';
import { useWallet } from '@/hooks/use-wallet';
import { sendAdaDonation } from '@/lib/cardano';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/components/ui/use-toast";
import { Gift, PartyPopper, ExternalLink } from 'lucide-react';

const PRESET_AMOUNTS = [5, 15, 50];

export const DonationModal = () => {
  const { isOpen, close } = useDonationModal();
  const { lucid, isConnected } = useWallet();
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<string>('15');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>('');
  const { toast } = useToast();

  const handleAmountSelect = (value: string) => {
    setSelectedAmount(value);
    setCustomAmount(value);
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(value);
  };

  const handleDonate = async () => {
    if (!isConnected || !lucid) {
      toast({
        variant: "destructive",
        title: "Wallet Not Connected",
        description: "Please connect your wallet to make a donation.",
      });
      return;
    }

    const amount = parseFloat(selectedAmount);
    console.log('Donation amount:', amount, 'selectedAmount:', selectedAmount);
    
    if (!amount || amount <= 0 || isNaN(amount)) {
      toast({ variant: "destructive", title: "Please enter a valid amount." });
      return;
    }

    setIsLoading(true);
    try {
      const hash = await sendAdaDonation(lucid, amount);
      setTxHash(hash);
      setIsSuccess(true);
    } catch (error) {
      console.error('Donation error:', error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        variant: "destructive",
        title: "Donation Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setTxHash('');
    setSelectedAmount('15');
    setCustomAmount('15');
    close();
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-gray-950 border border-gray-800 text-white rounded-2xl p-8">
          <div className="text-center py-8">
            <PartyPopper className="w-20 h-20 text-green-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-extrabold mb-4">Thank You!</h2>
            <p className="text-gray-400 mb-6">Your generous contribution of {selectedAmount} ADA has been successfully processed.</p>
            <div className="bg-white/5 border border-gray-700/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400 mb-2">Transaction Hash:</p>
              <a 
                href={`https://preprod.cardanoscan.io/transaction/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline flex items-center justify-center gap-2 font-mono text-sm"
              >
                {txHash.substring(0, 16)}...{txHash.substring(-8)}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <Button onClick={handleClose} variant="outline" className="w-full">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gray-950 border border-gray-800 text-white rounded-2xl p-8">
        <div className="flex flex-col gap-y-4">
          <Gift className="w-12 h-12 text-purple-400" />
          <DialogTitle className="text-3xl font-extrabold text-white">Support the Vision</DialogTitle>
          <DialogDescription className="text-base text-gray-400">
            Your contribution fuels our mission to build a decentralized future.
          </DialogDescription>
        </div>
        
        <div className="flex flex-col gap-y-6 mt-8">
          <h3 className="text-xl font-bold text-white">Choose an Amount</h3>
          
          <ToggleGroup 
            type="single" 
            value={selectedAmount} 
            onValueChange={handleAmountSelect}
            className="flex items-center gap-x-4"
          >
            {PRESET_AMOUNTS.map(amount => (
              <ToggleGroupItem 
                key={amount}
                value={String(amount)}
                className="bg-gray-800 border border-gray-700 hover:bg-gray-700 rounded-full px-6 py-3 text-base font-semibold data-[state=on]:bg-gray-600 data-[state=on]:border-gray-500 data-[state=on]:text-white"
              >
                {amount} ADA
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-950 px-2 text-gray-500">OR</span>
            </div>
          </div>
          
          <Input 
            type="number"
            placeholder="Enter Custom Amount (in ADA)"
            value={customAmount}
            onChange={handleCustomAmountChange}
            className="rounded-full h-14 bg-gray-800 border border-gray-700 text-center text-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500 focus-visible:ring-offset-gray-950"
          />
          
          <Button 
            onClick={handleDonate} 
            disabled={isLoading || !selectedAmount || parseFloat(selectedAmount) <= 0}
            className="rounded-xl h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 transition-opacity hover:opacity-90"
          >
            {isLoading ? 'Processing...' : `Confirm Donation of ${selectedAmount || 0} ADA`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};