import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const BLUE = "\x1b[34m";
const YELLOW = "\x1b[33m";
const NC = "\x1b[0m";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_FILES = [
    "About.md",
    "project/Pitcher.md",
    "project/Project Mambo.md",
    "project/MamboColour.md",
    "project/MamboDot.md",
    "project/MamboFolio.md",
    "project/MamboFont.md",
    "project/MamboSite.md",
    "blog/Test.md"
];

const projectRoot = path.join(__dirname, "..");
const docsDir = path.join(projectRoot, "docs");
const outputDir = path.join(projectRoot, "public", "parsed-docs");

marked.setOptions({
    gfm: true,
    breaks: true,
});

console.log(`${BLUE}------------------------------------------${NC}`);
console.log(` Mode:    [${GREEN}MARKDOWN COMPILER + FRONTMATTER${NC}]`);
console.log(` Source:  ${docsDir}`);
console.log(` Target:  ${outputDir}`);
console.log(`${BLUE}------------------------------------------${NC}\n`);

/**
 * Extracts YAML frontmatter blocks bounded by triple dashes (---)
 * at the start of markdown documentation files.
 */
function parseFrontmatter(rawContent) {
    const result = {
        meta: null,
        content: rawContent,
    };

    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
    const match = rawContent.match(frontmatterRegex);

    if (!match) return result;

    const rawYaml = match[1];
    result.content = rawContent.replace(match[0], "").trim();

    const meta = {
        description: "",
        tags: [],
        date: "",
        url: "",
    };

    const lines = rawYaml.split(/\r?\n/);
    let currentKey = null;

    lines.forEach((line) => {
        // Strips out zero-width and unusual spacing characters introduced by editors
        const cleanLine = line
            .replace(
                /[\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g,
                " ",
            )
            .trim();

        if (!cleanLine) return;

        // Appends list items to the tags array when reading beneath a tags header
        if (cleanLine.startsWith("-") && currentKey === "tags") {
            const tagValue = cleanLine.substring(1).trim();
            if (tagValue) meta.tags.push(tagValue);
            return;
        }

        const colonIndex = cleanLine.indexOf(":");
        if (colonIndex !== -1) {
            const key = cleanLine.substring(0, colonIndex).trim();
            const value = cleanLine.substring(colonIndex + 1).trim();

            currentKey = key;
            if (key in meta) {
                if (key !== "tags") {
                    meta[key] = value;
                }
            } else {
                currentKey = null; // Skips custom metadata variables outside schema boundaries
            }
        }
    });

    result.meta = meta;
    return result;
}

try {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    let compileCount = 0;

    ALLOWED_FILES.forEach((subPath) => {
        const fullInputPath = path.join(docsDir, subPath);

        if (!fs.existsSync(fullInputPath)) {
            console.warn(
                `${YELLOW}[!] Source file missing:${NC} "${fullInputPath}"`,
            );
            return;
        }

        const pathInfo = path.parse(subPath);
        const relativeOutputDir = pathInfo.dir;
        const jsonFileName = `${pathInfo.name}.json`;

        const targetSubfolder = path.join(outputDir, relativeOutputDir);
        const fullOutputPath = path.join(targetSubfolder, jsonFileName);

        if (!fs.existsSync(targetSubfolder)) {
            fs.mkdirSync(targetSubfolder, { recursive: true });
        }

        const rawFileContent = fs.readFileSync(fullInputPath, "utf-8");

        const { meta, content } = parseFrontmatter(rawFileContent);
        const htmlContent = marked.parse(content);

        const title = pathInfo.name
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());

        const payload = {
            title: title,
            html: htmlContent,
            meta: meta,
        };

        fs.writeFileSync(fullOutputPath, JSON.stringify(payload, null, 2));
        compileCount++;

        console.log(
            ` [*] Compiled: public/parsed-docs/${subPath.replace(".md", ".json")}`,
        );
    });

    console.log(`\n${BLUE}------------------------------------------${NC}`);
    console.log(
        `${GREEN}[+] Conversion complete! (${compileCount}/${ALLOWED_FILES.length}) files synchronized.${NC}`,
    );
    console.log(`${BLUE}------------------------------------------${NC}`);
} catch (error) {
    console.error(
        `\n${RED}[X] Runtime failure executing module passes:${NC}`,
        error.message,
    );
    process.exit(1);
}
