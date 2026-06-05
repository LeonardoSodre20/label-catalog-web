# TDD Guide — label-catalog-web

Guia de referência para aplicar Test-Driven Development no projeto.

---

## Diagnóstico Atual

| Recurso | Status |
|---|---|
| `vitest` ^3 | Instalado |
| `@testing-library/react` ^16 | Instalado |
| `@testing-library/jest-dom` ^6 | Instalado |
| `jsdom` ^25 | Instalado |
| Config de ambiente (`jsdom`) | ❌ Falta configurar |
| Setup file (`jest-dom` matchers) | ❌ Falta criar |
| Globals (`describe`, `it`, `expect`) | ❌ Falta configurar |
| Testes escritos | Zero |
| Pastas `test/` nos módulos | Criadas (vazias) |

---

## O Ciclo TDD: Red → Green → Refactor

```
1. RED   → Escreva um teste que FALHA (antes do código de produção)
2. GREEN → Escreva o código MÍNIMO para passar o teste
3. REFACTOR → Melhore o código mantendo os testes verdes
```

Nunca escreva código de produção antes do teste. O teste é o design, não a verificação.

---

## Camadas de Teste (da mais pura à mais integrada)

```
Zod Schemas (puros, sem mock)
       ↓
Services (mock Axios/http)
       ↓
TanStack Hooks (mock service + QueryClientProvider)
       ↓
Zustand Stores (puros, sem mock)
       ↓
React Components (RTL + wrappers)
       ↓
Module / Integração (composição)
```

Comece de cima para baixo. A camada de schema é a mais fácil e não precisa de mock nenhum.

---

## Fluxo para Criar uma Funcionalidade Nova com TDD

```
1. Escrever o schema Zod + testar parsing
       ↓ (RED → GREEN → refactor)
2. Escrever a interface/types do service + testar
       ↓ (RED → GREEN → refactor)
3. Escrever o hook (query/mutation) + testar
       ↓ (RED → GREEN → refactor)
4. Escrever o componente + testar com RTL
       ↓ (RED → GREEN → refactor)
5. Escrever o module wrapper + teste de integração
       ↓ (RED → GREEN → refactor)
6. Commit
```

---

## Exemplos por Camada

### 1. Schema (Zod) — mais puro, sem mock

```ts
// src/modules/auth/test/login-schema.test.ts
import { loginSchema } from '../schemas/login-schema'

describe('loginSchema', () => {
  it('accepts valid email and password', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: '123456',
    })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'invalido',
      password: '123456',
    })
    expect(result.success).toBe(false)
  })

  it('rejects password shorter than 6 characters', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: '123',
    })
    expect(result.success).toBe(false)
  })

  it('returns structured error for invalid email', () => {
    const result = loginSchema.safeParse({ email: '', password: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email')
    }
  })
})
```

### 2. Service (mock Axios)

```ts
// src/modules/auth/test/auth.service.test.ts
import { http } from '@/shared/api/http'
import { AuthService } from '../services/auth.service'

vi.mock('@/shared/api/http')

const service = new AuthService()

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls POST /auth/login with correct data', async () => {
    const mockResponse = {
      data: {
        token: 'abc123',
        user: { id: '1', name: 'Test', email: 'test@test.com' },
      },
    }
    vi.mocked(http.post).mockResolvedValue(mockResponse)

    const result = await service.login({
      email: 'test@test.com',
      password: '123456',
    })

    expect(http.post).toHaveBeenCalledWith('/auth/login', {
      email: 'test@test.com',
      password: '123456',
    })
    expect(result.token).toBe('abc123')
    expect(result.user.name).toBe('Test')
  })

  it('rejects when API returns error', async () => {
    vi.mocked(http.post).mockRejectedValue(new Error('Network Error'))

    await expect(
      service.login({ email: 'test@test.com', password: '123456' }),
    ).rejects.toThrow('Network Error')
  })
})
```

### 3. TanStack Hook (mock service + provider wrapper)

```ts
// src/modules/auth/test/use-login.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useLogin } from '../mutations/use-login'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useLogin', () => {
  it('mutates with correct data', async () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() })

    result.current.mutate({ email: 'test@test.com', password: '123456' })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
  })

  it('handles error state', async () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() })

    result.current.mutate({ email: 'erro@test.com', password: '123456' })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})
```

### 4. Component (React Testing Library)

```ts
// src/modules/auth/test/login-form.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '../components/login-form'

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText(/e-?mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
  })

  it('shows validation error when submitting empty form', async () => {
    render(<LoginForm />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument()
  })

  it('calls login mutation on valid submission', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    await user.type(screen.getByLabelText(/e-?mail/i), 'user@test.com')
    await user.type(screen.getByLabelText(/senha/i), '123456')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    // O teste de mutação depende de mock externo
    // Exemplo: esperar que o botão desabilite ou mostre loading
  })
})
```

### 5. Zustand Store (puro, sem mock)

```ts
// src/shared/stores/auth-store.test.ts
import { useAuthStore } from './auth-store'

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null })
  })

  it('starts with null token', () => {
    const { token } = useAuthStore.getState()
    expect(token).toBeNull()
  })

  it('sets token', () => {
    useAuthStore.getState().setToken('abc123')
    expect(useAuthStore.getState().token).toBe('abc123')
  })

  it('clears session', () => {
    useAuthStore.getState().setToken('abc123')
    useAuthStore.getState().clearSession()
    expect(useAuthStore.getState().token).toBeNull()
  })
})
```

---

## Configuração Necessária para Rodar Testes

### Passo 1 — Vitest config no `vite.config.ts`

```ts
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  server: { port: 5173 },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

### Passo 2 — Setup file

```ts
// src/test/setup.ts
import '@testing-library/jest-dom'
```

### Passo 3 — TypeScript com `vitest/globals`

No `tsconfig.app.json`, adicione `"vitest/globals"` aos `types`:

```json
{
  "compilerOptions": {
    "types": ["vite/client", "vitest/globals"]
  }
}
```

Isso faz o TypeScript reconhecer `describe`, `it`, `expect`, `vi` sem precisar importar.

---

## Padrões e Conceitos Importantes

### Test Wrapper Pattern

Hooks do TanStack Query precisam de um `QueryClientProvider`. Crie um wrapper fresco para cada teste:

```ts
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}
```

### Mock de Axios vs MSW

- **`vi.mock('axios')`** — mais simples, bom para services class
- **MSW (Mock Service Worker)** — mocka em nível de rede, bom para testes de integração

```
vi.mock → mais rápido, mais isolado, ideal para TDD no início
MSW     → mais realista, melhor para testes de integração
```

### Arrange-Act-Assert

Estruture cada teste em 3 blocos:

```ts
it('faz algo específico', () => {
  // Arrange — prepara dados, renders, mocks
  const data = { email: 'test@test.com' }

  // Act — executa a ação
  const result = loginSchema.safeParse(data)

  // Assert — verifica o resultado
  expect(result.success).toBe(true)
})
```

### O que NÃO testar

- **Tipos TypeScript** — são verificados em compilação, não em runtime
- **Query keys** — são constantes estáticas (`as const`)
- **Bibliotecas de terceiros** — TanStack Query, Axios, Zod já são testados pelos autores
- **Detalhes de implementação** — não asserte que `setState` foi chamado, asserte o comportamento visível

---

## Anti-padrões para Evitar

| Anti-padrão | Problema | Solução |
|---|---|---|
| Testar implementação em vez de comportamento | Teste quebra em todo refactor | Olhe para o que o usuário vê/experiencia |
| Usar seletores CSS ou `data-testid` como padrão | Teste frágil a mudanças de estilo | Prefira `getByRole`, `getByLabelText`, `getByText` |
| Mockar tudo | Teste não testa integração real | Mocks só nas bordas do sistema (API, localStorage) |
| Pular o Refactor | Código acumula dívida técnica | TDD são 3 passos, não 2 |
| Testes muito grandes | Difícil identificar o que falhou | Um `it` por comportamento |
| `beforeEach` pesado | Testes acoplados e lentos | Prefira criar dados frescos em cada teste |

---

## Roadmap de Estudos

### Semana 1-2: Fundamentos + Schemas

- Leia "Test-Driven Development by Example" (Kent Beck) — ~200 páginas
- Entenda o ciclo Red-Green-Refactor
- Configure o ambiente de teste no projeto
- Escreva testes para Zod schemas (loginSchema, userSchema)

### Semana 3: Services + Mocks

- Aprenda `vi.mock`, `vi.spyOn`, `vi.fn`
- Teste AuthService e UsersService com Axios mockado
- Pratique: teste o fluxo de sucesso e o fluxo de erro

### Semana 4: Hooks TanStack

- Aprenda o Test Wrapper Pattern com QueryClientProvider
- Teste mutations (useLogin) e queries (useUsers)
- Pratique: teste estados loading, success, error

### Semana 5: Componentes com RTL

- Aprenda `render`, `screen`, `userEvent`
- Teste LoginForm: validação, submissão, loading
- Pratique: teste interações do usuário (clique, digitação)

### Semana 6+: Integração + Projetos reais

- Teste fluxos completos (login → listagem)
- Explore MSW para mock de API em nível de rede
- Pratique TDD em uma funcionalidade nova do zero

---

## Recursos Recomendados

| Recurso | Tipo | Por que |
|---|---|---|
| "Test-Driven Development by Example" (Kent Beck) | Livro | Clássico fundamental, pequeno e direto |
| "Effective Software Testing" (Maurício Aniche) | Livro | Abordagem prática, exemplos em TypeScript |
| Documentação do Vitest | Docs | https://vitest.dev — mock, config, asserts |
| React Testing Library docs | Docs | https://testing-library.com/docs/react-testing-library/intro |
| Common mistakes with RTL | Artigo | https://kentcdodds.com/blog/common-mistakes-with-react-testing-library |
| "Write tests. Not too many. Mostly integration." | Artigo | https://kentcdodds.com/blog/write-tests |

---

## Comandos

```bash
pnpm test         # watch mode — roda ao salvar
pnpm test:run     # execução única (CI / pré-commit)
pnpm test -- --ui  # Vitest UI (interface gráfica)
```
