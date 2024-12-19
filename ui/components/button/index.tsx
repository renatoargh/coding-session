import { FC } from "react"
import styles from './index.module.css'

export type ButtonVariant =
  'danger' | 'primary' | 'secondary'

export type ButtonProps = {
  text: string
  variant: ButtonVariant,
  type?: 'button' | 'submit',
  hidden?: boolean,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: FC<ButtonProps> = ({
  text,
  variant,
  type = 'button',
  hidden = false,
  onClick = () => {},
}) => {
  if (hidden) {
    return <></>
  }

  const className = {
    danger: styles.dangerButton,
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
  }[variant] || styles.primaryButton

  return (
    <button 
      type={type}
      onClick={onClick}
      className={className}
    >
      {text}
    </button>    
  )
}
