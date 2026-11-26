import { useId, useState } from 'react'

export type BeaconMode = 'broadcast' | 'dualband' | 'ripples'

interface FishkaBeaconProps {
  size?: number
}

const MODE_SEQUENCE: { mode: BeaconMode; label: string; color: string; toneClass: string }[] = [
  { mode: 'broadcast', label: 'TX // NOMINAL', color: '#A8FFE8', toneClass: 'tone-media' },
  { mode: 'dualband', label: 'TX // DUAL-BAND', color: '#FF81C8', toneClass: 'tone-chrome' },
  { mode: 'ripples', label: 'TX // TELEMETRY', color: '#E5A3FF', toneClass: 'tone-header' },
]

/**
 * Animated Cyrillic 'ф' signal tower beacon ported from Fishka Beacon Studio.
 * Default: Broadcast Arcs in Seafoam Core (#A8FFE8) with Brushed Silver finish.
 * Click/tap cycles signal modes as a subtle interactive easter egg.
 */
export function FishkaBeacon({ size = 84 }: FishkaBeaconProps) {
  const uid = useId().replace(/:/g, '')
  const [modeIndex, setModeIndex] = useState(0)

  const current = MODE_SEQUENCE[modeIndex]
  const height = Math.round(size * (240 / 200))

  const c1 = current.mode === 'dualband' ? '#FF81C8' : current.color
  const c2 = current.mode === 'dualband' ? '#A8FFE8' : current.color
  const c3 = current.mode === 'dualband' ? '#FF81C8' : current.color
  const haloColor = current.mode === 'dualband' ? '#FF81C8' : current.color

  const cycleMode = () => {
    setModeIndex((idx) => (idx + 1) % MODE_SEQUENCE.length)
  }

  return (
    <button
      type="button"
      onClick={cycleMode}
      className="beacon-stage"
      aria-label={`Fishka signal tower beacon (${current.label}). Click to cycle signal mode.`}
      title="Click tower to cycle signal mode"
    >
      <span className="beacon-svg-wrap">
        <svg
          className={`fishka-beacon-svg mode-${current.mode}`}
          width={size}
          height={height}
          viewBox="0 0 200 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`${uid}-silver`} x1="18%" y1="0%" x2="82%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="28%" stopColor="#E5E1EA" />
              <stop offset="62%" stopColor="#B5B0BC" />
              <stop offset="88%" stopColor="#8B8594" />
              <stop offset="100%" stopColor="#C6C1CE" />
            </linearGradient>

            <filter id={`${uid}-bevel`} x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow
                dx="0"
                dy="3"
                stdDeviation="3.5"
                floodColor="#000000"
                floodOpacity="0.65"
              />
            </filter>

            <radialGradient id={`${uid}-halo`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={haloColor} stopOpacity="0.85" />
              <stop offset="55%" stopColor={haloColor} stopOpacity="0.22" />
              <stop offset="100%" stopColor={haloColor} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Emitting Signal Waves centered at top orb (100, 32) */}
          {current.mode === 'ripples' ? (
            <g fill="none">
              <circle
                className="beacon-wave-origin beacon-ripple-1"
                cx="100"
                cy="32"
                r="22"
                stroke={current.color}
                strokeWidth="2.8"
              />
              <circle
                className="beacon-wave-origin beacon-ripple-2"
                cx="100"
                cy="32"
                r="22"
                stroke={current.color}
                strokeWidth="2.8"
              />
              <circle
                className="beacon-wave-origin beacon-ripple-3"
                cx="100"
                cy="32"
                r="22"
                stroke={current.color}
                strokeWidth="2.8"
              />
            </g>
          ) : (
            <g fill="none" strokeLinecap="round">
              <g className="beacon-wave-origin beacon-arc-1" stroke={c1} strokeWidth="3.2">
                <path d="M 82 16 A 24 24 0 0 0 82 48" />
                <path d="M 118 16 A 24 24 0 0 1 118 48" />
              </g>
              <g className="beacon-wave-origin beacon-arc-2" stroke={c2} strokeWidth="2.6">
                <path d="M 71 7 A 38 38 0 0 0 71 57" />
                <path d="M 129 7 A 38 38 0 0 1 129 57" />
              </g>
              <g className="beacon-wave-origin beacon-arc-3" stroke={c3} strokeWidth="2.0">
                <path d="M 60 -2 A 52 52 0 0 0 60 66" />
                <path d="M 140 -2 A 52 52 0 0 1 140 66" />
              </g>
            </g>
          )}

          {/* Breathing radial halo behind beacon orb */}
          <circle
            className="beacon-wave-origin beacon-halo"
            cx="100"
            cy="32"
            r="20"
            fill={`url(#${uid}-halo)`}
          />

          {/* Sculpted Cyrillic 'ф' Signal Tower Geometry */}
          <g filter={`url(#${uid}-bevel)`}>
            <path
              fill={`url(#${uid}-silver)`}
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="0.9"
              fillRule="evenodd"
              d="
                M 100 76
                C 138 76, 167 101, 167 134
                C 167 162, 147 183, 121 189
                Q 124 205, 140 216
                L 60 216
                Q 76 205, 79 189
                C 53 183, 33 162, 33 134
                C 33 101, 62 76, 100 76
                Z
                M 91 91
                C 64 93, 49 111, 49 134
                C 49 157, 63 173, 87 177
                Q 90 134, 91 91
                Z
                M 109 91
                Q 110 134, 113 177
                C 137 173, 151 157, 151 134
                C 151 111, 136 93, 109 91
                Z
              "
            />
            <path
              fill={`url(#${uid}-silver)`}
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="0.9"
              fillRule="evenodd"
              d="
                M 100 47
                A 15 15 0 1 0 100 77
                A 15 15 0 1 0 100 47
                Z
                M 100 53.5
                A 8.5 8.5 0 1 1 100 70.5
                A 8.5 8.5 0 1 1 100 53.5
                Z
              "
            />
            <rect
              x="95.2"
              y="39"
              width="9.6"
              height="10.5"
              rx="2"
              fill={`url(#${uid}-silver)`}
            />
            <circle
              cx="100"
              cy="32"
              r="11"
              fill={`url(#${uid}-silver)`}
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="0.9"
            />
          </g>
        </svg>
      </span>
      <span className={`beacon-status ${current.toneClass}`}>{current.label}</span>
    </button>
  )
}
