# Research Notes: 001 Live Goalkeeper Tracking

## Decision 1: Mobile Delivery Approach
### Decision
Use React Native with Expo for the first implementation.

### Rationale
- The product is mobile-first and needs quick iteration on real-device workflows.
- Expo reduces setup and makes it easier to validate the live tracking UX early.
- The app does not require unusual native integrations in version 1.

### Implications
- Screen navigation, local persistence, and form handling should follow Expo-friendly patterns.
- Future native customization remains possible if later requirements exceed Expo defaults.

## Decision 2: Local Persistence Model
### Decision
Use a structured local database rather than a simple key-value store.

### Rationale
- The domain has relational data: one match session contains many ordered match events.
- The app must support reliable reopening of sessions, history queries, and side-by-side comparison across matches.
- Structured queries simplify filtering completed sessions and rebuilding statistics from event history.

### Implications
- Repositories should treat stored sessions and stored events as separate but related records.
- The active session should be recoverable after app restarts.

## Decision 3: Statistic Calculation Strategy
### Decision
Derive all running and final statistics from the ordered event list instead of storing stats as the primary source of truth.

### Rationale
- Undo-last-event behavior is simpler and safer when stats are recalculated from events.
- Derived statistics reduce the chance of data drift between live view, summary view, and comparison view.
- Testing pure stat functions is straightforward and gives high confidence.

### Implications
- Domain logic should expose pure functions for stat calculation.
- Persistence should store canonical event records, not only aggregates.

## Decision 4: Live Entry UX Tradeoff
### Decision
Prioritize recording useful detail even if live entry takes more interactions than the fastest possible design.

### Rationale
- The constitution requires every event to capture outcome, zone, and shot type.
- The user explicitly values detail when speed and detail cannot both be optimized fully.
- Richer event detail increases the usefulness of later review and comparison.

### Implications
- The live logging flow should still minimize friction, but cannot omit required fields.
- UI design should use fast selection patterns, defaults, and large targets to offset the extra detail.

## Decision 5: Comparison Scope for Version 1
### Decision
Provide basic comparison between completed matches, not advanced longitudinal analytics.

### Rationale
- The user wants more than simple history reopening.
- Basic side-by-side comparison adds immediate coaching value without requiring dashboard-heavy analytics.
- Advanced trends would expand scope materially and are better deferred.

### Implications
- Version 1 comparison can focus on key metrics such as shots faced, saves, goals conceded, penalties, and save percentage.
- Cross-match charts, season trends, and cohort analysis stay out of scope.

## Decision 6: Missed-Target Counting Rule
### Decision
A shot that misses the target counts as a shot faced for version 1 statistics.

### Rationale
- The user explicitly confirmed that missed-target events should be included in goalkeeper shot totals.
- This keeps total shot volume aligned with all observed attempts in the tracked sequence.

### Implications
- The stats engine must include `missedTarget` events in `totalShotsFaced`.
- Save percentage calculations must use the same inclusion rule consistently in live, summary, and comparison views.
