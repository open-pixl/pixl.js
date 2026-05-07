# Community Buyer Guide

FreePixl is non-commercial. This guide exists so users can share compatibility
reports for Pixl.js-compatible hardware. Links are not ads, affiliate links, paid
placements, sponsorships, or endorsements.

FreePixl does not sell hardware and does not guarantee that a listing is safe,
available, authentic, compatible, or legal in your region.

## How to Read Reports

Treat every entry as a community observation at a point in time. Vendors can
change boards, screens, bootloaders, batteries, and preinstalled firmware without
notice.

Check:

- LCD or OLED screen target,
- connector type,
- whether a battery is included,
- whether firmware is preinstalled,
- whether the reported firmware can be replaced,
- whether the device appears to include a key without asking anyone to share it,
- the last verification date and number of reports.

## Submit a Report

Use the "Buyer link submission" issue form. Do not submit affiliate links,
tracking links, private order pages, retail keys, Amiibo dumps, or personal
information.

Maintainers may edit, normalize, or remove entries when reports are stale,
incomplete, promotional, unsafe, or outside project scope.

## Vendor Data

Structured entries live in `docs/hardware/vendors.yml`. The schema is:

```yaml
- vendor: ""
  url: ""
  region: ""
  screen: ""
  connector: ""
  battery: ""
  firmware_preinstalled: ""
  reported_firmware: ""
  key_preinstalled: ""
  price_reported: ""
  last_verified: ""
  reports: []
```
