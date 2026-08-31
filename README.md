# MamboFolio
<p align="left">
  <img src="https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Deploy-Live-brightgreen?style=flat-square" alt="Deploy Status" />
</p>
<p align="left">
  <img src="https://img.shields.io/badge/Maintenance-Active-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/github/last-commit/ProjectMambo/MamboFolio?style=flat-square&color=7a5fff" />
  <img src="https://img.shields.io/github/repo-size/ProjectMambo/MamboFolio?style=flat-square&color=yellow" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/ProjectMambo/MamboFolio?style=flat-square&color=orange" /></a>
</p>

A Markdown-first portfolio compiled by MamboSite and rendered as a static Next.js site.

## Features
- Portfolio pages, collections, metadata, and layout are authored in Markdown.
- MamboSite validates the content graph and generates typed TypeScript modules.
- Next.js renders the generated content as a responsive static export for GitHub Pages.

## Demo
Live site available at: **[kohkohnut.org](https://kohkohnut.org)**

## Getting Started

### Prerequisites
Before running or building the project locally, ensure you have the following installed on your system:
 - **[Node.js](https://nodejs.org/)** - The JavaScript runtime used by Next.js.
 - **[npm](https://www.npmjs.com/)** - The package manager used by this repository.
 - **[Rust](https://www.rust-lang.org/tools/install)** - Required to build the local MamboSite compiler.
 - **[ProjectMambo/MamboSite](https://github.com/ProjectMambo/MamboSite)** - Install its `mambosite` command before compiling this repository.

### Quick Start
Clone the repository
```bash
git clone https://github.com/ProjectMambo/MamboFolio
```

### Install Prerequisites

#### Install project dependencies
Navigate into the root directory and install the Node modules:
```bash
npm install
```

#### Compile the content

Run MamboSite from the repository root whenever `docs/` changes:

```bash
mambosite check
mambosite build
```

#### Running Locally

Launch the local development server. The `predev` script also rebuilds the generated content:

```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the site.

### Quick Build
To compile the content and create the static production build:
```bash
npm run build
```

## Deployment
This project is configured for automated static deployment. Any changes pushed directly to the main branch will automatically trigger GitHub Actions to build and deploy the production artifacts to **GitHub Pages**.

## Issues & Feedback
Since this is our personal portfolio site, we are not looking for external pull requests. However, if you spot a bug or rendering issue, feel free to open an **Issue** to let me know!

## License
Distributed under the MIT License. See **[LICENSE](LICENSE)** for more information.
