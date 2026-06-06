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

  it('rejects empty fields', () => {
    const result = loginSchema.safeParse({ email: '', password: '' })

    expect(result.success).toBe(false)
  })

  it('returns structured error for invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'invalido',
      password: '123456',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.path).toContain('email')
    }
  })

  it('returns structured error for short password', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: '123',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.path).toContain('password')
    }
  })
})
