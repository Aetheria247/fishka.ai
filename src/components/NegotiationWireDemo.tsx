import { useCallback, useEffect, useRef, useState } from 'react'

interface WirePacket {
  id: number
  turn: number
  clean: boolean
}

interface CalStep {
  text: string
  tone: 'truth' | 'wire' | 'media'
}

const THRESHOLD = 15.0
const INITIAL_N = 20
const INITIAL_OVER = 1

// Scripted sequence: clean -> drift -> crosses 15% threshold (4/24 = 16.7%)
const SCRIPTED_TURNS = [true, false, false, false, true, false, true, false]

const CALIBRATION_STEPS: { delay: number; step: CalStep }[] = [
  {
    delay: 200,
    step: {
      text: '> Probing dialect envelope on Amazon Bedrock...',
      tone: 'truth',
    },
  },
  {
    delay: 950,
    step: {
      text: '> Detected reasoning field mismatch (thinking_content vs. reasoning)',
      tone: 'wire',
    },
  },
  {
    delay: 1750,
    step: {
      text: '> Adapter updated — hot-path decoder locked. Disagreement reset to 0.0%.',
      tone: 'media',
    },
  },
]

function initialPackets(): WirePacket[] {
  return [
    { id: 20, turn: 20, clean: true },
    { id: 19, turn: 19, clean: true },
  ]
}

export function NegotiationWireDemo() {
  const [n, setN] = useState(INITIAL_N)
  const [over, setOver] = useState(INITIAL_OVER)
  const [playing, setPlaying] = useState(true)
  const [calibrating, setCalibrating] = useState(false)
  const [calibrated, setCalibrated] = useState(false)
  const [packets, setPackets] = useState<WirePacket[]>(initialPackets)
  const [calSteps, setCalSteps] = useState<CalStep[]>([])
  const [showCalConsole, setShowCalConsole] = useState(false)
  const [overFlash, setOverFlash] = useState(false)

  const turnIdxRef = useRef(0)
  const nextIdRef = useRef(21)
  const nRef = useRef(INITIAL_N)
  const calibratingRef = useRef(false)
  const calibratedRef = useRef(false)
  const playingRef = useRef(true)
  const timeoutsRef = useRef<number[]>([])

  const clearScheduledTimeouts = useCallback(() => {
    for (const id of timeoutsRef.current) {
      window.clearTimeout(id)
    }
    timeoutsRef.current = []
  }, [])

  const pushTurn = useCallback((isClean: boolean) => {
    nRef.current += 1
    const turnNum = nRef.current
    const pktId = nextIdRef.current++

    setN(turnNum)
    if (!isClean) {
      setOver((prev) => prev + 1)
      setOverFlash(true)
      const tid = window.setTimeout(() => setOverFlash(false), 750)
      timeoutsRef.current.push(tid)
    }

    setPackets((prev) => [{ id: pktId, turn: turnNum, clean: isClean }, ...prev].slice(0, 6))
  }, [])

  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  useEffect(() => {
    calibratingRef.current = calibrating
  }, [calibrating])

  useEffect(() => {
    calibratedRef.current = calibrated
  }, [calibrated])

  // Streaming interval
  useEffect(() => {
    if (!playing || calibrating) return

    const id = window.setInterval(() => {
      if (!playingRef.current || calibratingRef.current) return

      let isClean: boolean
      if (calibratedRef.current) {
        isClean = true
      } else if (turnIdxRef.current < SCRIPTED_TURNS.length) {
        isClean = SCRIPTED_TURNS[turnIdxRef.current]
        turnIdxRef.current += 1
      } else {
        isClean = Math.random() > 0.35
      }

      pushTurn(isClean)
    }, 1450)

    return () => window.clearInterval(id)
  }, [playing, calibrating, pushTurn])

  // Cleanup all timeouts on unmount
  useEffect(() => clearScheduledTimeouts, [clearScheduledTimeouts])

  const handleTogglePlay = () => {
    if (calibrating) return
    setPlaying((p) => !p)
  }

  const handleInjectMismatch = () => {
    if (calibrating) return
    if (calibrated) {
      setCalibrated(false)
      calibratedRef.current = false
      setShowCalConsole(false)
      setCalSteps([])
    }
    pushTurn(false)
  }

  const handleCalibrate = () => {
    if (calibrating || calibrated) return
    clearScheduledTimeouts()
    setCalibrating(true)
    calibratingRef.current = true
    setShowCalConsole(true)
    setCalSteps([])

    for (const item of CALIBRATION_STEPS) {
      const tid = window.setTimeout(() => {
        if (!calibratingRef.current) return
        setCalSteps((prev) => [...prev, item.step])
      }, item.delay)
      timeoutsRef.current.push(tid)
    }

    const doneId = window.setTimeout(() => {
      if (!calibratingRef.current) return
      setCalibrating(false)
      calibratingRef.current = false
      setCalibrated(true)
      calibratedRef.current = true
      setOver(0)
      pushTurn(true)
    }, 2350)
    timeoutsRef.current.push(doneId)
  }

  const handleReplay = () => {
    clearScheduledTimeouts()
    turnIdxRef.current = 0
    nRef.current = INITIAL_N
    nextIdRef.current = 21
    calibratingRef.current = false
    calibratedRef.current = false
    playingRef.current = true

    setN(INITIAL_N)
    setOver(INITIAL_OVER)
    setPlaying(true)
    setCalibrating(false)
    setCalibrated(false)
    setShowCalConsole(false)
    setCalSteps([])
    setOverFlash(false)
    setPackets(initialPackets())
  }

  const rate = n === 0 ? 0 : (over / n) * 100
  const rateStr = `${rate.toFixed(1)}%`
  const breached = !calibrated && rate >= THRESHOLD
  const barPct = Math.min((rate / 30) * 100, 100)

  const phase: 'calibrating' | 'calibrated' | 'breached' | 'nominal' = calibrating
    ? 'calibrating'
    : calibrated
      ? 'calibrated'
      : breached
        ? 'breached'
        : 'nominal'

  const statusLabel =
    phase === 'calibrating'
      ? 'CALIBRATING...'
      : phase === 'calibrated'
        ? 'CALIBRATED'
        : phase === 'breached'
          ? 'THRESHOLD EXCEEDED'
          : 'LIVE WIRE'

  const streamLabel =
    phase === 'calibrating'
      ? 'paused for probe'
      : !playing
        ? 'paused'
        : phase === 'calibrated'
          ? 'nominal stream'
          : phase === 'breached'
            ? 'drift detected'
            : 'listening...'

  const footerLabel =
    phase === 'calibrating'
      ? 'turing probe active'
      : phase === 'calibrated'
        ? 'adapter verified'
        : phase === 'breached'
          ? 'calibration suggested'
          : 'observing wire'

  const rateTag =
    phase === 'calibrated'
      ? 'nominal'
      : phase === 'breached'
        ? 'above 15%'
        : 'within limit'

  return (
    <div
      className={`nw-widget nw-widget--${phase}`}
      role="region"
      aria-label=".dotChat Negotiation Wire interactive diagnostic"
    >
      {/* 1. Header Bar */}
      <div className="nw-header">
        <div className="nw-title-wrap">
          <span className={`nw-dot nw-dot--${phase}`} aria-hidden="true" />
          <div className="nw-title">
            <span className="nw-muted">~/.dotChat</span>
            <span className="nw-muted nw-sep">&gt;</span>
            <span>Negotiation Wire</span>
          </div>
        </div>

        <div className="nw-header-right">
          <span className={`nw-pill nw-pill--${phase}`}>{statusLabel}</span>
          <div className="nw-controls">
            <button
              type="button"
              className="nw-btn"
              onClick={handleTogglePlay}
              disabled={calibrating}
              title="Play or pause incoming wire stream"
            >
              {playing ? 'Pause' : 'Play'}
            </button>
            <button
              type="button"
              className="nw-btn nw-btn--wire"
              onClick={handleInjectMismatch}
              disabled={calibrating}
              title="Inject a reasoning mismatch turn"
            >
              + Mismatch
            </button>
            <button
              type="button"
              className="nw-btn"
              onClick={handleReplay}
              title="Reset and replay demo"
            >
              Replay
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Metrics Strip */}
      <div className="nw-metrics">
        {/* Metric 1: Disagreement Rate */}
        <div className="nw-metric-card">
          <div className="nw-metric-top">
            <span className="nw-metric-label">disagreement rate</span>
            <span className="nw-metric-hint">threshold 15%</span>
          </div>
          <div className="nw-metric-val-row">
            <span className={`nw-metric-val nw-tone-${phase}`}>{rateStr}</span>
            <span className={`nw-metric-tag nw-tag-${phase}`}>{rateTag}</span>
          </div>
          <div className="nw-bar-wrap">
            <div className="nw-bar-track">
              <div
                className={`nw-bar-fill nw-bar-${phase}`}
                style={{ width: `${barPct}%` }}
              />
            </div>
            <div className="nw-bar-tick" title="15% threshold" />
            <div className="nw-bar-scale">
              <span>0%</span>
              <span className="nw-bar-scale-mid">15%</span>
              <span>30%</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Witness Over-Promised */}
        <div className="nw-metric-card">
          <span className="nw-metric-label">witness over-promised</span>
          <div className="nw-metric-val-row">
            <span
              className={`nw-metric-val ${
                phase === 'breached'
                  ? 'nw-tone-breached'
                  : phase === 'calibrated'
                    ? 'nw-tone-calibrated'
                    : ''
              }`}
            >
              {over}
            </span>
            {overFlash ? <span className="nw-over-delta">+1</span> : null}
          </div>
          <p className="nw-metric-sub">said yes, wire said no</p>
        </div>

        {/* Metric 3: Measured Turns */}
        <div className="nw-metric-card">
          <span className="nw-metric-label">measured turns</span>
          <div className="nw-metric-val-row">
            <span className="nw-metric-val">{n}</span>
            <span className="nw-metric-hint">n</span>
          </div>
          <p className="nw-metric-sub">live wire observations</p>
        </div>
      </div>

      {/* 3. Split Body */}
      <div className="nw-body">
        {/* Left: Incoming Wire Stream */}
        <div className="nw-col nw-col--stream">
          <div className="nw-col-head">
            <span className="nw-col-title">// INCOMING WIRE STREAM</span>
            <span className="nw-col-status">{streamLabel}</span>
          </div>

          <div className="nw-feed">
            {packets.map((pkt) => (
              <div
                key={pkt.id}
                className={`nw-packet ${pkt.clean ? 'nw-packet--clean' : 'nw-packet--drift'}`}
              >
                <div className="nw-packet-top">
                  <div className="nw-packet-left">
                    <span
                      className={`nw-packet-icon ${
                        pkt.clean ? 'nw-packet-icon--clean' : 'nw-packet-icon--drift'
                      }`}
                    >
                      {pkt.clean ? '✓' : '✕'}
                    </span>
                    <span className="nw-muted">turn #{pkt.turn}</span>
                  </div>
                  {pkt.clean ? (
                    <span className="nw-packet-tag nw-packet-tag--clean">intact</span>
                  ) : (
                    <span className="nw-packet-tag nw-packet-tag--drift">
                      over-promised +1
                    </span>
                  )}
                </div>
                <div className="nw-packet-lines">
                  <div>
                    <span className="nw-muted">reasoning:</span>{' '}
                    <span className="nw-bright">expected</span>
                  </div>
                  <div>
                    <span className="nw-muted">wire:</span>{' '}
                    {pkt.clean ? (
                      <>
                        <span className="tone-media">delivered</span>{' '}
                        <span className="nw-muted">(thinking block intact)</span>
                      </>
                    ) : (
                      <>
                        <span className="tone-wire">missing</span>{' '}
                        <span className="nw-muted">(stripped / unparsed)</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: By Canon Key + Calibration Console */}
        <div className="nw-col nw-col--canon">
          <div>
            <div className="nw-col-head">
              <span className="nw-col-title">// BY CANON KEY</span>
              <span className="nw-col-status">gateway / model / upstream</span>
            </div>

            <div className={`nw-canon-card nw-canon-card--${phase}`}>
              <div className="nw-canon-key">
                <span className="nw-muted">openrouter / </span>
                <span className="nw-bright">anthropic/claude-opus-4.6</span>
                <span className="nw-muted"> / Amazon Bedrock</span>
              </div>

              <div className="nw-canon-foot">
                <div className="nw-canon-stats">
                  <div>
                    <div className="nw-canon-lbl">n</div>
                    <div className="nw-canon-num">{n}</div>
                  </div>
                  <div>
                    <div className="nw-canon-lbl">over</div>
                    <div
                      className={`nw-canon-num ${
                        phase === 'breached'
                          ? 'tone-wire'
                          : phase === 'calibrated'
                            ? 'tone-media'
                            : ''
                      }`}
                    >
                      {over}
                    </div>
                  </div>
                  <div>
                    <div className="nw-canon-lbl">rate</div>
                    <div className={`nw-canon-num nw-tone-${phase}`}>{rateStr}</div>
                  </div>
                </div>

                <button
                  type="button"
                  className={`nw-cal-btn nw-cal-btn--${phase}`}
                  onClick={handleCalibrate}
                  disabled={calibrating || calibrated}
                >
                  {calibrating
                    ? 'probing...'
                    : calibrated
                      ? 'calibrated ✓'
                      : 'calibrate'}
                </button>
              </div>
            </div>

            {breached && !calibrating ? (
              <div className="nw-breach-alert">
                <span className="nw-breach-bang">!</span>
                <div className="nw-breach-copy">
                  <span className="nw-breach-lead">Disagreement &gt; 15%</span>
                  <span>
                    {' '}
                    — Turing calibration recommended to probe dialect envelope and
                    repair reasoning extraction.
                  </span>
                </div>
              </div>
            ) : null}

            {showCalConsole ? (
              <div
                className={`nw-console ${
                  calibrated ? 'nw-console--done' : 'nw-console--running'
                }`}
              >
                <div className="nw-console-head">
                  <span>TURING CALIBRATION</span>
                  <span className={calibrated ? 'tone-media' : 'tone-truth'}>
                    {calibrated ? 'COMPLETE' : 'RUNNING'}
                  </span>
                </div>
                <div className="nw-console-steps">
                  {calSteps.map((step, i) => (
                    <div key={i} className={`nw-console-line tone-${step.tone}`}>
                      {step.text}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="nw-foot">
            <span>surface layer · read-only witness</span>
            <span className={`nw-tone-${phase}`}>{footerLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
