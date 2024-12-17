'use client'

import { useEffect, useState } from "react";
import { Item } from "./types";
import { deleteItem, getItems, createItem } from "./api";

export default function Home() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    getItems().then(setItems)
  }, [])

  const handleDelete = (itemId: number) => {
    deleteItem(itemId)
      .then(() => getItems().then(setItems))
  }

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const createNewPayload = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
    };

    createItem(createNewPayload)
      .then(() => getItems().then(setItems))
  }

  return (
    <div className="App">
      <form onSubmit={handleCreate}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '25vw',
          gap: '5px'
        }}>
          <input name="name" placeholder="Name" autoFocus></input>
          <input name="description" placeholder="Description"></input>
          <button type="submit">
            Create
          </button>
        </div>
      </form>
      <ol>
        {
          items.map(item => (<li key={item.id}>
            <div>
              <span style={{
                marginRight: '10px',
              }}>
                {item.name} - {item.description}
              </span>
              <button 
                onClick={() => handleDelete(item.id)}
              >
                  Delete
                </button>
            </div>
          </li>))
        }
      </ol>
    </div>
  );
}
