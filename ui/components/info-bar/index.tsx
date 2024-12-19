import { FC } from "react"
import styles from './index.module.css'

export type InfoBarProps = {
  hidden?: boolean,
  left?: string
  right?: string
}

export const InfoBar: FC<InfoBarProps> = ({
  hidden = false,
  left,
  right
}) => {

  if (hidden) {
    return <></>
  }

  return (
    <div className={styles.infoBar}>
      {
        left && (
          <small>{left}</small>
        )

      }
      {
        right && (
          <small>{right}</small>
        )
      }
    </div>
  )
}