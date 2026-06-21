import { FC, ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

const Card: FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-surface rounded-lg shadow-card overflow-hidden ${className}`.trim()}>
    {children}
  </div>
)

export default Card
