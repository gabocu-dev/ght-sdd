# Feature Specification: 001 Live Goalkeeper Tracking

## Overview
A mobile app that helps coaches and team staff capture goalkeeper performance during a live handball match. The first release focuses on structured in-match event logging, real-time goalkeeper statistics, immediate post-match review, and basic comparison across completed matches.

## Problem Statement
Coaches and team staff often track goalkeeper performance during matches with paper notes, memory, or ad hoc spreadsheets. These approaches are slow during live play, easy to misread or lose, and make it harder to review performance consistently after the game or compare one match to another. A focused mobile app is needed so staff can record live goalkeeper events with useful detail and produce trustworthy summaries and basic comparisons without extra cleanup work.

## Clarifications
- [CLARIFIED] Platform: mobile app.
- [CLARIFIED] Primary user: coach or team staff.
- [CLARIFIED] Initial release focus: live in-match stat tracking with post-match review.

## User Stories
- **US-001**: As a coach or team staff member, I want to create and start a match session for a specific goalkeeper, so that recorded statistics are tied to the correct player and game.
- **US-002**: As a coach or team staff member, I want to log each shot outcome with its zone and shot type during the match, so that goalkeeper performance is captured with enough detail to be useful later.
- **US-003**: As a coach or team staff member, I want to see running goalkeeper statistics during the match, so that I can understand current performance at a glance.
- **US-004**: As a coach or team staff member, I want to correct the most recent logging mistake, so that the match record remains accurate when live entry errors happen.
- **US-005**: As a coach or team staff member, I want to review a match summary immediately after the game, so that I can discuss goalkeeper performance with the team.
- **US-006**: As a coach or team staff member, I want to compare completed matches using key goalkeeper metrics, so that I can spot basic differences in performance between games.

## Functional Requirements
- **FR-001**: The system shall allow the user to create a match session with at least the match date, opponent name, goalkeeper name, and competition or match label.
- **FR-002**: The system shall allow the user to start and end a live match session.
- **FR-003**: The system shall allow the user to log a shot event as one of the following outcomes: save, goal conceded, shot missed target, penalty saved, or penalty conceded.
- **FR-004**: The system shall require every logged shot event to include a shot zone and shot type.
- **FR-005**: The system shall record the time of each logged event relative to the active match session.
- **FR-006**: The system shall update running match statistics immediately after each logged event.
- **FR-007**: The system shall display at least total shots faced, total saves, total goals conceded, penalty saves, penalty goals conceded, missed target count, and save percentage for the active match session.
- **FR-008**: The system shall allow the user to undo or delete the most recently logged event during an active match session.
- **FR-009**: The system shall allow the user to add an optional note to a match session for context such as opponent style, defensive issues, or goalkeeper observations.
- **FR-010**: The system shall present a match summary view after the session ends.
- **FR-011**: The system shall retain completed match sessions so the user can reopen and review them later.
- **FR-012**: The system shall allow the user to compare at least two completed match sessions using key goalkeeper metrics.
- **FR-013**: The system shall allow all version 1 core flows to work without an internet connection.
- **FR-014**: The system shall limit an active live match session to one user on one device in this release.
- **FR-015**: The system shall not support team-wide player statistics outside goalkeeper-focused match tracking in this release.

## MoSCoW Prioritization
### Must Have
- **FR-001**
- **FR-002**
- **FR-003**
- **FR-004**
- **FR-005**
- **FR-006**
- **FR-007**
- **FR-008**
- **FR-010**
- **FR-011**
- **FR-013**
- **FR-014**

### Should Have
- **FR-009**
- **FR-012**

### Could Have
- None for this release.

### Won't Have This Release
- **FR-015**

## Acceptance Criteria
- **AC-001**: Given a user creates a match session with the required fields, when the session is started, then the app shows that match as the active live session for the selected goalkeeper.
- **AC-002**: Given an active match session, when the user logs a save with a shot zone and shot type, then the total shots faced and total saves increase by one and the save percentage is recalculated.
- **AC-003**: Given an active match session, when the user logs a goal conceded with a shot zone and shot type, then the total shots faced and total goals conceded increase by one and the save percentage is recalculated.
- **AC-004**: Given an active match session, when the user logs a penalty saved or penalty conceded with a shot zone and shot type, then the corresponding penalty statistic is updated and the event is included in total shots faced.
- **AC-005**: Given the most recent event was logged in error, when the user removes that event, then all affected running statistics are recalculated to reflect the corrected event list.
- **AC-006**: Given a match session has ended, when the user opens the summary, then the app shows the final goalkeeper statistics for that match.
- **AC-007**: Given completed match sessions exist, when the user selects at least two sessions for comparison, then the app shows their key goalkeeper metrics side by side.
- **AC-008**: Given the device has no internet connection, when the user performs any core version 1 workflow, then the app still allows the workflow to complete successfully.

## Success Criteria
- **SC-001**: A coach or staff member can start a new live match session in under 60 seconds.
- **SC-002**: A coach or staff member can log a shot outcome with its required detail in no more than 4 interactions during active tracking.
- **SC-003**: The app can produce a complete end-of-match summary for every completed match session.
- **SC-004**: A coach or staff member can compare two completed matches in under 30 seconds.

## Scope Boundaries
### In Scope
- Live goalkeeper match session setup.
- Real-time logging of goalkeeper shot outcomes.
- Required shot zone and shot type capture.
- Running match statistics during the game.
- Correction of the most recent logging mistake.
- Immediate post-match goalkeeper summary.
- Reopening prior completed match summaries.
- Basic comparison across completed matches.
- Full offline use of all core workflows.

### Out of Scope
- Team-wide outfield player statistics.
- Video analysis or clip attachment.
- Automatic event detection.
- Multi-user collaboration during the same live match session.
- Cloud synchronization.
- Advanced trend dashboards and deep analytics beyond basic match comparison.
