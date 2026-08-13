import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { validateSetupForm } from '../validation';

export type SetupForm = {
  matchDate: string;
  opponentName: string;
  goalkeeperName: string;
  matchLabel: string;
  note?: string;
};

type SetupScreenProps = {
  onCreateSession: (form: SetupForm) => void;
};

export function SetupScreen({ onCreateSession }: SetupScreenProps) {
  const [form, setForm] = useState<SetupForm>({
    matchDate: '2026-08-13',
    opponentName: 'Team Alpha',
    goalkeeperName: 'Mateo Ruiz',
    matchLabel: 'League Match',
    note: 'Strong counterattacks in the second half.',
  });
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof SetupForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = () => {
    const validationErrors = validateSetupForm(form);
    if (validationErrors.length > 0) {
      setError(validationErrors[0]);
      return;
    }

    setError(null);
    onCreateSession(form);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New match</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        value={form.matchDate}
        placeholder="Match date"
        onChangeText={(value) => updateField('matchDate', value)}
      />
      <TextInput
        style={styles.input}
        value={form.opponentName}
        placeholder="Opponent name"
        onChangeText={(value) => updateField('opponentName', value)}
      />
      <TextInput
        style={styles.input}
        value={form.goalkeeperName}
        placeholder="Goalkeeper name"
        onChangeText={(value) => updateField('goalkeeperName', value)}
      />
      <TextInput
        style={styles.input}
        value={form.matchLabel}
        placeholder="Competition / match label"
        onChangeText={(value) => updateField('matchLabel', value)}
      />
      <TextInput
        style={[styles.input, styles.noteInput]}
        value={form.note}
        placeholder="Optional notes"
        multiline
        onChangeText={(value) => updateField('note', value)}
      />
      <Button title="Start live match" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fb',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  error: {
    marginBottom: 12,
    color: '#b91c1c',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d7dbe5',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  noteInput: {
    minHeight: 92,
    textAlignVertical: 'top',
  },
});
