import type { MouseEvent } from 'react'
import { statusToneFor } from '../data/dossiers'
import type { SectionId } from '../lib/router'
import { DottedLeader } from './DottedLeader'

interface HomePageProps {
  onNavigate: (path: string) => void
  onNavigateSection: (section: SectionId) => void
}

export function HomePage({ onNavigate, onNavigateSection }: HomePageProps) {
  const linkCardProps = (path: string, extraClass = '') => ({
    href: path,
    className: `dossier-card dossier-card--interactive ${extraClass}`.trim(),
    onClick: (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      e.preventDefault()
      onNavigate(path)
    },
  })

  const arcProps = (section: SectionId) => ({
    href: `/#${section}`,
    className: 'arc-step',
    onClick: (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      e.preventDefault()
      onNavigateSection(section)
    },
  })

  return (
    <main className="view-main">
      {/* 1. HERO / MASTHEAD */}
      <section className="hero">
        <div className="masthead-eyebrow">
          <span className="signal-dot" aria-hidden="true" />
          <span>EDITORIAL DOSSIER // FISHKA.AI</span>
        </div>

        <h1 className="hero-title">Personal AI should serve the person first.</h1>

        <p className="hero-lead">
          An exploration of individual agency, continuity, privacy, security, and
          trust—and the engineering required to make personal AI genuinely personal.
        </p>

        <div className="arc-panel">
          <div className="arc-head">
            <span>// THE ENGINEERING ARC</span>
            <span className="arc-sub">observation → investigation → system</span>
          </div>
          <div className="arc-grid">
            <a {...arcProps('thinking')}>
              <div className="arc-step-label">01 THINKING</div>
              <div className="arc-step-desc">philosophy</div>
            </a>
            <a {...arcProps('doing')}>
              <div className="arc-step-label">02 DOING</div>
              <div className="arc-step-desc">investigation</div>
            </a>
            <a {...arcProps('building')}>
              <div className="arc-step-label">03 BUILDING</div>
              <div className="arc-step-desc">systems</div>
            </a>
            <a {...arcProps('who')}>
              <div className="arc-step-label">04 WHO</div>
              <div className="arc-step-desc">the human &amp; lab</div>
            </a>
          </div>
        </div>
      </section>

      {/* 2. 01 // THINKING */}
      <section id="section-thinking" className="editorial-section">
        <div className="section-header">
          <h2 className="section-eyebrow">01 // THINKING</h2>
          <span className="section-caption">the philosophy</span>
        </div>

        <div className="prose-stack">
          <p>
            Most contemporary AI software is designed around organizational
            priorities—centralized telemetry, uniform compliance scripts,
            predictable SaaS retention, and risk-managed defaults. Even when
            packaged for consumers, the underlying architecture assumes the
            platform is the primary stakeholder and the individual is a guest.
          </p>
          <p>
            The tension sharpens the moment you try to make an AI genuinely useful
            to one specific person. Real usefulness requires memory, context,
            persistence, and permission to act. Yet every step toward deeper
            personal utility introduces harder, interlocking problems around{' '}
            <strong>privacy, safety, security, autonomy, and control</strong>. You
            cannot bolt those qualities onto a black box afterward; they have to
            be treated as first-class engineering constraints from the start.
          </p>
        </div>

        <div className="card-stack">
          <a
            {...linkCardProps(
              '/thinking/care-benchmark',
              'dossier-card--accent-left',
            )}
          >
            <div className="card-top">
              <div className="card-tags">
                <span className="badge badge--header">EVALUATION FRAMEWORK</span>
                <span className="route-slug">/thinking/care-benchmark</span>
              </div>
              <span className="tone-media" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)' }}>
                [ FEATURED DOSSIER ]
              </span>
            </div>

            <div className="card-title-row">
              <h3 className="card-title">The CARE Benchmark</h3>
            </div>

            <p className="card-desc">
              Twenty years in customer service teaches you a specific kind of
              pattern recognition: how organizations write procedures intended to
              help people, and how those same procedures quietly turn into
              obstacles. When I began encountering the exact same failure modes in
              AI systems, I started formalizing what actually makes an interaction
              respectful, transparent, and useful—and translating those findings
              directly into technical constraints.
            </p>

            <div className="telemetry-box telemetry-box--header">
              <DottedLeader
                label="origin"
                value="20 yrs human-service pattern analysis"
                tone="neutral"
              />
              <DottedLeader
                label="role_in_fishka"
                value="[ ENGINEERING COMPASS ]"
                tone="media"
              />
            </div>

            <div className="card-footer">
              <span className="card-stack-meta">
                Origin · Evaluated qualities · Good vs. Poor CARE · Engineering bridge
              </span>
              <span className="cta-link">read dossier →</span>
            </div>
          </a>

          <a {...linkCardProps('/thinking/color-contract')}>
            <div className="card-top">
              <div className="card-tags">
                <span className="badge badge--header">VISUAL GRAMMAR</span>
                <span className="route-slug">/thinking/color-contract</span>
              </div>
              <span className="tone-media" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)' }}>
                [ RATIFIED SPEC ]
              </span>
            </div>

            <div className="card-title-row">
              <h3 className="card-title">The Color Contract</h3>
            </div>

            <p className="card-desc card-desc--tight">
              A hue may mean exactly one thing within a namespace. How the
              BubbleForge charcoal ramp and .dotChat semantic walls keep chrome
              state, prose hierarchy, wire traces, and code blocks from ever
              fighting on screen.
            </p>

            <div className="card-footer card-footer--end">
              <span className="cta-link">inspect contract →</span>
            </div>
          </a>
        </div>
      </section>

      {/* 3. 02 // DOING */}
      <section id="section-doing" className="editorial-section">
        <div className="section-header">
          <h2 className="section-eyebrow">02 // DOING</h2>
          <span className="section-caption">the engineering laboratory</span>
        </div>

        <div className="prose-stack">
          <p>
            There is a difference between shipping software and running technical
            investigations. Before committing to an architecture, I run focused
            lab inquiries—testing hypotheses, inspecting wire behavior, and
            documenting open questions where the ecosystem still disagrees with
            its own documentation.
          </p>
        </div>

        <div className="card-stack">
          <a {...linkCardProps('/doing/turing')}>
            <div className="card-top">
              <div className="card-tags">
                <span className="badge badge--header">INTEROPERABILITY</span>
                <span className="route-slug">/doing/turing</span>
              </div>
              <span className="tone-media" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)' }}>
                [ ACTIVE LAB ]
              </span>
            </div>
            <div className="card-title-row">
              <h3 className="card-title">Turing</h3>
            </div>
            <p className="card-desc card-desc--tight">
              Investigating interoperability across the AI ecosystem: how to
              normalize structural inconsistencies between clients, providers,
              endpoints, streaming formats, and models without flattening away
              useful capabilities.
            </p>
            <div className="card-footer card-footer--end">
              <span className="cta-link">open lab note →</span>
            </div>
          </a>

          <a {...linkCardProps('/doing/document-processing')}>
            <div className="card-top">
              <div className="card-tags">
                <span className="badge badge--media">STRUCTURED DATA</span>
                <span className="route-slug">/doing/document-processing</span>
              </div>
              <span className="tone-media" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)' }}>
                [ ACTIVE LAB ]
              </span>
            </div>
            <div className="card-title-row">
              <h3 className="card-title">Document Processing</h3>
            </div>
            <p className="card-desc card-desc--tight">
              Exploring how to reliably transform messy, heterogeneous human
              documents into clean, inspectable structures—including the YAML
              slices shared across .dotChat and Neraphis—that both deterministic
              code and language models can actually use.
            </p>
            <div className="card-footer card-footer--end">
              <span className="cta-link">open lab note →</span>
            </div>
          </a>

          <a {...linkCardProps('/doing/wirewench')}>
            <div className="card-top">
              <div className="card-tags">
                <span className="badge badge--wire">WIRE &amp; ROUTING AUDIT</span>
                <span className="route-slug">/doing/wirewench</span>
              </div>
              <span className="tone-wire" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)' }}>
                [ ONGOING ]
              </span>
            </div>
            <div className="card-title-row">
              <h3 className="card-title">WireWench</h3>
            </div>
            <p className="card-desc card-desc--tight">
              Empirical auditing of API behavior, routing discrepancies, model
              identity, and provider quirks—measuring the gap between documented
              capabilities and observed runtime truth.
            </p>
            <div className="card-footer card-footer--end">
              <span className="cta-link">open lab note →</span>
            </div>
          </a>
        </div>
      </section>

      {/* 4. 03 // BUILDING */}
      <section id="section-building" className="editorial-section">
        <div className="section-header">
          <h2 className="section-eyebrow">03 // BUILDING</h2>
          <span className="section-caption">the systems</span>
        </div>

        <div className="prose-stack">
          <p>
            To serve an individual well, personal AI needs three foundational
            capabilities: it needs to <strong>remember</strong>,{' '}
            <strong>interact</strong>, and <strong>act</strong>. Each system below
            investigates one of those pillars, with clear boundaries between what
            is working today, what is experimental, and what remains planned.
          </p>
        </div>

        <div className="card-stack card-stack--lg">
          <a {...linkCardProps('/building/neraphis')}>
            <div className="card-top">
              <div className="card-title-group">
                <h3 className="card-title">Neraphis</h3>
                <span className="card-pillar">— Continuity</span>
              </div>
              <span className="route-slug">/building/neraphis</span>
            </div>

            <p className="card-desc">
              Personal memory architecture focused on assertion identity,
              provenance, revision history, retrieval, and individual control over
              what an AI knows—and what it is allowed to forget.
            </p>

            <div className="telemetry-box telemetry-box--header">
              <DottedLeader
                label="assertion_identity & yaml_slices"
                value="[ WORKING ]"
                tone={statusToneFor('WORKING')}
              />
              <DottedLeader
                label="provenance_revision_graph"
                value="[ EXPERIMENTAL ]"
                tone={statusToneFor('EXPERIMENTAL')}
              />
              <DottedLeader
                label="cross_client_sync_protocol"
                value="[ PLANNED ]"
                tone={statusToneFor('PLANNED')}
              />
            </div>

            <div className="card-footer">
              <span className="card-stack-meta">
                Python · SQLite · YAML · Provenance
              </span>
              <span className="cta-link">inspect architecture →</span>
            </div>
          </a>

          <a {...linkCardProps('/building/dotchat')}>
            <div className="card-top">
              <div className="card-title-group">
                <h3 className="card-title">.dotChat</h3>
                <span className="card-pillar">— Interaction</span>
              </div>
              <span className="route-slug">/building/dotchat</span>
            </div>

            <p className="card-desc">
              A local-first chat interface designed to give people direct
              visibility into and control over their conversations, inherited
              workspace context, model routing, and runtime environment.
            </p>

            <div className="telemetry-box telemetry-box--media">
              <DottedLeader
                label="workspace_tree & dirrc_inheritance"
                value="[ WORKING ]"
                tone={statusToneFor('WORKING')}
              />
              <DottedLeader
                label="runtime_truth & wire_diagnostics"
                value="[ EXPERIMENTAL ]"
                tone={statusToneFor('EXPERIMENTAL')}
              />
              <DottedLeader
                label="tresk_multi_provider_routing"
                value="[ PLANNED ]"
                tone={statusToneFor('PLANNED')}
              />
            </div>

            <div className="card-footer">
              <span className="card-stack-meta">
                TypeScript · React · Local-First · Base16
              </span>
              <span className="cta-link">inspect architecture →</span>
            </div>
          </a>

          <a {...linkCardProps('/building/guild')}>
            <div className="card-top">
              <div className="card-title-group">
                <h3 className="card-title">The Guild</h3>
                <span className="card-pillar">— Agency</span>
              </div>
              <span className="route-slug">/building/guild</span>
            </div>

            <p className="card-desc">
              Coordinated AI work built around specialized agents, explicit
              governance, deterministic verification gates, delegated authority,
              and accountable execution.
            </p>

            <div className="telemetry-box telemetry-box--vault">
              <DottedLeader
                label="role_contracts & permission_scopes"
                value="[ WORKING ]"
                tone={statusToneFor('WORKING')}
              />
              <DottedLeader
                label="deterministic_verification_gates"
                value="[ EXPERIMENTAL ]"
                tone={statusToneFor('EXPERIMENTAL')}
              />
              <DottedLeader
                label="delegated_autonomous_runs"
                value="[ PLANNED ]"
                tone={statusToneFor('PLANNED')}
              />
            </div>

            <div className="card-footer">
              <span className="card-stack-meta">
                Governance · Verification · Local Fleet · Audit Ledgers
              </span>
              <span className="cta-link">inspect architecture →</span>
            </div>
          </a>
        </div>
      </section>

      {/* 5. 04 // WHO */}
      <section
        id="section-who"
        className="editorial-section editorial-section--last"
      >
        <div className="section-header">
          <h2 className="section-eyebrow">04 // WHO</h2>
          <span className="section-caption">the human, the iron, the dog</span>
        </div>

        <div className="prose-stack">
          <p>
            Every technical system has a human history and a physical room behind
            it. Here is who is responsible for all of this.
          </p>
        </div>

        <div className="card-stack card-stack--lg">
          {/* Me */}
          <div className="who-card">
            <div className="who-eyebrow tone-header">// THE HUMAN</div>
            <h3 className="who-title">Me</h3>
            <div className="prose-stack" style={{ marginBottom: 0 }}>
              <p>
                I did not arrive in software and systems engineering by the usual
                conveyor belt. I spent twenty years in customer service—living on
                the fault line between what organizations think their systems do
                and what real people actually experience when things go sideways.
              </p>
              <p>
                That background turns out to be an unexpectedly sharp lens for
                engineering. When I build interfaces, memory pipelines, or agent
                governance, I am rarely asking &ldquo;what looks impressive in a
                demo?&rdquo; I am asking &ldquo;where will this break
                someone&apos;s trust, trap them in a loop, or hide the lever they
                need to pull?&rdquo;
              </p>
            </div>
          </div>

          {/* Chthonis — Vault / Security Ops Register (Dream Blue) */}
          <div className="who-card who-card--vault">
            <div className="card-top">
              <span className="who-eyebrow tone-vault" style={{ marginBottom: 0 }}>
                // HOME INFRASTRUCTURE &amp; OPS
              </span>
              <span className="tone-media" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)' }}>
                [ LAN · SELF-HOSTED ]
              </span>
            </div>
            <h3 className="who-title">Chthonis</h3>
            <p className="card-desc">
              None of these local-first experiments live in the abstract. They run
              on <strong>Chthonis</strong>—the home infrastructure, Arch Linux
              nodes, local inference hardware, maintenance scripts, and security
              operations I have assembled and maintained myself. Running your own
              iron keeps your abstractions honest.
            </p>

            <div className="media-frame media-frame--vault">
              <span className="media-frame-label tone-vault">
                [ PHOTO // CHTHONIS RACK &amp; WORKSPACE ]
              </span>
              <span className="media-frame-sub">
                16:9 hardware &amp; desk environment frame
              </span>
            </div>
          </div>

          {/* CLYDE */}
          <div className="who-card who-card--cryptic">
            <div className="card-top">
              <span
                style={{
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  color: 'var(--neutral)',
                  fontSize: 'var(--text-xs)',
                }}
              >
                CLYDE
              </span>
              <span className="route-slug">REF: 0x00</span>
            </div>
            <div className="telemetry-box telemetry-box--flush" style={{ border: 'none', padding: 0, background: 'transparent' }}>
              <DottedLeader label="status" value="[ PRESENT ]" tone="media" />
              <DottedLeader label="clearance" value="n/a" tone="meta" />
            </div>
            <p className="clyde-quote">
              &ldquo;If you need to ask, it isn&apos;t for you.&rdquo;
            </p>
          </div>

          {/* Chewy */}
          <div className="who-card">
            <div className="card-top">
              <span className="who-eyebrow tone-note" style={{ marginBottom: 0 }}>
                // EXECUTIVE LEADERSHIP
              </span>
              <span className="tone-media" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)' }}>
                [ ON DUTY ]
              </span>
            </div>
            <h3 className="who-title">Chewy</h3>
            <p className="who-role">
              Executive Director of Snacks and Workplace Interruptions
            </p>

            <div className="chewy-grid">
              <div className="media-frame media-frame--note">
                <span className="media-frame-label tone-note">
                  [ PHOTO // CHEWY — GOLDENDOODLE, ON DUTY ]
                </span>
                <span className="media-frame-sub">
                  portrait slot · non-negotiable
                </span>
              </div>

              <div className="telemetry-box telemetry-box--note telemetry-box--flush">
                <div className="telemetry-heading">live_telemetry</div>
                <DottedLeader
                  label="snack_audit"
                  value="[ CONTINUOUS ]"
                  tone="media"
                />
                <DottedLeader
                  label="meeting_veto"
                  value="[ ACTIVE ]"
                  tone="wire"
                />
                <DottedLeader
                  label="morale_uptime"
                  value="[ 100% ]"
                  tone="note"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
