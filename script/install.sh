#!/usr/bin/env bash

# Color codes for clean scannable terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the absolute path
SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

mbcolor orchedark tailwind -o ./src/styles
mbcolor orchelight tailwind -o ./src/styles
mbcolor outbackdark tailwind -o ./src/styles
mbcolor outbacklight tailwind -o ./src/styles

echo -e "${BLUE}------------------------------------------${NC}"
echo -e " Tool:   ${GREEN}MamboFolio${NC}"
echo -e " Source: $PROJECT_DIR"
echo -e "${GREEN}[+] Installation successful!${NC}"
echo -e "${BLUE}------------------------------------------${NC}"