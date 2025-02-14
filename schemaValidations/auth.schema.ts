import { z } from 'zod'

export const LoginBody = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
  })
  .strict()

export type LoginBodyType = z.infer<typeof LoginBody>
