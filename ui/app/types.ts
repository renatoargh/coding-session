import z from 'zod'

export const itemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string()
})

export type Item = z.infer<typeof itemSchema>

export type CreateItemPayload = {
  name: string,
  description: string
}