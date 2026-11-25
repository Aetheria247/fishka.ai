import type { SemanticTone } from '../data/dossiers'

interface DottedLeaderProps {
  label: string
  value: string
  tone?: SemanticTone
  labelBright?: boolean
}

export function DottedLeader({
  label,
  value,
  tone = 'neutral',
  labelBright = false,
}: DottedLeaderProps) {
  return (
    <div className="leader-row">
      <span className={labelBright ? 'leader-key leader-key--bright' : 'leader-key'}>
        {label}
      </span>
      <span className="leader-dots" aria-hidden="true" />
      <span className={`leader-val tone-${tone}`}>{value}</span>
    </div>
  )
}
