# CI/CD Beginner — React + Node + GitHub Actions

A minimal monorepo used to learn CI/CD basics. Every push and pull request to `main` triggers a GitHub Actions pipeline that lints, tests, and builds the app.

## What's inside

```
.
├── .github/workflows/ci.yml   ← the CI pipeline
├── client/                    ← React app (Vite + Vitest)
└── server/                    ← Node/Express API (node:test)
```

Uses npm **workspaces** so one `npm ci` at the root installs everything.

## Prerequisites

- Node.js 20 or 22
- npm 10+
- Git

## Local commands

```powershell
# From the repo root
npm install          # installs both workspaces
npm run lint         # lints client + server
npm test             # runs all tests
npm run build        # builds the client
```

Run individual workspaces:

```powershell
npm run dev  --workspace client   # Vite dev server
npm start    --workspace server   # Express on http://localhost:3000
```

## Push it to GitHub to see CI run

```powershell
cd c:\development\cicd
git init -b main
git add .
git commit -m "chore: initial CI/CD beginner scaffold"

# Create an empty repo on github.com first (no README/gitignore),
# then wire it up:
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

Open the repo's **Actions** tab in GitHub — you'll see the `CI` workflow run.

## Try the PR flow

```powershell
git checkout -b feature/break-a-test
# Edit client/src/App.jsx and change the heading text
git commit -am "test: intentionally break the heading test"
git push -u origin feature/break-a-test
```

Open a pull request against `main`. GitHub Actions will run and the failing test will block the PR — that's CI doing its job.

Fix it, push again, and watch the checks turn green.

## Recommended repo settings (once pushed)

Settings → Branches → _Add branch protection rule_ for `main`:

- Require a pull request before merging
- Require status checks to pass → select `Lint, test & build (Node 22.x)`
- Do not allow bypassing the above

This enforces "no red PRs get merged" — the core CI discipline.

## Anatomy of the workflow

Open [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

| Piece                                     | Purpose                                                    |
| ----------------------------------------- | ---------------------------------------------------------- |
| `on: push` / `pull_request`               | When the pipeline runs                                     |
| `concurrency`                             | Cancel superseded runs on the same branch                  |
| `strategy.matrix.node-version`            | Run the same job on Node 20 **and** 22 in parallel         |
| `actions/checkout@v4`                     | Pulls your code into the runner                            |
| `actions/setup-node@v4` with `cache: npm` | Installs Node and caches `~/.npm` for faster runs          |
| `npm ci`                                  | Reproducible install from `package-lock.json`              |
| `actions/upload-artifact@v4`              | Saves the built client so you can download it from the run |

## Next steps

- Add a **coverage** step (`vitest run --coverage`) and upload the report as an artifact.
- Add a **format** check with Prettier (`prettier --check .`).
- Move to track 2: build a Docker image and push it to GitHub Container Registry.
