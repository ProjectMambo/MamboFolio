# MamboFolio

<p align="left">
  <img src="https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white" alt="Rust" />
  <img src="https://img.shields.io/badge/Deploy-Live-brightgreen?style=flat-square" alt="Deploy Status" />
</p>
<p align="left">
  <img src="https://img.shields.io/badge/Maintenance-Active-brightgreen?style=flat-square" alt="Maintenance status: active" />
  <img src="https://img.shields.io/github/last-commit/ProjectMambo/MamboFolio?style=flat-square&color=7a5fff" alt="Last commit" />
  <img src="https://img.shields.io/github/repo-size/ProjectMambo/MamboFolio?style=flat-square&color=yellow" alt="Repository size" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/ProjectMambo/MamboFolio?style=flat-square&color=orange" alt="License" /></a>
</p>

A Markdown-first portfolio compiled and rendered by MamboSite as a static Next.js site.

## Features

- Pages, collections, metadata, and layout are authored in Markdown.
- MamboSite parses and validates the content graph, compiles the theme, and generates typed TypeScript modules and theme assets.
- MamboSite supplies the modular React runtime, default components, theme, and Next.js adapter used by this repository.
- A full MamboSite build runs the configured Next.js renderer and produces the GitHub Pages artifact in `out/`.

## Demo

The live site is available at **[kohkohnut.org](https://kohkohnut.org)**.

## Local development

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or later and npm.
- [Rust](https://www.rust-lang.org/tools/install) 1.95.0 or later.
- Python 3 only when using the optional `npm run preview` static server.
- Git, plus the [GitHub CLI](https://cli.github.com/) when `mbsite deploy` needs to re-dispatch an existing commit.

MamboFolio currently consumes the MamboSite packages through `file:../MamboSite/...` dependencies. Keep both repositories as siblings:

```text
ProjectMambo/
├── MamboFolio/
└── MamboSite/
```

Clone and prepare that layout:

```bash
mkdir ProjectMambo
cd ProjectMambo
git clone https://github.com/ProjectMambo/MamboSite.git
git clone https://github.com/ProjectMambo/MamboFolio.git

cd MamboSite
npm ci
npm run build:packages
cargo install --locked --path crates/mambosite-cli

cd ../MamboFolio
npm ci
```

Reinstall the local `mbsite` binary after changing its Rust source. The MamboFolio development and render scripts rebuild the sibling TypeScript packages before using them.

### Preview the site

From `MamboFolio/`, run:

```bash
npm run dev
```

The `predev` hook builds the sibling runtime packages and regenerates content and theme output before Next.js starts. Open **[http://localhost:3000](http://localhost:3000)** to view the site.

### Validate and build

```bash
mbsite check
npm run build
```

`mbsite check` parses and validates the complete site without writing generated files. `npm run build` delegates to one full `mbsite build`: MamboSite generates the typed content and theme outputs, then calls the configured `mambosite:render` npm hook to produce `out/` with Next.js.

The renderer hook is deliberately nonrecursive. It builds the shared MamboSite packages and runs `next build`; it never calls `npm run build` or `mbsite build` again.

To serve the completed static export rather than the development build, run `npm run preview` after `npm run build`, then open **[http://localhost:4173](http://localhost:4173)**. The preview command binds only to the local machine.

## MamboSite lifecycle commands

- `mbsite init [path]` creates the default site scaffold in an empty directory. `--force` only refreshes files recorded in an existing MamboSite scaffold manifest and preserves unrelated files; it is not intended for this already-established repository.
- `mbsite build` owns Markdown parsing, validation, theme compilation, TypeScript and asset generation, and the configured static React/Next.js render.
- `mbsite build --content-only` stops after generated content and theme assets, which is useful before the development server starts.
- `mbsite deploy` requires a clean deployment branch, performs a full build, and never creates a commit. It pushes when the local branch has new commits. If the same commit is already on GitHub, it re-dispatches the Pages workflow, so a new commit is not required to deploy again.

## Deployment

Pushes to `main` and manual workflow dispatches run the GitHub Pages workflow. CI checks out MamboFolio and MamboSite as siblings, installs both dependency trees, invokes one full MamboSite build, and uploads `MamboFolio/out`.

To build and start deployment from a clean local `main` branch:

```bash
npm run deploy
```

Use `mbsite deploy --dry-run` to validate the local build and report whether deployment would push commits or dispatch the current commit without changing Git or GitHub.

## Issues and feedback

This is a personal portfolio, so external pull requests are not currently requested. If you find a bug or rendering issue, opening an issue is welcome.

## License

Distributed under the MIT License. See **[LICENSE](LICENSE)** for details.
