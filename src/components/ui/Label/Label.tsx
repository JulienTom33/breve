import { FC, ReactNode } from 'react'

interface LabelProps {
  htmlFor: string
  children: ReactNode
  id?: string
}

const Label: FC<LabelProps> = ({ htmlFor, children, id }) => (
  <label id={id} htmlFor={htmlFor} className="block text-sm font-medium text-text mb-1">
    {children}
  </label>
)

export default Label
