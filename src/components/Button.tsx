import React from 'react'

/**
 * Props pour le composant Button
 */
interface ButtonProps {
  /** Texte du bouton */
  label: string
  /** Callback au clic */
  onClick: () => void
  /** Variante du bouton */
  variant?: 'primary' | 'secondary' | 'danger'
  /** Désactiver le bouton */
  disabled?: boolean
  /** Ajouter une classe CSS personnalisée */
  className?: string
}

/**
 * Composant Button réutilisable
 *
 * @example
 * ```tsx
 * <Button label="Click me" onClick={() => console.log('clicked')} />
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-black',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded font-semibold transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${className}
      `}
      data-testid={`button-${variant}`}
    >
      {label}
    </button>
  )
}

export default Button
