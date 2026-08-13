# Data Model: 001 Live Goalkeeper Tracking

## Entities

### MatchSession
Represents one tracked handball match for one goalkeeper.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | string | Yes | Unique session identifier |
| matchDate | string | Yes | Calendar date of the match |
| opponentName | string | Yes | Opposing team name |
| goalkeeperName | string | Yes | Goalkeeper being tracked |
| matchLabel | string | Yes | Competition or match label |
| note | string | No | Optional match context |
| status | enum | Yes | `active` or `completed` |
| startedAt | string | No | Device timestamp when tracking begins |
| endedAt | string | No | Device timestamp when tracking ends |
| createdAt | string | Yes | Device timestamp for record creation |
| updatedAt | string | Yes | Device timestamp for last update |

### MatchEvent
Represents one logged goalkeeper event within a match.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | string | Yes | Unique event identifier |
| sessionId | string | Yes | Parent match session |
| eventType | enum | Yes | `save`, `goalConceded`, `missedTarget`, `penaltySaved`, `penaltyConceded` |
| shotArea | string | Yes | Required zone of the shot |
| shotType | string | Yes | Required type of shot |
| elapsedSeconds | number | Yes | Seconds since match session start |
| createdAt | string | Yes | Device timestamp when event was logged |

### SessionStats
Derived object produced from a session's event list.

| Field | Type | Notes |
| --- | --- | --- |
| totalShotsFaced | number | Includes saves, goals conceded, penalties, and missed-target events |
| totalSaves | number | Save events |
| totalGoalsConceded | number | Goal conceded events |
| penaltySaves | number | Penalty saved events |
| penaltyGoalsConceded | number | Penalty conceded events |
| missedTargetCount | number | Shot missed target events |
| savePercentage | number | Derived percentage using the approved total-shots-faced rule |
| lastEventId | string | Useful for undo-last-event logic |

### MatchComparison
Derived object used for side-by-side review of completed sessions.

| Field | Type | Notes |
| --- | --- | --- |
| sessionIds | string[] | Compared matches |
| comparedMetrics | object[] | Metrics per session for side-by-side display |
| generatedAt | string | Device timestamp for the comparison view generation |

## Relationships
- One **MatchSession** has many **MatchEvent** records.
- One **SessionStats** object is derived from one **MatchSession** plus all its **MatchEvent** records.
- One **MatchComparison** object is derived from two or more completed **MatchSession** records and their derived stats.

## Business Rules
- Only one match session can be `active` at a time on a device.
- A user can undo or delete only the most recently logged event while the session is active.
- Completed sessions are read-only in version 1 review flows.
- Statistics must be recalculated from the persisted event list instead of stored as the single source of truth.
- Event logging requires outcome, shot area, and shot type for every recorded shot.
- Missed-target events count toward total shots faced.
- Comparison is allowed only for completed sessions.

## Indexing and Access Patterns
- Load active session quickly by `status = active`.
- Load events by `sessionId` sorted by `createdAt` or elapsed time.
- Load completed sessions ordered by `matchDate` descending, then `createdAt` descending.
- Load selected completed sessions by `id IN (...)` for side-by-side comparison.
