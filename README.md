# Label Catalog

Sistema corporativo SPA para centralização de dados operacionais — etiquetas, usuários e análise de custos.

Conecta o chão de fábrica à sala de diretoria com seriedade e precisão. Operadores consultam e imprimem etiquetas rapidamente entre turnos; executivos acessam relatórios de custo e métricas em reuniões.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Linguagem | TypeScript 6 (strict mode) |
| Roteamento | TanStack Router |
| Estado servidor | TanStack Query 5 |
| Tabelas | TanStack Table 8 |
| Estado global | Zustand 5 |
| HTTP client | Axios |
| Validação | Zod |
| Formulários | React Hook Form 7 |
| Estilização | Tailwind CSS 4 |
| Componentes | ShadcnUI (Radix) |
| Linter / Formatter | BiomeJS 1.9 |
| Testes | Vitest + Testing Library |
| Container | Docker (Node 20 → Nginx alpine) |

---

## Design System

**"The Navy Bridge"** — um sistema corporativo que estabelece autoridade visual através de azul-marinho âncora, neutros claros e tipografia limpa.

| Princípio | Regra |
|---|---|
| Cor dominante | Navy Anchor (`oklch(0.28 0.1 265)`) ocupa 30-60% da interface |
| Tipografia | Inter — família única em pesos variados |
| Elevação | Camadas tonais em vez de sombras |
| Tom | Sóbrio, direto, profissional |

> Consulte [`DESIGN.md`](./DESIGN.md) para tokens completos (cores, tipografia, espaçamento, componentes).

---

## Arquitetura

### Estrutura de diretórios

```
src/
├── shared/
│   ├── api/http.ts              # Axios instance com interceptors (auth token, 401 redirect)
│   ├── constants/query-keys.ts   # Query/mutation keys centralizadas (as const)
│   ├── components/               # Componentes compartilhados (ui/, dashboard)
│   ├── providers/                # AppProvider (TanStack Query + Theme)
│   ├── stores/                   # Zustand stores (auth-store)
│   ├── hooks/                    # Custom hooks compartilhados
│   └── lib/utils.ts              # Utility functions (cn, etc.)
│
└── modules/
    └── <module-name>/
        ├── components/           # UI components do módulo
        ├── hooks/                # Custom hooks do módulo
        ├── schemas/              # Zod schemas de validação
        ├── stores/               # Zustand stores do módulo
        ├── types/                # Interfaces e tipos
        ├── queries/              # TanStack Query definitions
        ├── mutations/            # TanStack Mutation definitions
        ├── services/             # API service classes
        ├── test/                 # Testes do módulo
        └── <name>.module.tsx     # Screen wrapper do módulo
```

### Padrão de módulo

- Todo módulo possui um `<name>.module.tsx` que atua como screen wrapper
- Services usam **class-based naming**: `AuthService`, `UsersService`
- Services recebem HTTP via instância `http` de `@/shared/api/http`
- Query/mutation keys são centralizadas em `src/shared/constants/query-keys.ts`
- Keys seguem `UPPER_KEYS` com tuples `as const`

### Import alias

```ts
import { http } from '@/shared/api/http'
// @/ → src/
```

---

## Rotas

| Path | Componente | Descrição |
|---|---|---|
| `/` | `AuthModule` | Login |
| `/reset-password` | `ResetPasswordModule` | Recuperação de senha |
| `/dashboard` | `DashboardLayout` | Layout autenticado (protege rotas filhas) |
| `/dashboard/users` | `UsersModule` | CRUD de usuários |

---

## Módulos

### Auth (`src/modules/auth/`)

Fluxo completo de autenticação:
- **Login** — formulário com validação Zod
- **Esqueci senha** — fluxo de recuperação com PIN
- **Reset de senha** — redefine senha com token verificado
- **Proteção de rotas** — redirect para login se não autenticado

### Users (`src/modules/users/`)

CRUD completo de usuários:
- **Tabela** com TanStack Table (ordenação, filtro por nome)
- **Criar / Editar** usuário via dialog
- **Excluir** usuário com confirmação
- **Exclusão em lote** — seleção múltipla com ação em massa
- **Debounce** em filtros de busca

---

## Primeiros passos

### Pré-requisitos

- Node.js 20+
- pnpm 10.32.1

### Instalação

```bash
pnpm install
```

### Configuração

Copie o arquivo de ambiente e preencha a URL da API:

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:8080
```

### Desenvolvimento

```bash
pnpm dev
```

Acesse `http://localhost:5173`.

### Build

```bash
pnpm build
```

Gera os arquivos otimizados em `dist/`.

---

## Comandos

| Comando | Descrição |
|---|---|
| `pnpm dev` | Inicia servidor de desenvolvimento (porta 5173) |
| `pnpm build` | `tsc -b && vite build` (typecheck + build) |
| `pnpm preview` | Preview do build de produção |
| `pnpm typecheck` | `tsc -b` (verificação de tipos) |
| `pnpm lint` | `biome check --write .` (formata + lint) |
| `pnpm lint:ci` | `biome ci .` (apenas verificação) |
| `pnpm test` | `vitest` (modo watch) |
| `pnpm test:run` | `vitest run` (execução única) |
| `pnpm docker:dev` | `docker compose up` |
| `pnpm docker:build` | `docker compose build` |
| `pnpm docker:down` | `docker compose down` |

---

## Docker

### Desenvolvimento

```bash
pnpm docker:dev
```

Sobe o container com hot-reload na porta 5173.

### Produção

```bash
docker build -t label-catalog-web .
docker run -p 80:80 label-catalog-web
```

O `Dockerfile` usa **multi-stage build**:
1. **Stage 1** (`node:20-alpine`) — instala dependências e executa `pnpm build`
2. **Stage 2** (`nginx:1.27-alpine`) — serve os arquivos estáticos com configuração SPA (fallback para `index.html`)

---

## CI/CD

O pipeline é executado via **GitHub Actions** (`.github/workflows/ci.yml`):

| Stage | Descrição |
|---|---|
| `quality` | Lint → Typecheck → Testes |
| `build` | Compilação de produção (depende de quality) |
| `docker` | Build e push da imagem para GHCR (apenas `main`) |
| `deploy` | Deploy para Netlify (apenas `main`) |

### Pull Requests

Use o template em `.github/PULL_REQUEST_TEMPLATE.md` — inclui checklist de qualidade obrigatório.

---

## Testes

Framework: **Vitest** + **React Testing Library** + **jsdom**.

### Estrutura

```
src/
├── test/setup.ts              # Setup global (@testing-library/jest-dom)
├── shared/stores/*.test.ts    # Testes de Zustand stores
└── modules/<name>/test/       # Testes por módulo
```

### Camadas de teste (da mais pura à mais integrada)

```
Zod Schemas (sem mock)
       ↓
Services (mock Axios/http)
       ↓
TanStack Hooks (mock service + QueryClientProvider)
       ↓
Zustand Stores (sem mock)
       ↓
React Components (RTL)
```

### Execução

```bash
pnpm test       # watch mode
pnpm test:run   # CI / pré-commit
```

> Consulte [`TDD-GUIDE.md`](./TDD-GUIDE.md) para o guia completo de TDD no projeto.

---

## Variáveis de ambiente

| Variável | Descrição | Obrigatório |
|---|---|---|
| `VITE_API_URL` | Base URL da API backend | Sim |

---

## Convenções de código

### Biome

```json
{
  "semicolons": "asNeeded",
  "quoteStyle": "single",
  "trailingCommas": "all",
  "lineWidth": 80,
  "indentStyle": "space",
  "indentWidth": 2
}
```

### TypeScript

- Strict mode ativado
- `noUncheckedIndexedAccess` — sempre tratar undefined
- `verbatimModuleSyntax` — usar `import type` para type-only imports
- Paths: `@/*` → `./src/*`

### Commits

Seguem [Conventional Commits](https://www.conventionalcommits.org/):

| Tipo | Uso |
|---|---|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `chore:` | Manutenção, configuração, deps |
| `refactor:` | Refatoração sem mudança de comportamento |
| `test:` | Testes |
| `docs:` | Documentação |
| `style:` | Formatação (sem mudança lógica) |

---

## Regras de design

Extraídas de [`DESIGN.md`](./DESIGN.md):

- ✅ Azul-marinho como cor dominante (30-60% da interface)
- ✅ Fundos neutros claros para conteúdo
- ✅ Transições sutis para feedback funcional (hover, focus, loading)
- ✅ Hierarquia tipográfica (peso + tamanho) para diferenciar elementos
- ❌ Sem cores vibrantes, glassmorphism ou gradientes decorativos
- ❌ Sem tom de startup / marketing hype
- ❌ Sem animações decorativas
- ❌ Sem segunda família tipográfica
- ❌ Sem sombras em superfícies planas (cards, painéis)

---

## Product Context

> Consulte [`PRODUCT.md`](./PRODUCT.md) para estratégia de produto, personas e brand voice.

- **Register:** Product (design SERVE o produto)
- **Usuários:** Operadores de chão de fábrica + Diretoria executiva
- **Brand voice:** Sóbrio, direto, profissional
- **Acessibilidade:** WCAG AA como padrão
