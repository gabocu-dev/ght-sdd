# Implementation Plan: 001 Live Goalkeeper Tracking

## Summary
Build the first version as a React Native + Expo mobile application focused on single-device live match tracking for handball goalkeepers. The app will store all data locally on the device, require structured event detail for every logged shot, provide immediate post-match review, and support basic side-by-side comparison of completed matches without requiring network access or user accounts.

## Technical Approach
### Application Structure
- A single Expo app with screen-based navigation for match setup, live tracking, match summary, match history, and match comparison.
- Local persistence for match sessions and shot events.
- A small domain layer responsible for event recording, stat recalculation, comparison metrics, and session lifecycle rules.
- Presentation components optimized for large touch targets and low-friction logging while still capturing required event detail.

### Proposed Modules
- **Match Setup**: create a new goalkeeper match session with required fields and optional notes.
- **Live Tracking**: active match timer, event logging flow, current stat cards, and recent event history.
- **Match Summary**: final statistics and timeline once a match session ends.
- **History**: list of completed match sessions and ability to reopen one for review.
- **Comparison**: select completed sessions and compare key goalkeeper metrics side by side.
- **Stats Engine**: pure functions that convert event history into running and final goalkeeper statistics.
- **Local Storage Layer**: device persistence for sessions and events.

## Architecture Decisions
### Frontend
- **Framework**: React Native with Expo.
- **Navigation**: screen-based flow for setup, active session, summary, history, and comparison.
- **State Strategy**: local app state plus a focused domain store for the active session and selected comparisons.
- **UX Constraint**: event logging must capture outcome, zone, and shot type without forcing the user through long-form data entry.

### Persistence
- **Storage Mode**: local-only device storage for v1.
- **Persistence Choice**: structured local database suitable for storing sessions and events, with repository-style access from the app.
- **Offline Behavior**: all primary flows must work without connectivity.

### Domain Logic
- Store match events as append-only records during tracking.
- Recompute statistics from the event list to keep live stats, summary, and comparison results consistent.
- Restrict delete/undo during active tracking to the most recent event.
- Record timestamps relative to session start.
- Compare only completed sessions using a shared derived-metrics pipeline.

## Screen Plan
### 1. Match Setup Screen
- Required inputs: date, opponent, goalkeeper, competition or match label.
- Optional note field.
- Primary action: start match.

### 2. Live Tracking Screen
- Active match header with elapsed time.
- Fast entry flow for event outcome, shot zone, and shot type.
- Running statistics panel.
- Recent event list.
- Undo last event action.
- End match action.

### 3. Match Summary Screen
- Final stat cards.
- Event totals and optional notes.
- Action to return to history or start another match.

### 4. Match History Screen
- List of completed sessions.
- Open a selected match summary in read-only mode.
- Select sessions for comparison.

### 5. Match Comparison Screen
- Side-by-side display of key goalkeeper metrics.
- Quick view of opponent, date, and match label.
- Clear path back to history or summary.

## Data Flow
1. User creates a match session.
2. App persists session as active.
3. User logs outcome, shot zone, and shot type during the match.
4. Each event is stored locally and passed through the stats engine.
5. UI updates running totals immediately.
6. User ends match.
7. App marks session completed and shows summary.
8. Completed sessions remain available in history.
9. User selects completed sessions for basic comparison.
10. App derives comparable metrics and renders them side by side.

## Constraints and Non-Goals
- No cloud sync in v1.
- No multi-user collaboration.
- No team-wide player analytics.
- No automatic import, wearable integration, or video linkage.
- No advanced season dashboards beyond basic match comparison.

## Risks and Mitigations
- **Risk**: required event detail slows live stat entry.
  **Mitigation**: use fast selection controls, layout optimization, and pre-grouped options.
- **Risk**: incorrect stats after undo/delete.
  **Mitigation**: centralize all stat calculations in pure domain functions derived from event history.
- **Risk**: comparison metrics become inconsistent with summaries.
  **Mitigation**: derive comparison values from the same stat engine used by live and summary views.
- **Risk**: ambiguous event counting rules affect confidence in stats.
  **Mitigation**: explicitly confirm the handling of missed-target events before finalizing the stats engine.

## Validation Strategy
- Unit-test the stats engine against event sequences and undo scenarios.
- Unit-test comparison metrics against multiple completed-session datasets.
- Test the active-session flow from setup through end-of-match summary.
- Validate local persistence by closing and reopening the app with saved completed sessions.
- Validate basic comparison selection and rendering from stored historical sessions.

## Delivery Sequence
1. Scaffold Expo mobile app structure.
2. Implement local data model and storage repositories.
3. Build stats engine and match lifecycle logic.
4. Build setup and live tracking screens.
5. Add summary and history screens.
6. Add comparison flow.
7. Add tests for core stat logic, comparison logic, and persistence behavior.
