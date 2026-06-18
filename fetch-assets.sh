#!/bin/bash
# fetch-assets.sh - Fetches metadatas while building.

set -e

fetch_json() {
  local dest="$1"
  local url="$2"
  mkdir -p "$(dirname "docs/public/$dest")"
  curl -sL -o "docs/public/$dest" "$url"
  echo "  ✅ $dest"
}

echo "📦 Fetching artifact metadata..."

fetch_json "metadata/lateral/metadata.json" \
  "https://raw.githubusercontent.com/LocalizedKorabli/LK-Lateral/main/metadata.json"

fetch_json "metadata/tomatoradar/metadata.json" \
  "https://raw.githubusercontent.com/OpenKorabli/TomatoRadar/main/metadata.json"

fetch_json "metadata/derivercrabify/metadata.json" \
  "https://raw.githubusercontent.com/LocalizedKorabli/Derivercrabify/main/metadata.json"

fetch_json "metadata/lgc/l10n.json" \
  "https://raw.githubusercontent.com/LocalizedKorabli/LestaGameCenterL10n/main/metadata/l10n.json"

fetch_json "metadata/most/l10n.json" \
  "https://raw.githubusercontent.com/LocalizedKorabli/most-korabli-l10n/main/metadata/l10n.json"

# To add a new file:
# fetch_json "metadata/ships/summary.json" \
#   "https://raw.githubusercontent.com/xxx/ships-repo/main/summary.json"

echo "✅ All metadata fetched"