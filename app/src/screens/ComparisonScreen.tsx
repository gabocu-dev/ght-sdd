import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MatchSession } from '../types';
import { buildComparisonMetrics } from '../stats';

type ComparisonScreenProps = {
  sessions: MatchSession[];
  onBack: () => void;
};

export function ComparisonScreen({ sessions, onBack }: ComparisonScreenProps) {
  const metrics = useMemo(() => buildComparisonMetrics(sessions), [sessions]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Match comparison</Text>
      {metrics.map((metric) => (
        <View key={metric.id} style={styles.card}>
          <Text style={styles.cardTitle}>{metric.label}</Text>
          <Text>Shots faced: {metric.totalShotsFaced}</Text>
          <Text>Saves: {metric.totalSaves}</Text>
          <Text>Goals conceded: {metric.totalGoalsConceded}</Text>
          <Text>Penalty saves: {metric.penaltySaves}</Text>
          <Text>Save %: {metric.savePercentage}%</Text>
        </View>
      ))}
      <Text style={styles.backLink} onPress={onBack}>Back to history</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  backLink: { marginTop: 20, color: '#2563eb', fontWeight: '600' },
});
