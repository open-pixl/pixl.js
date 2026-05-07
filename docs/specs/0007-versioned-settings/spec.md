# SPEC-0007: Versioned Settings

## Summary

Settings persistence must support versioned migration so new fields can be added
without breaking existing devices.

## Goals

- Preserve existing settings when adding fields such as screen flip or return key.
- Validate stored values before use.
- Provide rollback notes for incompatible changes.

## Non-goals

- Changing settings file format without migration.
- Treating corrupt settings as unrecoverable.

## Compatibility Impact

Existing settings files should load with defaults for new fields. Invalid values
should be reset to safe defaults.

## UX/API/Firmware Behavior

Users keep their preferences after update. New settings appear disabled or
unconfigured by default unless a spec says otherwise.

## Migration/Rollback

Every settings version bump documents old and new fields. Rollback should either
ignore unknown data safely or provide a recovery path.

## Test Plan

- Unit or host tests for serialized settings versions where available.
- Manual flash/update test with old settings.
- Corrupt settings recovery test.

## Acceptance Criteria

- Settings version is explicit.
- New fields have defaults and validation.
- Recovery from invalid settings is documented.
