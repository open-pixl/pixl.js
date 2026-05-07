# SPEC-0006: Buyer Guide

## Summary

Create a non-commercial community buyer guide for Pixl.js-compatible hardware
reports.

## Goals

- Track vendor/listing reports in `docs/hardware/vendors.yml`.
- Collect reports through a buyer link issue form.
- Make non-affiliation and non-endorsement explicit.

## Non-goals

- Selling hardware.
- Monetized links, affiliate programs, or paid placement.
- Certifying a vendor as official.

## Compatibility Impact

Buyer reports inform support and firmware compatibility triage. They do not make
unsupported hardware an automatic product commitment.

## UX/API/Firmware Behavior

Docs should help users identify screen type, connector, battery, preinstalled
firmware, and whether a key appears preinstalled without asking anyone to share
keys.

## Migration/Rollback

Remove or mark stale entries when reports become inaccurate. Keep report history
in git.

## Test Plan

- Validate `vendors.yml` fields.
- Verify issue form captures required report data.

## Acceptance Criteria

- Buyer guide and vendor data file exist.
- Issue #1 tracks community hardware reports.
- No affiliate or paid-placement language is present.
