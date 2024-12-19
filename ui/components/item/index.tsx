import { FC } from "react"
import cn from "classnames"
import { Item as DomainItem } from "@/app/types"

import styles from './index.module.css'
import { Button } from "../button"

export type ItemProps = {
  item: DomainItem,
  isSelected: boolean,
  onSelected: (item: DomainItem) => void,
  onDeleted: (itemId: number) => void,
}

export const Item: FC<ItemProps> = ({
  item,
  isSelected,
  onSelected = () => {},
  onDeleted = () => {},
}) => {
  return (
    <li 
      key={item.id} 
      className={cn({
        [styles.selectedItem]: isSelected,
        [styles.listItem]: true
      })}
      onClick={() => onSelected && onSelected(item)}
    >
      <span className={styles.itemInfo}>
        <div>
          <strong>{item.name}</strong>
        </div>
        <div>
          <small>{item.description}</small>
        </div>
      </span>
      <Button 
        text="Delete"
        variant="danger"
        onClick={(e) => {
          e.stopPropagation()
          onDeleted(item.id)
        }}
      />
    </li>
  )
}