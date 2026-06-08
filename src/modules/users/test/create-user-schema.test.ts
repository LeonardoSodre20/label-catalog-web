import { createUserSchema } from '../schemas/create-user-schema'

describe('createUserSchema', () => {
  it('accepts valid user data', () => {
    const result = createUserSchema.safeParse({
      name: 'João Silva',
      email: 'joao@example.com',
      function: 'ADMIN',
    })

    expect(result.success).toBe(true)
  })

  it('accepts OPERATOR function', () => {
    const result = createUserSchema.safeParse({
      name: 'Maria Souza',
      email: 'maria@example.com',
      function: 'OPERATOR',
    })

    expect(result.success).toBe(true)
  })

  it('rejects empty name', () => {
    const result = createUserSchema.safeParse({
      name: '',
      email: 'joao@example.com',
      function: 'ADMIN',
    })

    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = createUserSchema.safeParse({
      name: 'João Silva',
      email: 'invalido',
      function: 'ADMIN',
    })

    expect(result.success).toBe(false)
  })

  it('rejects empty email', () => {
    const result = createUserSchema.safeParse({
      name: 'João Silva',
      email: '',
      function: 'ADMIN',
    })

    expect(result.success).toBe(false)
  })

  it('rejects invalid function', () => {
    const result = createUserSchema.safeParse({
      name: 'João Silva',
      email: 'joao@example.com',
      function: 'INVALID',
    })

    expect(result.success).toBe(false)
  })

  it('rejects empty fields', () => {
    const result = createUserSchema.safeParse({
      name: '',
      email: '',
      function: undefined,
    })

    expect(result.success).toBe(false)
  })

  it('returns structured error for missing name', () => {
    const result = createUserSchema.safeParse({
      name: '',
      email: 'joao@example.com',
      function: 'ADMIN',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.path).toContain('name')
    }
  })

  it('returns structured error for invalid email', () => {
    const result = createUserSchema.safeParse({
      name: 'João Silva',
      email: 'invalido',
      function: 'ADMIN',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.path).toContain('email')
    }
  })
})
