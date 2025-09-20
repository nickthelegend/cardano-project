# UTXOS Authentication Setup Guide

This guide will help you set up UTXOS wallet authentication for ScrollVibe following the [UTXOS documentation](https://docs.utxos.dev/wallet/usage).

## Prerequisites

1. **Create a UTXOS Account**
   - Go to [https://utxos.dev/dashboard](https://utxos.dev/dashboard)
   - Sign up with one of the supported providers
   - Create a new project
   - Copy your **Project ID**

2. **Get Blockfrost API Key**
   - Go to [https://blockfrost.io/dashboard](https://blockfrost.io/dashboard)
   - Create a free account
   - Get your API key for Preprod (testnet) and/or Mainnet

## Environment Setup

Create a `.env` file in your project root with the following variables:

```env
# UTXOS Wallet Configuration
NEXT_PUBLIC_UTXOS_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_NETWORK_ID=0

# Blockfrost API Keys (Server-side only - never expose on client)
BLOCKFROST_API_KEY_PREPROD=your_blockfrost_preprod_api_key_here
BLOCKFROST_API_KEY_MAINNET=your_blockfrost_mainnet_api_key_here
```

### Environment Variables Explained:

- `NEXT_PUBLIC_UTXOS_PROJECT_ID`: Your UTXOS project ID from the dashboard
- `NEXT_PUBLIC_NETWORK_ID`: Network ID (0 for preprod/testnet, 1 for mainnet)
- `BLOCKFROST_API_KEY_PREPROD`: Blockfrost API key for testnet (server-side only)
- `BLOCKFROST_API_KEY_MAINNET`: Blockfrost API key for mainnet (server-side only)

## Security Features Implemented

✅ **Secure API Key Handling**: Blockfrost API keys are never exposed to the client
✅ **Server-side Proxy**: Created `/api/blockfrost/[...slug]/route.ts` to securely proxy requests
✅ **Environment Variables**: All sensitive data stored in environment variables
✅ **Network Configuration**: Support for both testnet and mainnet

## What's Been Implemented

### 1. UTXOS Authentication Hook (`hooks/use-utxos-auth.tsx`)
- Wallet connection using UTXOS
- User state management with wallet address
- ADA balance fetching
- Secure disconnect functionality

### 2. UTXOS Login Form (`components/utxos-login-form.tsx`)
- Beautiful, modern login interface
- UTXOS wallet connection button
- Error handling and loading states
- Feature highlights for UTXOS benefits

### 3. Secure Blockfrost API Route (`app/api/blockfrost/[...slug]/route.ts`)
- Server-side API key protection
- Request proxying to Blockfrost
- Error handling and response formatting
- Support for both testnet and mainnet

### 4. Updated Components
- **Sidebar**: Shows wallet address and ADA balance
- **App Shell**: Uses UTXOS authentication
- **Main Page**: Redirects to UTXOS login
- **Layout**: Uses UTXOSAuthProvider

## Features

- 🔐 **Secure**: No private keys exposed, server-side API key handling
- 🚀 **Fast**: Instant wallet connection without browser extensions
- 📱 **Responsive**: Works on all devices
- 🎨 **Beautiful**: Modern UI with smooth animations
- 🔄 **Reliable**: Built on UTXOS infrastructure

## Testing

1. Set up your environment variables
2. Run `npm run dev`
3. Navigate to the app
4. Click "Connect UTXOS Wallet"
5. Follow the UTXOS connection flow
6. You should see your wallet address and ADA balance in the sidebar

## Network Configuration

- **Testnet (Preprod)**: Use `NEXT_PUBLIC_NETWORK_ID=0` for development
- **Mainnet**: Use `NEXT_PUBLIC_NETWORK_ID=1` for production

Make sure your Blockfrost API key matches the network you're using.

## Troubleshooting

1. **"Missing Blockfrost API key"**: Check your `.env` file has the correct API keys
2. **"Failed to connect wallet"**: Verify your UTXOS Project ID is correct
3. **Network errors**: Ensure you're using the correct network ID (0 for testnet, 1 for mainnet)

## Next Steps

After setting up the environment variables, your app will have:
- Secure UTXOS wallet authentication
- Real Cardano wallet integration
- ADA balance display
- Professional login experience

The authentication system is now ready for production use with proper security measures in place.
