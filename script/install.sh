#!/usr/bin/env bash

# Color codes for clean scannable terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the absolute path
SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

mkdir -p "$PROJECT_DIR/src/styles"
mbcolor orchedark tailwind -o "$PROJECT_DIR/src/styles"
mbcolor orchelight tailwind -o "$PROJECT_DIR/src/styles"
mbcolor outbackdark tailwind -o "$PROJECT_DIR/src/styles"
mbcolor outbacklight tailwind -o "$PROJECT_DIR/src/styles"

if command -v mbfont &> /dev/null; then
    FONT_DIR="$PROJECT_DIR/public/fonts"
    mkdir -p "$FONT_DIR"
    mbfont compile 0.0.0 -o "$FONT_DIR" -t woff2
fi

echo -e "${BLUE}------------------------------------------${NC}"
echo -e " Tool:   ${GREEN}MamboFolio${NC}"
echo -e " Source: $PROJECT_DIR"
echo -e "${GREEN}[+] Installation successful!${NC}"
echo -e "${BLUE}------------------------------------------${NC}"