# Copilot Instructions

You are working on the Handball Goalkeeper Stats App.

## Product context
- This is a mobile app for coaches and team staff.
- Version 1 is single-device and fully offline.
- The main feature is live goalkeeper match tracking with post-match review and basic match comparison.

## Non-negotiable rules
- Follow `constitution.md` before making product decisions.
- Use `specs/001-live-goalkeeper-tracking/spec.md` as the source of truth for feature behavior.
- Every shot event must include outcome, shot zone, and shot type.
- `missedTarget` counts toward `totalShotsFaced`.
- Only the most recent event may be undone during an active session.
- Do not add cloud sync, multi-user collaboration, video features, or advanced analytics to version 1 unless the artifacts are updated first.

## Engineering guidance
- Keep statistic calculations in pure domain logic that can be tested independently.
- Recompute derived statistics from ordered events instead of storing aggregates as the primary truth.
- Keep history, summary, and comparison views consistent by deriving them from the same stat engine.
- Optimize UI for real-time use: large touch targets, minimal friction, and clear context.
- Preserve offline behavior for all core flows.

## File reading order
1. `constitution.md`
2. `specs/001-live-goalkeeper-tracking/spec.md`
3. `specs/001-live-goalkeeper-tracking/plan.md`
4. `specs/001-live-goalkeeper-tracking/research.md`
5. `specs/001-live-goalkeeper-tracking/data-model.md`
6. `specs/001-live-goalkeeper-tracking/tasks.md`
