import { FC } from "react"
import styles from './index.module.css'

export type InputGroupProps = {
  label: string,
  value: string,
  placeholder: string,
  onChange?: (value: string) => void,
  required?: boolean
  autoFocus?: boolean
}

export const InputGroup: FC<InputGroupProps> = ({
  label,
  value,
  placeholder,
  onChange = () => {},
  required = false,
  autoFocus = false
}) => {
  return (
    <div className={styles.inputGroup}>
    <label htmlFor={label}>
      {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      id={label} 
      placeholder={placeholder}
      required={required}
      autoFocus={autoFocus}
    />
  </div>
  )
}