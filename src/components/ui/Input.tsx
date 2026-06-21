import { FC, InputHTMLAttributes } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  id: string
  label?: string
  error?: string
}

const Input: FC<InputProps> = ({ id, label, error, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label htmlFor={id} className="text-text-muted text-sm font-medium">
        {label}
      </label>
    )}
    <input
      id={id}
      className={[
        'bg-surface-2 text-text placeholder:text-text-faint rounded-md px-4 py-3 text-base outline-none transition-colors duration-150 ease-out-expo border',
        error
          ? 'border-error focus:shadow-[0_0_0_3px_var(--color-error-subtle)]'
          : 'border-border focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-subtle)]',
      ].join(' ')}
      {...props}
    />
    {error && <p className="text-error text-xs">{error}</p>}
  </div>
)

export default Input
