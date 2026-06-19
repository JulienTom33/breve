import { FC } from 'react';

interface Props {
  label: string;
  href: string;
  id?: string;
}

const ExternalIcon: FC = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SourcePill: FC<Props> = ({ label, href, id }) => {
  return (
    <a
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="source-pill"
    >
      <span>{label}</span>
      <ExternalIcon />
    </a>
  );
};

export default SourcePill;
