import { useState } from 'react'
import type { ColorContractDossier } from '../data/dossiers'
import {
  PALETTE_BY_ID,
  PALETTE_GROUPS,
  PALETTE_TOKENS,
  SYNTAX_SLOTS,
  type PaletteGroupId,
} from '../data/palette'
import { copyToClipboard } from '../lib/router'
import { DottedLeader } from './DottedLeader'

interface ColorContractViewProps {
  dossier: ColorContractDossier
  onToast: (message: string) => void
}

export function ColorContractView({ dossier, onToast }: ColorContractViewProps) {
  const [activeGroup, setActiveGroup] = useState<PaletteGroupId | 'all'>('all')
  const [selectedId, setSelectedId] = useState<string>('pink')

  const selected = PALETTE_BY_ID[selectedId] ?? PALETTE_TOKENS[0]

  const visibleGroups =
    activeGroup === 'all'
      ? PALETTE_GROUPS
      : PALETTE_GROUPS.filter((g) => g.id === activeGroup)

  const handleCopyHex = async (hex: string, variable: string) => {
    const ok = await copyToClipboard(`${variable}: ${hex};`)
    onToast(ok ? `Copied ${variable}: ${hex}` : `${variable}: ${hex}`)
  }

  return (
    <>
      <header className="dossier-head">
        <div className="dossier-eyebrow">{dossier.eyebrow}</div>
        <h1 className="dossier-h1">{dossier.title}</h1>
        <p className="dossier-subtitle">{dossier.subtitle}</p>
        <div className="telemetry-box telemetry-box--header telemetry-box--flush">
          {dossier.metaRows.map((row) => (
            <DottedLeader
              key={row.key}
              label={row.key}
              value={row.value}
              tone={row.tone}
            />
          ))}
        </div>
      </header>

      <section className="dossier-section">
        <h2 className="dossier-h2">// THE CORE LAW</h2>
        <div className="law-callout">
          <p className="law-quote">{dossier.coreLaw}</p>
        </div>
        <ul className="obs-list">
          {dossier.corollaries.map((item) => (
            <li key={item}>
              <span className="obs-bullet">›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="dossier-section">
        <div className="dossier-h2-row">
          <h2 className="dossier-h2">// TOKEN INSPECTOR</h2>
          <div className="palette-filter-row" role="tablist" aria-label="Filter palette namespace">
            <button
              type="button"
              role="tab"
              aria-selected={activeGroup === 'all'}
              className={activeGroup === 'all' ? 'filter-pill is-active' : 'filter-pill'}
              onClick={() => setActiveGroup('all')}
            >
              all ({PALETTE_TOKENS.length})
            </button>
            {PALETTE_GROUPS.map((group) => (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={activeGroup === group.id}
                className={
                  activeGroup === group.id ? 'filter-pill is-active' : 'filter-pill'
                }
                onClick={() => setActiveGroup(group.id)}
              >
                {group.id}
              </button>
            ))}
          </div>
        </div>

        {/* Active Token Readout */}
        <div className="inspector-box" aria-live="polite">
          <div className="inspector-head">
            <div className="inspector-title-wrap">
              <span
                className="inspector-dot"
                style={{ backgroundColor: selected.hex }}
                aria-hidden="true"
              />
              <span className="inspector-title">{selected.name}</span>
              <code>{selected.variable}</code>
            </div>
            <button
              type="button"
              className="ui-btn ui-btn--muted"
              onClick={() => void handleCopyHex(selected.hex, selected.variable)}
            >
              copy {selected.hex}
            </button>
          </div>

          <p className="inspector-job">{selected.job}</p>
          {selected.constraint ? (
            <p className="inspector-constraint">{selected.constraint}</p>
          ) : null}

          <div
            className="telemetry-box telemetry-box--flush"
            style={{ border: 'none', padding: 0, background: 'transparent' }}
          >
            <DottedLeader label="hex" value={selected.hex} tone="neutral" />
            <DottedLeader label="rgb" value={`rgb(${selected.rgb})`} tone="meta" />
            {selected.alias ? (
              <DottedLeader label="cross_ref" value={selected.alias} tone="header" />
            ) : null}
          </div>
        </div>

        {/* Swatch Groups */}
        <div className="card-stack card-stack--lg">
          {visibleGroups.map((group) => {
            const items = PALETTE_TOKENS.filter((t) => t.group === group.id)
            return (
              <div key={group.id} className="swatch-group">
                <div className="swatch-group-head">
                  <h3 className="swatch-group-title">{group.label}</h3>
                  <span className="swatch-group-wall">{group.wall}</span>
                </div>
                <div className="swatch-grid">
                  {items.map((tok) => {
                    const isSelected = tok.id === selected.id
                    return (
                      <button
                        key={tok.id}
                        type="button"
                        onClick={() => setSelectedId(tok.id)}
                        className={
                          isSelected ? 'swatch-card is-selected' : 'swatch-card'
                        }
                        aria-pressed={isSelected}
                      >
                        <div
                          className="swatch-chip"
                          style={{ backgroundColor: tok.hex }}
                        />
                        <div className="swatch-name">{tok.name}</div>
                        <div className="swatch-hex-row">
                          <span>{tok.variable}</span>
                          <span>{tok.hex}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Walled Base16 Syntax Viewport */}
      <section className="dossier-section">
        <h2 className="dossier-h2">// WALLED BASE16 SYNTAX GRAMMAR</h2>
        <div className="walled-viewport">
          <div className="walled-bar">
            <span>BASE16 // BUBBLEFORGE CODE VIEWPORT</span>
            <span>recessed #0D0C0F wall</span>
          </div>
          <div className="syntax-grid">
            {SYNTAX_SLOTS.map((slot) => {
              const tok = PALETTE_BY_ID[slot.tokenId]
              return (
                <div key={slot.slot} className="syntax-cell" title={slot.note ?? tok.job}>
                  <span
                    className="syntax-dot"
                    style={{ backgroundColor: tok.hex }}
                    aria-hidden="true"
                  />
                  <span className="syntax-slot">{slot.slot}</span>
                  <span className="syntax-role">{slot.role}</span>
                  <span className="tone-meta">{tok.hex}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
