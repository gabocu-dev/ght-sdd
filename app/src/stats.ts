import { MatchEvent, MatchSession, SessionStats } from './types';

const OUTCOMES_WITH_SHOT_FACED: Record<string, boolean> = {
  save: true,
  goalConceded: true,
  missedTarget: true,
  penaltySaved: true,
  penaltyConceded: true,
};

export function calculateSessionStats(events: MatchEvent[]): SessionStats {
  const totalShotsFaced = events.filter((event) => OUTCOMES_WITH_SHOT_FACED[event.eventType]).length;

  const totalSaves = events.filter((event) => event.eventType === 'save').length;
  const totalGoalsConceded = events.filter((event) => event.eventType === 'goalConceded').length;
  const penaltySaves = events.filter((event) => event.eventType === 'penaltySaved').length;
  const penaltyGoalsConceded = events.filter((event) => event.eventType === 'penaltyConceded').length;
  const missedTargetCount = events.filter((event) => event.eventType === 'missedTarget').length;

  const savesToCount = totalSaves + penaltySaves;
  const savePercentage = totalShotsFaced > 0 ? (savesToCount / totalShotsFaced) * 100 : 0;

  return {
    totalShotsFaced,
    totalSaves,
    totalGoalsConceded,
    penaltySaves,
    penaltyGoalsConceded,
    missedTargetCount,
    savePercentage,
    lastEventId: events.at(-1)?.id,
  };
}

export function calculateSessionStatsForSession(session: MatchSession): SessionStats {
  return calculateSessionStats(session.events);
}

export function buildComparisonMetrics(sessions: MatchSession[]) {
  return sessions.map((session) => {
    const stats = calculateSessionStatsForSession(session);
    return {
      id: session.id,
      label: `${session.opponentName} • ${session.matchDate}`,
      totalShotsFaced: stats.totalShotsFaced,
      totalSaves: stats.totalSaves,
      totalGoalsConceded: stats.totalGoalsConceded,
      penaltySaves: stats.penaltySaves,
      savePercentage: Number(stats.savePercentage.toFixed(1)),
    };
  });
}
