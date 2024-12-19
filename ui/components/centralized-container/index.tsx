import { FC, PropsWithChildren } from "react"
import styles from './index.module.css'

export const CentralizedContainer: FC<PropsWithChildren> = ({
  children
}) => {
  return (
    <div className={styles.centralizedContainer}>
      {children}
    </div>
  )
}
