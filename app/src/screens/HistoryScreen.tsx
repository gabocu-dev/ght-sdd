import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MatchSession } from '../types';

type HistoryScreenProps = {
  sessions: MatchSession[];
  onOpenSession: (id: string) => void;
  onCompareSessions: () => void;
};

export function HistoryScreen({ sessions, onOpenSession, onCompareSessions }: HistoryScreenProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Match history</Text>
      {sessions.length === 0 ? (
        <Text>No completed matches yet.</Text>
      ) : (
        sessions.map((session) => (
          <View key={session.id} style={styles.item}>
            <Text style={styles.sessionTitle}>{session.opponentName}</Text>
            <Text>{session.goalkeeperName}</Text>
            <Text>{session.matchDate}</Text>
            <Button title="Open summary" onPress={() => onOpenSession(session.id)} />
          </View>
        ))
      )}
      <View style={styles.compareButton}>
        <Button title="Compare matches" onPress={onCompareSessions} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  item: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sessionTitle: { fontSize: 18, fontWeight: '700' },
  compareButton: { marginTop: 20 },
});
