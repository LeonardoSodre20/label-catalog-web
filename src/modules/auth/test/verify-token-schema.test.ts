import {
  resetPinSchema,
  verifyTokenSchema,
} from '../schemas/reset-password-schema'

describe('resetPinSchema', () => {
  it('accepts a valid 6-digit pin', () => {
    const result = resetPinSchema.safeParse({ pin: '123456' })
    expect(result.success).toBe(true)
  })

  it('rejects pin with less than 6 digits', () => {
    const result = resetPinSchema.safeParse({ pin: '12345' })
    expect(result.success).toBe(false)
  })

  it('rejects pin with non-numeric characters', () => {
    const result = resetPinSchema.safeParse({ pin: '12a456' })
    expect(result.success).toBe(false)
  })

  it('rejects empty pin', () => {
    const result = resetPinSchema.safeParse({ pin: '' })
    expect(result.success).toBe(false)
  })
})

describe('verifyTokenSchema', () => {
  it('accepts valid email and 6-digit pin', () => {
    const result = verifyTokenSchema.safeParse({
      email: 'user@example.com',
      pin: '123456',
    })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = verifyTokenSchema.safeParse({
      email: 'invalido',
      pin: '123456',
    })
    expect(result.success).toBe(false)
  })

  it('rejects non-numeric pin', () => {
    const result = verifyTokenSchema.safeParse({
      email: 'user@example.com',
      pin: '12a456',
    })
    expect(result.success).toBe(false)
  })
})
