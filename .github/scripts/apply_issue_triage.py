#!/usr/bin/env python3
"""Apply conservative Open Pixl issue labels.

The script is intentionally small:
- dry-run is the default;
- label creation is safe to run repeatedly;
- issue classification only adds labels, never closes issues.
"""

from __future__ import annotations

import argparse
import json
import subprocess
from dataclasses import dataclass
from typing import Any


LABELS: dict[str, dict[str, str]] = {
    "gtd:inbox": {"color": "ededed", "description": "New item that has not been clarified"},
    "gtd:clarify": {"color": "d4c5f9", "description": "Needs clarification"},
    "gtd:next": {"color": "0e8a16", "description": "Ready for a concrete next action"},
    "gtd:waiting": {"color": "fbca04", "description": "Waiting on input or release"},
    "gtd:scheduled": {"color": "1d76db", "description": "Planned for a milestone"},
    "gtd:someday": {"color": "cfd3d7", "description": "Accepted but not scheduled"},
    "type:bug": {"color": "d73a4a", "description": "Reproducible defect"},
    "type:feature": {"color": "a2eeef", "description": "Feature or behavior change"},
    "type:docs": {"color": "0075ca", "description": "Documentation work"},
    "type:support": {"color": "7057ff", "description": "Usage or troubleshooting support"},
    "type:spec": {"color": "5319e7", "description": "Specification work"},
    "type:upstream": {"color": "bfd4f2", "description": "Upstream sync or compatibility"},
    "area:firmware": {"color": "0e8a16", "description": "Firmware behavior"},
    "area:web": {"color": "1d76db", "description": "Web tools"},
    "area:i18n": {"color": "c2e0c6", "description": "Translations or generators"},
    "area:dfu": {"color": "fbca04", "description": "DFU, OTA, signing, or releases"},
    "area:hardware": {"color": "d93f0b", "description": "Hardware reports and support"},
    "area:docs": {"color": "0075ca", "description": "Docs and templates"},
    "area:infra": {"color": "6f42c1", "description": "CI, packages, or automation"},
    "needs-spec": {"color": "b60205", "description": "Requires an SDD spec"},
    "quick-fix": {"color": "c5def5", "description": "Small isolated fix"},
    "non-commercial": {"color": "fef2c0", "description": "Non-commercial policy"},
    "no-games": {"color": "eeeeee", "description": "Main firmware excludes built-in games"},
}


@dataclass(frozen=True)
class Rule:
    label: str
    terms: tuple[str, ...]


AREA_RULES: tuple[Rule, ...] = (
    Rule("area:dfu", ("dfu", "ota", "bootloader", "signing", "release key")),
    Rule("area:firmware", ("firmware", "nfc", "amiibo", "settings", "return key", "display")),
    Rule("area:web", ("web", "browser", "chrome", "edge", "pages", "vite", "mobile")),
    Rule("area:i18n", ("translation", "locale", "i18n", "string")),
    Rule("area:hardware", ("hardware", "vendor", "battery", "lcd", "oled", "connector", "buyer")),
    Rule("area:infra", ("workflow", "ci", "package", "ghcr", "github action", "infra")),
)

SPEC_TERMS = (
    "dfu",
    "ota",
    "bootloader",
    "settings",
    "protocol",
    "i18n generator",
    "persistent ux",
    "migration",
    "rollback",
)


def run_gh(args: list[str], payload: dict[str, Any] | None = None) -> Any:
    cmd = ["gh", "api", *args]
    result = subprocess.run(
        cmd,
        input=json.dumps(payload) if payload is not None else None,
        text=True,
        capture_output=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(
            f"{' '.join(cmd)} failed with exit code {result.returncode}\n"
            f"stdout: {result.stdout.strip()}\n"
            f"stderr: {result.stderr.strip()}"
        )
    return json.loads(result.stdout) if result.stdout.strip() else None


def gh_get_paginated(endpoint: str) -> list[Any]:
    items: list[Any] = []
    separator = "&" if "?" in endpoint else "?"
    page = 1
    while True:
        page_items = run_gh([f"{endpoint}{separator}per_page=100&page={page}"])
        if not isinstance(page_items, list):
            raise RuntimeError(f"Expected list response from {endpoint}")
        items.extend(page_items)
        if len(page_items) < 100:
            return items
        page += 1


def print_action(apply: bool, message: str) -> None:
    print(f"[{'APPLY' if apply else 'DRY-RUN'}] {message}")


def ensure_labels(repo: str, apply: bool) -> None:
    existing = {label["name"] for label in gh_get_paginated(f"repos/{repo}/labels?")}
    for name, spec in LABELS.items():
        payload = {"name": name, "color": spec["color"], "description": spec["description"]}
        if name in existing:
            print_action(apply, f"update label: {name}")
            if apply:
                run_gh(["-X", "PATCH", f"repos/{repo}/labels/{name}", "--input", "-"], payload)
        else:
            print_action(apply, f"create label: {name}")
            if apply:
                run_gh(["-X", "POST", f"repos/{repo}/labels", "--input", "-"], payload)


def classify_issue(repo: str, issue_number: int, apply: bool) -> None:
    issue = run_gh([f"repos/{repo}/issues/{issue_number}"])
    existing = {label["name"] for label in issue.get("labels", [])}
    text = f"{issue.get('title', '')}\n{issue.get('body', '')}".lower()
    labels: set[str] = set()

    if not any(label.startswith("gtd:") for label in existing):
        labels.add("gtd:inbox")

    for rule in AREA_RULES:
        if any(term in text for term in rule.terms):
            labels.add(rule.label)

    if any(term in text for term in SPEC_TERMS):
        labels.add("needs-spec")

    labels.difference_update(existing)
    if not labels:
        print_action(apply, f"issue #{issue_number}: no new labels")
        return

    print_action(apply, f"issue #{issue_number}: add {', '.join(sorted(labels))}")
    if apply:
        run_gh(
            ["-X", "POST", f"repos/{repo}/issues/{issue_number}/labels", "--input", "-"],
            {"labels": sorted(labels)},
        )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", required=True, help="owner/repo")
    parser.add_argument("--issue", type=int, help="issue number to classify")
    parser.add_argument("--apply", action="store_true", help="write changes")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    ensure_labels(args.repo, args.apply)
    if args.issue:
        classify_issue(args.repo, args.issue, args.apply)


if __name__ == "__main__":
    main()
