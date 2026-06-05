---
target: login page + users module
total_score: 16
p0_count: 2
p1_count: 3
timestamp: 2026-06-05T22-57-28Z
slug: src-modules-auth
---
### Design Health Score: 16/40 (Poor)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | Login form submits to no-op; zero feedback on any action |
| 2 | Match System / Real World | 3 | Good Portuguese, but missing "Esqueceu sua senha?" and "Lembrar-me" |
| 3 | User Control and Freedom | 1 | No logout UI despite auth store having clearSession. No cancel, no back nav |
| 4 | Consistency and Standards | 2 | font-weight mismatch with DESIGN.md; Card has shadow-sm violating No-Shadow rule; bg-sidebar references undefined variable |
| 5 | Error Prevention | 2 | Submit button disabled when invalid traps users; no maxlength or input masking |
| 6 | Recognition Rather Than Recall | 2 | No session persistence; refresh loses auth entirely |
| 7 | Flexibility and Efficiency | 1 | No keyboard shortcuts, no remember me, no quick-access paths |
| 8 | Aesthetic and Minimalist Design | 3 | Clean layouts and whitespace, but Card shadow and font-weight mismatch |
| 9 | Error Recovery | 1 | Inline validation exists, but server-side errors completely unhandled |
| 10 | Help and Documentation | 0 | No help link, no tooltips, no contextual guidance, no support contact |
| **Total** | | **16/40** | **Poor — Major UX overhaul required** |

### Anti-Patterns Verdict

**PASS (LLM)** — The codebase does not look AI-generated. The design token system, navy brand identity, and component architecture are deliberate choices. The handleSubmit no-op suggests incomplete scaffolding, but the structure itself is intentional.

**Detector scan**: 0 findings — no anti-patterns detected in source files. Code conventions are clean.

### Overall Impression

Promising architecture with a solid token system, but the UX is non-functional at the critical auth entry point. The login form cannot submit. The Users module is an empty placeholder. The design system is well-defined in DESIGN.md but not faithfully implemented in code (Card shadows, font weights, missing CSS variables).

### What's Working

1. **Design token system**: OKLCH color tokens with CSS variables, dark mode support, and semantic naming per DESIGN.md
2. **Component architecture**: Button with proper CVA variants, Input with accessible focus/error states, Card with proper sub-components
3. **Clean module structure**: Services, mutations, schemas, and types properly separated per AGENTS.md conventions

### Priority Issues

- **[P0] Login form is a no-op** — handleSubmit(() => {}) means Entrar does nothing. No user can authenticate.
- **[P0] Zero feedback during loading/error/success** — No spinner, no error toast, no success redirect. Users are blind.
- **[P1] No logout capability** — Factory operators share terminals. Without logout, next user inherits the session.
- **[P1] Card has shadow-sm violating design system** — DESIGN.md No-Shadow-By-Default Rule explicitly prohibits shadows on flat surfaces.
- **[P1] Users module is an empty placeholder** — "Módulo em desenvolvimento" delivers value to neither persona.
- **[P2] No session persistence** — Zustand token in memory only; page refresh destroys auth state.
- **[P2] Login heading font-weight mismatch** — font-semibold (600) vs DESIGN.md Headline token font-medium (500).
- **[P2] No password recovery flow** — Operators have no self-service path for forgotten passwords.
- **[P3] bg-sidebar references undefined CSS variable** — Renders transparent in users module sidebar.
- **[P3] No skeleton loading components** — DESIGN.md requires them; none exist.
- **[P3] Typography hierarchy ambiguity** — "Acessar sistema" heading role not clearly mapped to Display vs Headline token.

### Persona Red Flags

**Factory Floor Operator**: No loading states (factory networks are slow), no session persistence (re-login on every browser close on shared terminals), no logout button (next operator inherits session), no quick-print path, touch targets potentially too small for gloved hands.

**Executive Staff**: Users module is "em desenvolvimento" — no cost reports, no metrics, no data visualization exists. No export or print-friendly layout.

**Alex (Power User)**: No keyboard shortcuts, no bulk operations, no session persistence between visits.

**Jordan (First-Timer)**: No onboarding guidance, no tooltips, no explanation of what the system does beyond a tagline.

**Sam (Accessibility)**: No aria-live regions for dynamic error announcements, no skip-to-content link, color-only error differentiation, muted-foreground contrast borderline at ~4.2:1.

### Minor Observations

- handleSubmit(() => {}) strongly suggests mutation wiring was never completed
- bg-sidebar variable used but not defined in theme — renders transparent
- Button imports Slot from 'radix-ui' as namespace which may conflict with verbatimModuleSyntax
- LoginLayout uses min-h-dvh (~90% browser support, iOS Safari <15.4 gap)
- No favicon, PWA manifest, or meta theme-color
- No test files exist despite test/ directory structure
- AuthService.login response has no runtime Zod guard

### Questions to Consider

- If handleSubmit(() => {}) is a no-op, has the auth flow ever been tested end-to-end?
- The Users module displays "Módulo em desenvolvimento" — was this built to satisfy a milestone, or does it serve the user's job-to-be-done?
- With noUncheckedIndexedAccess enabled and no Zod runtime guard on API responses, what happens when the backend returns an unexpected shape?
- For factory operators in 12-hour shifts, does a generic login screen with no session persistence respect their time constraints?
