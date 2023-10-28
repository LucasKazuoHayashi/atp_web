
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styles from './styles.module.css'

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string
}

export default function Input({ label, ...rest }: Props) {
    return (
        <div className={styles.divInput}>
            <label className={styles.label}>{label}:</label>
            <input className={styles.input} type="text" {...rest} />
        </div>
    )
}