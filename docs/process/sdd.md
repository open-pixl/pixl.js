# Specification-Driven Development

Open Pixl uses SDD when a change needs explicit product and compatibility
decisions before code lands.

## When a Spec Is Required

Create a spec before implementation when a change touches:

- DFU, OTA, bootloader, signing keys, or release artifacts,
- persistent settings, migrations, rollback, or defaults,
- protocol contracts between firmware, web, tools, or packages,
- i18n generators or firmware string generation,
- mobile web update UX or any persistent user-facing workflow,
- compatibility with existing Solosky Pixl.js behavior,
- hardware support policy,
- removal of imported upstream functionality.

Small isolated bug fixes do not need a spec when they preserve existing behavior
and do not affect persistent data or compatibility. Label those issues
`quick-fix`.

## Spec Lifecycle

1. Draft the spec from `docs/specs/TEMPLATE.md`.
2. Add `needs-spec` and `type:spec` to the tracking issue.
3. Review compatibility, rollback, and test plan before code starts.
4. Link implementation PRs back to the accepted spec.
5. Update release notes when the spec changes user-visible behavior.

## Decision Bias

Prefer simple, mobile-first flows that keep existing Pixl.js-compatible hardware
usable. Compatibility breaks need a clear user benefit, a migration path, and a
documented rollback.
