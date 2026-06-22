import { FC, InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  id: string
  label?: string
  error?: string
  endAdornment?: ReactNode
}

const Input: FC<InputProps> = ({ id, label, error, endAdornment, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label htmlFor={id} className="text-text-muted text-sm font-medium">
        {label}
      </label>
    )}
    <div className="relative">
      <input
        id={id}
        className={[
          'w-full bg-surface-2 text-text placeholder:text-text-faint rounded-md px-4 py-3 text-base outline-none transition-colors duration-150 ease-out-expo border',
          endAdornment ? 'pr-12' : '',
          error
            ? 'border-error-500 focus:shadow-focus-error'
            : 'border-border focus:border-primary-500 focus:shadow-focus-primary',
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      {endAdornment && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">{endAdornment}</div>
      )}
    </div>
    {error && <p className="text-error text-xs">{error}</p>}
  </div>
)

export default Input
