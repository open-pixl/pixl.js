# Upstream Policy

Upstream source: `https://github.com/solosky/pixl.js`

FreePixl keeps Solosky compatibility as the baseline, then applies FreePixl
product decisions through specs and review. The main firmware intentionally
excludes built-in games.

## Branches

- `main`: FreePixl development branch.
- `upstream/solosky-main`: imported Solosky `main` reference.
- `upstream/solosky-develop`: imported Solosky `develop` reference.

## Sync Cadence

A scheduled workflow opens a weekly issue summarizing upstream changes. Maintainers
triage those changes with GTD labels and request an SDD spec when a change touches
DFU, bootloader, settings, protocol, i18n generation, or persistent UX behavior.

## Compatibility Rule

FreePixl aims for 100% Solosky user-facing compatibility except for features
explicitly removed by spec. Any incompatible behavior needs:

- a linked spec,
- migration or rollback notes,
- release notes,
- test coverage or a documented manual test plan.
