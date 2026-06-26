import { FC, ReactNode } from 'react'

interface ButtonProps {
  id?: string
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'icon' | 'tab' | 'menuItem' | 'avatar' | 'chip' | 'custom'
  onClick?: () => void
  disabled?: boolean
  className?: string
  'aria-label'?: string
  'aria-expanded'?: boolean
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
  'aria-controls'?: string
  'aria-pressed'?: boolean
  role?: string
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
  tab: 'flex-1 py-2 text-sm rounded-md',
  menuItem:
    'bg-transparent w-full justify-start font-normal px-4 py-3 text-sm text-text hover:bg-surface-2',
  avatar:
    'rounded-full overflow-hidden border-2 bg-transparent hover:bg-transparent p-0 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface focus:outline-none shrink-0',
  chip: 'bg-surface-2 border border-border text-text-muted hover:bg-surface-offset hover:text-text rounded-full px-2 py-0.5 text-xs font-normal',
  custom: '',
}

const Button: FC<ButtonProps> = ({
  id,
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  'aria-expanded': ariaExpanded,
  'aria-haspopup': ariaHasPopup,
  'aria-controls': ariaControls,
  'aria-pressed': ariaPressed,
  role,
  type = 'button',
}) => (
  <button
    id={id}
    type={type}
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    aria-expanded={ariaExpanded}
    aria-haspopup={ariaHasPopup}
    aria-controls={ariaControls}
    aria-pressed={ariaPressed}
    role={role}
    className={`${base} ${variants[variant]} ${className}`.trim()}
  >
    {children}
  </button>
)

export default Button
