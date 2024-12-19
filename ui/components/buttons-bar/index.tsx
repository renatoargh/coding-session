import { FC, PropsWithChildren } from "react";
import styles from './index.module.css';

export const ButtonsBar: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className={styles.buttonsBar}>
      {children}
    </div>
  )
}