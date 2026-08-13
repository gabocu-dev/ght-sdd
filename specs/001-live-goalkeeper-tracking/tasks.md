# Task Breakdown: 001 Live Goalkeeper Tracking

## Epic Goal
Deliver a React Native + Expo mobile app that lets coaches or team staff track detailed goalkeeper shot outcomes live during a handball match, review a local post-match summary, and compare completed matches on one device without internet access.

## Tasks

### Foundation
- **T-001**: Initialize Expo application shell.
- **T-002**: Configure navigation routes for setup, live tracking, summary, history, and comparison.
- **T-003**: Establish shared screen layout, spacing, and touch-target conventions for match-day use.
- **T-004**: Define domain types for sessions, events, stats, and comparison payloads.

### Persistence and Domain
- **T-005**: Design the local persistence schema for match sessions.
- **T-006**: Design the local persistence schema for match events.
- **T-007**: Implement repository operations for creating, updating, and loading match sessions.
- **T-008**: Implement repository operations for creating, listing, and deleting match events.
- **T-009**: Implement active-session recovery on app restart.
- **T-010**: Build the session lifecycle service for create, start, end, and reopen flows.
- **T-011**: Build the stats calculation engine from ordered event history.
- **T-012**: Implement the rule that missed-target events count toward total shots faced.
- **T-013**: Build undo-last-event logic for active sessions.
- **T-014**: Build comparison metric derivation for completed sessions.

### Match Setup and Live Tracking
- **T-015**: Build the match setup form with required fields.
- **T-016**: Add optional session notes to the setup flow.
- **T-017**: Build the live match header with elapsed time and session context.
- **T-018**: Build the event-outcome selector for active tracking.
- **T-019**: Build the shot-zone selector required for every event.
- **T-020**: Build the shot-type selector required for every event.
- **T-021**: Connect the live event-entry flow to storage and stat recomputation.
- **T-022**: Build the running statistics panel.
- **T-023**: Build the recent-event history list on the live tracking screen.
- **T-024**: Add undo-last-event controls and confirmation behavior.
- **T-025**: Add end-match behavior and completed-session transition.

### Review and Comparison
- **T-026**: Build the match summary screen for completed sessions.
- **T-027**: Build the completed-session history screen.
- **T-028**: Add selection controls for comparing completed matches.
- **T-029**: Build the side-by-side comparison screen for key goalkeeper metrics.
- **T-030**: Add summary-to-history and history-to-comparison navigation paths.

### Validation and Polish
- **T-031**: Add form validation for required setup fields.
- **T-032**: Add guardrails so only one active session can exist at a time.
- **T-033**: Add offline-state resilience tests for core flows.
- **T-034**: Add unit tests for stat calculation sequences.
- **T-035**: Add unit tests for undo-last-event behavior.
- **T-036**: Add unit tests for comparison metric generation.
- **T-037**: Add integration coverage for setup-to-summary flow.
- **T-038**: Add integration coverage for history reload and comparison flow.

## Dependency Graph
- **T-002** depends on **T-001**
- **T-003** depends on **T-001**
- **T-004** depends on **T-001**
- **T-005** depends on **T-004**
- **T-006** depends on **T-004**
- **T-007** depends on **T-005**
- **T-008** depends on **T-006**
- **T-009** depends on **T-007**, **T-008**
- **T-010** depends on **T-007**, **T-009**
- **T-011** depends on **T-004**, **T-008**
- **T-012** depends on **T-011**
- **T-013** depends on **T-008**, **T-011**
- **T-014** depends on **T-011**, **T-007**
- **T-015** depends on **T-002**, **T-003**
- **T-016** depends on **T-015**
- **T-017** depends on **T-002**, **T-010**
- **T-018** depends on **T-017**
- **T-019** depends on **T-017**
- **T-020** depends on **T-017**
- **T-021** depends on **T-018**, **T-019**, **T-020**, **T-008**, **T-011**, **T-012**
- **T-022** depends on **T-021**
- **T-023** depends on **T-021**
- **T-024** depends on **T-013**, **T-023**
- **T-025** depends on **T-021**, **T-024**
- **T-026** depends on **T-025**, **T-011**
- **T-027** depends on **T-007**, **T-025**
- **T-028** depends on **T-027**
- **T-029** depends on **T-014**, **T-028**
- **T-030** depends on **T-026**, **T-027**, **T-029**
- **T-031** depends on **T-015**
- **T-032** depends on **T-010**
- **T-033** depends on **T-009**, **T-025**, **T-027**
- **T-034** depends on **T-011**, **T-012**
- **T-035** depends on **T-013**
- **T-036** depends on **T-014**
- **T-037** depends on **T-015**, **T-021**, **T-025**, **T-026**
- **T-038** depends on **T-027**, **T-029**, **T-033**

## Mapping to User Stories
- **US-001** -> **T-005**, **T-007**, **T-010**, **T-015**, **T-031**
- **US-002** -> **T-011**, **T-012**, **T-018**, **T-019**, **T-020**, **T-021**
- **US-003** -> **T-011**, **T-017**, **T-022**, **T-023**
- **US-004** -> **T-013**, **T-024**, **T-035**
- **US-005** -> **T-025**, **T-026**, **T-037**
- **US-006** -> **T-014**, **T-027**, **T-028**, **T-029**, **T-036**, **T-038**

## Suggested Execution Order
1. **T-001** to **T-004**
2. **T-005** to **T-014**
3. **T-015** to **T-025**
4. **T-026** to **T-030**
5. **T-031** to **T-038**
