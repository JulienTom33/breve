import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  id?: string;
  className?: string;
}

const Card: FC<Props> = ({ children, id, className = '' }) => {
  return (
    <div id={id} className={`card ${className}`.trim()}>
      {children}
    </div>
  );
};

export default Card;
