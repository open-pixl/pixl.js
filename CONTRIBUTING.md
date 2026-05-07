# Contributing

Thanks for helping FreePixl. This project is community-run and non-commercial.

## Before Opening Work

- Use issue templates for bugs, features, support, docs, and buyer links.
- Small isolated fixes can go straight to a pull request.
- Changes touching DFU, bootloader, settings, protocol, generated i18n, or
  persistent UX need an SDD spec before implementation.
- Do not add copyrighted Nintendo material, Amiibo dumps, retail keys, or private
  signing keys.

## Pull Requests

- Keep changes scoped.
- Preserve compatibility with existing Pixl.js LCD and OLED hardware unless a
  spec explicitly accepts a migration.
- Include tests or manual verification notes.
- Update translations through `packages/i18n/locales/*.json`.
- Run `pnpm i18n:check` before submitting web or translation work.

## Firmware Releases

Pull request firmware builds use an ephemeral DFU key. Official release builds
use the `DFU_COMPAT_PRIVATE_KEY_PEM` GitHub secret. Never commit private key
material.
