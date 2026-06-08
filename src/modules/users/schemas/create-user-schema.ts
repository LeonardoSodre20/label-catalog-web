import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(1, 'Nome completo é obrigatório'),
  email: z.string().email('E-mail inválido'),
  function: z.enum(['ADMIN', 'OPERATOR'], {
    required_error: 'Selecione uma função',
  }),
})

export type CreateUserSchema = z.infer<typeof createUserSchema>
