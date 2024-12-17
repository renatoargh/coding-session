'use client'

import { useEffect, useState } from "react";
import { Item } from "./types";
import { deleteItem, getItems, createItem } from "./api";
import styles from './page.module.css';

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    getItems().then(setItems);
  }, []);

  const handleDelete = (itemId: number) => {
    deleteItem(itemId).then(() => getItems().then(setItems));
  }

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const createNewPayload = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
    };

    createItem(createNewPayload).then(() => getItems().then(setItems));
    e.currentTarget.reset();
  }

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2>Create a New Item</h2>
        <form onSubmit={handleCreate}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="Enter the item name" required autoFocus />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="description">Description</label>
            <input id="description" name="description" placeholder="Enter a short description" required />
          </div>
          <button type="submit" className={styles.createButton}>Create</button>
        </form>
      </div>
      <ol className={styles.list}>
        {
          items.map(item => (
            <li key={item.id} className={styles.listItem}>
              <span className={styles.itemInfo}>
              <span className={styles.itemInfo}>
                <div><strong>{item.name}</strong></div>
                <div><small>{item.description}</small></div>
              </span>
              </span>
              <button 
                onClick={() => handleDelete(item.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </li>
          ))
        }
      </ol>
    </div>
  );
}
