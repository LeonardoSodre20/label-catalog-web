import { createLabelSchema } from '../schemas/create-label-schema'

describe('createLabelSchema', () => {
  it('accepts valid label data', () => {
    const result = createLabelSchema.safeParse({
      referenceCode: 'PEC-001',
      name: 'Suporte metálico 150mm',
      sector: 'PRODUCAO',
      assemblyLine: 'Linha A',
      aisle: 'C-01',
      shelf: 'P-05',
      quantityPerBox: '50',
      revision: 'Rev. 01',
      description: 'Suporte para fixação de peças',
    })

    expect(result.success).toBe(true)
  })

  it('accepts minimal required data', () => {
    const result = createLabelSchema.safeParse({
      referenceCode: 'PEC-001',
      name: 'Suporte metálico',
      sector: 'PRODUCAO',
    })

    expect(result.success).toBe(true)
  })

  it('rejects empty referenceCode', () => {
    const result = createLabelSchema.safeParse({
      referenceCode: '',
      name: 'Suporte metálico',
      sector: 'PRODUCAO',
    })

    expect(result.success).toBe(false)
  })

  it('rejects empty name', () => {
    const result = createLabelSchema.safeParse({
      referenceCode: 'PEC-001',
      name: '',
      sector: 'PRODUCAO',
    })

    expect(result.success).toBe(false)
  })

  it('rejects empty sector', () => {
    const result = createLabelSchema.safeParse({
      referenceCode: 'PEC-001',
      name: 'Suporte metálico',
      sector: '',
    })

    expect(result.success).toBe(false)
  })

  it('accepts empty optional fields', () => {
    const result = createLabelSchema.safeParse({
      referenceCode: 'PEC-001',
      name: 'Suporte metálico',
      sector: 'PRODUCAO',
      assemblyLine: '',
      aisle: '',
      shelf: '',
      quantityPerBox: '',
      revision: '',
      description: '',
    })

    expect(result.success).toBe(true)
  })

  it('returns structured error for missing referenceCode', () => {
    const result = createLabelSchema.safeParse({
      referenceCode: '',
      name: 'Suporte metálico',
      sector: 'PRODUCAO',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.path).toContain('referenceCode')
    }
  })
})
