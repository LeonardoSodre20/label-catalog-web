---
alwaysApply: true
---

# label-catalog-web — Project Rules

These rules apply whenever working inside the label-catalog-web project.

## Required Reading Order

Before starting ANY task in this project:

1. Read `AGENTS.md` — project conventions, stack, structure, workflow
2. Read `PRODUCT.md` — product strategy, users, brand voice (required for copy/flow changes)
3. Read `DESIGN.md` — "The Navy Bridge" design system (required for UI/component changes)
4. Load skill `label-catalog-core` — auto-loads project conventions
5. Load skill `design-tokens-label-catalog` — auto-loads design tokens (for UI work)

## Pre-commit Checklist

Always run these before creating a commit:

1. `pnpm lint` — Biome format + lint (zero errors)
2. `pnpm typecheck` — TypeScript (zero errors)
3. `pnpm test:run` — Vitest (all tests must pass)
4. Write conventional commit message (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`)

## Code Generation Rules

- Use `export function ComponentName` (named exports, one component per file)
- Props typed via `interface ComponentNameProps`
- Use `import type` for type-only imports (`verbatimModuleSyntax`)
- Always handle undefined (`noUncheckedIndexedAccess`)
- No semicolons, single quotes, trailing commas everywhere
- When creating a new module, follow the Module Creation Checklist in AGENTS.md

## Design Rules

- Do NOT propose glassmorphism, gradient text, side-stripe borders, or other banned patterns
- Do NOT propose a second font family beyond Inter
- Do NOT propose decorative animations, only functional feedback (hover, focus, loading, state change)
- Reference "Navy Bridge" design tokens from DESIGN.md for all color/typography decisions

## Library Queries

Use Context7 to fetch current documentation for any library question (React, TanStack, Zod, etc.) rather than relying on training data.
