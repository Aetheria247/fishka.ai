import type { MouseEvent } from 'react'
import {
  ROUTE_SUMMARIES,
  statusToneFor,
  type Dossier,
} from '../data/dossiers'
import { copyToClipboard } from '../lib/router'
import { ColorContractView } from './ColorContractView'
import { DottedLeader } from './DottedLeader'

interface DossierPageProps {
  dossier: Dossier
  onNavigate: (path: string) => void
  onToast: (message: string) => void
}

export function DossierPage({
  dossier,
  onNavigate,
  onToast,
}: DossierPageProps) {
  const handleLink = (path: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    onNavigate(path)
  }

  const handleCopyUrl = async () => {
    const fullUrl = `https://fishka.ai${dossier.route}`
    const ok = await copyToClipboard(fullUrl)
    onToast(ok ? `Copied: ${fullUrl}` : `URL: ${fullUrl}`)
  }

  return (
    <main className="view-main dossier-view">
      {/* Top Bar */}
      <div className="dossier-topbar">
        <div className="dossier-topbar-left">
          <a href="/" onClick={handleLink('/')} className="ui-btn">
            ← index
          </a>
          <span className="breadcrumb-text">{dossier.breadcrumb}</span>
        </div>

        <button
          type="button"
          onClick={() => void handleCopyUrl()}
          className="ui-btn ui-btn--muted"
        >
          copy url
        </button>
      </div>

      <article className="dossier-article">
        {dossier.kind === 'color-contract' ? (
          <ColorContractView dossier={dossier} onToast={onToast} />
        ) : null}

        {dossier.kind === 'thinking' ? (
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
              <h2 className="dossier-h2">// ORIGIN STORY</h2>
              <div className="prose-stack" style={{ marginBottom: 0 }}>
                {dossier.originStory.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </section>

            <section className="dossier-section">
              <h2 className="dossier-h2">// EVALUATED QUALITIES</h2>
              <div className="two-col-grid">
                {dossier.qualities.map((q) => (
                  <div key={q.letter} className="quality-card">
                    <div className="quality-head">
                      <span className="quality-letter">{q.letter}</span>
                      <h3 className="quality-name">{q.name}</h3>
                    </div>
                    <p className="quality-desc">{q.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="dossier-section">
              <h2 className="dossier-h2">// POOR CARE VS. GOOD CARE</h2>
              <div className="two-col-grid">
                <div className="compare-card compare-card--poor">
                  <div className="compare-label tone-error">
                    {dossier.comparison.poor.label}
                  </div>
                  <ul className="compare-list">
                    {dossier.comparison.poor.items.map((item) => (
                      <li key={item.slice(0, 24)}>
                        <span className="compare-mark tone-error">×</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="compare-card compare-card--good">
                  <div className="compare-label tone-media">
                    {dossier.comparison.good.label}
                  </div>
                  <ul className="compare-list">
                    {dossier.comparison.good.items.map((item) => (
                      <li key={item.slice(0, 24)}>
                        <span className="compare-mark tone-media">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="dossier-section">
              <h2 className="dossier-h2">// FROM CARE TO ENGINEERING CONSTRAINTS</h2>
              <div className="card-stack">
                {dossier.engineeringBridge.map((bridge) => (
                  <a
                    key={bridge.route}
                    href={bridge.route}
                    onClick={handleLink(bridge.route)}
                    className="dossier-card dossier-card--interactive"
                  >
                    <div className="card-title-row">
                      <h3 className="card-title">{bridge.system}</h3>
                      <span className="cta-link">open system →</span>
                    </div>
                    <p className="card-desc card-desc--tight">
                      {bridge.constraint}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          </>
        ) : null}

        {dossier.kind === 'doing' ? (
          <>
            <header className="dossier-head">
              <div className="dossier-eyebrow">
                <span>{dossier.eyebrow}</span>
                <span className="tone-meta">·</span>
                <span className={`tone-${dossier.statusTone}`}>{dossier.status}</span>
              </div>
              <h1 className="dossier-h1">{dossier.title}</h1>
              <p className="dossier-subtitle">{dossier.subtitle}</p>
              <div
                className={`telemetry-box telemetry-box--${dossier.tagTone} telemetry-box--flush`}
              >
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

            <section className="hypothesis-box">
              <h2 className="dossier-h2">// HYPOTHESIS</h2>
              <p>{dossier.hypothesis}</p>
            </section>

            <section className="dossier-section">
              <h2 className="dossier-h2">// EXPERIMENT &amp; METHOD</h2>
              <ol className="step-list">
                {dossier.method.map((step, idx) => (
                  <li key={step.slice(0, 24)} className="step-item">
                    <span className="step-num">0{idx + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="dossier-section">
              <h2 className="dossier-h2">// OBSERVATIONS</h2>
              <ul className="obs-list">
                {dossier.observations.map((obs) => (
                  <li key={obs.slice(0, 24)}>
                    <span className="obs-bullet">›</span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="dossier-section">
              <h2 className="dossier-h2">// RESULTS &amp; OPEN QUESTIONS</h2>
              <div className="card-stack">
                {dossier.resultsAndQuestions.map((rq) => (
                  <div key={rq.text.slice(0, 24)} className="rq-card">
                    <div className={`rq-badge tone-${rq.tone}`}>
                      [ {rq.status} ]
                    </div>
                    <p className="rq-text">{rq.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}

        {dossier.kind === 'building' ? (
          <>
            <header className="dossier-head">
              <div className="dossier-eyebrow">{dossier.eyebrow}</div>
              <h1 className="dossier-h1">{dossier.title}</h1>
              <p className="dossier-subtitle">{dossier.pillar}</p>
            </header>

            <section className="dossier-section">
              <div className="dossier-h2-row">
                <h2 className="dossier-h2">// CAPABILITY STATUS TABLE</h2>
                <div className="status-legend">
                  <span className="tone-media">● WORKING</span>
                  <span className="tone-note">● EXPERIMENTAL</span>
                  <span className="tone-meta">● PLANNED</span>
                </div>
              </div>
              <div
                className={`telemetry-box telemetry-box--${dossier.pillarTone} telemetry-box--flush`}
              >
                {dossier.capabilities.map((cap) => (
                  <DottedLeader
                    key={cap.name}
                    label={cap.name}
                    labelBright
                    value={`[ ${cap.status} ]`}
                    tone={statusToneFor(cap.status)}
                  />
                ))}
              </div>
            </section>

            <section className="dossier-section">
              <h2 className="dossier-h2">// SYSTEM ARCHITECTURE</h2>
              <div className="walled-viewport">
                <div className="walled-bar">
                  <span>{dossier.diagramTitle}</span>
                  <span>diagram.txt</span>
                </div>
                <pre className="walled-pre">{dossier.diagramAscii}</pre>
              </div>
            </section>

            <section className="dossier-section">
              <h2 className="dossier-h2">// KEY ENGINEERING DECISIONS</h2>
              <div className="card-stack">
                {dossier.decisions.map((dec, idx) => (
                  <div key={dec.title} className="decision-card">
                    <h3 className="decision-title">
                      <span className="decision-idx">0{idx + 1}.</span>
                      {dec.title}
                    </h3>
                    <p className="decision-body">{dec.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="dossier-section">
              <h2 className="dossier-h2">// INTERFACE &amp; DEMONSTRATION</h2>
              <div className="media-frame">
                <span className={`media-frame-label tone-${dossier.pillarTone}`}>
                  {dossier.demoLabel}
                </span>
                <span className="media-frame-sub">
                  Drop-in slot for live screenshots, recordings, or interactive widgets
                </span>
              </div>
            </section>
          </>
        ) : null}
      </article>

      {/* Related Cross-Links */}
      <section className="related-section">
        <h2 className="dossier-h2">// CONNECTED DOSSIERS</h2>
        <div className="related-grid">
          {dossier.related.map((rPath) => {
            const summary = ROUTE_SUMMARIES[rPath]
            if (!summary) return null
            return (
              <a
                key={rPath}
                href={rPath}
                onClick={handleLink(rPath)}
                className="related-card"
              >
                <div>
                  <div className="related-tag">{summary.tag}</div>
                  <div className="related-title">{summary.title}</div>
                  <p className="related-desc">{summary.desc}</p>
                </div>
                <span className="cta-link">open →</span>
              </a>
            )
          })}
        </div>
      </section>
    </main>
  )
}
