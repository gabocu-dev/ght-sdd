import AsyncStorage from '@react-native-async-storage/async-storage';

export const GOALKEEPERS_KEY = 'goalkeeper-stats.goalkeepers.v1';
export const TOURNAMENTS_KEY = 'goalkeeper-stats.tournaments.v1';

export async function loadGoalkeepers(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(GOALKEEPERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(Boolean).map(String) : [];
  } catch (error) {
    console.warn('Failed to load goalkeepers', error);
    return [];
  }
}

export async function saveGoalkeepers(goalkeepers: string[]): Promise<void> {
  await AsyncStorage.setItem(GOALKEEPERS_KEY, JSON.stringify(goalkeepers));
}

export async function loadTournaments(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(TOURNAMENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(Boolean).map(String) : [];
  } catch (error) {
    console.warn('Failed to load tournaments', error);
    return [];
  }
}

export async function saveTournaments(tournaments: string[]): Promise<void> {
  await AsyncStorage.setItem(TOURNAMENTS_KEY, JSON.stringify(tournaments));
}
