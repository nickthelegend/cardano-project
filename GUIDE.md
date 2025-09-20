# ScrollVibe - Scroll to Earn Project Guide

## Project Overview
**Name**: ScrollVibe - Scroll to Earn  
**Type**: Next.js 14 + TypeScript + Styled Components + Tailwind CSS  
**Purpose**: Social media app where users earn tokens by scrolling reels  
**Blockchain**: Cardano integration via UTXOS wallet

## Tech Stack
- **Framework**: Next.js 14.2.16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Styled Components + shadcn/ui
- **Blockchain**: UTXOS wallet + Blockfrost API + MeshSDK
- **Database**: Supabase (configured but using mock auth)
- **State**: React Context + Local Storage
- **UI**: Radix UI components + Framer Motion

## Project Structure

### Core Directories
```
app/                    # Next.js App Router pages
├── api/               # API routes
│   └── blockfrost/    # Secure Blockfrost proxy
├── home/              # Home dashboard page
├── reel/              # Reel feed page
├── wallet/            # Token wallet page
├── leaderboard/       # Leaderboard page
├── challenges/        # Daily challenges page
├── auth/              # Authentication callback
├── profile/           # User profile page
├── layout.tsx         # Root layout with AppShell
└── page.tsx           # Root page (login/redirect)

components/            # React components
├── ui/               # shadcn/ui components (40+ components)
├── app-shell.tsx     # Main application shell & navigation
├── home-screen.tsx   # Home dashboard component
├── reel-feed.tsx     # Core scrolling feed
├── sidebar.tsx       # Desktop navigation
├── bottom-navigation.tsx # Mobile navigation
├── energy-system.tsx # Energy/scroll mechanics
├── token-wallet.tsx  # Token management
├── daily-challenges.tsx # Challenge system
├── login-form.tsx    # Mock login form
├── utxos-login-form.tsx # UTXOS wallet login
└── [other components] # Various UI components

hooks/                # Custom React hooks
├── use-auth.tsx      # Mock authentication logic
├── use-utxos-auth.tsx # UTXOS wallet authentication
├── use-energy-system.tsx # Energy/scroll mechanics
├── use-scroll-rewards.tsx # Scroll reward system
└── use-mobile.ts     # Mobile detection

lib/                  # Utilities and configurations
├── supabase.ts       # Database client
├── theme.ts          # Styled components theme
├── crypto-api.ts     # Mock crypto data API
└── utils.ts          # Utility functions
```

## Key Features & Components

### Authentication System
- **File**: `hooks/use-auth.tsx`
- **Storage**: Local Storage (mock implementation)
- **Provider**: AuthProvider wraps entire app
- **Flow**: Login → Main App or Login Form

### Main Application Shell
- **File**: `components/main-app.tsx`
- **Views**: feed, wallet, leaderboard, challenges, battles, quests, profile
- **Layout**: Responsive (sidebar on desktop, bottom nav on mobile)
- **State**: Local state for active view and scroll permissions

### Core Features & Components

#### Application Architecture
- **Routes**: /home, /reel, /wallet, /leaderboard, /challenges
- **Layout**: AppShell component handles navigation and layout
- **Navigation**: Responsive (sidebar on desktop, bottom nav on mobile)
- **State**: Route-based navigation with persistent energy system

#### Core Mechanics
1. **Energy System**: Controls scroll permissions and token earning
2. **Token System**: ScrollTokens + VibeTokens with conversion
3. **Reel Feed**: Main content consumption area with scroll rewards
4. **Challenges**: Daily tasks, quests, and battles
5. **Leaderboard**: User rankings and competitions
6. **Profile System**: User stats, badges, and achievements

### Styling Architecture
- **Global**: Tailwind CSS v4 with custom CSS variables
- **Components**: Styled Components with theme provider
- **Theme**: Dark mode focused (`lib/theme.ts`)
- **Colors**: Green (#63db9b), Pink (#ff49d2), Yellow (#e2e361)

## Configuration Files

### Next.js Config (`next.config.mjs`)
- ESLint/TypeScript errors ignored for builds
- Images unoptimized
- Standard Next.js 14 setup

### Package.json Key Dependencies
- **UI**: @radix-ui/* components, lucide-react icons
- **Styling**: styled-components, tailwindcss, framer-motion
- **Backend**: @supabase/supabase-js
- **Forms**: react-hook-form, zod validation
- **Charts**: recharts

## Development Workflow

### Running the Project
```bash
npm run dev    # Development server
npm run build  # Production build
npm run start  # Production server
```

### Key Entry Points
1. **App Start**: `app/layout.tsx` → `app/page.tsx`
2. **Authentication**: Check user → LoginForm or MainApp
3. **Main App**: `components/main-app.tsx` handles all views
4. **Mobile/Desktop**: Responsive layout with different navigation

### State Management
- **Auth**: React Context + Local Storage
- **UI State**: Component-level useState
- **Energy**: Custom hook with localStorage persistence
- **Theme**: Styled Components ThemeProvider

## Important Notes

### Current Implementation Status

#### Authentication Systems
- **Mock Auth**: `use-auth.tsx` - localStorage-based mock authentication
- **UTXOS Auth**: `use-utxos-auth.tsx` - Real Cardano wallet integration
- **Components**: Both `login-form.tsx` and `utxos-login-form.tsx` available

#### Blockchain Integration
- **UTXOS Wallet**: MeshSDK integration for Cardano wallets
- **Blockfrost API**: Secure server-side proxy at `/api/blockfrost/[...slug]`
- **Network Support**: Preprod (testnet) and Mainnet configurations
- **Real Balances**: Fetches actual ADA balances from Cardano blockchain

#### Data & APIs
- **Mock Data**: All app data is localStorage-based
- **Crypto API**: Mock crypto price data
- **Energy System**: Persistent energy mechanics with localStorage
- **Scroll Rewards**: Token earning simulation

#### UI & Navigation
- **Responsive Design**: Complete mobile/desktop layouts
- **Route-based Navigation**: 5 main routes with proper Next.js routing
- **Component Library**: 40+ shadcn/ui components integrated

### Mobile Responsiveness
- Uses `useIsMobile` hook for detection
- Different navigation patterns (sidebar vs bottom nav)
- Responsive styled components with `$isMobile` props

### Styling Approach
- Hybrid: Tailwind for utilities + Styled Components for complex styling
- CSS variables for theming
- Dark mode as primary design
- Custom scrollbar styling

## Key Components Overview

### Essential Components

#### Core Application
- `app-shell.tsx` - Application shell and navigation wrapper
- `home-screen.tsx` - Dashboard with user stats and welcome
- `reel-feed.tsx` - Core scrolling interface
- `energy-system.tsx` - Energy mechanics and token earning
- `token-wallet.tsx` - Token management and conversion
- `sidebar.tsx` / `bottom-navigation.tsx` - Navigation systems
- `scroll-progress.tsx` - Daily progress tracker (home page only)

#### Authentication
- `login-form.tsx` - Mock authentication interface
- `utxos-login-form.tsx` - UTXOS wallet connection interface
- `use-auth.tsx` - Mock authentication hook
- `use-utxos-auth.tsx` - UTXOS wallet authentication hook

#### Blockchain Integration
- `/api/blockfrost/[...slug]/route.ts` - Secure Blockfrost API proxy
- MeshSDK integration for Cardano wallet operations
- Environment-based network configuration

### Feature Components
- `daily-challenges.tsx` - Challenge system
- `enhanced-leaderboard.tsx` - User rankings
- `reel-battles.tsx` - Battle system
- `quests-panel.tsx` - Quest management
- `profile-badges.tsx` - User achievements

## UTXOS Integration Status

### ✅ Implemented
- UTXOS wallet connection via MeshSDK
- Secure Blockfrost API proxy for blockchain data
- Real ADA balance fetching
- Environment-based network configuration
- Professional wallet connection UI
- Error handling and loading states

### 📋 Required Setup
1. **Environment Variables** (create `.env` file):
   ```env
   NEXT_PUBLIC_UTXOS_PROJECT_ID=your_project_id
   NEXT_PUBLIC_NETWORK_ID=0
   BLOCKFROST_API_KEY_PREPROD=your_preprod_key
   BLOCKFROST_API_KEY_MAINNET=your_mainnet_key
   ```

2. **UTXOS Account**: Create project at [utxos.dev/dashboard](https://utxos.dev/dashboard)
3. **Blockfrost API**: Get keys from [blockfrost.io/dashboard](https://blockfrost.io/dashboard)

### 🔄 Integration Options
The project supports both authentication systems:
- **Mock Auth**: Quick development and testing
- **UTXOS Auth**: Real Cardano wallet integration

Switch between them by changing the import in your components.

## Future Development Areas
1. **Choose Auth System**: Decide between mock or UTXOS authentication
2. **Backend Integration**: Connect Supabase for user data persistence
3. **Token Economics**: Implement real token contracts on Cardano
4. **Content Management**: Real reel/content system with user uploads
5. **Social Features**: User interactions, following, comments
6. **Performance**: Optimize for mobile scrolling and real-time updates

## Route Structure

### Available Routes
- `/` - Root page (login or redirect to /home)
- `/home` - Dashboard with user stats and overview
- `/reel` - Main scrolling feed for earning tokens
- `/wallet` - Token management and conversion
- `/leaderboard` - User rankings and competitions
- `/challenges` - Daily tasks and challenges
- `/auth/callback` - Authentication callback
- `/profile` - User profile management

### Navigation Flow
1. **Unauthenticated**: Shows login form on root page (mock or UTXOS)
2. **Authenticated**: Redirects to /home, navigation available
3. **Mobile**: Bottom navigation with 5 main routes
4. **Desktop**: Sidebar navigation with all routes
5. **Special**: ScrollProgress component only shows on /home route

### Authentication Switching
To switch from mock to UTXOS authentication:
1. Replace `useAuth` with `useUTXOSAuth` in components
2. Replace `LoginForm` with `UTXOSLoginForm` in page.tsx
3. Replace `AuthProvider` with `UTXOSAuthProvider` in layout.tsx
4. Set up environment variables for UTXOS/Blockfrost

## Package Dependencies

### Key Additions for UTXOS
- `@meshsdk/web3-sdk`: Cardano wallet integration
- `@meshsdk/provider`: Blockchain data provider
- MeshSDK handles UTXOS wallet connections and Cardano operations

### Complete Dependency List
- **UI**: @radix-ui/* components, lucide-react, framer-motion
- **Styling**: styled-components, tailwindcss, class-variance-authority
- **Forms**: react-hook-form, zod validation
- **Charts**: recharts for data visualization
- **Blockchain**: @meshsdk/* for Cardano integration
- **Backend**: @supabase/supabase-js (configured but unused)

## Quick Reference Commands
```bash
# Install dependencies
npm install

# Start development (requires .env setup for UTXOS)
npm run dev

# Add new shadcn component
npx shadcn@latest add [component-name]

# Type checking
npx tsc --noEmit

# Test UTXOS integration
# 1. Set up .env file with UTXOS credentials
# 2. Replace login-form with utxos-login-form in page.tsx
# 3. Replace useAuth with useUTXOSAuth in components
```