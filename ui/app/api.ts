import { CreateItemPayload, Item, itemSchema } from "./types";

const BASE_URL = 'http://localhost:3333/api'

export const getItems = async (): Promise<Item[]> => {
  const response = await fetch(`${BASE_URL}/items`, {
    method: 'GET',
    headers: new Headers({
      accept: 'application/json',
    }),
  });

  if (!response.ok) {
    throw new Error(`Error. Status code: ${response.status} - ${response.statusText}`)
  }

  const rawItems = await response.json()
  return itemSchema.array().parse(rawItems)
}

export const deleteItem = async (itemId: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: 'DELETE',
    headers: new Headers({
      accept: 'application/json',
    }),
  });

  if (!response.ok) {
    throw new Error(`Error. Status code: ${response.status} - ${response.statusText}`)
  }
}

export const createItem = async (createItemPayload: CreateItemPayload): Promise<void> => {
  const response = await fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(createItemPayload)
  });

  if (!response.ok) {
    throw new Error(`Error. Status code: ${response.status} - ${response.statusText}`)
  }
}
