# MamboFolio

<p align="left">
  <img src="https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/MamboSite-000000?style=flat-square&logoColor=white" alt="MamboSite" />
  <img src="https://img.shields.io/badge/Deploy-Live-brightgreen?style=flat-square" alt="Deploy Status" />
</p>
<p align="left">
  <img src="https://img.shields.io/badge/Maintenance-Active-brightgreen?style=flat-square" alt="Maintenance status: active" />
  <img src="https://img.shields.io/github/last-commit/ProjectMambo/MamboFolio?style=flat-square&color=7a5fff" alt="Last commit" />
  <img src="https://img.shields.io/github/repo-size/ProjectMambo/MamboFolio?style=flat-square&color=yellow" alt="Repository size" />
  <a href="../LICENSE"><img src="https://img.shields.io/github/license/ProjectMambo/MamboFolio?style=flat-square&color=orange" alt="License" /></a>
</p>

MamboFolio is Solomon Koh's live, Markdown-first portfolio. Repository-local Markdown is compiled by MamboSite, rendered through its shared React and Next.js runtime, and exported as a static GitHub Pages site.

## Motivation

MamboFolio keeps a personal portfolio reviewable as Markdown while publishing the same content through Project Mambo's shared, statically exported web platform. The repository stays focused on Solomon's content and configuration instead of duplicating compiler, component, or deployment logic.

### Start here

| Goal | Link |
|---|---|
| Read the canonical Wiki documentation | [projectmambo.org/mambofolio/](https://projectmambo.org/mambofolio/) |
| Visit the portfolio | [kohkohnut.org](https://kohkohnut.org) |
| Browse the published content snapshot | [docs/index.md](index.md) |
| Inspect site configuration | [mambo.toml](../mambo.toml) |
| Inspect design tokens | [mambo.theme.toml](../mambo.theme.toml) |
| Review the deployment pipeline | [.github/workflows/nextjs.yml](../.github/workflows/nextjs.yml) |
| Understand the platform | [ProjectMambo/MamboSite](https://github.com/ProjectMambo/MamboSite) |

## Status

The MamboSite migration is complete and the former handwritten portfolio implementation has been removed. The current repository keeps a thin Next.js shell around MamboSite's compiler, runtime, default components, and theme contract. The live site includes profile, current-work, university, project, blog, and gallery pages sourced from Markdown.

MamboFolio currently consumes the four MamboSite web packages from a sibling `MamboSite` checkout. Its production workflow pins the matching MamboSite compiler commit, Rust 1.95.0, Node.js 20, and both npm lockfiles.

### Pinned sibling-package exception

The four `file:../MamboSite/packages/...` dependencies are a temporary, explicit exception to the released-dependency standard because compatible packages have not yet been published. CI and local release validation use MamboSite commit `43f861f6f4a0f1504753faf4b6113e2e75636f59`; using a different sibling checkout risks compiler/runtime drift even when `npm ci` succeeds.

The exact checkout pin, both lockfiles, and the complete `npm run check` gate mitigate that risk. Review and remove the exception when compatible releases of `@mambosite/runtime`, `@mambosite/react`, `@mambosite/theme-default`, and `@mambosite/next` are all available, or whenever the MamboSite pin is intentionally upgraded.

### Architecture

```text
canonical vault content
    -> sync_docs.js
    -> repository docs/
    -> MamboSite Rust compiler
    -> generated TypeScript + theme/content assets
    -> MamboSite React runtime + default theme
    -> Next.js static export in out/
    -> GitHub Pages
```

MamboFolio owns its content snapshot, `mambo.toml`, `mambo.theme.toml`, synchronized branding sources under `docs/_assets/`, and the thin files under `src/app/`. MamboSite owns Markdown parsing, validation, generated data, rendering components, and the Next.js adapter. Generated `src/generated/mambo/` and `public/mambo/` trees are rebuilt locally and in CI rather than committed.

## User stories

- As a visitor, I can navigate Solomon's current work, studies, projects, writing, and gallery from a fast static site.
- As the author, I can update portfolio content in the canonical vault and review one synchronized Markdown snapshot.
- As a maintainer, I can validate the content, runtime, accessibility baseline, and production artifact through one command.

## Getting started

### Prerequisites

- Node.js 20 or later and npm.
- Rust 1.95.0 or later.
- Git and sibling checkouts of MamboSite and MamboDocs at the pinned revisions below.
- Python 3 only for the optional static preview command.

Clone the repositories beside each other, select the validated provider revisions, build MamboSite, install its `mbsite` command, then install MamboFolio:

```bash
git clone https://github.com/ProjectMambo/MamboSite.git
git clone https://github.com/ProjectMambo/MamboFolio.git
git clone https://github.com/ProjectMambo/MamboDocs.git
git -C MamboSite checkout 43f861f6f4a0f1504753faf4b6113e2e75636f59
git -C MamboDocs checkout 95e29a7bd5f64fd7b4b1416774157318490c6013
cd MamboSite
npm ci
npm run build:packages
./script/install.sh
cd ../MamboFolio
npm ci
npm run content:check
npm run dev
```

`npm run dev` rebuilds the sibling MamboSite packages and the generated content before starting Next.js.

## Usage

| Command | Purpose |
|---|---|
| `npm run runtime:build` | Build the sibling MamboSite web packages. |
| `npm run content:check` | Validate the complete Markdown site without writing generated output. |
| `npm run content:build` | Regenerate compiled content, theme data, and managed assets without running Next.js. |
| `npm run check` | Run the complete content, documentation, source, and reproducible-build gate. |
| `npm run dev` | Regenerate content and start the local Next.js development server. |
| `npm run build` | Run the complete MamboSite and Next.js static build into `out/`. |
| `npm run preview` | Serve the completed `out/` directory at `http://127.0.0.1:4173`. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Run TypeScript without emitting files. |
| `npm run deploy` | Build, push committed work when needed, and trigger GitHub Pages. |

## Documentation

Project Mambo authors documentation centrally in its Obsidian vault. The project README and mounted wiki page live under `Docs/Projects/MamboFolio/`; portfolio-owned pages and media live under `Docs/Projects/_sites/MamboFolio/`.

From the vault root, refresh only this repository with:

```bash
node Scripts/sync_docs.js --sync MamboFolio
```

The sync replaces MamboFolio's complete repository `docs/` snapshot and root `README.md`. It does not change the application shell, configuration, workflow, or other source files. Edit the canonical vault copies rather than synchronized repository docs, then inspect the diff and run the content and build checks before committing.

The public project guide is mounted at [projectmambo.org/mambofolio/](https://projectmambo.org/mambofolio/). MamboSite's [authoring](https://projectmambo.org/mambosite/authoring-guide/) and [build](https://projectmambo.org/mambosite/build-and-deployment/) guides define the shared content and deployment behavior.

## Project structure

```text
docs/                 synchronized portfolio content and media
src/app/              thin Next.js static route shell
mambo.toml            content, URL, renderer, and deploy configuration
mambo.theme.toml      site-specific semantic theme values
.github/workflows/    pinned validation and GitHub Pages pipeline
out/                  ignored static export produced by a build
```

## Validation

Run the single local gate before committing or deploying:

```bash
npm run check
git status --short
```

The check validates content and the strict MamboDocs repository contract, runs ESLint and TypeScript, performs a reproducible static build with `SOURCE_DATE_EPOCH=0`, confirms `out/index.html`, and checks the diff for whitespace errors. It requires the pinned sibling MamboSite and MamboDocs checkouts from Getting started.

Before release, serve `out/` and inspect the home page, a representative project and article, media, deep links, and the not-found page at narrow and wide viewports. Review keyboard-only navigation, visible focus, heading order, contrast, and reduced-motion behavior. The current static site has no analytics, forms, cookies, or user-data collection; document and review the privacy boundary before adding any of them.

## Development

Keep portfolio content in the canonical vault and presentation behavior in MamboSite unless it is genuinely site-specific. Next.js 16 does not run linting as part of `next build`, so do not remove the explicit lint or type-check stages from `npm run check`.

### Deployment

Pushing `main` starts the GitHub Pages workflow. CI checks out MamboFolio, the pinned MamboSite revision, and the pinned MamboDocs checker; installs both npm dependency trees; runs `npm run check`; rebuilds once without the fixed validation epoch; uploads `MamboFolio/out`; and deploys it to [kohkohnut.org](https://kohkohnut.org).

`npm run deploy` requires a clean deployment branch and never creates a commit. It pushes committed work when the branch is ahead; when the current commit is already remote, it dispatches the configured Pages workflow again. Preview that decision without pushing or dispatching with:

```bash
npm run deploy -- --dry-run
```

### Post-deploy verification and rollback

After the Actions and Pages jobs succeed, open [kohkohnut.org](https://kohkohnut.org) in a fresh browser session and verify the home page, a nested content route, media, navigation, and the not-found page. Confirm the footer reports the expected deployment time and repeat the keyboard and responsive smoke checks on the live artifact.

If the release is faulty, create a normal `git revert <bad-commit>` on `main`, run `npm run check`, and deploy that revert. Revert the consumer commit that changed a bad MamboSite pin or lockfile rather than moving the pinned provider revision in place; do not rewrite published branch history.

## Issues and feedback

This is a personal portfolio, so external pull requests are not currently requested. If you find a bug or rendering issue, opening an issue is welcome.

## License

Distributed under the MIT License. See **[LICENSE](../LICENSE)** for details.
