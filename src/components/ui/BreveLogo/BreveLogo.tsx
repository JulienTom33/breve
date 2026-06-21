import { FC } from 'react'

interface Props {
  className?: string
}

const BreveLogo: FC<Props> = ({ className }) => (
  <svg
    viewBox="0 0 44 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        id="bl-grad-outer"
        x1="0"
        y1="0"
        x2="34"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.85" />
      </linearGradient>
      <linearGradient
        id="bl-grad-inner"
        x1="0"
        y1="0"
        x2="34"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
      <linearGradient id="bl-grad-core" x1="0" y1="0" x2="34" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#93c5fd" />
      </linearGradient>
    </defs>
    {/* Top thin streak */}
    <polygon points="0,3 34,14 0,8" fill="url(#bl-grad-outer)" />
    {/* Upper streak */}
    <polygon points="0,9 34,14 0,13" fill="url(#bl-grad-inner)" />
    {/* Main center streak */}
    <polygon points="0,13 34,14 0,16" fill="url(#bl-grad-core)" />
    {/* Lower streak */}
    <polygon points="0,16 34,14 0,20" fill="url(#bl-grad-inner)" />
    {/* Bottom thin streak */}
    <polygon points="0,21 34,14 0,26" fill="url(#bl-grad-outer)" />
    {/* White dot at convergence */}
    <circle cx="36.5" cy="14" r="3.5" fill="white" />
  </svg>
)

export default BreveLogo
