# HANDOFF

## Current state
This repository contains the Spec-Driven Development artifacts for the first feature of the Handball Goalkeeper Stats App: `001-live-goalkeeper-tracking`.

## What is defined
- Product constitution for version 1 scope and tradeoffs.
- Approved spec with user stories, requirements, acceptance criteria, and success criteria.
- Implementation plan for a React Native + Expo mobile app.
- Data model for sessions, events, derived stats, and comparison views.
- Research notes capturing the main technical decisions.
- Task backlog with dependencies and story mapping.

## Important constraints
- Single operator on a single device.
- Full offline support for core flows.
- Required shot outcome, shot zone, and shot type on every event.
- Only the most recent event can be undone during live tracking.
- Basic match comparison is in scope; advanced analytics are not.

## Critical business rule
`missedTarget` events count toward `totalShotsFaced` and must be treated consistently in live stats, summary stats, and comparison metrics.

## Recommended build order
1. T-001 to T-004: app shell, navigation, layout, domain types.
2. T-005 to T-014: persistence and domain services.
3. T-015 to T-025: setup and live tracking flows.
4. T-026 to T-030: summary, history, and comparison.
5. T-031 to T-038: validation, tests, and resilience.

## Files to read first
- `constitution.md`
- `specs/001-live-goalkeeper-tracking/spec.md`
- `specs/001-live-goalkeeper-tracking/plan.md`
- `specs/001-live-goalkeeper-tracking/data-model.md`
- `specs/001-live-goalkeeper-tracking/tasks.md`

## Expected next action
Implement the backlog starting with the Expo project shell and domain foundations.
