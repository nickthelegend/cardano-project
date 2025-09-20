# Algorand Fantasy League Project Guide

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
├── arena/             # Arena/tournament pages
├── auth/              # Authentication callback
├── profile/           # User profile
├── tournament/        # Tournament management
└── page.tsx           # Main entry point

components/            # React components
├── ui/               # shadcn/ui components
├── main-app.tsx      # Main application shell
├── reel-feed.tsx     # Core scrolling feed
├── sidebar.tsx       # Desktop navigation
└── bottom-navigation.tsx # Mobile navigation

hooks/                # Custom React hooks
├── use-auth.tsx      # Authentication logic
├── use-energy-system.tsx # Energy/scroll mechanics
└── use-mobile.ts     # Mobile detection

lib/                  # Utilities and configurations
├── supabase.ts       # Database client
├── theme.ts          # Styled components theme
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

### Core Mechanics
1. **Energy System**: Controls scroll permissions
2. **Token System**: ScrollTokens + VibeTokens
3. **Reel Feed**: Main content consumption area
4. **Challenges**: Daily tasks and quests

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
- **Auth**: Mock implementation (not connected to Supabase)
- **Data**: All data is mock/local storage based
- **API**: No real backend integration yet
- **Tokens**: Simulated token earning system

### Mobile Responsiveness
- Uses `useIsMobile` hook for detection
- Different navigation patterns (sidebar vs bottom nav)
- Responsive styled components with `$isMobile` props

### Styling Approach
- Hybrid: Tailwind for utilities + Styled Components for complex styling
- CSS variables for theming
- Dark mode as primary design
- Custom scrollbar styling

## Future Development Areas
1. **Backend Integration**: Connect Supabase auth and data
2. **Real Token System**: Implement actual cryptocurrency integration
3. **Content Management**: Real reel/content system
4. **Social Features**: User interactions, following, etc.
5. **Performance**: Optimize for mobile scrolling performance

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