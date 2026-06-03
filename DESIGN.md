<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

# Design System: label-catalog-web

## 1. Overview

**Creative North Star: "The Navy Bridge"**

Um sistema corporativo que conecta o chão de fábrica à sala de diretoria com seriedade e precisão. O azul-marinho âncora estabelece autoridade e confiança; os neutros claros e espaços generosos mantêm a legibilidade operacional para quem usa o sistema em ritmo acelerado. A estética é de um dashboard ERP clássico (SAP Fiori, Oracle), refinado com hierarquia tipográfica limpa e transições funcionais.

**Key Characteristics:**
- Autoridade visual através de cor commitada (navy domina 30-60% das superfícies)
- Neutros claros e arejados para leitura rápida em ambiente fabril
- Zero enfeite — bordas sutis, sem glassmorphism, sem gradientes decorativos
- Transições responsivas apenas para feedback funcional (hover, focus, loading)

## 2. Colors

Estratégia **Committed**: o azul-marinho é a cor dominante, carregando a maior parte das superfícies e componentes. Neutros claros equilibram o contraste.

### Primary
- **Navy Anchor** (`[to be resolved during implementation]`): Cor dominante. Usada em navs laterais, botões primários, headers de seção e superfícies de destaque. Carrega 30-60% da interface.
- **Navy Deep** (`[to be resolved during implementation]`): Variante escura para hover states e superfícies que precisam de mais peso.

### Neutral
- **Cool White** (`[to be resolved during implementation]`): Fundo de página principal.
- **Light Gray** (`[to be resolved during implementation]`): Superfícies de cartão, inputs, áreas secundárias.
- **Ink** (`[to be resolved during implementation]`): Cor de texto principal (quase preto, mas levemente azulado para harmonizar com o navy).
- **Muted Ink** (`[to be resolved during implementation]`): Texto secundário, labels, placeholders.

### Named Rules
**The Committed Navy Rule.** O azul-marinho não é um acento — é a cor da casa. Menos de 30% da superfície pintada de navy parece indecisa; mais de 60% parece opressiva. A raridade de qualquer outra cor é o que dá ao navy sua autoridade.

**The One Accent Rule.** Apenas o azul-marinho (com suas variantes tonais) existe como cor de marca. Nenhuma segunda cor de acento compete por atenção.

## 3. Typography

**Body Font:** Inter (ou sans-serif técnica similar)

**Caráter:** Limpa, técnica, sem ruído. Uma única família sans-serif mantém a interface enxuta e previsível — essencial para operadores que leem rápido e gestores que escaneiam relatórios.

### Hierarchy
- **Display** (SemiBold 600, `[size to be defined]`, `[line-height to be defined]`): Títulos de página e seções principais.
- **Headline** (Medium 500, `[size to be defined]`, `[line-height to be defined]`): Cabeçalhos de cards e modais.
- **Title** (Medium 500, `[size to be defined]`, `[line-height to be defined]`): Títulos de tabela, labels de campo.
- **Body** (Regular 400, `[size to be defined]`, `[line-height to be defined]`): Conteúdo principal, células de tabela, parágrafos. Máximo de 75 caracteres por linha.
- **Label** (Medium 500, `[size to be defined]`, `[letter-spacing to be defined]`): Labels de formulário, badges, metadados.

### Named Rules
**The One Family Rule.** Uma única família tipográfica (Inter) em pesos variados. Sem segunda fonte decorativa, sem serifa. Consistência > variedade.

## 4. Elevation

Sistema predominantemente plano com camadas tonais (diferença de luminosidade entre superfícies) em vez de sombras. Cards e modais usam elevação sutil (sombra leve) apenas para indicar sobreposição hierárquica.

**No-Shadow-By-Default Rule.** Superfícies planas não têm sombra. Apenas modais, dropdowns e tooltips usam elevação — e mesmo assim, a mais discreta possível.

## 5. Components

*[Seed — componentes serão documentados na próxima execução do `/impeccable document` com tokens reais.]*

## 6. Do's and Don'ts

### Do:
- **Do** usar azul-marinho como cor dominante em navs, headers e botões primários
- **Do** manter fundos neutros claros (cool white) para áreas de conteúdo
- **Do** usar transições sutis para feedback funcional (hover, focus, loading)
- **Do** preferir hierarquia tipográfica (peso + tamanho) a cores para diferenciar elementos

### Don't:
- **Don't** usar cores vibrantes, glassmorphism ou gradientes decorativos
- **Don't** usar tom de startup / marketing hype — o sistema é corporativo e sóbrio
- **Don't** adicionar animações decorativas ou coreografadas — só feedback funcional
- **Don't** usar mais de uma família tipográfica
- **Don't** usar bordas maiores que 1px como elemento decorativo
- **Don't** usar acentos de cor que não sejam variações tonais do azul-marinho
