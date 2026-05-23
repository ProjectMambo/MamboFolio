
```dataviewjs
const FOLDER_PATH = "MamboFolio/project";
const container = dv.el('div', '');

// --- 1. QUICK ADD ---
const addBtn = dv.el('button', '＋ Quick Add Project');
addBtn.style.marginRight = "10px";
container.appendChild(addBtn);

addBtn.onclick = async () => {
    const qa = app.plugins.plugins.quickadd?.api;
    if (!qa) return new Notice("QuickAdd plugin not found!");

	const name     = await qa.inputPrompt("Project Name");
    if (!name) return;
    const description     = await qa.inputPrompt("Description ");   
    const tags      = await qa.inputPrompt("Tags"); 
    const date  = await qa.inputPrompt("Date (YYYY-MM-DD)", moment().format("YYYY-MM-DD"));
    const url     = await qa.inputPrompt("URL");

    const fileName  = `${name}`.trim();

	let formattedTags = "";
	if (tags && tags.trim().length > 0) {
	    formattedTags = tags.split(",")    
	        .map(t => t.trim())            
	        .filter(t => t.length > 0)
	        .map(t => `\n  - ${t}`)
	        .join("");
	} else {
	    formattedTags = "\n  -";
	}
    
    const content   = `---
description: ${description}
tags: ${formattedTags}
date: ${date}
url: ${url}
---`;

    try {
        await app.vault.create(`${FOLDER_PATH}/${fileName}.md`, content);
        new Notice(`Added ${fileName}`);
    } catch (e) {
        new Notice("Error: File exists or path incorrect.");
    }
};
```
```dataview
TABLE 
    choice(length(description) > 50, substring(description, 0, 50) + "...", description) AS Description,
    file.tags AS Tags,
    dateformat(date, "MMMM yyyy") AS Date,
    url AS URL
FROM ""
WHERE file.folder = this.file.folder + "/project"
SORT file.name ASC
```