# SPEC-0003: CI DFU Key Flow

## Summary

DFU signing keys must never be committed. Pull request builds use an ephemeral
key; release builds use the `DFU_COMPAT_PRIVATE_KEY_PEM` GitHub secret.

## Goals

- Support compatible OTA releases for existing Pixl.js bootloaders.
- Keep release key material out of git, logs, and artifacts.
- Prevent pull request builds from producing official OTA packages.

## Non-goals

- Rotating existing user bootloader keys without a separate migration spec.
- Publishing private keys, retail keys, or vendor keys.

## Compatibility Impact

Release OTA packages remain compatible with bootloaders that trust the
corresponding public key. PR builds are for testing only.

## UX/API/Firmware Behavior

Release artifacts include LCD zip, OLED zip, internal OTA zip, full hex,
checksums, manifest, and attestations. PR artifacts are clearly non-release.

## Migration/Rollback

If the release key changes, a bootloader migration spec is required. Rollback is
full hex recovery or a prior release signed by the installed bootloader key.

## Test Plan

- Verify `.gitignore` blocks private key filenames.
- Verify release workflow writes the secret only to `$RUNNER_TEMP`.
- Verify PR workflow generates an ephemeral key.

## Acceptance Criteria

- `firmware/bootloader/priv.pem` is not tracked.
- Release workflow requires `DFU_COMPAT_PRIVATE_KEY_PEM`.
- PR workflow builds with a temporary key and does not publish final OTA.
