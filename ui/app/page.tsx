'use client'

import { useCallback, useEffect, useState } from "react";

import { ItemsList } from "@/components/items-list";
import { InfoBar } from "@/components/info-bar";
import { ItemForm } from "@/components/item-form";
import { CentralizedContainer } from "@/components/centralized-container";

import { Item } from "./types";
import { deleteItem, getItems } from "./api";
import { Pluralize } from "./utils";

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const loadItems = useCallback(() => {
    getItems().then(setItems);
  }, [])

  const removeSelection = useCallback(() => {
    setSelectedItem(null)
  }, [])

  const handleDelete = async (itemId: number) => {
    await deleteItem(itemId)

    if (itemId === selectedItem?.id) {
      removeSelection()
    }

    loadItems()
  }

  useEffect(loadItems, [loadItems]);

  return (
    <CentralizedContainer>
      <ItemForm 
        selectedItem={selectedItem}
        onSaved={loadItems}
        onRemoveSelection={removeSelection}
      />
      <InfoBar 
        hidden={!items.length}
        left="Select an item below to start editing"
        right={`There ${Pluralize.IS.getString(items)} ${Pluralize.ITEM.getPrefixedString(items)} on your list`}
      />
      <ItemsList
        selectedItemId={selectedItem?.id}
        items={items}
        onDeleted={handleDelete}
        onSelected={setSelectedItem}
      />
    </CentralizedContainer>
  );
}
