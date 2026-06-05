---
name: label-catalog-web
description: Sistema corporativo para centralização de dados operacionais — etiquetas, usuários e análise de custos
colors:
  navy-anchor: "oklch(0.28 0.1 265)"
  navy-deep: "oklch(0.23 0.1 265)"
  cool-white: "oklch(0.985 0 0)"
  light-gray: "oklch(0.95 0.005 265)"
  ink: "oklch(0.15 0.01 265)"
  muted-ink: "oklch(0.5 0.01 265)"
  destructive: "oklch(0.5 0.2 25)"
  surface-dark: "oklch(0.22 0.015 265)"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.2
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.75rem"
components:
  button-primary:
    backgroundColor: "{colors.navy-anchor}"
    textColor: "{colors.cool-white}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
    fontWeight: 500
  button-primary-hover:
    backgroundColor: "{colors.navy-deep}"
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.cool-white}"
    rounded: "{rounded.md}"
  button-outline:
    backgroundColor: "{colors.cool-white}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.light-gray}"
    rounded: "{rounded.md}"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    border: "1px solid var(--input)"
    rounded: "{rounded.md}"
    padding: "0.25rem 0.75rem"
  card:
    backgroundColor: "{colors.cool-white}"
    textColor: "{colors.ink}"
    border: "1px solid var(--border)"
    rounded: "{rounded.xl}"
  label:
    fontWeight: 500
    fontSize: "0.875rem"
    lineHeight: 1
---

# Design System: label-catalog-web

## 1. Overview

**Creative North Star: "The Navy Bridge"**

Um sistema corporativo que conecta o chão de fábrica à sala de diretoria com seriedade e precisão. O azul-marinho âncora estabelece autoridade e confiança; os neutros claros e espaços generosos mantêm a legibilidade operacional para quem usa o sistema em ritmo acelerado. A estética é de um dashboard ERP clássico (SAP Fiori, Oracle), refinado com hierarquia tipográfica limpa e transições funcionais.

Densidade baixa a moderada — formulários e painéis priorizam espaçamento generoso em vez de compactação forçada. Elementos compartilham um vocabulário visual consistente: cantos sutilmente arredondados (8px para cartões, 6px para botões e inputs), bordas de 1px para delimitar superfícies, e hierarquia tipográfica baseada em peso + tamanho, nunca em cor.

**Key Characteristics:**
- Autoridade visual através de cor commitada (navy domina 30-60% das superfícies)
- Neutros claros e arejados para leitura rápida em ambiente fabril
- Zero enfeite — bordas sutis, sem glassmorphism, sem gradientes decorativos
- Transições responsivas apenas para feedback funcional (hover, focus, loading)
- Tonal layering em vez de sombras para criar profundidade entre superfícies

## 2. Colors

Estratégia **Committed**: o azul-marinho é a cor dominante, carregando a maior parte das superfícies e componentes. Neutros claros equilibram o contraste.

All values expressed in OKLCH for perceptual uniformity.

### Primary
- **Navy Anchor** (`oklch(0.28 0.1 265)`): Cor dominante. Usada em navs laterais, botões primários, headers de seção e superfícies de destaque. Carrega 30-60% da interface.
- **Navy Deep** (`oklch(0.23 0.1 265)`): Variante escura para hover states e superfícies que precisam de mais peso.

### Neutral
- **Cool White** (`oklch(0.985 0 0)`): Fundo de página principal e superfícies de cartão.
- **Light Gray** (`oklch(0.95 0.005 265)`): Superfícies secundárias, áreas de navegação em dark mode.
- **Ink** (`oklch(0.15 0.01 265)`): Cor de texto principal (quase preto, levemente azulado para harmonizar com o navy).
- **Muted Ink** (`oklch(0.5 0.01 265)`): Texto secundário, labels, placeholders, metadados.

### Semantic
- **Destructive** (`oklch(0.5 0.2 25)`): Ações destrutivas (excluir, remover). Usada apenas em botões destrutivos e indicadores de erro.

### Named Rules
**The Committed Navy Rule.** O azul-marinho não é um acento — é a cor da casa. Menos de 30% da superfície pintada de navy parece indecisa; mais de 60% parece opressiva. A raridade de qualquer outra cor é o que dá ao navy sua autoridade.

**The One Accent Rule.** Apenas o azul-marinho (com suas variantes tonais) existe como cor de marca. Nenhuma segunda cor de acento compete por atenção.

## 3. Typography

**Body Font:** Inter (ui-sans-serif, system-ui, sans-serif)

**Caráter:** Limpa, técnica, sem ruído. Uma única família sans-serif mantém a interface enxuta e previsível — essencial para operadores que leem rápido e gestores que escaneiam relatórios.

### Hierarchy
- **Display** (SemiBold 600, `1.5rem`, 1.2): Títulos de página e produto (ex.: "label catalog" na tela de login).
- **Headline** (Medium 500, `1.25rem`, 1.2): Cabeçalhos de cards e modais (ex.: "Acessar sistema").
- **Title** (Medium 500, `1rem`, 1.4): Títulos de tabela, labels de campo, cabeçalhos de seção secundários.
- **Body** (Regular 400, `0.875rem`, 1.5): Conteúdo principal, células de tabela, parágrafos, textos descritivos. Máximo de 75 caracteres por linha.
- **Label** (Medium 500, `0.875rem`, 1): Labels de formulário, badges, metadados.

### Named Rules
**The One Family Rule.** Uma única família tipográfica (Inter) em pesos variados. Sem segunda fonte decorativa, sem serifa. Consistência > variedade.

## 4. Elevation

Sistema predominantemente plano com camadas tonais (diferença de luminosidade entre superfícies) em vez de sombras. Cards e containers usam contraste de cor de fundo (`bg-card` sobre `bg-background`) para indicar hierarquia, não `box-shadow`.

**No-Shadow-By-Default Rule.** Superfícies planas não têm sombra. Apenas modais, dropdowns e tooltips usam elevação — e mesmo assim, a mais discreta possível. Cartões, painéis e containers usam exclusivamente contraste tonal.

## 5. Components

### Buttons
- **Shape:** Cantos arredondados de 8px (`rounded-md`). Altura padrão de 36px (h-9).
- **Primary:** Fundo Navy Anchor (`oklch(0.28 0.1 265)`), texto Cool White. Hover escurece para Navy Deep via opacidade (`hover:bg-primary/90`).
- **Destructive:** Fundo Destructive (`oklch(0.5 0.2 25)`), texto branco.
- **Outline:** Fundo transparente, borda de 1px, texto Ink. Hover recebe fundo Light Gray.
- **Secondary:** Fundo Light Gray, texto Ink. Hover escurece o fundo.
- **Ghost:** Sem fundo. Hover recebe fundo Light Gray.
- **Link:** Texto Navy Anchor com sublinhado no hover. Sem fundo.
- **Sizes:** xs (24px), sm (32px), default (36px), lg (40px), icon (36px), icon-xs (24px), icon-sm (32px), icon-lg (40px).
- **Focus:** Ring de 3px na cor Navy Anchor com 50% de opacidade. Outline-none como padrão.
- **Disabled:** Opacidade 50%, pointer-events-none.

### Inputs / Fields
- **Style:** Borda de 1px sólida (`border`), fundo transparente, cantos de 8px (`rounded-md`), altura de 36px (h-9). Padding horizontal de 12px.
- **Focus:** Borda muda para cor do ring; ring externo de 3px com 50% de opacidade.
- **Error:** Borda destaca com cor Destructive (+ ring externo). Mensagem de erro abaixo do campo em text-destructive.
- **Placeholder:** Cor Muted Ink (`text-muted-foreground`).
- **Disabled:** Opacidade 50%, cursor not-allowed.

### Labels
- **Style:** Text size `0.875rem` (text-sm), Medium 500 weight. Associado ao input via `htmlFor`.
- **Disabled:** Quando o grupo pai está desabilitado, opacidade 50%.

### Cards
- **Shape:** Cantos de 12px (`rounded-xl`). Borda de 1px (`border`). Sem sombra. Padding vertical de 24px, padding horizontal de 24px (`px-6`).
- **Background:** Cool White (`bg-card`) sobre fundo Cool White (`bg-background`). O contraste é puramente tonal (luminosidade 0.985 vs 0.985 — a borda de 1px faz a separação visual).
- **Sub-components:** CardHeader (grid para título + ação), CardTitle (font-semibold), CardDescription (text-sm muted), CardContent (padding horizontal), CardFooter (flex, borda superior opcional).

### Navigation (Sidebar)
- **Style:** Fundo Navy Anchor (`bg-sidebar`), texto Cool White. Largura fixa de 256px (w-64) em desktop, oculta em mobile (hidden lg:flex).
- **Items:** Links de navegação com padding, hover state via fundo primary-foreground/10.
- **Brand:** Logo + nome do produto no topo.

## 6. Do's and Don'ts

### Do:
- **Do** usar azul-marinho como cor dominante em navs, headers e botões primários
- **Do** manter fundos neutros claros (cool white) para áreas de conteúdo
- **Do** usar transições sutis para feedback funcional (hover, focus, loading)
- **Do** preferir hierarquia tipográfica (peso + tamanho) a cores para diferenciar elementos
- **Do** usar skeleton states para loading (evitar spinners no meio do conteúdo)
- **Do** usar tons neutros com leve croma azulado (265°) para harmonizar com o navy

### Don't:
- **Don't** usar cores vibrantes, glassmorphism ou gradientes decorativos
- **Don't** usar tom de startup / marketing hype — o sistema é corporativo e sóbrio
- **Don't** adicionar animações decorativas ou coreografadas — só feedback funcional
- **Don't** usar mais de uma família tipográfica
- **Don't** usar bordas maiores que 1px como elemento decorativo
- **Don't** usar acentos de cor que não sejam variações tonais do azul-marinho
- **Don't** usar sombras em superfícies planas (cards, painéis) — apenas modais, dropdowns e tooltips
- **Don't** usar tons pasteis ou creme como fundo de página — cool white puro (chroma 0) é o padrão
