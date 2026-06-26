import { FC, ReactNode, FormHTMLAttributes } from 'react'

interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'className'> {
  id?: string
  children: ReactNode
  className?: string
}

const Form: FC<FormProps> = ({ id, children, className = '', ...props }) => (
  <form id={id} className={className} {...props}>
    {children}
  </form>
)

export default Form
