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
          className="block mb-2 text-sm text-content-muted"
        >
          {label}
        </label>
      )}
      <input id={id} className={`input ${className}`.trim()} {...rest} />
    </div>
  );
};

export default Input;
