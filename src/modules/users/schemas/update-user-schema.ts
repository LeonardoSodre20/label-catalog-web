import { z } from 'zod'

export const updateUserSchema = z.object({
  name: z.string().min(1, 'Nome completo é obrigatório'),
  function: z.enum(['ADMIN', 'OPERATOR'], {
    required_error: 'Selecione uma função',
  }),
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>
