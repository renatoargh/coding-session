import { FC, useCallback, useEffect, useState } from "react";

import styles from './index.module.css'
import { Button } from "../button"
import { ButtonsBar } from "../buttons-bar"
import { InputGroup } from "../input-group"
import { Item } from "@/app/types";
import { createItem, updateItem } from "@/app/api";

export type ItemFormProps = {
  selectedItem: Item | null
  onSaved?: () => void
  onRemoveSelection?: () => void
}

export const ItemForm: FC<ItemFormProps> = ({
  selectedItem,
  onSaved = () => {},
  onRemoveSelection = () => {},
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const resetForm = useCallback(() =>{
    setName('')
    setDescription('')
    onRemoveSelection()
  }, [onRemoveSelection])

  useEffect(() => {
    if (!selectedItem) {
      return resetForm()
    }

    setName(selectedItem.name);
    setDescription(selectedItem.description);
  }, [resetForm, selectedItem])

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const persistItemPayload = { name, description };

    if (selectedItem) { 
      await updateItem(selectedItem.id, persistItemPayload)
    } else {
      await createItem(persistItemPayload)
    }

    resetForm()
    onSaved()
  }

  return (
    <div className={styles.formCard}>
      <h2>{selectedItem ? 'Update Your Item' : 'Create a New Item'}</h2>
      <form onSubmit={handleCreate}>
        <InputGroup
          label="Name" 
          placeholder="Enter the item name"
          value={name}
          onChange={setName} 
          required
          autoFocus
        />
        <InputGroup
          label="Description" 
          placeholder="Enter a short description"
          value={description}
          onChange={setDescription} 
          required
        />
        <ButtonsBar>
          <Button 
            text="Cancel"
            variant="secondary"
            hidden={!selectedItem}
            onClick={() => {
              if (!selectedItem) {
                return
              }

              resetForm()
              onRemoveSelection()
            }}
          />

          <Button 
            variant="primary"
            type="submit"
            text={selectedItem ? 'Save' : 'Create'}
          />
        </ButtonsBar>
      </form>
    </div>
  )
}