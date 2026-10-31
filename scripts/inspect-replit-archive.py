#!/usr/bin/env python3
"""Safely inventory the preserved Replit export without extracting or publishing it."""
import json
import re
import sys
import zipfile
from collections import Counter

archive = sys.argv[1] if len(sys.argv) > 1 else "BothHauntingProjects.zip"
secret_patterns = [
    ("private-key-header", re.compile(rb"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----")),
    ("AWS-access-key", re.compile(rb"AKIA[0-9A-Z]{16}")),
    ("GitHub-token", re.compile(rb"(?:gh[pousr]_[A-Za-z0-9_]{30,}|github_pat_[A-Za-z0-9_]{30,})")),
    ("Stripe-secret", re.compile(rb"sk_(?:live|test)_[A-Za-z0-9]{16,}")),
    ("Google-API-key", re.compile(rb"AIza[0-9A-Za-z_-]{35}")),
    ("Slack-token", re.compile(rb"xox[baprs]-[A-Za-z0-9-]{20,}")),
]
secret_files = []
text_files = []

with zipfile.ZipFile(archive) as z:
    infos = z.infolist()
    print(f"ARCHIVE: {archive}")
    print(f"ENTRIES: {len(infos)}")
    print(f"UNCOMPRESSED_BYTES: {sum(i.file_size for i in infos)}")
    print("\n=== FILE INVENTORY ===")
    for info in infos:
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
    for info in infos:
        name = info.filename.lower()
        if info.is_dir():
            continue
        if any(name.endswith(s) for s in (".pem", ".p12", ".pfx", ".jks", ".keystore")) or (
            name.rsplit("/", 1)[-1].startswith(".env")
            and not name.endswith((".env.example", ".env.sample", ".env.template"))
        ):
            secret_files.append((info.filename, "sensitive-looking filename"))
        if info.file_size > 4_000_000:
            continue
        raw = z.read(info)
        for label, pattern in secret_patterns:
            if pattern.search(raw):
                secret_files.append((info.filename, label))
        try:
            raw.decode("utf-8")
            text_files.append(info.filename)
        except UnicodeDecodeError:
            pass

    if secret_files:
        for path, reason in sorted(set(secret_files)):
            print(f"POTENTIAL SENSITIVE FILE: {path} ({reason})")
        print(f"RESULT: REVIEW REQUIRED ({len(set(secret_files))} potential findings). No source files were extracted.")
    else:
        print("RESULT: No high-confidence credential patterns found. This is not a guarantee that the archive contains no secrets.")

    print("\n=== LIKELY SOURCE / CONFIG FILES ===")
    suffixes = (".tsx", ".ts", ".jsx", ".js", ".json", ".md", ".css", ".sql", ".yaml", ".yml")
    for name in sorted(text_files):
        if name.lower().endswith(suffixes):
            print(name)
