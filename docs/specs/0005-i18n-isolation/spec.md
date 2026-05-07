# SPEC-0005: I18n Isolation

## Summary

Move translation ownership to `packages/i18n/locales/*.json` and generate
firmware string files from that source.

## Goals

- Keep locale data isolated from feature code.
- Let web consume JSON locales directly.
- Generate firmware `string_id.h` and locale `.c` files.
- Fail CI on missing keys, placeholder mismatch, hardcoded new UI text, or stale
  generated output.

## Non-goals

- Rewriting all firmware screens in the bootstrap commit.
- Replacing existing community translations without review.

## Compatibility Impact

String IDs become generated assets. Existing IDs must remain stable unless a spec
accepts a migration.

## UX/API/Firmware Behavior

Feature code requests strings by ID or key. Translators edit locale JSON only.

## Migration/Rollback

Adopt generated firmware files in stages. Rollback means restoring checked-in
generated files from the previous release.

## Test Plan

- `pnpm i18n:check`
- `pnpm i18n:generate-firmware`
- CI diff check for generated output.

## Acceptance Criteria

- Locale JSON exists under `packages/i18n/locales`.
- Firmware generator exists.
- CI checks locale key parity and placeholder parity.
