import z from 'zod'

export const createItemSchema = z.object({
  name: z.string(),
  description: z.string()
})

export type CreateItem = z.infer<typeof createItemSchema>

export type Item = {
  id: number,
  name: string,
  description: string
}

export type ItemsDb = Record<string, Item>
