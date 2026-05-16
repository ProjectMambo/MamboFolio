
```dataviewjs
const FOLDER_PATH = "MamboFolio/blog";
const container = dv.el('div', '');

// --- 1. QUICK ADD ---
const addBtn = dv.el('button', '＋ Quick Add Blog');
addBtn.style.marginRight = "10px";
container.appendChild(addBtn);

addBtn.onclick = async () => {
    const qa = app.plugins.plugins.quickadd?.api;
    if (!qa) return new Notice("QuickAdd plugin not found!");

	const title     = await qa.inputPrompt("Blog Title");
    if (!title) return;
    const description     = await qa.inputPrompt("Description ");   
    const tags      = await qa.inputPrompt("Tags"); 
    const date  = await qa.inputPrompt("Date (YYYY-MM-DD)", moment().format("YYYY-MM-DD"));
    
    const fileName  = `${title}`.trim();

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
    date AS Date
FROM ""
WHERE file.folder = this.file.folder + "/blog"
SORT file.name ASC
```