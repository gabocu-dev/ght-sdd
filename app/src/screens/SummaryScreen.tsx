import React, { useMemo } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MatchSession } from '../types';
import { calculateSessionStatsForSession } from '../stats';

type SummaryScreenProps = {
  session: MatchSession;
  onBackToHistory: () => void;
  onStartAnother: () => void;
};

export function SummaryScreen({ session, onBackToHistory, onStartAnother }: SummaryScreenProps) {
  const stats = useMemo(() => calculateSessionStatsForSession(session), [session]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Match summary</Text>
      <Text style={styles.subtitle}>{session.goalkeeperName} vs {session.opponentName}</Text>
      <Text style={styles.meta}>{session.matchDate} • {session.matchLabel}</Text>

      <View style={styles.grid}>
        <StatCard label="Shots faced" value={String(stats.totalShotsFaced)} />
        <StatCard label="Saves" value={String(stats.totalSaves)} />
        <StatCard label="Goals conceded" value={String(stats.totalGoalsConceded)} />
        <StatCard label="Penalties saved" value={String(stats.penaltySaves)} />
        <StatCard label="Save %" value={`${stats.savePercentage.toFixed(1)}%`} />
        <StatCard label="Missed target" value={String(stats.missedTargetCount)} />
      </View>

      {session.note ? <Text style={styles.note}>Note: {session.note}</Text> : null}

      <View style={styles.actions}>
        <Button title="Back to history" onPress={onBackToHistory} />
        <Button title="New match" onPress={onStartAnother} />
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
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 18, marginBottom: 4 },
  meta: { fontSize: 14, color: '#4b5563', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statLabel: { color: '#6b7280', marginBottom: 6 },
  statValue: { fontSize: 20, fontWeight: '700' },
  note: { marginTop: 16, backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#dfe3ea' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});
