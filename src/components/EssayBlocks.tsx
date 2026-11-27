import type { MouseEvent } from 'react'
import type { EssayBlock } from '../data/dossiers'
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
                    <strong>{item.lead}</strong>{' '}
                    <RichText text={item.body} onNavigate={onNavigate} />
                  </span>
                </li>
              ))}
            </ul>
          )
        }

        return null
      })}
    </div>
  )
}
