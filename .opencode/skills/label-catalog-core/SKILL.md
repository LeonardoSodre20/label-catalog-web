---
name: label-catalog-core
description: Use when working on the label-catalog-web project — a corporate SPA for labels, users, and cost analysis. Covers all feature work: new modules, API integration, queries/mutations, forms, tables, auth flows, tests, Docker, and commits.
version: 1.0.0
---

## Project Overview

Sistema corporativo SPA para centralização de dados operacionais — etiquetas, usuários e análise de custos.

Público: operadores de chão de fábrica (consulta/impressão rápida de etiquetas) e diretoria (relatórios de custo e métricas).

Register: `product` (design SERVES the product — app UI, não superfície de marketing).

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
│   ├── api/http.ts           # Axios instance
│   ├── constants/            # Query/mutation keys
│   ├── components/ui/        # ShadcnUI components
│   ├── providers/            # Global providers
│   ├── stores/               # Zustand global stores
│   └── lib/utils.ts          # cn() utility
│
└── modules/
    └── <module-name>/
        ├── components/       # UI components
        ├── hooks/            # Custom hooks
        ├── schemas/          # Zod schemas
        ├── stores/           # Module-specific stores
        ├── types/            # TypeScript interfaces/types
        ├── queries/          # TanStack Query definitions
        ├── mutations/        # TanStack Mutation definitions
        ├── services/         # API service classes
        ├── test/             # Test files
        └── <name>.module.tsx # Module wrapper (screen)
```

## Code Conventions

### Module Pattern
- Every module MUST have a `<name>.module.tsx` that acts as the screen wrapper
- Services use class-based naming: `AuthService`, `UsersService`
- Services receive HTTP via `http` instance from `@/shared/api/http`
- Query/mutation keys are centralized in `src/shared/constants/query-keys.ts`
- Keys follow the `UPPER_KEYS` naming pattern and use `as const` tuples

### Import Alias
- `@/` maps to `src/` (e.g. `import { http } from '@/shared/api/http'`)

### Biome Formatting
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

## Commands

```bash
pnpm dev          # Start dev server on port 5173
pnpm build        # tsc -b && vite build (typecheck + build)
pnpm preview      # Preview production build
pnpm typecheck    # tsc -b (must pass before commit)
pnpm lint         # biome check --write . (format + lint)
pnpm lint:ci      # biome ci . (CI check only)
pnpm test         # vitest (watch mode)
pnpm test:run     # vitest run (single pass)
pnpm docker:dev   # docker compose up
pnpm docker:build # docker compose build
pnpm docker:down  # docker compose down
```

## Workflow Rules

### Before Every Commit
1. Run `pnpm lint` — Biome must pass with zero errors
2. Run `pnpm typecheck` — TypeScript must pass with zero errors
3. Run `pnpm test:run` — all tests must pass
4. Write a semantic commit message following conventional commits:
   - `feat:` — new feature
   - `fix:` — bug fix
   - `chore:` — maintenance, config, deps
   - `refactor:` — code restructuring
   - `test:` — adding/updating tests
   - `docs:` — documentation only
   - `style:` — formatting only (no logic change)

### Git Rules
- All work is done on the `dev` branch (or feature branches off it)
- Never push to remote — only Leonardo Sodre performs `git push`
- Commits must be atomic (one concern per commit)

### Module Creation Checklist
1. Create the directory structure under `src/modules/<name>/`
2. Define types first in `types/`
3. Create the service class in `services/`
4. Create query/mutation hooks in `queries/` or `mutations/`
5. Add keys to `src/shared/constants/query-keys.ts`
6. Create the `<name>.module.tsx` wrapper
7. Create the `test/` directory
8. Run `pnpm lint`, `pnpm typecheck`, and `pnpm test:run` before committing

## Design Context

Before making UI changes, read these files at the project root:

- `PRODUCT.md` — product strategy, users, brand voice, design principles
- `DESIGN.md` — visual design system ("The Navy Bridge"), colors, typography, component documentation
- `.opencode/skills/design-tokens-label-catalog/SKILL.md` — detailed design tokens and rules

## Known Anti-patterns (from DESIGN.md)
- No glassmorphism, no gradients, no playful aesthetics
- No more than one font family (Inter only)
- No decorative animations — only functional feedback (hover, focus, loading)
- No borders larger than 1px as decoration
- No accent colors other than tonal variations of navy
