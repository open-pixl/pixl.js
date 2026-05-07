# Getting Things Done for Open Pixl

Open Pixl uses a lightweight GTD flow so community reports do not become an
unstructured backlog.

## States

- `Inbox`: new item, captured without judgment.
- `Clarify`: needs details, reproduction steps, vendor data, logs, or a product
  decision.
- `Next`: clear next action exists and work can start.
- `Waiting`: blocked by reporter, maintainer, hardware, upstream, release, or
  external validation.
- `Scheduled`: accepted for a milestone, release, or dated maintenance window.
- `Someday`: valid idea, but not active.
- `Done`: completed, closed, shipped, documented, or intentionally declined with
  an explanation.

## Issue Types

The issue templates follow the PR #442 workflow:

- bug report,
- feature request,
- support question,
- documentation request,
- buyer link submission.

All new issues start in `gtd:inbox`. Maintainers clarify the next action and move
the label to one of the other GTD states.

## Spec Rule

Fixes can stay small. A spec is required only for changes that touch DFU,
bootloader, settings, protocol, i18n generation, persistent UX, compatibility, or
feature removal. Use `needs-spec` when that boundary is crossed.

## Closing Policy

Close issues with a short explanation and a pointer to the merged PR, release,
docs page, or reason the project cannot take the work. For support/vendor cases,
be explicit that Open Pixl does not endorse sellers and cannot validate every
hardware variant.
