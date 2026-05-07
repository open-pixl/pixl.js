# SPEC-0004: Mobile Web OTA

## Summary

Provide a simple GitHub Pages web app for Pixl.js-compatible update and device
workflows, with mobile browsers as the primary UX.

## Goals

- Use React, TypeScript, and Vite.
- Deploy to `https://freepixl.github.io/pixl.js/`.
- Set Vite `base` to `/pixl.js/`.
- Support macOS Chrome, macOS Edge, Android Chrome, and Android Edge.
- Provide iOS fallback instructions for nRF Connect and OTA zip download.

## Non-goals

- Promising Safari, Firefox, or iOS Web Bluetooth support.
- Requiring a custom domain.
- Replacing native recovery tools in v1.

## Compatibility Impact

Web tools should preserve Solosky-compatible firmware update expectations while
making the path simpler for mobile users.

## UX/API/Firmware Behavior

The first screen is the usable updater surface. It should detect Web Bluetooth
availability, let users pick OTA files, and clearly separate supported browsers
from fallback paths.

## Migration/Rollback

No device migration. Rollback is using a previous web release or native nRF
Connect with a downloaded OTA zip.

## Test Plan

- Build Vite app.
- Verify base path works under `/pixl.js/`.
- Manual checks on macOS Chrome, macOS Edge, Android Chrome, and Android Edge.

## Acceptance Criteria

- Pages workflow deploys `apps/web/dist`.
- UI is mobile-first and does not require a custom domain.
- Unsupported browsers get a download/fallback path.
