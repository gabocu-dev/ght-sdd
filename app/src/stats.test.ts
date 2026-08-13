import assert from 'node:assert/strict';
import test from 'node:test';

import { buildComparisonMetrics, calculateSessionStats } from './stats';
import { MatchEvent, MatchSession } from './types';

const sampleEvents: MatchEvent[] = [
  { id: '1', sessionId: 's1', eventType: 'save', shotArea: 'center', shotType: 'quick', elapsedSeconds: 12, createdAt: '2026-01-01T00:00:12.000Z' },
  { id: '2', sessionId: 's1', eventType: 'goalConceded', shotArea: 'left', shotType: 'jump', elapsedSeconds: 40, createdAt: '2026-01-01T00:00:40.000Z' },
  { id: '3', sessionId: 's1', eventType: 'missedTarget', shotArea: 'right', shotType: 'backhand', elapsedSeconds: 68, createdAt: '2026-01-01T00:01:08.000Z' },
  { id: '4', sessionId: 's1', eventType: 'penaltySaved', shotArea: 'center', shotType: 'set', elapsedSeconds: 150, createdAt: '2026-01-01T00:02:30.000Z' },
];

test('calculateSessionStats counts missed-target shots as shots faced and includes penalties in save rate', () => {
  const stats = calculateSessionStats(sampleEvents);

  assert.equal(stats.totalShotsFaced, 4);
  assert.equal(stats.totalSaves, 1);
  assert.equal(stats.totalGoalsConceded, 1);
  assert.equal(stats.missedTargetCount, 1);
  assert.equal(stats.penaltySaves, 1);
  assert.equal(stats.savePercentage, 50);
});

test('buildComparisonMetrics derives comparable summary rows', () => {
  const sessions: MatchSession[] = [
    { id: 'a', matchDate: '2026-01-01', opponentName: 'Alpha', goalkeeperName: 'A', matchLabel: 'Match A', status: 'completed', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:03:00.000Z', events: sampleEvents },
    { id: 'b', matchDate: '2026-01-02', opponentName: 'Beta', goalkeeperName: 'A', matchLabel: 'Match B', status: 'completed', createdAt: '2026-01-02T00:00:00.000Z', updatedAt: '2026-01-02T00:02:00.000Z', events: [
      { id: '5', sessionId: 'b', eventType: 'save', shotArea: 'center', shotType: 'quick', elapsedSeconds: 10, createdAt: '2026-01-02T00:00:10.000Z' },
      { id: '6', sessionId: 'b', eventType: 'goalConceded', shotArea: 'left', shotType: 'jump', elapsedSeconds: 25, createdAt: '2026-01-02T00:00:25.000Z' },
      { id: '7', sessionId: 'b', eventType: 'save', shotArea: 'right', shotType: 'wrist', elapsedSeconds: 55, createdAt: '2026-01-02T00:00:55.000Z' },
    ] },
  ];

  const metrics = buildComparisonMetrics(sessions);

  assert.equal(metrics.length, 2);
  assert.equal(metrics[0].totalShotsFaced, 4);
  assert.equal(metrics[0].savePercentage, 50);
  assert.equal(metrics[1].totalShotsFaced, 3);
  assert.equal(metrics[1].savePercentage, 66.7);
});
