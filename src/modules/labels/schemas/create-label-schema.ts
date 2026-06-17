import { z } from 'zod'

export const SECTORS = [
  { value: 'PRODUCAO', label: 'Produção' },
  { value: 'MONTAGEM', label: 'Montagem' },
  { value: 'EXPEDICAO', label: 'Expedição' },
  { value: 'ALMOXARIFADO', label: 'Almoxarifado' },
  { value: 'QUALIDADE', label: 'Qualidade' },
  { value: 'MANUTENCAO', label: 'Manutenção' },
] as const

export const createLabelSchema = z.object({
  referenceCode: z.string().min(1, 'Código de referência é obrigatório'),
  name: z.string().min(1, 'Nome / Descrição é obrigatório'),
  description: z.string().optional().default(''),
  sector: z.string().min(1, 'Selecione um setor'),
  assemblyLine: z.string().optional().default(''),
  aisle: z.string().optional().default(''),
  shelf: z.string().optional().default(''),
  quantityPerBox: z.string().optional().default(''),
  revision: z.string().optional().default(''),
})

export type CreateLabelSchema = z.infer<typeof createLabelSchema>
