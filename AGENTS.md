# label-catalog-web — AGENTS.md

## Project Overview

Sistema corporativo SPA para centralização de dados — etiquetas, usuários e análise de custos.

Register: `product` (design SERVES the product — app UI, dashboards, tools).

## Stack

| Technology | Purpose |
|---|---|
| React 19 + Vite 8 | SPA |
| TypeScript 6 | Static typing |
| TanStack Router | Routing |
| TanStack Query 5 | Server state (queries & mutations) |
| TanStack Table 8 | Data tables |
| Zustand 5 | Global UI state |
| Axios | HTTP client |
| Zod | Schema validation |
| React Hook Form 7 | Form management |
| Tailwind CSS 4 | Utility-first styling |
| ShadcnUI | Component library (built on Radix) |
| BiomeJS 1.9 | Linter & formatter (no semicolons) |
| Vitest 3 | Unit tests |
| Docker | Containerization (Node 20 → Nginx alpine) |

## Project Structure

```
src/
├── shared/
│   ├── api/            # Axios instance (http.ts)
│   ├── constants/      # Query/mutation keys (query-keys.ts)
│   ├── providers/      # Global providers (AppProvider)
│   ├── stores/         # Zustand stores (auth-store.ts)
│   └── lib/            # Utilities (cn, etc.)
│
└── modules/
    └── <module-name>/
        ├── components/ # UI components
        ├── hooks/      # Custom hooks
        ├── schemas/    # Zod schemas
        ├── stores/     # Module-specific stores
        ├── types/      # TypeScript interfaces/types
        ├── queries/    # TanStack Query definitions
        ├── mutations/  # TanStack Mutation definitions
        ├── services/   # API service classes
        ├── test/       # Test files
        └── <name>.module.tsx  # Module wrapper component
```

## Skills (in `.opencode/skills/`)
- `label-catalog-core` — project conventions, stack, workflow
- `design-tokens-label-catalog` — "The Navy Bridge" design system, tokens, rules
- `impeccable` — design/redesign/audit commands (`/impeccable`)

## Code Conventions

### Module Pattern

- Every module MUST have a `<name>.module.tsx` that acts as the screen wrapper
- Services use **class-based naming**: `AuthService`, `UsersService`
- Services receive HTTP via `http` instance from `@/shared/api/http`
- Query/mutation keys are centralized in `src/shared/constants/query-keys.ts`
- Keys follow the `UPPER_KEYS` naming pattern and use `as const` tuples

### Import Alias

- `@/` maps to `src/` (e.g. `import { http } from '@/shared/api/http'`)

### Biome Formatting Rules

- No semicolons (`semicolons: "asNeeded"`)
- Single quotes (`quoteStyle: "single"`)
- Trailing commas everywhere (`trailingCommas: "all"`)
- Line width: 80
- Indent: 2 spaces
- Arrow parens: always

### TypeScript

- Strict mode enabled
- `noUncheckedIndexedAccess` — always handle undefined
- `verbatimModuleSyntax` — use `import type` for type-only imports
- No `baseUrl` (deprecated in TS 6); `paths` resolves from project root

### Environment Variables

- Configured in `.env` file (see `.env.example`)
- Exposed via `VITE_` prefix
- `VITE_API_URL` — base URL for the backend API

## Workflow Rules

### Before Every Commit

1. Run `pnpm lint` — Biome must pass with zero errors
2. Run `pnpm typecheck` — TypeScript must pass with zero errors
3. Run `pnpm test:run` — all tests must pass
4. Write a **semantic commit message** following conventional commits:
   - `feat:` — new feature
   - `fix:` — bug fix
   - `chore:` — maintenance, config, deps
   - `refactor:` — code restructuring
   - `test:` — adding/updating tests
   - `docs:` — documentation only
   - `style:` — formatting only (no logic change)

### Git Rules

- All work is done on the `dev` branch (or feature branches off it)
- **Never push to remote** — only Leonardo Sodre performs `git push`
- Commits must be atomic (one concern per commit)

### Module Creation Checklist

When creating a new module:
1. Create the directory structure under `src/modules/<name>/`
2. Define types first in `types/`
3. Create the service class in `services/`
4. Create query/mutation hooks in `queries/` or `mutations/`
5. Add keys to `src/shared/constants/query-keys.ts`
6. Create the `<name>.module.tsx` wrapper
7. Create the `test/` directory
8. Run `pnpm lint`, `pnpm typecheck`, and `pnpm test:run` before committing

## Context Documentation

Before making changes, read the relevant context files at project root:

| File | When to Read |
|---|---|
| `PRODUCT.md` | Altering flows, copy, features — defines product strategy, users, brand voice |
| `DESIGN.md` | Altering UI, components, styles — defines "The Navy Bridge" design system |
| `.opencode/skills/label-catalog-core/SKILL.md` | Any task — project conventions and workflow |
| `.opencode/skills/design-tokens-label-catalog/SKILL.md` | UI/design work — detailed design tokens and rules |
