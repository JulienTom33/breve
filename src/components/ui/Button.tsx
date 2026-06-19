import { FC, ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'icon'
  onClick?: () => void
  disabled?: boolean
  className?: string
  'aria-label'?: string
  type?: 'button' | 'submit' | 'reset'
}

const base =
  'inline-flex items-center justify-center font-body font-semibold transition-colors duration-150 ease-out-expo disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover active:bg-primary-active rounded-md px-4 py-2.5 text-sm',
  ghost:
    'bg-transparent border border-border text-text hover:bg-surface-2 rounded-md px-4 py-2.5 text-sm',
  icon: 'w-10 h-10 bg-surface-2 hover:bg-surface-offset rounded-md text-text',
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  type = 'button',
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className={`${base} ${variants[variant]} ${className}`.trim()}
  >
    {children}
  </button>
)

export default Button
