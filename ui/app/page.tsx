'use client'

import { useEffect, useState } from "react";
import cn from 'classnames';

import { Item } from "./types";
import { deleteItem, getItems, createItem, updateItem } from "./api";
import styles from './page.module.css';
import { Pluralize } from "./utils";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    getItems().then(setItems);
  }, []);

  useEffect(() => {
    if (!selectedItem) {
      return
    }

    setName(selectedItem.name);
    setDescription(selectedItem.description);
  }, [selectedItem])

  
  const resetForm = () => {
    setSelectedItem(null)
    setName('')
    setDescription('')
  }

  const handleDelete = async (itemId: number) => {
    await deleteItem(itemId)

    if (selectedItem && selectedItem.id === itemId) {
      resetForm()
    }

    getItems().then(setItems);
  }

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const persistItemPayload = { name, description };

    if (selectedItem) { 
      await updateItem(selectedItem.id, persistItemPayload)
    } else {
      await createItem(persistItemPayload)
    }

    resetForm()
    getItems().then(setItems)
  }

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2>
          {selectedItem ? 'Update Your Item' : 'Create a New Item'}</h2>
        <form onSubmit={handleCreate}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name" 
              placeholder="Enter the item name" 
              required 
              autoFocus 
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="description">
              Description
            </label>
            <input 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description" 
              placeholder="Enter a short description" 
              required 
            />
          </div>
          <div className={styles.buttonsBar}>
            {
              selectedItem && (
                <button 
                  className={styles.cancelButton} 
                  onClick={() => resetForm()}
                >
                  Cancel
                </button>
              )
            }
            <button type="submit" className={styles.createButton}>
              { selectedItem ? 'Save' : 'Create' }
            </button>
          </div>
        </form>
      </div>
      <div style={{ 
        paddingBottom: '0.5rem', 
        paddingLeft: '0.25rem', 
        paddingRight: '0.25rem', 
        display: 'flex', 
        justifyContent: 'space-between',
        color: '#555',
        marginBottom: '2rem'
      }}>
        {
          !!items.length && (<>
            <small>Select an item below to start editing</small>
            <small>{Pluralize.ITEM.getPrefixedString(items)} in your list</small>
          </>)
        }
      </div>
      <ol className={styles.list}>
        {
          items.map(item => (
            <li 
              key={item.id} 
              className={cn({
                [styles.selectedItem]: selectedItem?.id === item.id,
                [styles.listItem]: true
              })}
              onClick={() => setSelectedItem(item)}
            >
              <span className={styles.itemInfo}>
                <div>
                  <strong>{item.name}</strong>
                </div>
                <div>
                  <small>{item.description}</small>
                </div>
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(item.id)
                }}
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
