#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
printf 'EloGadgets development setup\n'
for tool in node npm; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    printf 'Required tool missing: %s. Reopen the Codespace to apply devcontainer features.\n' "$tool" >&2
    exit 1
  fi
done
printf 'Node: %s\n' "$(node --version)"
printf 'npm: %s\n' "$(npm --version)"
if [ -f package-lock.json ]; then npm ci; else npm install --package-lock-only --ignore-scripts --no-audit --no-fund; fi
printf 'Setup complete. Start the site with: npm run dev\n'
