import { useCallback, useEffect, useRef, useState } from 'react'

type ScopeLevel = 'global' | 'dir' | 'subdir' | 'chat'

type ConfigKey =
  | 'connection'
  | 'system_prompt'
  | 'temperature'
  | 'reasoning_effort'
  | 'doc_processing'
  | 'turing_codec'
  | 'ask_a_guy'
  | 'summary_live_threshold'
  | 'summary_trigger_count'
  | 'max_summaries_total'

type ConfigValue = string | number | boolean

type LayerMap = Record<ScopeLevel, Partial<Record<ConfigKey, ConfigValue>>>

interface ResolvedEntry {
  key: ConfigKey
  value: ConfigValue
  source: ScopeLevel
  isLocal: boolean
}

const LEVELS: ScopeLevel[] = ['global', 'dir', 'subdir', 'chat']

const ALL_KEYS: ConfigKey[] = [
  'connection',
  'system_prompt',
  'temperature',
  'reasoning_effort',
  'doc_processing',
  'turing_codec',
  'ask_a_guy',
  'summary_live_threshold',
  'summary_trigger_count',
  'max_summaries_total',
]

const LEVEL_META: Record<
  ScopeLevel,
  {
    title: string
    file: string
    targetName: string
    subtitle: string
    pillClass: string
    colorVar: string
  }
> = {
  global: {
    title: 'GLOBAL SETTINGS',
    file: 'app.toml',
    targetName: '~/.dotChat',
    subtitle:
      'Workspace defaults. Every directory and chat inherits live from here unless frozen locally.',
    pillClass: 'cc-pill--global',
    colorVar: 'var(--header-1)',
  },
  dir: {
    title: 'DIR SETTINGS',
    file: 'claude/.dirrc',
    targetName: 'claude',
    subtitle:
      'Scoped to the claude directory. Subdirs inherit these values live until touched.',
    pillClass: 'cc-pill--dir',
    colorVar: 'var(--truth)',
  },
  subdir: {
    title: 'SUBDIR SETTINGS',
    file: 'dotdev/.dirrc',
    targetName: 'dotdev',
    subtitle:
      'Changes here stay local to this subdir. Inheritance is live until you touch a field; then it freezes.',
    pillClass: 'cc-pill--subdir',
    colorVar: 'var(--media)',
  },
  chat: {
    title: 'CHAT SETTINGS',
    file: 'sprint-api/.chatrc',
    targetName: 'sprint-api',
    subtitle:
      'Single-thread overrides. Touch any control to freeze it for this conversation alone.',
    pillClass: 'cc-pill--local',
    colorVar: 'var(--chrome)',
  },
}

const CONNECTION_MODELS: Record<string, string> = {
  'OR-Claude-Opus-4.8': 'anthropic/claude-opus-4.8',
  'OR-Claude-Sonnet-4.6': 'anthropic/claude-sonnet-4.6',
  'OpenAI-GPT-5.4-Pro': 'openai/gpt-5.4-pro',
  'Local-Ollama-Qwen3': 'local/qwen3-coder-32b',
}

const SUBDIR_PROMPT_DEFAULT =
  'Workspace context: Local-first TypeScript & Rust systems project. Prioritize deterministic behavior, explicit state transitions, and concise architectural tradeoffs. Never invent API fields.'

function createInitialLayers(): LayerMap {
  return {
    global: {
      connection: 'OpenAI-GPT-5.4-Pro',
      system_prompt:
        'Default workspace assistant. Provide direct, well-structured answers and flag assumptions clearly.',
      temperature: 0.3,
      reasoning_effort: 'Medium',
      doc_processing: true,
      turing_codec: true,
      ask_a_guy: true,
      summary_live_threshold: 24,
      summary_trigger_count: 16,
      max_summaries_total: 6,
    },
    dir: {
      connection: 'OR-Claude-Opus-4.8',
      system_prompt:
        'You are a systems engineering partner. Favor clarity, explicit state, and verifiable outputs over speculation.',
      reasoning_effort: 'High',
      doc_processing: true,
      turing_codec: true,
    },
    subdir: {
      system_prompt: SUBDIR_PROMPT_DEFAULT,
      ask_a_guy: false,
    },
    chat: {},
  }
}

function resolveKeyFrom(
  layers: LayerMap,
  key: ConfigKey,
  targetLevel: ScopeLevel
): ResolvedEntry {
  const maxIdx = LEVELS.indexOf(targetLevel)
  let value: ConfigValue = ''
  let source: ScopeLevel = 'global'

  for (let i = 0; i <= maxIdx; i++) {
    const lvl = LEVELS[i]
    if (Object.prototype.hasOwnProperty.call(layers[lvl], key)) {
      const candidate = layers[lvl][key]
      if (candidate !== undefined) {
        value = candidate
        source = lvl
      }
    }
  }

  const isLocal = targetLevel !== 'global' && source === targetLevel
  return { key, value, source, isLocal }
}

function stateClassFor(resolved: ResolvedEntry): string {
  return resolved.isLocal ? 'cc-state-local' : `cc-state-${resolved.source}`
}

function formatTruthValue(key: ConfigKey, val: ConfigValue): string {
  if (typeof val === 'boolean') return val ? 'ON' : 'OFF'
  if (key === 'system_prompt') {
    const clean = String(val || '')
      .replace(/\s+/g, ' ')
      .trim()
    if (!clean) return '(empty)'
    return clean.length > 34 ? `"${clean.slice(0, 34)}…"` : `"${clean}"`
  }
  return String(val)
}

export function ContextCascadeDemo() {
  const [activeLevel, setActiveLevel] = useState<ScopeLevel>('subdir')
  const [layers, setLayers] = useState<LayerMap>(createInitialLayers)
  const [tourPlaying, setTourPlaying] = useState(false)
  const [activeStep, setActiveStep] = useState<number>(-1)
  const [focusedCard, setFocusedCard] = useState<ConfigKey | null>(null)
  const [pulsedKey, setPulsedKey] = useState<ConfigKey | null>(null)
  const [pulseSeq, setPulseSeq] = useState(0)
  const [identityOpen, setIdentityOpen] = useState(false)

  const paneRef = useRef<HTMLDivElement | null>(null)
  const secConnRef = useRef<HTMLElement | null>(null)
  const secPromptRef = useRef<HTMLElement | null>(null)
  const secParamsRef = useRef<HTMLElement | null>(null)
  const secMechRef = useRef<HTMLElement | null>(null)
  const promptRef = useRef<HTMLTextAreaElement | null>(null)

  const tourTimersRef = useRef<number[]>([])
  const tourPlayingRef = useRef(false)
  const activeLevelRef = useRef<ScopeLevel>('subdir')

  useEffect(() => {
    tourPlayingRef.current = tourPlaying
  }, [tourPlaying])

  useEffect(() => {
    activeLevelRef.current = activeLevel
  }, [activeLevel])

  const clearTourTimers = useCallback(() => {
    for (const id of tourTimersRef.current) {
      window.clearTimeout(id)
    }
    tourTimersRef.current = []
  }, [])

  useEffect(() => clearTourTimers, [clearTourTimers])

  const triggerPulse = useCallback((key: ConfigKey | null) => {
    if (!key) return
    setPulsedKey(key)
    setPulseSeq((s) => s + 1)
  }, [])

  const pauseTourOnUserAction = useCallback(() => {
    if (!tourPlayingRef.current) return
    clearTourTimers()
    tourPlayingRef.current = false
    setTourPlaying(false)
  }, [clearTourTimers])

  const setOverrideAt = useCallback(
    (level: ScopeLevel, key: ConfigKey, value: ConfigValue, pulse = true) => {
      setLayers((prev) => ({
        ...prev,
        [level]: {
          ...prev[level],
          [key]: value,
        },
      }))
      if (pulse) triggerPulse(key)
    },
    [triggerPulse]
  )

  const clearOverrideAt = useCallback(
    (level: ScopeLevel, key: ConfigKey, pulse = true) => {
      if (level === 'global') return
      setLayers((prev) => {
        const nextLevel = { ...prev[level] }
        delete nextLevel[key]
        return { ...prev, [level]: nextLevel }
      })
      if (pulse) triggerPulse(key)
    },
    [triggerPulse]
  )

  const scrollPaneTo = useCallback((el: HTMLElement | null) => {
    const pane = paneRef.current
    if (!pane || !el) return
    const targetTop = el.offsetTop - pane.offsetTop - 10
    pane.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
  }, [])

  const runTourStep = useCallback(
    function executeStep(stepIndex: number, autoAdvance: boolean) {
      clearTourTimers()
      setActiveLevel('subdir')
      activeLevelRef.current = 'subdir'
      setActiveStep(stepIndex)

      const schedule = (fn: () => void, delay: number) => {
        const id = window.setTimeout(fn, delay)
        tourTimersRef.current.push(id)
      }

      if (stepIndex === 0) {
        scrollPaneTo(secConnRef.current)
        setFocusedCard('connection')
        schedule(() => {
          setOverrideAt('subdir', 'connection', 'OR-Claude-Sonnet-4.6', true)
        }, 1500)
        schedule(() => {
          clearOverrideAt('subdir', 'connection', true)
        }, 3900)
        if (autoAdvance) {
          schedule(() => executeStep(1, true), 5200)
        }
      } else if (stepIndex === 1) {
        scrollPaneTo(secPromptRef.current)
        setFocusedCard('system_prompt')
        schedule(() => {
          clearOverrideAt('subdir', 'system_prompt', true)
        }, 1400)
        schedule(() => {
          setOverrideAt('subdir', 'system_prompt', SUBDIR_PROMPT_DEFAULT, true)
        }, 3600)
        if (autoAdvance) {
          schedule(() => executeStep(2, true), 5400)
        }
      } else if (stepIndex === 2) {
        scrollPaneTo(secParamsRef.current)
        setFocusedCard('temperature')
        schedule(() => {
          setOverrideAt('subdir', 'temperature', 0.6, true)
        }, 1300)
        schedule(() => {
          setFocusedCard('ask_a_guy')
          setOverrideAt('subdir', 'ask_a_guy', true, true)
        }, 3100)
        if (autoAdvance) {
          schedule(() => executeStep(3, true), 5200)
        }
      } else if (stepIndex === 3) {
        scrollPaneTo(secMechRef.current)
        setFocusedCard('summary_live_threshold')
        schedule(() => {
          setOverrideAt('subdir', 'summary_live_threshold', 32, true)
        }, 1500)
        if (autoAdvance) {
          schedule(() => {
            tourPlayingRef.current = false
            setTourPlaying(false)
          }, 4600)
        }
      }
    },
    [clearTourTimers, clearOverrideAt, scrollPaneTo, setOverrideAt]
  )

  const handleToggleTour = () => {
    if (tourPlaying) {
      clearTourTimers()
      tourPlayingRef.current = false
      setTourPlaying(false)
    } else {
      tourPlayingRef.current = true
      setTourPlaying(true)
      const nextStep = activeStep >= 0 && activeStep < 3 ? activeStep : 0
      runTourStep(nextStep, true)
    }
  }

  const handleResetDemo = () => {
    clearTourTimers()
    tourPlayingRef.current = false
    setTourPlaying(false)
    setActiveStep(-1)
    setFocusedCard(null)
    setPulsedKey(null)
    setActiveLevel('subdir')
    activeLevelRef.current = 'subdir'
    setLayers(createInitialLayers())
    scrollPaneTo(secConnRef.current)
  }

  const handleStepChip = (idx: number) => {
    tourPlayingRef.current = false
    setTourPlaying(false)
    runTourStep(idx, false)
  }

  const handleScopeChange = (lvl: ScopeLevel) => {
    pauseTourOnUserAction()
    setActiveStep(-1)
    setFocusedCard(null)
    setActiveLevel(lvl)
  }

  const applyFormat = (fmt: string) => {
    pauseTourOnUserAction()
    const el = promptRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const val = el.value
    const sel = val.slice(start, end) || 'text'
    const wrappers: Record<string, string> = {
      bold: `**${sel}**`,
      italic: `*${sel}*`,
      code: `\`${sel}\``,
      brackets: `[${sel}]`,
      tags: `<context>${sel}</context>`,
      h1: `\n# ${sel}`,
      h2: `\n## ${sel}`,
      h3: `\n### ${sel}`,
    }
    const replacement = wrappers[fmt] ?? sel
    const nextVal = val.slice(0, start) + replacement + val.slice(end)
    setOverrideAt(activeLevel, 'system_prompt', nextVal, true)
    el.focus()
  }

  const meta = LEVEL_META[activeLevel]
  const activeIdx = LEVELS.indexOf(activeLevel)

  const resolvedMap = {} as Record<ConfigKey, ResolvedEntry>
  const counts: Record<ScopeLevel, number> = { global: 0, dir: 0, subdir: 0, chat: 0 }
  for (const key of ALL_KEYS) {
    const r = resolveKeyFrom(layers, key, activeLevel)
    resolvedMap[key] = r
    counts[r.source] += 1
  }

  const renderBadgeGroup = (resolved: ResolvedEntry, customLocalText?: string) => {
    const pillClass = resolved.isLocal
      ? 'cc-pill--local'
      : activeLevel === 'global'
        ? 'cc-pill--global'
        : LEVEL_META[resolved.source].pillClass

    const pillText = resolved.isLocal
      ? customLocalText ?? 'LOCAL override • frozen'
      : activeLevel === 'global'
        ? 'global • app.toml'
        : `inherited from ${LEVEL_META[resolved.source].file}`

    return (
      <div className="cc-badge-group">
        <span className={`cc-pill ${pillClass}`}>{pillText}</span>
        {resolved.isLocal && resolved.key !== 'system_prompt' ? (
          <button
            type="button"
            className="cc-btn-inline"
            title="Clear local override and resume live inheritance"
            onClick={() => {
              pauseTourOnUserAction()
              clearOverrideAt(activeLevel, resolved.key, true)
            }}
          >
            reset
          </button>
        ) : null}
      </div>
    )
  }

  const rConn = resolvedMap.connection
  const rPrompt = resolvedMap.system_prompt
  const rTemp = resolvedMap.temperature
  const rReason = resolvedMap.reasoning_effort
  const rDoc = resolvedMap.doc_processing
  const rTuring = resolvedMap.turing_codec
  const rAsk = resolvedMap.ask_a_guy
  const rLive = resolvedMap.summary_live_threshold
  const rTrig = resolvedMap.summary_trigger_count
  const rMax = resolvedMap.max_summaries_total

  const connVal = String(rConn.value)
  const tempVal = Number(rTemp.value)
  const reasonVal = String(rReason.value)

  return (
    <div
      className="cc-widget"
      role="region"
      aria-label=".dotChat Context Cascade interactive configuration demo"
    >
      {/* 1. Top Header & Level Scope Switcher */}
      <div className="cc-header">
        <div className="cc-header-row">
          <div className="cc-breadcrumb">
            <span className="cc-brand-dot" aria-hidden="true" />
            <span className={activeLevel === 'global' ? 'cc-crumb cc-crumb--active' : 'cc-crumb'}>
              ~/.dotChat
            </span>
            <span className="cc-crumb-sep">&gt;</span>
            <span className={activeLevel === 'dir' ? 'cc-crumb cc-crumb--active' : 'cc-crumb'}>
              claude
            </span>
            <span className="cc-crumb-sep">&gt;</span>
            <span className={activeLevel === 'subdir' ? 'cc-crumb cc-crumb--active' : 'cc-crumb'}>
              dotdev
            </span>
            <span className="cc-crumb-sep">&gt;</span>
            <span className={activeLevel === 'chat' ? 'cc-crumb cc-crumb--active' : 'cc-crumb'}>
              sprint-api
            </span>
          </div>

          <div className="cc-scope-switcher" role="group" aria-label="Configuration scope level">
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                type="button"
                className={`cc-scope-pill cc-scope-pill--${lvl}${
                  activeLevel === lvl ? ' is-active' : ''
                }`}
                onClick={() => handleScopeChange(lvl)}
              >
                <span className="cc-scope-dot" aria-hidden="true" />
                {lvl === 'global'
                  ? 'Global'
                  : lvl === 'dir'
                    ? 'Dir'
                    : lvl === 'subdir'
                      ? 'SubDir'
                      : 'Chat'}
              </button>
            ))}
          </div>
        </div>

        <div className="cc-title-block">
          <div className="cc-title-line">
            <span className="cc-title">{meta.title}</span>
            <span className={`cc-pill ${meta.pillClass}`}>{meta.file}</span>
          </div>
          <p className="cc-subtitle">{meta.subtitle}</p>
        </div>
      </div>

      {/* Scroll-Through Tour Bar */}
      <div className="cc-tour-bar">
        <div className="cc-tour-controls">
          <button
            type="button"
            className={`cc-btn-play${tourPlaying ? ' is-playing' : ''}`}
            onClick={handleToggleTour}
          >
            <span>{tourPlaying ? '❚❚' : '▶'}</span>
            <span>{tourPlaying ? 'Pause Tour' : 'Play Scroll-Through'}</span>
          </button>
          <button type="button" className="cc-btn-reset" onClick={handleResetDemo}>
            Reset Demo
          </button>
        </div>

        <div className="cc-step-chips" role="tablist" aria-label="Guided tour steps">
          {[
            '1. Live Inheritance',
            '2. Fork & Freeze',
            '3. Touch Any Control',
            '4. Wire Visibility',
          ].map((label, idx) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={activeStep === idx}
              className={`cc-step-chip${activeStep === idx ? ' is-active' : ''}`}
              onClick={() => handleStepChip(idx)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Two-Column Workspace */}
      <div className="cc-grid">
        {/* Left Scrollable Settings Pane */}
        <div
          className="cc-pane"
          ref={paneRef}
          onWheel={pauseTourOnUserAction}
          onTouchStart={pauseTourOnUserAction}
        >
          {/* Section 1: Connection */}
          <section className="cc-section" ref={secConnRef}>
            {activeStep === 0 ? (
              <div className="cc-tour-callout">
                <span className="cc-tour-tag">STEP 1 · LIVE INHERITANCE</span>
                <span>
                  Keyring bindings flow down live from <code>claude/.dirrc</code>. Touching
                  the selector freezes a local override in Core Pink without altering sibling
                  folders.
                </span>
              </div>
            ) : null}

            <div className="cc-eyebrow">
              <span>WHERE THIS {activeLevel.toUpperCase()} LIVES &amp; WHO IT TALKS TO</span>
              <span>KEYRING</span>
            </div>

            <div
              className={`cc-card ${stateClassFor(rConn)}${
                focusedCard === 'connection' ? ' is-focus' : ''
              }`}
            >
              <div className="cc-editing-row">
                <span className="cc-muted">EDITING</span>
                <strong style={{ color: meta.colorVar }}>{meta.targetName}</strong>
              </div>

              <div className="cc-card-head">
                <div>
                  <div className="cc-field-label">CONNECTION (Keyring)</div>
                  <div className="cc-field-sub">
                    Bind an existing Vault credential alias to this scope.
                  </div>
                </div>
                {renderBadgeGroup(rConn)}
              </div>

              <select
                className="cc-select"
                aria-label="Keyring Connection"
                value={connVal}
                onChange={(e) => {
                  pauseTourOnUserAction()
                  setOverrideAt(activeLevel, 'connection', e.target.value, true)
                }}
              >
                <option value="OR-Claude-Opus-4.8">OR-Claude-Opus-4.8</option>
                <option value="OR-Claude-Sonnet-4.6">OR-Claude-Sonnet-4.6</option>
                <option value="OpenAI-GPT-5.4-Pro">OpenAI-GPT-5.4-Pro</option>
                <option value="Local-Ollama-Qwen3">Local-Ollama-Qwen3</option>
              </select>

              <div className="cc-model-meta">
                <span>model: {CONNECTION_MODELS[connVal] ?? connVal}</span>
                <span>vault.enc · alias bound</span>
              </div>
            </div>
          </section>

          {/* Section 2: Identity & Prompting */}
          <section className="cc-section" ref={secPromptRef}>
            {activeStep === 1 ? (
              <div className="cc-tour-callout">
                <span className="cc-tour-tag">STEP 2 · FORK &amp; FREEZE</span>
                <span>
                  A forked prompt lights up in Aetheria Core Pink. Clicking{' '}
                  <strong>re-sync (soft)</strong> restores live inheritance from above; any new
                  edit forks it again.
                </span>
              </div>
            ) : null}

            <div className="cc-eyebrow">
              <span>IDENTITY &amp; PROMPTING</span>
              <span>CASCADE TEXT</span>
            </div>

            <div className={`cc-collapsible${identityOpen ? ' is-open' : ''}`}>
              <button
                type="button"
                className="cc-collapsible-trigger"
                aria-expanded={identityOpen}
                onClick={() => setIdentityOpen((o) => !o)}
              >
                <span>
                  <span className="cc-chevron">►</span>IDENTITY
                </span>
                <span className="cc-pill cc-pill--dir cc-pill--xs">
                  inherited from claude/.dirrc
                </span>
              </button>
              {identityOpen ? (
                <div className="cc-collapsible-body">
                  <div className="cc-identity-kv">
                    <span>assistant_alias</span>
                    <strong>claude-systems</strong>
                  </div>
                  <div className="cc-identity-kv">
                    <span>role_envelope</span>
                    <strong>engineering-partner</strong>
                  </div>
                </div>
              ) : null}
            </div>

            <div
              className={`cc-card ${stateClassFor(rPrompt)}${
                focusedCard === 'system_prompt' ? ' is-focus' : ''
              }`}
            >
              <div className="cc-card-head">
                <div className="cc-field-label">SYSTEM PROMPT &amp; MECHANICS</div>
                {renderBadgeGroup(rPrompt, 'system_prompt • LOCAL forked from above')}
              </div>

              <div className="cc-prompt-bar">
                <div className="cc-fmt-btns" aria-label="Markdown formatting helpers">
                  {[
                    { id: 'bold', label: <strong>B</strong>, title: 'Bold' },
                    { id: 'italic', label: <em>I</em>, title: 'Italic' },
                    { id: 'code', label: 'code', title: 'Inline code' },
                    { id: 'brackets', label: '[]', title: 'Brackets' },
                    { id: 'tags', label: '<>', title: 'XML tag' },
                    { id: 'h1', label: 'H1', title: 'Heading 1' },
                    { id: 'h2', label: 'H2', title: 'Heading 2' },
                    { id: 'h3', label: 'H3', title: 'Heading 3' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      className="cc-fmt-btn"
                      title={btn.title}
                      onClick={() => applyFormat(btn.id)}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                <div className="cc-prompt-actions">
                  <span
                    className={`cc-pill ${
                      rPrompt.isLocal ? 'cc-pill--local' : LEVEL_META[rPrompt.source].pillClass
                    }`}
                  >
                    {rPrompt.isLocal
                      ? 'forked'
                      : activeLevel === 'global'
                        ? 'root'
                        : 'live sync'}
                  </span>
                  <button
                    type="button"
                    className="cc-btn-inline"
                    disabled={!rPrompt.isLocal}
                    onClick={() => {
                      pauseTourOnUserAction()
                      clearOverrideAt(activeLevel, 'system_prompt', true)
                    }}
                  >
                    re-sync (soft)
                  </button>
                  <button
                    type="button"
                    className="cc-btn-inline"
                    onClick={() => {
                      pauseTourOnUserAction()
                      setOverrideAt(activeLevel, 'system_prompt', '', true)
                    }}
                  >
                    clear
                  </button>
                </div>
              </div>

              <textarea
                ref={promptRef}
                className="cc-textarea"
                spellCheck={false}
                aria-label="System Prompt"
                value={String(rPrompt.value)}
                onChange={(e) => {
                  pauseTourOnUserAction()
                  setOverrideAt(activeLevel, 'system_prompt', e.target.value, true)
                }}
              />
            </div>
          </section>

          {/* Section 3: Model Parameters & Capabilities */}
          <section className="cc-section" ref={secParamsRef}>
            {activeStep === 2 ? (
              <div className="cc-tour-callout">
                <span className="cc-tour-tag">STEP 3 · TOUCH ANY CONTROL</span>
                <span>
                  Every slider, selector, and capability toggle follows the same contract:
                  inherited values stay live in Lavender or Blue until you touch them.
                </span>
              </div>
            ) : null}

            <div className="cc-eyebrow">
              <span>MODEL PARAMETERS &amp; CAPABILITIES</span>
              <span>RUNTIME CONTROLS</span>
            </div>

            <div className="cc-stack">
              {/* Temperature */}
              <div
                className={`cc-card ${stateClassFor(rTemp)}${
                  focusedCard === 'temperature' ? ' is-focus' : ''
                }`}
              >
                <div className="cc-card-head">
                  <div>
                    <div className="cc-field-label">temperature</div>
                    <div className="cc-field-sub">
                      Sampling variance sent on provider payload.
                    </div>
                  </div>
                  {renderBadgeGroup(rTemp)}
                </div>
                <div className="cc-slider-row">
                  <input
                    type="range"
                    className="cc-slider"
                    min="0"
                    max="1"
                    step="0.1"
                    aria-label="Temperature"
                    value={tempVal}
                    onChange={(e) => {
                      pauseTourOnUserAction()
                      setOverrideAt(
                        activeLevel,
                        'temperature',
                        parseFloat(e.target.value),
                        true
                      )
                    }}
                  />
                  <span
                    className="cc-slider-val"
                    style={{
                      color: rTemp.isLocal
                        ? 'var(--chrome)'
                        : LEVEL_META[rTemp.source].colorVar,
                    }}
                  >
                    {tempVal.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Reasoning Effort */}
              <div
                className={`cc-card ${stateClassFor(rReason)}${
                  focusedCard === 'reasoning_effort' ? ' is-focus' : ''
                }`}
              >
                <div className="cc-card-head">
                  <div>
                    <div className="cc-field-label">reasoning_effort</div>
                    <div className="cc-field-sub">
                      Thinking budget requested via Turing dialect codec.
                    </div>
                  </div>
                  {renderBadgeGroup(rReason)}
                </div>
                <div className="cc-segmented" role="group" aria-label="Reasoning Effort">
                  {(['High', 'Medium', 'Off'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`cc-seg-btn${reasonVal === opt ? ' is-active' : ''}`}
                      onClick={() => {
                        pauseTourOnUserAction()
                        setOverrideAt(activeLevel, 'reasoning_effort', opt, true)
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Capability Toggles */}
              <div className="cc-toggle-list">
                {(
                  [
                    {
                      key: 'doc_processing' as const,
                      entry: rDoc,
                      title: 'Document Processing (Fidelity Lock)',
                      sub: 'Ingest prose into navigable Markdown sidecars with TOC retrieval.',
                    },
                    {
                      key: 'turing_codec' as const,
                      entry: rTuring,
                      title: 'Turing Dialect Codec',
                      sub: 'Deterministic hot-path decoding for reasoning blocks & tool state.',
                    },
                    {
                      key: 'ask_a_guy' as const,
                      entry: rAsk,
                      title: 'Ask-a-Guy: Web Research',
                      sub: 'Delegate live web lookups through capability-bound untrusted boundary.',
                    },
                  ] as const
                ).map((item) => {
                  const isOn = Boolean(item.entry.value)
                  return (
                    <div
                      key={item.key}
                      className={`cc-toggle-row ${stateClassFor(item.entry)}${
                        focusedCard === item.key ? ' is-focus' : ''
                      }`}
                    >
                      <div className="cc-toggle-info">
                        <div className="cc-field-label">{item.title}</div>
                        <div className="cc-field-sub">{item.sub}</div>
                      </div>
                      <div className="cc-toggle-right">
                        {renderBadgeGroup(item.entry)}
                        <button
                          type="button"
                          role="switch"
                          aria-checked={isOn}
                          aria-label={item.title}
                          className={`cc-switch${isOn ? ' is-on' : ''}`}
                          onClick={() => {
                            pauseTourOnUserAction()
                            setOverrideAt(activeLevel, item.key, !isOn, true)
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Section 4: Context & Summarization Mechanics */}
          <section className="cc-section" ref={secMechRef}>
            {activeStep === 3 ? (
              <div className="cc-tour-callout">
                <span className="cc-tour-tag">STEP 4 · WIRE VISIBILITY</span>
                <span>
                  Not every setting crosses the provider wire. Explicit badges distinguish
                  app-side context orchestration from wire-inactive thresholds.
                </span>
              </div>
            ) : null}

            <div className="cc-eyebrow">
              <span>CONTEXT &amp; SUMMARIZATION MECHANICS</span>
              <span>WIRE BOUNDARY</span>
            </div>

            <div className="cc-mech-list">
              {(
                [
                  {
                    key: 'summary_live_threshold' as const,
                    entry: rLive,
                    sub: 'Recent turns kept verbatim in the active context window.',
                    wireTag: 'app-side, always sent',
                    wireClass: 'cc-pill--subdir',
                    min: 4,
                    max: 100,
                  },
                  {
                    key: 'summary_trigger_count' as const,
                    entry: rTrig,
                    sub: 'Turn delta before local background compaction schedules a pass.',
                    wireTag: 'not sent',
                    wireClass: 'cc-pill--muted',
                    min: 2,
                    max: 60,
                  },
                  {
                    key: 'max_summaries_total' as const,
                    entry: rMax,
                    sub: 'Rolling cap on local summary blocks retained in workspace storage.',
                    wireTag: 'not sent',
                    wireClass: 'cc-pill--muted',
                    min: 1,
                    max: 30,
                  },
                ] as const
              ).map((row) => (
                <div
                  key={row.key}
                  className={`cc-mech-row ${stateClassFor(row.entry)}${
                    focusedCard === row.key ? ' is-focus' : ''
                  }`}
                >
                  <div className="cc-mech-left">
                    <div className="cc-field-label">{row.key}</div>
                    <div className="cc-field-sub">{row.sub}</div>
                  </div>
                  <div className="cc-mech-right">
                    <span className={`cc-pill ${row.wireClass}`}>{row.wireTag}</span>
                    {renderBadgeGroup(row.entry)}
                    <input
                      type="number"
                      className="cc-num-input"
                      aria-label={row.key}
                      min={row.min}
                      max={row.max}
                      value={Number(row.entry.value)}
                      onChange={(e) => {
                        pauseTourOnUserAction()
                        const parsed = parseInt(e.target.value, 10)
                        if (!Number.isNaN(parsed)) {
                          setOverrideAt(activeLevel, row.key, parsed, true)
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="cc-wire-note">
              <span className="tone-media">app-side, always sent</span> governs what the local
              assembler packs into the prompt envelope before dispatch.{' '}
              <span className="cc-secondary">not sent</span> stays strictly inside{' '}
              <code>.dotChat</code>&apos;s local scheduler—never leaked in API headers or
              parameters.
            </div>
          </section>
        </div>

        {/* Right Sticky Panel: Runtime Truth // Resolved Cascade */}
        <aside className="cc-truth" aria-label="Runtime Truth Inspector">
          <div>
            <div className="cc-truth-head">
              <span className="cc-truth-title">RUNTIME TRUTH // RESOLVED CASCADE</span>
              <span className="cc-truth-live">LIVE</span>
            </div>

            <div className="cc-stack-box">
              {LEVELS.map((lvl, idx) => {
                const m = LEVEL_META[lvl]
                const c = counts[lvl]
                return (
                  <div key={lvl}>
                    {idx > 0 ? <div className="cc-stack-arrow">↓</div> : null}
                    <div
                      className={`cc-stack-layer${idx > activeIdx ? ' is-dimmed' : ''}${
                        idx === activeIdx ? ' is-current' : ''
                      }`}
                    >
                      <span style={{ color: m.colorVar }}>
                        {m.file}{' '}
                        <span className="cc-muted">({lvl})</span>
                      </span>
                      <span className="cc-stack-count" style={{ color: m.colorVar }}>
                        {c === 1 ? '1 key' : `${c} keys`}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="cc-truth-list">
            {ALL_KEYS.map((key) => {
              const r = resolvedMap[key]
              const badgeClass = r.isLocal
                ? 'cc-pill--local'
                : LEVEL_META[r.source].pillClass
              const badgeLabel = r.isLocal
                ? `LOCAL · ${LEVEL_META[activeLevel].file}`
                : LEVEL_META[r.source].file
              const isPulsing = pulsedKey === key

              return (
                <div
                  key={isPulsing ? `${key}-${pulseSeq}` : key}
                  className={`cc-truth-row${isPulsing ? ' is-pulsing' : ''}`}
                >
                  <div className="cc-truth-row-top">
                    <span className="cc-truth-key">{key}</span>
                    <span className={`cc-truth-badge ${badgeClass}`}>{badgeLabel}</span>
                  </div>
                  <div className="cc-truth-val">{formatTruthValue(key, r.value)}</div>
                </div>
              )
            })}
          </div>

          <div className="cc-truth-foot">
            <strong>Anti-Mystery Inheritance:</strong> zero silent overrides.
          </div>
        </aside>
      </div>
    </div>
  )
}
