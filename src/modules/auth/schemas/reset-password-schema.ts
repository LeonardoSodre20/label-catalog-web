import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido').max(100, 'E-mail muito longo'),
})

export const resetPinSchema = z.object({
  pin: z
    .string()
    .length(6, 'O código deve ter 6 dígitos')
    .regex(/^\d+$/, 'Apenas números são permitidos'),
})

export const verifyTokenSchema = z.object({
  email: z.string().email('E-mail inválido'),
  pin: z
    .string()
    .length(6, 'O código deve ter 6 dígitos')
    .regex(/^\d+$/, 'Apenas números são permitidos'),
})

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .max(128, 'Senha muito longa'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  })

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type ResetPinSchema = z.infer<typeof resetPinSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
export type VerifyTokenSchema = z.infer<typeof verifyTokenSchema>
