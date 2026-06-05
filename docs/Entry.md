
```dataviewjs
const BASE_PATH = "MamboFolio";

// ╔══════════════════════════════════════════════════════════╗
// ║  TYPE DEFINITIONS — edit here to add/change types       ║
// ╚══════════════════════════════════════════════════════════╝
const TYPES = [
    {
        key:   "project",
        label: "Projects",
        emoji: "🗂️",
        folder: `${BASE_PATH}/project`,
        prompts: [
            { key: "name",        label: "Project Name",         required: true },
            { key: "description", label: "Description" },
            { key: "tags",        label: "Tags (comma-separated)" },
            { key: "date",        label: "Date (DD MMMM YYYY)",  default: () => moment().format("DD MMMM YYYY") },
            { key: "wikiUrl",     label: "Wiki URL" },
            { key: "githubUrl",   label: "GitHub URL" },
        ],
        buildFrontmatter: (d) => `---
description: ${d.description || ""}
tags: ${fmt(d.tags)}
date: "${d.date}"
wikiUrl: ${d.wikiUrl || ""}
githubUrl: ${d.githubUrl || ""}
---`,
        columns: ["File", "Description", "Tags", "Date", "Wiki", "GitHub"],
        getRow:  (p) => [p.file.link, trunc(p.description), p.file.tags, p.date, p.wikiUrl, p.githubUrl],
    },
    {
        key:   "blog",
        label: "Blog",
        emoji: "✍️",
        folder: `${BASE_PATH}/blog`,
        prompts: [
            { key: "name",        label: "Post Title",           required: true },
            { key: "description", label: "Description" },
            { key: "tags",        label: "Tags (comma-separated)" },
            { key: "date",        label: "Date (DD MMMM YYYY)",  default: () => moment().format("DD MMMM YYYY") },
        ],
        buildFrontmatter: (d) => `---
description: ${d.description || ""}
tags: ${fmt(d.tags)}
date: "${d.date}"
---`,
        columns: ["File", "Description", "Tags", "Date"],
        getRow:  (p) => [p.file.link, trunc(p.description), p.file.tags, p.date],
    },
    {
        key:   "gallery",
        label: "Gallery",
        emoji: "🖼️",
        folder: `${BASE_PATH}/gallery`,
        prompts: [
            { key: "name",        label: "Item Name",            required: true },
            { key: "description", label: "Description" },
            { key: "tags",        label: "Tags (comma-separated)" },
            { key: "date",        label: "Date (DD MMMM YYYY)",  default: () => moment().format("DD MMMM YYYY") },
        ],
        buildFrontmatter: (d) => `---
description: ${d.description || ""}
tags: ${fmt(d.tags)}
date: "${d.date}"
---`,
        columns: ["File", "Description", "Tags", "Date"],
        getRow:  (p) => [p.file.link, trunc(p.description), p.file.tags, p.date],
    },
];

// ── helpers ───────────────────────────────────────────────────
const fmt   = (raw) => (!raw?.trim())
    ? "\n  -"
    : raw.split(",").map(t => t.trim()).filter(Boolean).map(t => `\n  - ${t}`).join("");

const trunc = (str, n = 50) =>
    str?.length > n ? str.substring(0, n) + "…" : (str || "");

// ── quick-add handler ─────────────────────────────────────────
async function quickAdd(type) {
    const qa = app.plugins.plugins.quickadd?.api;
    if (!qa) return new Notice("QuickAdd plugin not found!");

    const data = {};
    for (const p of type.prompts) {
        const val = await qa.inputPrompt(p.label, p.default?.() ?? "");
        if (p.required && !val) return;
        data[p.key] = val ?? "";
    }

    try {
        await app.vault.create(`${type.folder}/${data.name.trim()}.md`, type.buildFrontmatter(data));
        new Notice(`✅ Added "${data.name}"`);
    } catch {
        new Notice("❌ Error: file already exists or path is wrong.");
    }
}

// ── buttons ───────────────────────────────────────────────────
const bar = dv.el("div", "");
bar.style.cssText = "display:flex; gap:8px; margin-bottom:20px; flex-wrap:wrap;";

for (const type of TYPES) {
    const btn = dv.el("button", `${type.emoji} Add ${type.label}`);
    btn.style.cssText = "padding:4px 14px; cursor:pointer;";
    btn.onclick = () => quickAdd(type);
    bar.appendChild(btn);
}

// ── tables (one per type) ─────────────────────────────────────
for (const type of TYPES) {
    dv.el("h3", `${type.emoji} ${type.label}`);
    const pages = dv.pages(`"${type.folder}"`).sort(p => p.file.name, "asc");
    dv.table(type.columns, pages.map(type.getRow));
}
```