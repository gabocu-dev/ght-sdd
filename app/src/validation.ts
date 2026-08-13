export type SetupFormLike = {
  matchDate: string;
  opponentName: string;
  goalkeeperName: string;
  matchLabel: string;
  note?: string;
};

export function validateSetupForm(form: SetupFormLike): string[] {
  const errors: string[] = [];

  if (!form.matchDate || !/^\d{4}-\d{2}-\d{2}$/.test(form.matchDate.trim())) {
    errors.push('Match date is required in YYYY-MM-DD format.');
  }

  if (!form.opponentName || !form.opponentName.trim()) {
    errors.push('Opponent name is required.');
  }

  if (!form.goalkeeperName || !form.goalkeeperName.trim()) {
    errors.push('Goalkeeper name is required.');
  }

  if (!form.matchLabel || !form.matchLabel.trim()) {
    errors.push('Match label is required.');
  }

  return errors;
}
