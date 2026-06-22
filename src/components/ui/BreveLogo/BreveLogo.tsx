import { FC } from 'react'

interface Props {
  className?: string
}

const BreveLogo: FC<Props> = ({ className }) => (
  <svg
    viewBox="0 0 44 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="bl-grad-top" x1="0" y1="0" x2="34" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
      <linearGradient id="bl-grad-mid" x1="0" y1="0" x2="34" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#93c5fd" />
      </linearGradient>
      <linearGradient id="bl-grad-bot" x1="0" y1="0" x2="34" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
    <polygon points="0,0 0,7 34,15" fill="url(#bl-grad-top)" />
    <polygon points="0,11 0,19 34,15" fill="url(#bl-grad-mid)" />
    <polygon points="0,23 0,30 34,15" fill="url(#bl-grad-bot)" />
    <circle cx="36.5" cy="15" r="3.5" fill="white" />
  </svg>
)

export default BreveLogo
