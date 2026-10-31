#!/usr/bin/env python3
"""Safely inventory and inspect the preserved Replit export without extracting it."""
import json
import re
import sys
import zipfile

archive = sys.argv[1] if len(sys.argv) > 1 else "BothHauntingProjects.zip"
secret_patterns = [
    ("private-key-header", re.compile(rb"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----")),
    ("AWS-access-key", re.compile(rb"AKIA[0-9A-Z]{16}")),
    ("GitHub-token", re.compile(rb"(?:gh[pousr]_[A-Za-z0-9_]{30,}|github_pat_[A-Za-z0-9_]{30,})")),
    ("Stripe-secret", re.compile(rb"sk_(?:live|test)_[A-Za-z0-9]{16,}")),
    ("Google-API-key", re.compile(rb"AIza[0-9A-Za-z_-]{35}")),
    ("Slack-token", re.compile(rb"xox[baprs]-[A-Za-z0-9-]{20,}")),
]

with zipfile.ZipFile(archive) as z:
    infos = z.infolist()
    print(f"ARCHIVE: {archive}")
    print(f"ENTRIES: {len(infos)}")
    print(f"UNCOMPRESSED_BYTES: {sum(i.file_size for i in infos)}")

    print("\n=== PROJECT FILES (excluding nested Git internals) ===")
    for info in infos:
        if info.is_dir() or "/.git/" in info.filename or info.filename.endswith("/.git"):
            continue
        print(f"{info.file_size:>10}  {info.filename}")

    print("\n=== PROJECT MANIFESTS ===")
    for info in infos:
        if info.filename.endswith("package.json") and info.file_size < 1_000_000:
            try:
                data = json.loads(z.read(info).decode("utf-8"))
                print(json.dumps({
                    "path": info.filename,
                    "name": data.get("name"),
                    "version": data.get("version"),
                    "scripts": data.get("scripts", {}),
                    "dependency_names": sorted((data.get("dependencies") or {}).keys()),
                    "dev_dependency_names": sorted((data.get("devDependencies") or {}).keys()),
                }, indent=2))
            except Exception as exc:
                print(f"UNREADABLE MANIFEST {info.filename}: {type(exc).__name__}")

    print("\n=== SECRET / CREDENTIAL SCREEN ===")
    findings = set()
    for info in infos:
        name = info.filename.lower()
        if info.is_dir() or "/.git/" in name:
            continue
        if any(name.endswith(s) for s in (".pem", ".p12", ".pfx", ".jks", ".keystore")) or (
            name.rsplit("/", 1)[-1].startswith(".env")
            and not name.endswith((".env.example", ".env.sample", ".env.template"))
        ):
            findings.add((info.filename, "sensitive-looking filename"))
        if info.file_size > 4_000_000:
            continue
        raw = z.read(info)
        for label, pattern in secret_patterns:
            if pattern.search(raw):
                findings.add((info.filename, label))
    if findings:
        for path, reason in sorted(findings):
            print(f"POTENTIAL SENSITIVE FILE: {path} ({reason})")
        print(f"RESULT: REVIEW REQUIRED ({len(findings)} potential findings). No source files were extracted.")
    else:
        print("RESULT: No high-confidence credential patterns found. This is not a guarantee that the archive contains no secrets.")

    print("\n=== CASEZERO APP SOURCE ===")
    prefix = "BothHauntingProjects/artifacts/casezero/"
    for info in infos:
        name = info.filename
        if info.is_dir() or not name.startswith(prefix) or info.file_size > 25_000:
            continue
        if not name.lower().endswith((".tsx", ".ts", ".js", ".json", ".md", ".css")):
            continue
        if "/.git/" in name:
            continue
        try:
            content = z.read(info).decode("utf-8")
        except UnicodeDecodeError:
            continue
        print(f"\n--- {name} ({info.file_size} bytes) ---")
        print(content[:12_000])
        if len(content) > 12_000:
            print("[truncated]")

    print("\n=== ROOT WORKSPACE CONFIG ===")
    for target in (
        "BothHauntingProjects/package.json",
        "BothHauntingProjects/pnpm-workspace.yaml",
        "BothHauntingProjects/replit.md",
    ):
        try:
            content = z.read(target).decode("utf-8")
            print(f"\n--- {target} ---\n{content[:12_000]}")
        except KeyError:
            print(f"NOT FOUND: {target}")
