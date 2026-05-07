# SPEC-0001: Repo Governance

## Summary

Create FreePixl as a public, non-commercial, GPL-2.0 community repository for
Pixl.js-compatible firmware and web tools.

## Goals

- Keep the project independent from commercial vendors and upstream maintainers.
- Preserve attribution to `solosky/pixl.js`.
- Keep GitHub Pages, docs, packages, releases, and process files in the repo.

## Non-goals

- Monetization, affiliate programs, paid listings, or vendor partnerships.
- Shipping copyrighted keys, dumps, or private signing material.

## Compatibility Impact

Governance does not change firmware behavior. It defines how future behavior
changes are reviewed and released.

## UX/API/Firmware Behavior

Users should see clear disclaimers in README, docs, issues, and buyer guide.
Maintainers should use labels and specs to make product decisions visible.

## Migration/Rollback

No data migration. Governance changes can be amended by pull request.

## Test Plan

- Verify README, NOTICE, CONTRIBUTING, SECURITY, SDD, and GTD exist.
- Verify labels and issue templates represent the process.

## Acceptance Criteria

- Repository has GPL-2.0 license and non-commercial disclaimers.
- Upstream attribution and sync policy are documented.
- CODEOWNERS, labels, and issue templates are present.
