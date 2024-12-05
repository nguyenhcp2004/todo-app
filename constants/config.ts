import { z } from 'zod'

const configSchema = z.object({
  EXPO_PUBLIC_API_KEY: z.string(),
  EXPO_PUBLIC_AUTH_DOMAIN: z.string(),
  EXPO_PUBLIC_PROJECT_ID: z.string(),
  EXPO_PUBLIC_STORAGE_BUCKET: z.string(),
  EXPO_PUBLIC_MESSAGING_SENDER_ID: z.string(),
  EXPO_PUBLIC_APP_ID: z.string()
})

const configProject = configSchema.safeParse({
  EXPO_PUBLIC_API_KEY: process.env.EXPO_PUBLIC_API_KEY,
  EXPO_PUBLIC_AUTH_DOMAIN: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  EXPO_PUBLIC_PROJECT_ID: process.env.EXPO_PUBLIC_PROJECT_ID,
  EXPO_PUBLIC_STORAGE_BUCKET: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  EXPO_PUBLIC_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  EXPO_PUBLIC_APP_ID: process.env.EXPO_PUBLIC_APP_ID
})

if (!configProject.success) {
  console.error(configProject.error.errors)
  throw new Error(`Các khai báo biến môi trường không hợp lệ`)
}

const envConfig = configProject.data

export default envConfig
