// IMPORTANT: Use a secure way to manage this in production, not hardcoded.
export const TREASURY_ADDRESS = "addr_test1qpw0djgj0x59ngrjvqthn7enhvruxnsavsw5th63la3mjel3tkc974sr23jmlzgq5zda4gtv8k9cy38756r9y3qgmkqqjz6aa7";

/**
 * Creates, signs, and submits a transaction to send a specified amount of ADA.
 * @param lucid - The initialized Lucid instance from the user's connected wallet.
 * @param amountInAda - The amount of ADA to donate (e.g., 5, 15.5).
 * @returns The transaction hash if successful.
 * @throws An error if the transaction fails.
 */
export const sendAdaDonation = async (lucid: any, amountInAda: number): Promise<string> => {
  console.log('sendAdaDonation called with:', { amountInAda, type: typeof amountInAda });
  
  if (!amountInAda || isNaN(amountInAda) || amountInAda <= 0) {
    throw new Error("Donation amount must be a positive number.");
  }

  // Convert ADA to Lovelace (1 ADA = 1,000,000 Lovelace)
  const amountInLovelace = Math.floor(amountInAda * 1_000_000);
  console.log('Amount in lovelace:', amountInLovelace);

  try {
    console.log('Creating transaction...');
    const tx = await lucid.newTx()
      .payToAddress(TREASURY_ADDRESS, { lovelace: amountInLovelace.toString() })
      .complete();

    console.log('Signing transaction...');
    const signedTx = await tx.sign().complete();
    
    console.log('Submitting transaction...');
    const txHash = await signedTx.submit();
    
    console.log('Transaction submitted:', txHash);
    return txHash;
  } catch (error) {
    console.error("Cardano transaction failed:", error);
    // Re-throw a more user-friendly error
    if (error instanceof Error && error.message.includes("UTxO Balance Insufficient")) {
        throw new Error("Insufficient funds for the transaction.");
    }
    throw new Error("Donation transaction failed. Please try again.");
  }
};