"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface DonationModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const DonationModalContext = createContext<DonationModalState | undefined>(undefined);

export function DonationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <DonationModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </DonationModalContext.Provider>
  );
}

export const useDonationModal = () => {
  const context = useContext(DonationModalContext);
  if (!context) {
    throw new Error('useDonationModal must be used within a DonationModalProvider');
  }
  return context;
};