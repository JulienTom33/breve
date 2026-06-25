import { FC, InputHTMLAttributes, ReactNode } from 'react'
import Label from '@/components/ui/Label/Label'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  id: string
  label?: string
  error?: string
  compact?: boolean
  startAdornment?: ReactNode
  endAdornment?: ReactNode
}

const Input: FC<InputProps> = ({
  id,
  label,
  error,
  compact = false,
  startAdornment,
  endAdornment,
  ...props
}) => (
  <div className="flex flex-col gap-1.5">
    {label && <Label htmlFor={id}>{label}</Label>}
    <div className="relative">
      {startAdornment && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {startAdornment}
        </div>
      )}
      <input
        id={id}
        className={[
          'w-full bg-surface-2 text-text placeholder:text-text-faint rounded-md outline-none transition-colors duration-150 ease-out-expo border',
          compact ? 'px-3 py-1.5 text-sm' : 'px-4 py-3 text-base',
          startAdornment ? (compact ? 'pl-9' : 'pl-10') : '',
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
