export type MatchStatus = 'active' | 'completed';

export type EventOutcome =
  | 'save'
  | 'goalConceded'
  | 'missedTarget'
  | 'penaltySaved'
  | 'penaltyConceded';

export type ShotZone = 'left' | 'center' | 'right' | 'high' | 'low';
export type ShotType = 'wrist' | 'jump' | 'backhand' | 'quick' | 'set';

export type MatchEvent = {
  id: string;
  sessionId: string;
  eventType: EventOutcome;
  shotArea: ShotZone;
  shotType: ShotType;
  elapsedSeconds: number;
  createdAt: string;
};

export type MatchSession = {
  id: string;
  matchDate: string;
  opponentName: string;
  goalkeeperName: string;
  matchLabel: string;
  note?: string;
  status: MatchStatus;
  startedAt?: string;
  endedAt?: string;
  createdAt: string;
  updatedAt: string;
  events: MatchEvent[];
};

export type SessionStats = {
  totalShotsFaced: number;
  totalSaves: number;
  totalGoalsConceded: number;
  penaltySaves: number;
  penaltyGoalsConceded: number;
  missedTargetCount: number;
  savePercentage: number;
  lastEventId?: string;
};

export type ComparisonRow = {
  label: string;
  values: Record<string, string | number>;
};
