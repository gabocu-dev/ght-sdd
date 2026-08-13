# Contributing

## Working model
This project follows Spec-Driven Development. Before implementing changes, read the constitution and the current feature artifacts.

## Required reading order
1. `constitution.md`
2. `specs/001-live-goalkeeper-tracking/spec.md`
3. `specs/001-live-goalkeeper-tracking/plan.md`
4. `specs/001-live-goalkeeper-tracking/research.md`
5. `specs/001-live-goalkeeper-tracking/data-model.md`
6. `specs/001-live-goalkeeper-tracking/tasks.md`

## Contribution rules
- Preserve the product constitution unless a deliberate product decision changes it.
- Keep specs business-focused and free of unnecessary technology leakage.
- Keep implementation traceable to tasks and user stories.
- Do not expand v1 scope with cloud sync, multi-user support, or advanced analytics unless the artifacts are updated first.
- Keep all core flows working offline.
- Treat event-detail capture as mandatory: every shot event needs outcome, shot zone, and shot type.
- Treat `missedTarget` as part of `totalShotsFaced` in all stat calculations.

## Delivery expectations
- Favor pure domain logic for statistic calculations.
- Add automated coverage for stat derivation, undo behavior, persistence, and match comparison.
- Keep UI optimized for real match usage with large touch targets and minimal friction.

## Branch and PR guidance
- Keep changes scoped to one task or a small related task group.
- Reference the relevant `T-` tasks and `US-` stories in pull requests.
- Update SDD artifacts first if the product behavior or scope changes.
