import express, { Request, Response } from 'express'
import cors from 'cors'
import { IdProvider } from './utils/id.utils.js'
import { createItemSchema, Item, ItemsDb } from './types.js'

const port = process.env.PORT || 3333
const app = express()

const idProvider = new IdProvider()
const db: ItemsDb = {}

app.use(express.json())
app.use(cors())

app.get('/api/items', (_req: Request, res: Response) => {
  const items = Object.values(db)
  res.status(200).send(items)
})

app.post('/api/items', (req, res) => {
  console.log('body', typeof req.body, req.body)
  const bodyParsing = createItemSchema.safeParse(req.body)
  if (bodyParsing.error) {
    return res.status(400).send({
      message: 'Invalid payload',
      details: bodyParsing.error.issues,
    })
  }

  const id = idProvider.getNext()
  const item: Item = {
    id,
    ...bodyParsing.data
  }

  db[id] = item

  return res.status(200).send(item)
})

app.delete('/api/items/:id', (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).send({
      message: 'Missing id',
    })
  }

  const item = db[id]
  if (!item) {
    return res.status(404).send({
      message: 'Item not found',
    })
  }

  delete db[id]
  return res.status(200).send()
})


app.listen(port, () => {
  console.log(`Coding challenge running on port ${port}`)
})