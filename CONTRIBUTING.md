# Contributing to AgriBridge AI

First off, thank you for considering contributing to AgriBridge AI 🌾 
We're building the digital operating system for global agriculture, and every contribution (code, docs, design, bug reports, ideas) helps farmers get better tools.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Guidelines](#coding-guidelines)
- [Commit Message Convention](#commit-message-convention)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Project Structure](#project-structure)
- [Community](#community)

## Code of Conduct

Be respectful, constructive, and welcoming. We're a community of people who care about agriculture and technology — harassment, discrimination, or toxic behavior of any kind will not be tolerated. If you experience or witness unacceptable behavior, please open an issue or contact the maintainer directly.

## Ways to Contribute

You don't need to write code to help:

- 🐛 **Report bugs** you encounter
- 💡 **Suggest features** or improvements
- 📝 **Improve documentation** (README, code comments, guides)
- 🎨 **Improve UI/UX** — especially rural-friendly, low-bandwidth, accessibility-focused design
- 🌍 **Add translations** (multilingual support is core to the vision)
- 🧪 **Write tests** for existing functionality
- 🔧 **Fix bugs or implement features** from the [Roadmap](README.md#️-roadmap) or open issues
- 🔍 **Review pull requests** from other contributors

## Getting Started

### Prerequisites

```
node >= 18
npm or yarn
git
```

### Setup

1. **Fork** the repository and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/AgriBridge-AI.git
   cd AgriBridge-AI
   ```

2. **Add the upstream remote:**

   ```bash
   git remote add upstream https://github.com/Jai-Shankar1033/AgriBridge-AI.git
   ```

3. **Install frontend dependencies:**

   ```bash
   npm install
   ```

4. **Install backend dependencies:**

   ```bash
   cd server
   npm install
   cd ..
   ```

5. **Set up environment variables** — create `server/.env` (see [README](README.md#4-environment) for the full list of required keys). For most frontend-only contributions you won't need real API keys; placeholder values are fine to get the server running.

6. **Run the app:**

   ```bash
   # Terminal 1 — frontend
   npm start
   # → http://localhost:3000

   # Terminal 2 — backend
   cd server
   npm run dev
   # → http://localhost:5000
   ```

## Development Workflow

1. **Sync with upstream** before starting new work:

   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create a feature branch** from `main`:

   ```bash
   git checkout -b feature/short-description
   # or: fix/short-description, docs/short-description, chore/short-description
   ```

3. **Make your changes**, following the [coding guidelines](#coding-guidelines) below.

4. **Test locally** — make sure the app builds and runs without errors, and that existing functionality isn't broken.

5. **Commit** using the [commit convention](#commit-message-convention).

6. **Push and open a pull request** against `main`.

## Coding Guidelines

- **Match the existing style.** This is a JavaScript (React + Node/Express) codebase — follow existing formatting, naming, and file organization patterns rather than introducing a new style.
- **Keep components small and focused.** Prefer composing small, reusable components (`src/components/`) over large monolithic ones.
- **Use existing folders correctly:**
  - `src/components/` — reusable UI components
  - `src/pages/` — route-level views
  - `src/services/` — API calls and external integrations
  - `src/hooks/` — custom React hooks
  - `src/utils/` — helpers and formatters
  - `server/routes/`, `server/controllers/`, `server/middleware/`, `server/services/` — backend logic, kept separated by responsibility
- **Mobile-first, offline-aware.** AgriBridge is a PWA aimed at rural, low-bandwidth users — avoid patterns that assume a fast connection or large viewport by default.
- **No secrets in code.** Never commit `.env` files, API keys, or credentials. Use `.env.example`-style placeholders in docs.
- **Accessibility matters.** Favor high-contrast, simple UI patterns and semantic HTML.
- **Comment non-obvious logic**, especially around AI/ML integrations, NDVI calculations, and payment flows.

## Commit Message Convention

We use a lightweight [Conventional Commits](https://www.conventionalcommits.org/) style:

```
<type>: <short description>

[optional longer description]
```

Common types:

| Type       | Use for                                      |
| ---------- | --------------------------------------------- |
| `feat`     | A new feature                                 |
| `fix`      | A bug fix                                     |
| `docs`     | Documentation-only changes                    |
| `style`    | Formatting, missing semicolons, etc. (no logic change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test`     | Adding or fixing tests                        |
| `chore`    | Build process, tooling, dependency updates    |

Example:

```bash
git commit -m "feat: add multilingual support for irrigation alerts"
```

## Pull Request Process

1. Ensure your branch is up to date with `main` and there are no merge conflicts.
2. Fill out the PR description clearly:
   - What does this change do?
   - Why is it needed?
   - How was it tested?
   - Screenshots/GIFs for any UI changes are strongly encouraged.
3. Link any related issues (e.g. `Closes #12`).
4. Keep PRs focused — one feature/fix per PR is easier to review than a large bundle of unrelated changes.
5. Be responsive to review feedback. A maintainer will review your PR and may request changes before merging.
6. Once approved, a maintainer will merge your PR. 🎉

## Reporting Bugs

Before opening a new issue, please search [existing issues](https://github.com/Jai-Shankar1033/AgriBridge-AI/issues) to avoid duplicates.

When reporting a bug, include:

- A clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots, if applicable
- Environment details (OS, browser, Node version)

**Security vulnerabilities:** please do **not** open a public issue. Follow the process in [SECURITY.md](SECURITY.md) or open a [private security advisory](https://github.com/Jai-Shankar1033/AgriBridge-AI/security/advisories/new) instead.

## Suggesting Features

Feature suggestions are welcome, especially those aligned with the [Roadmap](README.md#️-roadmap) and the broader [Vision](README.md#-vision). When proposing a feature, describe:

- The problem it solves for farmers, cooperatives, lenders, or other users
- A rough idea of how it might work
- Any relevant prior art or references

## Project Structure

See the [Project Structure section in the README](README.md#-project-structure) for a full breakdown of the frontend, backend, and docs layout.

## Community

- For questions, open a [discussion or issue](https://github.com/Jai-Shankar1033/AgriBridge-AI/issues)
- For general updates, check the [Releases](https://github.com/Jai-Shankar1033/AgriBridge-AI/releases) page

---

Thank you for helping build AgriBridge AI. Every farmer who benefits from this platform benefits from your contribution. 🌾
