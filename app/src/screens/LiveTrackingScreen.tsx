import React, { useMemo, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MatchEvent, MatchSession, SessionStats, EventOutcome, ShotZone, ShotType } from '../types';
import { calculateSessionStatsForSession } from '../stats';

type LiveTrackingScreenProps = {
  session: MatchSession;
  onRecordEvent: (event: Omit<MatchEvent, 'id' | 'sessionId' | 'createdAt' | 'elapsedSeconds'> & { elapsedSeconds?: number }) => void;
  onUndoEvent: () => void;
  onEndMatch: () => void;
  onBack: () => void;
};

const eventOptions: EventOutcome[] = ['save', 'goalConceded', 'missedTarget', 'penaltySaved', 'penaltyConceded'];
const shotZones: ShotZone[] = ['left', 'center', 'right', 'high', 'low'];
const shotTypes: ShotType[] = ['wrist', 'jump', 'backhand', 'quick', 'set'];

export function LiveTrackingScreen({ session, onRecordEvent, onUndoEvent, onEndMatch, onBack }: LiveTrackingScreenProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<EventOutcome>('save');
  const [selectedZone, setSelectedZone] = useState<ShotZone>('center');
  const [selectedType, setSelectedType] = useState<ShotType>('quick');

  const stats = useMemo<SessionStats>(() => calculateSessionStatsForSession(session), [session]);

  const handleLogEvent = () => {
    onRecordEvent({
      eventType: selectedOutcome,
      shotArea: selectedZone,
      shotType: selectedType,
      elapsedSeconds: session.events.length * 15,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{session.goalkeeperName}</Text>
      <Text style={styles.subTitle}>{session.opponentName} • {session.matchLabel}</Text>
      <Text style={styles.timeLabel}>Match time: {session.events.length * 15}s</Text>

      <View style={styles.statsGrid}>
        <StatCard label="Shots faced" value={String(stats.totalShotsFaced)} />
        <StatCard label="Saves" value={String(stats.totalSaves)} />
        <StatCard label="Goals" value={String(stats.totalGoalsConceded)} />
        <StatCard label="Save %" value={`${stats.savePercentage.toFixed(1)}%`} />
      </View>

      <Text style={styles.sectionTitle}>Outcome</Text>
      <View style={styles.chipRow}>
        {eventOptions.map((value) => (
          <Button key={value} title={value} onPress={() => setSelectedOutcome(value)} color={selectedOutcome === value ? '#1d4ed8' : '#6b7280'} />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Shot zone</Text>
      <View style={styles.chipRow}>
        {shotZones.map((value) => (
          <Button key={value} title={value} onPress={() => setSelectedZone(value)} color={selectedZone === value ? '#1d4ed8' : '#6b7280'} />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Shot type</Text>
      <View style={styles.chipRow}>
        {shotTypes.map((value) => (
          <Button key={value} title={value} onPress={() => setSelectedType(value)} color={selectedType === value ? '#1d4ed8' : '#6b7280'} />
        ))}
      </View>

      <View style={styles.actionRow}>
        <Button title="Log event" onPress={handleLogEvent} />
        <Button title="Undo last" onPress={onUndoEvent} color="#b91c1c" />
      </View>

      <View style={styles.actionRow}>
        <Button title="End match" onPress={onEndMatch} color="#15803d" />
        <Button title="Back" onPress={onBack} color="#374151" />
      </View>
    </ScrollView>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 12,
  },
  timeLabel: {
    marginBottom: 18,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statLabel: {
    color: '#6b7280',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    gap: 8,
  },
});
