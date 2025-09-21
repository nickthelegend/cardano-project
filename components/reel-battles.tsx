"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useWallet } from "@meshsdk/react"


const BattlesContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1000px;
  margin: 0 auto;
`

const BattlesHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const BattleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const BattleCard = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const BattleHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const BattleTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
`

const BattleStatus = styled.div<{ $status: "live" | "upcoming" | "ended" }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ $status, theme }) => {
    switch ($status) {
      case "live":
        return theme.colors.primary
      case "upcoming":
        return theme.colors.accent
      case "ended":
        return theme.colors.secondary
    }
  }};
  color: ${({ theme }) => theme.colors.background};
`

const BattleVersus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Contestant = styled.div`
  text-align: center;
  flex: 1;
`

const ContestantAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.background};
  margin: 0 auto ${({ theme }) => theme.spacing.sm};
`

const ContestantName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: #ffffff;
`

const ContestantScore = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
`

const VersusIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0 ${({ theme }) => theme.spacing.md};
`

const BattleStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const StatItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
`

const StatValue = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #cccccc;
`

const JoinButton = styled.button<{ $variant: "primary" | "secondary" }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $variant, theme }) => ($variant === "primary" ? theme.colors.primary : theme.colors.secondary)};
  color: ${({ theme }) => theme.colors.background};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const CreateBattleSection = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`

const CreateTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const CreateDescription = styled.p`
  color: #cccccc;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const CreateForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 400px;
  margin: 0 auto;
`

const FormInput = styled.input`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: #ffffff;
  font-size: 1rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(99, 219, 154, 0.2);
  }
`

interface Battle {
  id: string
  title: string
  contestant1: { name: string; score: number }
  contestant2: { name: string; score: number }
  status: "live" | "upcoming" | "ended"
  totalVotes: number
  prize: number
  timeLeft: string
}

export function ReelBattles() {
  const { connected, name } = useWallet()
   
  const [userData, setUserData] = useState<ReturnType<typeof getUserData>>(null)
  const [battles, setBattles] = useState<Battle[]>([])
  const [battleTitle, setBattleTitle] = useState("")
  const [entryFee, setEntryFee] = useState("")
  const [isClient, setIsClient] = useState(false)

  // Set client-side flag
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Update user data when wallet connection changes (only on client)
  useEffect(() => {
    if (isClient) {
      if (connected) {
        const data = getUserData()
        setUserData(data)
      } else {
        setUserData(null)
      }
    }
  }, [connected, getUserData, isClient])

  useEffect(() => {
    // Mock battle data
    setBattles([
      {
        id: "1",
        title: "Dance Battle Royale",
        contestant1: { name: "DanceMaster", score: 1250 },
        contestant2: { name: "GrooveKing", score: 980 },
        status: "live",
        totalVotes: 2230,
        prize: 5000,
        timeLeft: "2h 15m",
      },
      {
        id: "2",
        title: "Comedy Showdown",
        contestant1: { name: "FunnyGuy", score: 890 },
        contestant2: { name: "JokeMaster", score: 1100 },
        status: "live",
        totalVotes: 1990,
        prize: 3000,
        timeLeft: "45m",
      },
      {
        id: "3",
        title: "Cooking Challenge",
        contestant1: { name: "ChefPro", score: 0 },
        contestant2: { name: "KitchenWiz", score: 0 },
        status: "upcoming",
        totalVotes: 0,
        prize: 4000,
        timeLeft: "1h 30m",
      },
    ])
  }, [])

  const handleCreateBattle = () => {
    if (battleTitle && entryFee && (connected || userData)) {
      console.log(`[v0] Creating battle: ${battleTitle} with entry fee: ${entryFee} $VIBE`)
      setBattleTitle("")
      setEntryFee("")
    }
  }

  return (
    <BattlesContainer>
      <BattlesHeader>
        <Title>⚔️ Reel Battles</Title>
        <Subtitle>Challenge other creators and compete for $VIBE prizes!</Subtitle>
      </BattlesHeader>

      <BattleGrid>
        {battles.map((battle) => (
          <BattleCard key={battle.id}>
            <BattleHeader>
              <BattleTitle>{battle.title}</BattleTitle>
              <BattleStatus $status={battle.status}>{battle.status.toUpperCase()}</BattleStatus>
            </BattleHeader>

            <BattleVersus>
              <Contestant>
                <ContestantAvatar>{battle.contestant1.name.charAt(0)}</ContestantAvatar>
                <ContestantName>{battle.contestant1.name}</ContestantName>
                <ContestantScore>{battle.contestant1.score}</ContestantScore>
              </Contestant>

              <VersusIcon>⚔️</VersusIcon>

              <Contestant>
                <ContestantAvatar>{battle.contestant2.name.charAt(0)}</ContestantAvatar>
                <ContestantName>{battle.contestant2.name}</ContestantName>
                <ContestantScore>{battle.contestant2.score}</ContestantScore>
              </Contestant>
            </BattleVersus>

            <BattleStats>
              <StatItem>
                <StatValue>{battle.totalVotes}</StatValue>
                <StatLabel>Total Votes</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{battle.prize}</StatValue>
                <StatLabel>$VIBE Prize</StatLabel>
              </StatItem>
            </BattleStats>

            <JoinButton
              $variant={battle.status === "live" ? "primary" : "secondary"}
              disabled={battle.status === "ended"}
            >
              {battle.status === "live" && "Vote Now"}
              {battle.status === "upcoming" && `Starts in ${battle.timeLeft}`}
              {battle.status === "ended" && "Battle Ended"}
            </JoinButton>
          </BattleCard>
        ))}
      </BattleGrid>

      <CreateBattleSection>
        <CreateTitle>🎬 Create Your Own Battle</CreateTitle>
        <CreateDescription>
          Challenge another creator to a reel battle! Set your entry fee and let the community decide the winner.
        </CreateDescription>

        <CreateForm>
          <FormInput
            type="text"
            placeholder="Battle title (e.g., 'Epic Dance Battle')"
            value={battleTitle}
            onChange={(e) => setBattleTitle(e.target.value)}
          />
          <FormInput
            type="number"
            placeholder="Entry fee in $VIBE"
            value={entryFee}
            onChange={(e) => setEntryFee(e.target.value)}
          />
          <JoinButton $variant="primary" onClick={handleCreateBattle} disabled={!battleTitle || !entryFee}>
            Create Battle (Cost: {entryFee || "0"} $VIBE)
          </JoinButton>
        </CreateForm>
      </CreateBattleSection>
    </BattlesContainer>
  )
}
