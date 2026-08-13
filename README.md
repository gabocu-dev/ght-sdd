# Handball Goalkeeper Stats App

A mobile app for coaches and team staff to track detailed handball goalkeeper statistics during live matches, review the final summary immediately after the game, and compare completed matches on one device.

## Version 1 scope
- Start and manage a live match session for a specific goalkeeper.
- Log shot outcomes with required shot zone and shot type.
- Show running match statistics in real time.
- Undo only the most recent live event.
- Review completed match summaries.
- Compare completed matches side by side.
- Work fully offline on a single device.

## Non-goals for version 1
- Team-wide outfield player statistics.
- Cloud sync.
- Multi-user collaboration.
- Video analysis.
- Automated event capture.
- Advanced long-term trend dashboards.

## Project structure
- `constitution.md` — product rules and non-negotiable constraints.
- `specs/001-live-goalkeeper-tracking/spec.md` — approved feature specification.
- `specs/001-live-goalkeeper-tracking/plan.md` — implementation plan.
- `specs/001-live-goalkeeper-tracking/research.md` — technical and product decisions.
- `specs/001-live-goalkeeper-tracking/data-model.md` — domain entities and business rules.
- `specs/001-live-goalkeeper-tracking/tasks.md` — implementation backlog with dependencies.

## Key product decisions
- Platform: mobile app.
- Primary user: coach or team staff.
- Stack for first build: React Native + Expo.
- Data storage: local-only on device.
- Event detail: every shot stores outcome, shot zone, and shot type.
- Stats rule: missed-target shots count as shots faced.

## Next implementation focus
1. Scaffold the Expo app shell and navigation.
2. Build local persistence for sessions and events.
3. Implement the stats engine and live match workflow.
4. Add summary, history, and comparison flows.
5. Add tests for stats, undo, persistence, and comparison.
