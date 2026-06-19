import { FC } from 'react';

export type BadgeCategory = 'monde' | 'france' | 'economie' | 'science' | 'techno' | 'enviro';

const LABELS: Record<BadgeCategory, string> = {
  monde: 'Monde',
  france: 'France',
  economie: 'Économie',
  science: 'Science',
  techno: 'Techno',
  enviro: 'Environnement',
};

interface Props {
  category: BadgeCategory;
  id?: string;
  className?: string;
}

const Badge: FC<Props> = ({ category, id, className = '' }) => {
  return (
    <span id={id} className={`badge badge--${category} ${className}`.trim()}>
      {LABELS[category]}
    </span>
  );
};

export default Badge;
