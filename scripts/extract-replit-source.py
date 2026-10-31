#!/usr/bin/env python3
"""Extract the preserved Replit workspace safely into original-projects/."""
import re
import shutil
import sys
import zipfile
from pathlib import Path, PurePosixPath

ARCHIVE = Path(sys.argv[1] if len(sys.argv) > 1 else "BothHauntingProjects.zip")
DEST = Path("original-projects")
ROOT_PREFIX = "BothHauntingProjects/"
SECRET_PATTERNS = [
    ("private-key-header", re.compile(rb"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----")),
    ("AWS-access-key", re.compile(rb"AKIA[0-9A-Z]{16}")),
    ("GitHub-token", re.compile(rb"(?:gh[pousr]_[A-Za-z0-9_]{30,}|github_pat_[A-Za-z0-9_]{30,})")),
    ("Stripe-secret", re.compile(rb"sk_(?:live|test)_[A-Za-z0-9]{16,}")),
    ("Google-API-key", re.compile(rb"AIza[0-9A-Za-z_-]{35}")),
    ("Slack-token", re.compile(rb"xox[baprs]-[A-Za-z0-9-]{20,}")),
]
EXCLUDED_PARTS = {".git", ".expo", "node_modules", "dist", "build", "static-build", ".cache", ".turbo"}
SENSITIVE_SUFFIXES = {".pem", ".p12", ".pfx", ".jks", ".keystore"}

def should_exclude(name: str) -> bool:
    parts = PurePosixPath(name).parts
    if any(part in EXCLUDED_PARTS for part in parts):
        return True
    leaf = parts[-1].lower() if parts else ""
    if leaf.startswith(".env") and not leaf.endswith((".env.example", ".env.sample", ".env.template")):
        return True
    if any(leaf.endswith(suffix) for suffix in SENSITIVE_SUFFIXES):
        return True
    if leaf.endswith((".tsbuildinfo", ".log")):
        return True
    return False

with zipfile.ZipFile(ARCHIVE) as archive:
    entries = [info for info in archive.infolist() if not info.is_dir()]
    candidates = []
    excluded = []
    findings = []

    for info in entries:
        name = info.filename
        if not name.startswith(ROOT_PREFIX):
            excluded.append((name, "outside expected workspace root"))
            continue
        relative = name[len(ROOT_PREFIX):]
        if not relative or should_exclude(relative):
            excluded.append((name, "generated, local, or sensitive-looking file"))
            continue
        # Reject unsafe paths and symlinks.
        path = PurePosixPath(relative)
        if path.is_absolute() or ".." in path.parts:
            excluded.append((name, "unsafe archive path"))
            continue
        mode = (info.external_attr >> 16) & 0o170000
        if mode == 0o120000:
            excluded.append((name, "symlink"))
            continue
        raw = archive.read(info)
        for label, pattern in SECRET_PATTERNS:
            if pattern.search(raw):
                findings.append((name, label))
        candidates.append((info, relative, raw))

    if findings:
        print("STOP: possible credentials detected; no files were extracted.")
        for name, label in sorted(set(findings)):
            print(f"POTENTIAL SECRET: {name} ({label})")
        raise SystemExit(2)

    if DEST.exists():
        shutil.rmtree(DEST)
    extracted = 0
    total_bytes = 0
    for info, relative, raw in candidates:
        target = DEST / ROOT_PREFIX.rstrip("/") / Path(*PurePosixPath(relative).parts)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(raw)
        extracted += 1
        total_bytes += len(raw)

    report = [
        "# Preserved Replit source import",
        "",
        f"- Original archive: `{ARCHIVE.name}`",
        f"- Archive entries: {len(entries)}",
        f"- Extracted source/config files: {extracted}",
        f"- Extracted bytes: {total_bytes}",
        f"- Excluded files: {len(excluded)}",
        "- Nested Git metadata, Expo machine-local state, dependencies, build outputs, logs, and sensitive-looking files were not extracted.",
        "- A basic high-confidence credential scan found no matches. This does not guarantee the archive contains no secrets.",
        "",
        "The original ZIP remains preserved separately and was not modified.",
    ]
    (DEST / "SOURCE_IMPORT_REPORT.md").write_text("\n".join(report) + "\n", encoding="utf-8")
    print("\n".join(report))
    print("Extraction completed.")
