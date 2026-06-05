---
name: design-tokens-label-catalog
description: Use when working on UI, components, styling, or design system changes for label-catalog-web. Covers "The Navy Bridge" design system, color tokens, typography, spacing, elevation, component states, and accessibility. Activates for any design or UI task on this project.
version: 1.0.0
---

# The Navy Bridge — Design System

Sistema corporativo que conecta o chão de fábrica à sala de diretoria com seriedade e precisão.

Register: `product` (design SERVES the product).

## Color Strategy: Committed

O azul-marinho não é um acento — é a cor da casa.

### Primary Navy
- **Navy Anchor** (`var(--color-navy)`, Tailwind: `bg-navy` / `text-navy`): Cor dominante. Usada em navs laterais, botões primários, headers de seção. Carrega 30-60% da interface.
- **Navy Deep** (`var(--color-navy-deep)`): Variante escura para hover states e superfícies que precisam de mais peso.

### Neutrals
- **Cool White** (`var(--color-cool-white)`): Fundo de página principal. Aproximadamente `#F8FAFC` (slate-50).
- **Light Gray** (`var(--color-light-gray)`): Superfícies de cartão, inputs, áreas secundárias. Aproximadamente `#F1F5F9` (slate-100).
- **Ink** (`var(--color-ink)`): Cor de texto principal. Quase preto, levemente azulado para harmonizar com o navy. Aproximadamente `#0F172A` (slate-900).
- **Muted Ink** (`var(--color-muted-ink)`): Texto secundário, labels, placeholders. Aproximadamente `#64748B` (slate-500).

### Semantic Colors (from ShadcnUI / Tailwind)
- **Primary**: Navy Anchor — botões primários, links, foco
- **Destructive**: Vermelho para ações destrutivas
- **Success/Info/Warning**: Padrão Tailwind/semantic, usados apenas para feedback de estado

### Rules
- **The Committed Navy Rule.** Menos de 30% de navy parece indeciso; mais de 60% parece opressivo.
- **The One Accent Rule.** Apenas o azul-marinho (com variantes tonais) existe como cor de marca. Nenhuma segunda cor de acento.

## Typography: One Family Rule

Uma única família tipográfica (Inter) em pesos variados. Sem segunda fonte decorativa, sem serifa.

| Token | Weight | Size | Usage |
|---|---|---|---|
| Display | SemiBold 600 | `text-3xl` / `text-4xl` | Títulos de página e seções principais |
| Headline | Medium 500 | `text-2xl` | Cabeçalhos de cards e modais |
| Title | Medium 500 | `text-lg` / `text-xl` | Títulos de tabela, labels de campo |
| Body | Regular 400 | `text-base` (16px) | Conteúdo principal, células de tabela |
| Label | Medium 500 | `text-sm` | Labels de formulário, badges, metadados |

- Body line length capped at 65-75ch for prose
- Tables and data UIs can run denser (120ch+ is fine)
- No all-caps body copy. Reserve uppercase for short labels (≤4 words), badges
- Use `text-wrap: balance` on headings for even line lengths

## Elevation: No-Shadow-By-Default

Superfícies planas não têm sombra. Apenas modais, dropdowns e tooltips usam elevação — a mais discreta possível.

- Cards: sem sombra, diferenciados por tom de fundo (Light Gray sobre Cool White)
- Modais/Dropdowns: `shadow-sm` ou equivalente mínimo
- Sistema predominantemente plano com camadas tonais

## Spacing & Layout

- Gap padrão: 16px (4) entre elementos de formulário e cards
- Padding de containers: 24px (6) para seções principais, 16px (4) para cards
- Layout: Flexbox para 1D, Grid para 2D

## Component States (Product Standard)

Todo componente interativo deve ter: default, hover, focus, active, disabled, loading, error.

### Current Components (in `src/shared/components/ui/`)

**Button** (`button.tsx`)
- 6 variants: default, destructive, outline, secondary, ghost, link
- 8 sizes: default, xs, sm, lg, icon, icon-xs, icon-sm, icon-lg
- Suporta `asChild` via Radix Slot.Root
- Estados: `disabled:opacity-50`, `focus-visible:ring-[3px]`, `hover:bg-primary/90`

**Card** (`card.tsx`)
- Layout container padrão

**Input** (`input.tsx`)
- Campo de formulário padrão

**Label** (`label.tsx`)
- Label de formulário

## UX Copy Rules

- Button labels: verb + object. "Salvar alterações" beats "OK"
- No marketing buzzwords (streamline, empower, leverage, seamless, world-class, etc.)
- Link text precisa ter significado standalone (screen readers anunciam links fora de contexto)
- Every word earns its place. No restated headings.

## Accessibility: WCAG AA

- Body text: contraste ≥ 4.5:1 contra o fundo
- Large text (≥18px ou bold ≥14px): contraste ≥ 3:1
- Placeholder text: precisa do mesmo 4.5:1, não o cinza claro padrão
- Foco visível em todos os elementos interativos (já configurado via ShadcnUI `focus-visible:ring`)
- Navegação por teclado funcional
- `@media (prefers-reduced-motion: reduce)` para qualquer animação

## Do's

- Usar azul-marinho como cor dominante em navs, headers e botões primários
- Manter fundos neutros claros (cool white) para áreas de conteúdo
- Usar transições sutis para feedback funcional (hover, focus, loading)
- Preferir hierarquia tipográfica (peso + tamanho) a cores para diferenciar elementos
- Skeleton states para loading, não spinners no meio do conteúdo
- Empty states que ensinam a interface, não "nada aqui"

## Don'ts (Anti-patterns)

- **Absolute bans**: sem glassmorphism, gradient text, side-stripe borders, hero-metric template, identical card grids, tiny uppercase eyebrows above every section
- Sem cores vibrantes além do navy
- Sem animações decorativas ou coreografadas — só feedback funcional
- Sem mais de uma família tipográfica
- Sem bordas maiores que 1px como elemento decorativo
- Sem acentos de cor que não sejam variações tonais do azul-marinho
- Nested cards
- Decorative motion que não convey estado
- Display fonts em UI labels, buttons, data
- Modal como first thought (exaurir alternativas inline/progressive primeiro)
