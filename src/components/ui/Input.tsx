import { FC, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
}

const Input: FC<Props> = ({ id, label, className = '', ...rest }) => {
  return (
    <div id={`${id}__wrapper`}>
      {label && (
        <label
          id={`${id}__label`}
          htmlFor={id}
          style={{
            display: 'block',
            marginBottom: 'var(--space-2)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
          }}
        >
          {label}
        </label>
      )}
      <input id={id} className={`input ${className}`.trim()} {...rest} />
    </div>
  );
};

export default Input;
