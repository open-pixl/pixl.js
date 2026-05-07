# Open Pixl pixl.js

Open Pixl is a non-commercial community distribution for Pixl.js-compatible
hardware. The goal is to keep the firmware and web tools useful for current
devices while preserving compatibility with the existing Solosky Pixl.js
ecosystem.

This project is independent. It is not affiliated with Nintendo, Amiibo,
Solosky, Espruino, device vendors, marketplaces, or any commercial seller.
Open Pixl does not monetize links, releases, support, firmware, or community
reports.

## Scope

- Maintain Pixl.js-compatible firmware behavior from `solosky/pixl.js`.
- Keep compatibility with existing LCD and OLED bootloaders where feasible.
- Provide a mobile-first web updater at `https://open-pixl.github.io/pixl.js/`.
- Publish release artifacts with checksums, manifests, and provenance.
- Keep translations isolated in `packages/i18n` so new locales do not require
  touching unrelated application code.
- Exclude built-in games from the main Open Pixl firmware.

Open Pixl does not ship copyrighted Nintendo material, Amiibo dumps, retail
keys, or private DFU signing keys. Users are responsible for complying with the
laws and terms that apply in their jurisdiction.

## Repository Layout

```text
.github/              GitHub templates, labels, workflows, and automation
apps/web/             Mobile-first React/Vite web tools for GitHub Pages
apps/web-legacy/      Imported Solosky web app kept for compatibility research
docs/process/         SDD and GTD operating process
docs/specs/           Specification-driven development records
docs/hardware/        Hardware notes and community buyer guide
firmware/             Pixl.js-compatible firmware source
hardware/             Imported hardware files and BOMs
packages/i18n/        Locale source of truth and firmware generators
packages/protocol/    Shared TypeScript protocol package
```

## Development

The web and package workspace uses pnpm:

```sh
corepack enable
pnpm install
pnpm i18n:check
pnpm --filter @open-pixl/protocol build
pnpm --filter @open-pixl/web build
```

Firmware builds use the existing nRF52 SDK container flow. Pull requests use an
ephemeral DFU key. Releases use the `DFU_COMPAT_PRIVATE_KEY_PEM` GitHub secret
and never commit private key material to the repository.

## Process

- Use [SDD](docs/process/sdd.md) for changes that affect compatibility,
  persistent behavior, DFU, bootloader, settings, protocol, i18n generation, or
  user-facing workflows.
- Use [GTD](docs/process/gtd.md) for issue intake and maintainer flow.
- Use the [buyer guide](docs/hardware/buyer-guide.md) for community hardware
  reports. Buyer links are not ads, affiliate links, or endorsements.
- Track upstream policy in [UPSTREAM.md](UPSTREAM.md).

## License

Open Pixl is distributed under the GPL-2.0 license. See [LICENSE](LICENSE).

Portions of the codebase are imported from `solosky/pixl.js`; attribution and
compatibility notes are maintained in [NOTICE](NOTICE) and [UPSTREAM.md](UPSTREAM.md).
