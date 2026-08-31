#!/usr/bin/env npx tsx
import fs from "fs";
import path from "path";

/**
 * Terminal text coloring code sequences to style terminal status logs.
 */
const GREEN = "\x1b[0;32m";
const RED = "\x1b[0;31m";
const BLUE = "\x1b[0;34m";
const NC = "\x1b[0m";

/**
 * Root workspace location references isolating source documents and compilation targets.
 */
const DOCS_DIR = path.join(process.cwd(), "docs");
const APP_DIR = path.join(process.cwd(), "src", "app");

/**
 * Directory names omitted entirely from structural file indexing routines.
 */
const IGNORED_FOLDERS: string[] = ["archive"];

if (!fs.existsSync(DOCS_DIR)) {
    console.error(
        `${RED}[!] Error: Docs directory not found at ${DOCS_DIR}${NC}`,
    );
    process.exit(1);
}

/**
 * Compiles a boilerplate string containing Next.js component logic, configured
 * to parse and display a specific markdown document file reference.
 *
 * @param {string} docRelativePath - Structural route path separating the target document file from the root directory.
 * @returns {string} Fully evaluated module file code output strings.
 */
function generatePageContent(docRelativePath: string): string {
    return `import path from "path";

import Page from "@/modules/Page";
import { parseMarkdownFile } from "@/components/markdown/MarkdownParser";

export default function GeneratedPage() {
  const nodes = parseMarkdownFile(path.join(process.cwd(), "docs", "${docRelativePath}"));
  return <Page nodes={nodes} />;
}
`;
}

/**
 * Recursively explores directory structures, evaluating file details to find active markdown entries.
 * Converts filenames into slug routes, establishes physical container pathways inside Next.js application frameworks,
 * and materializes boilerplate page files.
 *
 * @param {string} dir - The complete local coordinate path currently being inspected by the script runner.
 * @param {string} [baseDir=dir] - Anchored baseline path used to preserve relational positions across recursive jumps.
 * @returns {void}
 */
function walkDocs(dir: string, baseDir: string = dir): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (IGNORED_FOLDERS.includes(entry.name)) {
                console.log(`${BLUE}[~] Skipping:${NC} ${entry.name}`);
                continue;
            }
            walkDocs(fullPath, baseDir);
        } else if (
            entry.isFile() &&
            entry.name.endsWith(".md") &&
            dir !== baseDir
        ) {
            const relativeDoc = path.relative(baseDir, fullPath);
            const withoutExt = relativeDoc.replace(/\.md$/, "");
            const slug = withoutExt.toLowerCase().replace(/\s+/g, "-");

            const outputDir = path.join(APP_DIR, slug);
            const outputFile = path.join(outputDir, "page.tsx");

            fs.mkdirSync(outputDir, { recursive: true });
            fs.writeFileSync(outputFile, generatePageContent(relativeDoc));

            console.log(
                `${BLUE}[+]${NC} ${GREEN}src/app/${slug}/page.tsx${NC}`,
            );
        }
    }
}

/**
 * Top-level script orchestration block. Scans document sub-directories, omits restricted
 * folders, and triggers processing passes to build corresponding Next.js routes.
 */
const subFolders = fs
    .readdirSync(DOCS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !IGNORED_FOLDERS.includes(e.name));

for (const folder of subFolders) {
    console.log(`\n${BLUE}[*] Folder:${NC} ${GREEN}${folder.name}${NC}`);
    console.log(`${BLUE}------------------------------------------${NC}`);
    walkDocs(path.join(DOCS_DIR, folder.name), DOCS_DIR);
}

console.log(`\n${BLUE}------------------------------------------${NC}`);
console.log(`${GREEN}[+] Page generation complete!${NC}`);
console.log(`${BLUE}------------------------------------------${NC}`);
