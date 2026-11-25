interface FishkaEmblemProps {
  className?: string
  size?: number
}

/**
 * Stylized Cyrillic 'ф' signal-tower emblem:
 * vertical spire with flared pedestal, symmetric circular ring,
 * open collar ring, and apex beacon node.
 */
export function FishkaEmblem({ className, size = 26 }: FishkaEmblemProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 108"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="fishka-silver-lavender"
          x1="15%"
          y1="0%"
          x2="85%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="32%" stopColor="#F1D3FF" />
          <stop offset="68%" stopColor="#C9BED6" />
          <stop offset="100%" stopColor="#807E8A" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="11.5" r="5.5" fill="url(#fishka-silver-lavender)" />
      <rect
        x="47.4"
        y="16"
        width="5.2"
        height="5.5"
        fill="url(#fishka-silver-lavender)"
      />
      <circle
        cx="50"
        cy="27.5"
        r="6.5"
        fill="none"
        stroke="url(#fishka-silver-lavender)"
        strokeWidth="3.6"
      />
      <path
        fill="url(#fishka-silver-lavender)"
        fillRule="evenodd"
        d="
          M 50 32
          C 74 32, 89 45, 89 62
          C 89 76, 76.5 87, 61.5 89.8
          Q 65 97.6, 76 102
          L 24 102
          Q 35 97.6, 38.5 89.8
          C 23.5 87, 11 76, 11 62
          C 11 45, 26 32, 50 32
          Z
          M 44.8 40
          C 31.5 41.4, 22.5 50.4, 22.5 62
          C 22.5 73.4, 30.8 81.8, 42.2 83.8
          Q 44.2 64.5, 44.8 40
          Z
          M 55.2 40
          Q 55.8 64.5, 57.8 83.8
          C 69.2 81.8, 77.5 73.4, 77.5 62
          C 77.5 50.4, 68.5 41.4, 55.2 40
          Z
        "
      />
    </svg>
  )
}
