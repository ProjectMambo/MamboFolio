import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const BLUE = "\x1b[34m";
const YELLOW = "\x1b[33m";
const NC = "\x1b[0m";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, "..");
const sourceBaseDir = path.join(projectRoot, "public", "parsed-docs");
const targetBaseDir = path.join(projectRoot, "src", "app");

const PIPELINES = [
    { srcDir: "project", destRoute: "project", backPath: "/project" },
    { srcDir: "blog", destRoute: "blog", backPath: "/blog" },
];

console.log(`${BLUE}------------------------------------------${NC}`);
console.log(` Mode:    [${GREEN}ROUTE FILE GENERATOR${NC}]`);
console.log(` Target:  ${targetBaseDir}`);
console.log(`${BLUE}------------------------------------------${NC}\n`);

function generateTemplate(subPath, backUrl) {
    return `"use client";

import { useRouter } from "next/navigation";
import Markdown from "@/modules/Markdown";

export default function Page() {
  const router = useRouter();

  const handleBack = () => {
    // If there is a browser history, step back natively. Fallback to default index route parameters if empty.
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("${backUrl}");
    }
  };

  return (
    <div className="w-full min-h-screen bg-bg flex flex-col pt-6 pb-12">
      {/* Aligns back link container with the core content spine */}
      <div className="w-full mx-auto max-w-4xl px-4 mb-4">
        <button 
          onClick={handleBack}
          type="button"
          className="inline-flex items-center gap-x-2 text-xs font-mono text-fg-muted hover:text-fg transition-colors group cursor-pointer bg-transparent border-none p-0 outline-none"
        >
          <span className="transform group-hover:-translate-x-0.5 transition-transform">←</span> Back
        </button>
      </div>
      <Markdown path="${subPath}" />
    </div>
  );
}
`;
}

try {
    let routeCount = 0;

    PIPELINES.forEach(({ srcDir, destRoute, backPath }) => {
        const fullSrcPath = path.join(sourceBaseDir, srcDir);

        if (!fs.existsSync(fullSrcPath)) {
            console.warn(
                `${YELLOW}[!] Directory tracking path empty, skipping pipeline:${NC} "${srcDir}"`,
            );
            return;
        }

        const entries = fs.readdirSync(fullSrcPath, { withFileTypes: true });

        entries.forEach((entry) => {
            if (!entry.isFile() || path.extname(entry.name) !== ".json") return;

            const baseName = path.parse(entry.name).name;
            const slug = baseName.toLowerCase().replace(/\s+/g, "-");
            const subPath = `${srcDir}/${baseName}`;

            const targetRouteFolder = path.join(targetBaseDir, destRoute, slug);
            const targetPageFile = path.join(targetRouteFolder, "page.tsx");

            if (!fs.existsSync(targetRouteFolder)) {
                fs.mkdirSync(targetRouteFolder, { recursive: true });
            }

            const fileContent = generateTemplate(subPath, backPath);
            fs.writeFileSync(targetPageFile, fileContent, "utf-8");
            routeCount++;

            console.log(
                ` [*] Generated Route: src/app/${destRoute}/${slug}/page.tsx`,
            );
        });
    });

    console.log(`\n${BLUE}------------------------------------------${NC}`);
    console.log(
        `${GREEN}[+] Route generation complete! Created (${routeCount}) file mappings.${NC}`,
    );
    console.log(`${BLUE}------------------------------------------${NC}`);
} catch (error) {
    console.error(
        `\n${RED}[X] Runtime processing block broken:${NC}`,
        error.message,
    );
    process.exit(1);
}
