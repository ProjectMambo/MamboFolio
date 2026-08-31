#!/usr/bin/env bash

set -euo pipefail

# Color codes for clean scannable terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the absolute path
SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

if ! command -v mambosite &> /dev/null; then
    echo -e "${RED}[!] Install the MamboSite command before setting up MamboFolio.${NC}" >&2
    exit 1
fi

npm --prefix "$PROJECT_DIR" install

if command -v mbfont &> /dev/null; then
    FONT_DIR="$PROJECT_DIR/public/fonts"
    mkdir -p "$FONT_DIR"
    mbfont compile 0.0.0 -o "$FONT_DIR" -t woff2
fi

(
    cd "$PROJECT_DIR"
    mambosite build
)

echo -e "${BLUE}------------------------------------------${NC}"
echo -e " Tool:   ${GREEN}MamboFolio${NC}"
echo -e " Source: $PROJECT_DIR"
echo -e "${GREEN}[+] Installation successful!${NC}"
echo -e "${BLUE}------------------------------------------${NC}"
