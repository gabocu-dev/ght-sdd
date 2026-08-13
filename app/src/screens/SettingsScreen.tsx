import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type SettingsScreenProps = {
  goalkeepers: string[];
  tournaments: string[];
  onAddGoalkeeper: (name: string) => void;
  onAddTournament: (name: string) => void;
  onBack: () => void;
};

export function SettingsScreen({ goalkeepers, tournaments, onAddGoalkeeper, onAddTournament, onBack }: SettingsScreenProps) {
  const [goalkeeperName, setGoalkeeperName] = useState('');
  const [tournamentName, setTournamentName] = useState('');

  const handleAddGoalkeeper = () => {
    const trimmed = goalkeeperName.trim();
    if (!trimmed) return;
    onAddGoalkeeper(trimmed);
    setGoalkeeperName('');
  };

  const handleAddTournament = () => {
    const trimmed = tournamentName.trim();
    if (!trimmed) return;
    onAddTournament(trimmed);
    setTournamentName('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Goalkeepers</Text>
        <TextInput
          style={styles.input}
          value={goalkeeperName}
          onChangeText={setGoalkeeperName}
          placeholder="Add goalkeeper name"
        />
        <Button title="Save goalkeeper" onPress={handleAddGoalkeeper} />
        {goalkeepers.length === 0 ? (
          <Text style={styles.empty}>No goalkeepers saved yet.</Text>
        ) : (
          <View style={styles.list}>
            {goalkeepers.map((name) => (
              <Text key={name} style={styles.listItem}>• {name}</Text>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tournaments</Text>
        <TextInput
          style={styles.input}
          value={tournamentName}
          onChangeText={setTournamentName}
          placeholder="Add tournament name"
        />
        <Button title="Save tournament" onPress={handleAddTournament} />
        {tournaments.length === 0 ? (
          <Text style={styles.empty}>No tournaments saved yet.</Text>
        ) : (
          <View style={styles.list}>
            {tournaments.map((name) => (
              <Text key={name} style={styles.listItem}>• {name}</Text>
            ))}
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Button title="Back" onPress={onBack} color="#374151" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 18 },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 18,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#d7dbe5',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  list: { marginTop: 12 },
  listItem: { fontSize: 16, marginBottom: 6 },
  empty: { marginTop: 12, color: '#6b7280' },
  footer: { marginTop: 12 },
});
