import React, { useEffect, useMemo, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SetupScreen, SetupForm } from './src/screens/SetupScreen';
import { LiveTrackingScreen } from './src/screens/LiveTrackingScreen';
import { SummaryScreen } from './src/screens/SummaryScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { ComparisonScreen } from './src/screens/ComparisonScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { MatchEvent, MatchSession } from './src/types';
import { getActiveSession, loadSessions, persistSessions } from './src/storage';
import { loadGoalkeepers, loadTournaments, saveGoalkeepers, saveTournaments } from './src/settingsStorage';

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

type Screen = 'setup' | 'live' | 'summary' | 'history' | 'compare' | 'settings';

export default function App() {
  const [screen, setScreen] = useState<Screen>('setup');
  const [sessions, setSessions] = useState<MatchSession[]>([]);
  const [goalkeepers, setGoalkeepers] = useState<string[]>([]);
  const [tournaments, setTournaments] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [selectedSummaryId, setSelectedSummaryId] = useState<string | null>(null);
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);

  useEffect(() => {
    let active = true;

    const hydrate = async () => {
      const [storedSessions, storedGoalkeepers, storedTournaments] = await Promise.all([
        loadSessions(),
        loadGoalkeepers(),
        loadTournaments(),
      ]);

      if (!active) {
        return;
      }

      const activeSession = getActiveSession(storedSessions);
      setSessions(storedSessions);
      setGoalkeepers(storedGoalkeepers);
      setTournaments(storedTournaments);
      setActiveSessionId(activeSession?.id ?? null);
      setSelectedCompareIds(storedSessions.filter((session) => session.status === 'completed').slice(0, 2).map((session) => session.id));
      setIsLoaded(true);
    };

    void hydrate();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    void persistSessions(sessions);
  }, [sessions, isLoaded]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    void saveGoalkeepers(goalkeepers);
  }, [goalkeepers, isLoaded]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    void saveTournaments(tournaments);
  }, [tournaments, isLoaded]);

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === activeSessionId && session.status === 'active') ?? null,
    [sessions, activeSessionId],
  );

  const completedSessions = useMemo(
    () => sessions.filter((session) => session.status === 'completed').sort((left, right) => right.updatedAt.localeCompare(left.updatedAt)),
    [sessions],
  );

  const summarySession = useMemo(
    () => sessions.find((session) => session.id === selectedSummaryId) ?? completedSessions[0] ?? null,
    [sessions, selectedSummaryId, completedSessions],
  );

  const compareSessions = useMemo(
    () => completedSessions.filter((session) => selectedCompareIds.includes(session.id)),
    [completedSessions, selectedCompareIds],
  );

  const addGoalkeeper = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    setGoalkeepers((current) => {
      const unique = new Set([...current, trimmed]);
      return Array.from(unique);
    });
  };

  const addTournament = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    setTournaments((current) => {
      const unique = new Set([...current, trimmed]);
      return Array.from(unique);
    });
  };

  const createSession = (form: SetupForm) => {
    const now = new Date().toISOString();
    const newSession: MatchSession = {
      id: makeId(),
      matchDate: form.matchDate.trim(),
      opponentName: form.opponentName.trim(),
      goalkeeperName: form.goalkeeperName.trim(),
      matchLabel: form.matchLabel.trim(),
      note: form.note?.trim() || undefined,
      status: 'active',
      startedAt: now,
      createdAt: now,
      updatedAt: now,
      events: [],
    };

    setSessions((current) => {
      const withoutActive = current.filter((session) => session.status !== 'active');
      return [newSession, ...withoutActive];
    });
    setActiveSessionId(newSession.id);
    setSelectedSummaryId(newSession.id);
    setScreen('live');
  };

  const appendEvent = (eventInput: Omit<MatchEvent, 'id' | 'sessionId' | 'createdAt' | 'elapsedSeconds'> & { elapsedSeconds?: number }) => {
    if (!activeSessionId) {
      return;
    }

    const now = new Date().toISOString();
    const nextEvent: MatchEvent = {
      id: makeId(),
      sessionId: activeSessionId,
      createdAt: now,
      eventType: eventInput.eventType,
      shotArea: eventInput.shotArea,
      shotType: eventInput.shotType,
      elapsedSeconds: eventInput.elapsedSeconds ?? 0,
    };

    setSessions((current) =>
      current.map((session) =>
        session.id === activeSessionId
          ? { ...session, events: [...session.events, nextEvent], updatedAt: now }
          : session,
      ),
    );
  };

  const undoLastEvent = () => {
    if (!activeSessionId) {
      return;
    }

    setSessions((current) =>
      current.map((session) => {
        if (session.id !== activeSessionId || session.events.length === 0) {
          return session;
        }

        return { ...session, events: session.events.slice(0, -1), updatedAt: new Date().toISOString() };
      }),
    );
  };

  const endMatch = () => {
    if (!activeSessionId) {
      return;
    }

    const endedAt = new Date().toISOString();
    setSessions((current) =>
      current.map((session) =>
        session.id === activeSessionId
          ? { ...session, status: 'completed', endedAt, updatedAt: endedAt }
          : session,
      ),
    );
    setSelectedSummaryId(activeSessionId);
    setActiveSessionId(null);
    setScreen('summary');
  };

  const renderScreen = () => {
    if (!isLoaded) {
      return (
        <View style={styles.emptyContainer}>
          <Text>Loading sessions…</Text>
        </View>
      );
    }

    if (screen === 'setup') {
      return (
        <View style={styles.panel}>
          <SetupScreen onCreateSession={createSession} />
          <View style={styles.footerActions}>
            <Button title="Settings" onPress={() => setScreen('settings')} />
          </View>
        </View>
      );
    }

    if (screen === 'settings') {
      return (
        <SettingsScreen
          goalkeepers={goalkeepers}
          tournaments={tournaments}
          onAddGoalkeeper={addGoalkeeper}
          onAddTournament={addTournament}
          onBack={() => setScreen('setup')}
        />
      );
    }

    if (screen === 'live' && activeSession) {
      return (
        <LiveTrackingScreen
          session={activeSession}
          onRecordEvent={appendEvent}
          onUndoEvent={undoLastEvent}
          onEndMatch={endMatch}
          onBack={() => setScreen('history')}
        />
      );
    }

    if (screen === 'summary' && summarySession) {
      return (
        <SummaryScreen
          session={summarySession}
          onBackToHistory={() => setScreen('history')}
          onStartAnother={() => {
            setActiveSessionId(null);
            setSelectedSummaryId(null);
            setScreen('setup');
          }}
        />
      );
    }

    if (screen === 'history') {
      return (
        <HistoryScreen
          sessions={completedSessions}
          onOpenSession={(id) => {
            setSelectedSummaryId(id);
            setScreen('summary');
          }}
          onCompareSessions={() => {
            const firstTwo = completedSessions.slice(0, 2).map((session) => session.id);
            setSelectedCompareIds(firstTwo);
            setScreen('compare');
          }}
        />
      );
    }

    if (screen === 'compare') {
      return (
        <ComparisonScreen
          sessions={compareSessions}
          onBack={() => setScreen('history')}
        />
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text>No active screen</Text>
        <Button title="Back to setup" onPress={() => setScreen('setup')} />
      </View>
    );
  };

  return <SafeAreaView style={styles.app}>{renderScreen()}</SafeAreaView>;
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  panel: {
    flex: 1,
  },
  footerActions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
