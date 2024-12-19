import { FC } from 'react'

import { Item } from "@/app/types"
import styles from './index.module.css'
import { Item as ItemComponent } from '../item'

export type ItemsListProps = {
  selectedItemId?: number,
  onSelected: (item: Item) => void,
  onDeleted: (itemId: number) => void,
  items: Item[]
}

export const ItemsList: FC<ItemsListProps> = ({
  selectedItemId,
  items,
  onSelected,
  onDeleted,
}) => {
  return (
    <ol className={styles.list}>
    {
      items.map(item => (
        <ItemComponent
          key={item.id}
          item={item}
          isSelected={selectedItemId === item.id}
          onDeleted={onDeleted}
          onSelected={onSelected}
        />
      ))
    }
    </ol>
  )
}
