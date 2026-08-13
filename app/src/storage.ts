import AsyncStorage from '@react-native-async-storage/async-storage';
import { MatchSession } from './types';

export const MATCH_SESSIONS_KEY = 'goalkeeper-stats.sessions.v1';

export async function loadSessions(): Promise<MatchSession[]> {
  try {
    const raw = await AsyncStorage.getItem(MATCH_SESSIONS_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as MatchSession[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Failed to load match sessions', error);
    return [];
  }
}

export async function persistSessions(sessions: MatchSession[]): Promise<void> {
  await AsyncStorage.setItem(MATCH_SESSIONS_KEY, JSON.stringify(sessions));
}

export function getActiveSession(sessions: MatchSession[]): MatchSession | null {
  return sessions.find((session) => session.status === 'active') ?? null;
}

export function ensureSingleActiveSession(sessions: MatchSession[]): MatchSession[] {
  const activeSession = getActiveSession(sessions);

  if (!activeSession) {
    return sessions;
  }

  return sessions.map((session) =>
    session.id === activeSession.id
      ? session
      : { ...session, status: session.status === 'active' ? 'completed' : session.status },
  );
}
