# Design System: label-catalog-web

## 1. Overview

**Creative North Star: "The Navy Bridge"**

Um sistema corporativo que conecta o chão de fábrica à sala de diretoria com seriedade e precisão. O azul-marinho âncora estabelece autoridade e confiança; os neutros claros e espaços generosos mantêm a legibilidade operacional para quem usa o sistema em ritmo acelerado. A estética é de um dashboard ERP clássico (SAP Fiori, Oracle), refinado com hierarquia tipográfica limpa e transições funcionais.

**Register:** product (design SERVES the product — app UI, dashboards, tools)

**Key Characteristics:**
- Autoridade visual através de cor commitada (navy domina 30-60% das superfícies)
- Neutros claros e arejados para leitura rápida em ambiente fabril
- Zero enfeite — bordas sutis, sem glassmorphism, sem gradientes decorativos
- Transições responsivas apenas para feedback funcional (hover, focus, loading)

## 2. Colors

Estratégia **Committed**: o azul-marinho é a cor dominante, carregando a maior parte das superfícies e componentes. Neutros claros equilibram o contraste.

### Primary Navy
| Token | Hex | Tailwind | Uso |
|---|---|---|---|
| Navy Anchor | `#1E3A5F` | `blue-900` | Cor dominante: navs laterais, botões primários, headers de seção, superfícies de destaque. 30-60% da interface. |
| Navy Deep | `#152C47` | — | Variante escura para hover states e superfícies que precisam de mais peso. |

### Neutral
| Token | Hex | Tailwind | Uso |
|---|---|---|---|
| Cool White | `#F8FAFC` | `slate-50` | Fundo de página principal |
| Light Gray | `#F1F5F9` | `slate-100` | Superfícies de cartão, inputs, áreas secundárias |
| Ink | `#0F172A` | `slate-900` | Cor de texto principal (quase preto, levemente azulado) |
| Muted Ink | `#64748B` | `slate-500` | Texto secundário, labels, placeholders |

### Semantic / State Colors
| Token | Hex | Uso |
|---|---|---|
| Destructive | `#DC2626` | Ações destrutivas (excluir, cancelar) |
| Destructive Hover | `#B91C1C` | Hover de ações destrutivas |
| Success | `#16A34A` | Feedback positivo |
| Warning | `#D97706` | Alertas |
| Info | `#2563EB` | Informação |

### Named Rules
**The Committed Navy Rule.** O azul-marinho não é um acento — é a cor da casa. Menos de 30% da superfície pintada de navy parece indecisa; mais de 60% parece opressiva. A raridade de qualquer outra cor é o que dá ao navy sua autoridade.

**The One Accent Rule.** Apenas o azul-marinho (com suas variantes tonais) existe como cor de marca. Nenhuma segunda cor de acento compete por atenção.

## 3. Typography

**Body Font:** Inter (ou sans-serif técnica similar)

**Caráter:** Limpa, técnica, sem ruído. Uma única família sans-serif mantém a interface enxuta e previsível — essencial para operadores que leem rápido e gestores que escaneiam relatórios.

### Hierarchy

| Token | Weight | Size | Line-height | Tailwind | Uso |
|---|---|---|---|---|---|
| Display | SemiBold 600 | 24px (1.5rem) | 1.3 | `text-2xl font-semibold` | Títulos de página e seções principais |
| Headline | Medium 500 | 20px (1.25rem) | 1.4 | `text-xl font-medium` | Cabeçalhos de cards e modais |
| Title | Medium 500 | 16px (1rem) | 1.4 | `text-base font-medium` | Títulos de tabela, labels de campo |
| Body | Regular 400 | 14px (0.875rem) | 1.5 | `text-sm` | Conteúdo principal, células de tabela, parágrafos. Máx. 75 caracteres/linha |
| Label | Medium 500 | 12px (0.75rem) | 1.25 | `text-xs font-medium` | Labels de formulário, badges, metadados. Letter-spacing: 0.025em |

### Named Rules
**The One Family Rule.** Uma única família tipográfica (Inter) em pesos variados. Sem segunda fonte decorativa, sem serifa. Consistência > variedade.

## 4. Elevation

Sistema predominantemente plano com camadas tonais (diferença de luminosidade entre superfícies) em vez de sombras. Cards e modais usam elevação sutil (sombra leve) apenas para indicar sobreposição hierárquica.

| Superfície | Elevação | Tailwind |
|---|---|---|
| Cards, painéis | Tonal (Light Gray sobre Cool White) | Nenhuma sombra |
| Modais | Sombra sutil | `shadow-sm` ou `shadow-md` |
| Dropdowns, tooltips | Sombra sutil | `shadow-sm` |
| Nav lateral | Tonal (Navy sobre Cool White) | Nenhuma sombra |

**No-Shadow-By-Default Rule.** Superfícies planas não têm sombra. Apenas modais, dropdowns e tooltips usam elevação — e mesmo assim, a mais discreta possível.

## 5. Components

### Button (`src/shared/components/ui/button.tsx`)

Baseado em ShadcnUI com `class-variance-authority`.

**Variants:**
| Variant | Aparência | Uso |
|---|---|---|
| `default` | `bg-primary text-primary-foreground hover:bg-primary/90` | Ação principal do formulário/página |
| `destructive` | `bg-destructive text-white hover:bg-destructive/90` | Excluir, remover, cancelar |
| `outline` | `border bg-background shadow-xs hover:bg-accent` | Ação secundária |
| `secondary` | `bg-secondary text-secondary-foreground hover:bg-secondary/80` | Ação terciária |
| `ghost` | `hover:bg-accent hover:text-accent-foreground` | Ação sutil (links, toolbars) |
| `link` | `text-primary underline-offset-4 hover:underline` | Navegação inline |

**Sizes:** `default` (h-9), `xs` (h-6), `sm` (h-8), `lg` (h-10), `icon` (size-9), `icon-xs` (size-6), `icon-sm` (size-8), `icon-lg` (size-10)

**Estados:** default, hover (`/90` opacity), focus-visible (`ring-[3px]`), disabled (`opacity-50 pointer-events-none`)

### Card (`src/shared/components/ui/card.tsx`)
Container de superfície com fundo Light Gray (`bg-light-gray`). Sem sombra (elevação tonal). Padding interno consistente.

### Input (`src/shared/components/ui/input.tsx`)
Campo de texto padrão ShadcnUI. Estados: default, focus (ring navy), disabled (opacity reduzida), error (`aria-invalid`).

### Label (`src/shared/components/ui/label.tsx`)
Label de formulário ShadcnUI. Tamanho `text-sm` (14px), peso Medium 500.

## 6. Do's and Don'ts

### Do:
- **Do** usar azul-marinho como cor dominante em navs, headers e botões primários
- **Do** manter fundos neutros claros (cool white) para áreas de conteúdo
- **Do** usar transições sutis para feedback funcional (hover, focus, loading)
- **Do** preferir hierarquia tipográfica (peso + tamanho) a cores para diferenciar elementos
- **Do** usar skeleton states para loading (evitar spinners no meio do conteúdo)
- **Do** criar empty states que ensinam a interface, não "nada aqui"
- **Do** manter consistência de vocabulário visual entre telas

### Don't:
- **Don't** usar cores vibrantes, glassmorphism ou gradientes decorativos
- **Don't** usar tom de startup / marketing hype — o sistema é corporativo e sóbrio
- **Don't** adicionar animações decorativas ou coreografadas — só feedback funcional
- **Don't** usar mais de uma família tipográfica
- **Don't** usar bordas maiores que 1px como elemento decorativo
- **Don't** usar acentos de cor que não sejam variações tonais do azul-marinho
- **Don't** nested cards
- **Don't** display fonts em UI labels, buttons, dados
- **Don't** modal como first thought — preferir alternativas inline/progressivas primeiro
- **Don't** reinventar affordances padrão (scrollbars customizados, form controls não-padrão)
