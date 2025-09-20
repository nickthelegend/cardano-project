# ScrollVibe - Scroll to Earn Project Guide

## Project Overview
**Name**: ScrollVibe - Scroll to Earn  
**Type**: Next.js 14 + TypeScript + Styled Components + Tailwind CSS  
**Purpose**: Social media app where users earn tokens by scrolling reels

## Tech Stack
- **Framework**: Next.js 14.2.16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Styled Components + shadcn/ui
- **Database**: Supabase (configured but using mock auth)
- **State**: React Context + Local Storage
- **UI**: Radix UI components + Framer Motion

## Project Structure

### Core Directories
```
app/                    # Next.js App Router pages
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
└── [other components] # Various UI components

hooks/                # Custom React hooks
├── use-auth.tsx      # Authentication logic
├── use-energy-system.tsx # Energy/scroll mechanics
├── use-energy.ts     # Energy state management
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
- **Auth**: Mock implementation using localStorage (Supabase configured but not used)
- **Data**: All data is mock/local storage based
- **API**: Mock crypto API for token data
- **Tokens**: Simulated token earning system with energy mechanics
- **UI**: Fully functional with responsive design
- **Navigation**: Complete mobile/desktop navigation systems

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
- `app-shell.tsx` - Application shell and navigation wrapper
- `home-screen.tsx` - Dashboard with user stats and welcome
- `reel-feed.tsx` - Core scrolling interface
- `energy-system.tsx` - Energy mechanics and token earning
- `token-wallet.tsx` - Token management and conversion
- `sidebar.tsx` / `bottom-navigation.tsx` - Navigation systems
- `login-form.tsx` - Authentication interface

### Feature Components
- `daily-challenges.tsx` - Challenge system
- `enhanced-leaderboard.tsx` - User rankings
- `reel-battles.tsx` - Battle system
- `quests-panel.tsx` - Quest management
- `profile-badges.tsx` - User achievements

## Future Development Areas
1. **Backend Integration**: Connect Supabase auth and real data
2. **Real Token System**: Implement actual cryptocurrency/blockchain integration
3. **Content Management**: Real reel/content system with user uploads
4. **Social Features**: User interactions, following, comments
5. **Performance**: Optimize for mobile scrolling and real-time updates

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
1. **Unauthenticated**: Shows login form on root page
2. **Authenticated**: Redirects to /home, navigation available
3. **Mobile**: Bottom navigation with 5 main routes
4. **Desktop**: Sidebar navigation with all routes

## Quick Reference Commands
```bash
# Install dependencies
npm install

# Start development
npm run dev

# Add new shadcn component
npx shadcn@latest add [component-name]

# Type checking
npx tsc --noEmit
```