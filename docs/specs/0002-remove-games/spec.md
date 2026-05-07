# SPEC-0002: Remove Built-In Games

## Summary

Open Pixl imports Solosky firmware compatibility while removing built-in games
from the main firmware.

## Goals

- Reduce firmware size pressure and maintenance surface.
- Keep the product focused on firmware, web tools, DFU, settings, and NFC flows.
- Remove game source, menu entries, icons, strings, and docs from the main branch.

## Non-goals

- Maintaining a game branch.
- Replacing games with a different entertainment feature.

## Compatibility Impact

Users lose the built-in game app from the main firmware. All non-game Solosky
features remain in scope for compatibility.

## UX/API/Firmware Behavior

The app launcher must not show a game entry. Firmware should not define
`APP_GAME_ENABLE`, `MINI_APP_ID_GAME`, game strings, or game icons.

## Migration/Rollback

No persistent data migration is required. Rollback means flashing a firmware
release that still includes the removed app.

## Test Plan

- Search firmware and docs for removed game symbols.
- Build LCD and OLED firmware.
- Manually verify app launcher contents.

## Acceptance Criteria

- Game source and docs are absent from the main firmware tree.
- Firmware builds do not reference game symbols.
- Release notes call out the removal.
