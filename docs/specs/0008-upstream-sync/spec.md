# SPEC-0008: Upstream Sync

## Summary

FreePixl regularly reviews Solosky changes and imports compatible fixes while
keeping FreePixl product decisions visible.

## Goals

- Track upstream `main` and `develop`.
- Open a weekly issue with upstream changes.
- Classify imports with `type:upstream` and area labels.
- Require specs for compatibility-sensitive upstream changes.

## Non-goals

- Blindly mirroring every upstream branch.
- Reintroducing features removed by FreePixl specs.

## Compatibility Impact

Sync improves compatibility, but each imported change must respect FreePixl
scope and release policy.

## UX/API/Firmware Behavior

Users should see upstream-derived fixes in release notes with attribution.

## Migration/Rollback

Revert imported changes through normal pull requests. If an upstream change
requires migration, document rollback in its spec.

## Test Plan

- Weekly sync workflow creates or updates a tracking issue.
- Imported commits pass CI and firmware builds.

## Acceptance Criteria

- Upstream remotes and branches are documented.
- Scheduled sync workflow exists.
- Sync issues use `type:upstream`.
