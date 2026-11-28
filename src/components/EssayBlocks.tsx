import type { MouseEvent } from 'react'
import { statusToneFor, type EssayBlock } from '../data/dossiers'
import { RichText } from './RichText'

interface EssayBlocksProps {
  blocks: EssayBlock[]
  onNavigate: (path: string) => void
}

export function EssayBlocks({ blocks, onNavigate }: EssayBlocksProps) {
  const handleLink = (path: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    onNavigate(path)
  }

  return (
    <div className="essay-flow">
      {blocks.map((block, idx) => {
        if (block.type === 'p') {
          return (
            <p key={`p-${idx}`} className="essay-p">
              <RichText text={block.text} onNavigate={onNavigate} />
            </p>
          )
        }

        if (block.type === 'standout') {
          return (
            <p key={`standout-${idx}`} className="essay-standout">
              <RichText text={block.text} onNavigate={onNavigate} />
            </p>
          )
        }

        if (block.type === 'callout') {
          const tone = block.tone ?? 'header'
          return (
            <blockquote
              key={`callout-${idx}`}
              className={`law-callout law-callout--${tone}`}
            >
              {block.label ? (
                <div className={`law-discipline tone-${tone}`}>{block.label}</div>
              ) : null}
              <p className="law-quote">“{block.quote}”</p>
              {block.sub ? <p className="law-sub">{block.sub}</p> : null}
            </blockquote>
          )
        }

        if (block.type === 'grid') {
          return (
            <div key={`grid-${idx}`} className="two-col-grid essay-grid">
              {block.items.map((item) => (
                <div key={item.num} className="quality-card">
                  <div className="quality-head">
                    <span className="quality-letter">{item.num}</span>
                    <h3 className="quality-name">{item.title}</h3>
                  </div>
                  <p className="quality-desc">{item.body}</p>
                </div>
              ))}
            </div>
          )
        }

        if (block.type === 'example') {
          return (
            <div key={`example-${idx}`} className="example-panel">
              {block.paragraphs.map((para, pIdx) => (
                <p key={`ex-${pIdx}`} className="essay-p">
                  <RichText text={para} onNavigate={onNavigate} />
                </p>
              ))}
            </div>
          )
        }

        if (block.type === 'links') {
          return (
            <div key={`links-${idx}`} className="card-stack essay-links">
              {block.items.map((item) => (
                <a
                  key={item.route}
                  href={item.route}
                  onClick={handleLink(item.route)}
                  className="dossier-card dossier-card--interactive"
                >
                  <div className="card-title-row">
                    <h3 className="card-title">{item.system}</h3>
                  </div>
                  <p className="card-desc card-desc--tight">{item.body}</p>
                  <div className="card-footer card-footer--end">
                    <span className="cta-link">open dossier →</span>
                  </div>
                </a>
              ))}
            </div>
          )
        }

        if (block.type === 'diagram') {
          return (
            <div key={`diagram-${idx}`} className="walled-viewport">
              <div className="walled-bar">
                <span>{block.title}</span>
                <span>{block.filename}</span>
              </div>
              <pre className="walled-pre">{block.ascii}</pre>
            </div>
          )
        }

        if (block.type === 'bullets') {
          return (
            <ul key={`bullets-${idx}`} className="obs-list">
              {block.items.map((item) => (
                <li key={item.lead}>
                  <span className="obs-bullet">›</span>
                  <span>
                    <strong>
                      <RichText text={item.lead} onNavigate={onNavigate} />
                    </strong>{' '}
                    <RichText text={item.body} onNavigate={onNavigate} />
                  </span>
                </li>
              ))}
            </ul>
          )
        }

        if (block.type === 'steps') {
          return (
            <ol key={`steps-${idx}`} className="step-list essay-links">
              {block.items.map((item, sIdx) => (
                <li key={item.lead} className="step-item">
                  <span className="step-num">0{sIdx + 1}</span>
                  <span>
                    <strong>
                      <RichText text={item.lead} onNavigate={onNavigate} />
                    </strong>{' '}
                    <RichText text={item.body} onNavigate={onNavigate} />
                  </span>
                </li>
              ))}
            </ol>
          )
        }

        if (block.type === 'stages') {
          return (
            <div key={`stages-${idx}`} className="card-stack essay-links">
              {block.items.map((stage) => (
                <div key={stage.num} className="stage-card">
                  <div className="stage-head">
                    <span className="quality-letter">{stage.num}</span>
                    <h3 className="quality-name">{stage.title}</h3>
                  </div>
                  <div className="stage-body">
                    {stage.paragraphs.map((para, pIdx) => (
                      <p key={`s-${stage.num}-${pIdx}`} className="essay-p">
                        <RichText text={para} onNavigate={onNavigate} />
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        }

        if (block.type === 'capabilities') {
          const tone = block.tone ?? 'header'
          return (
            <div key={`caps-${idx}`} className="essay-links">
              <div className="dossier-h2-row" style={{ marginBottom: '0.6rem' }}>
                <span className="telemetry-heading" style={{ marginBottom: 0 }}>
                  capability_status
                </span>
                <div className="status-legend">
                  <span className="tone-media">● WORKING</span>
                  <span className="tone-note">● EXPERIMENTAL</span>
                  <span className="tone-meta">● PLANNED</span>
                </div>
              </div>
              <div className={`telemetry-box telemetry-box--${tone} telemetry-box--flush`}>
                {block.items.map((cap) => (
                  <div key={cap.name} className="cap-status-row">
                    <div className="cap-status-main">
                      <span className="cap-status-name">{cap.name}</span>
                      <span className={`cap-status-badge tone-${statusToneFor(cap.status)}`}>
                        [ {cap.status} ]
                      </span>
                    </div>
                    {cap.note ? <div className="cap-status-note">{cap.note}</div> : null}
                  </div>
                ))}
              </div>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
