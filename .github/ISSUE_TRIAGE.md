# FreePixl Issue Triage

This is the FreePixl adaptation of the lightweight issue flow introduced in the
Solosky PR #442 work.

## Intake

Use issue forms for:

- bug reports,
- feature requests,
- support questions,
- documentation requests,
- buyer link submissions.

Every new issue starts in `gtd:inbox`. Maintainers move it to `gtd:clarify`,
`gtd:next`, `gtd:waiting`, `gtd:scheduled`, `gtd:someday`, or Done by closing it
with a clear explanation.

## Required Specs

Small fixes can use `quick-fix`. Add `needs-spec` before implementation when an
issue touches:

- DFU, OTA, signing, bootloader, or release artifacts,
- settings persistence, migration, or rollback,
- protocol contracts,
- i18n generation,
- persistent mobile/web UX,
- compatibility with imported Solosky behavior,
- feature removal.

## Labels

The canonical label list lives in `.github/labels.yml`. The helper script can
create/update those labels and apply conservative area/spec labels:

```sh
python3 .github/scripts/apply_issue_triage.py --repo freepixl/pixl.js --apply
python3 .github/scripts/apply_issue_triage.py --repo freepixl/pixl.js --issue 1 --apply
```

The script is dry-run by default.
