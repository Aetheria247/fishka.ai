import type { SectionId } from '../lib/router'

export type SemanticTone =
  | 'media'
  | 'note'
  | 'wire'
  | 'vault'
  | 'header'
  | 'error'
  | 'meta'
  | 'neutral'

export type CapabilityStatus = 'WORKING' | 'EXPERIMENTAL' | 'PLANNED'

export interface MetaRow {
  key: string
  value: string
  tone: SemanticTone
}

export interface ThinkingDossier {
  kind: 'thinking'
  route: string
  section: 'thinking'
  slug: string
  breadcrumb: string
  eyebrow: string
  title: string
  subtitle: string
  metaRows: MetaRow[]
  originStory: string[]
  qualities: { letter: string; name: string; desc: string }[]
  comparison: {
    poor: { label: string; items: string[] }
    good: { label: string; items: string[] }
  }
  engineeringBridge: { system: string; route: string; constraint: string }[]
  related: string[]
}

export interface ColorContractDossier {
  kind: 'color-contract'
  route: '/thinking/color-contract'
  section: 'thinking'
  slug: 'color-contract'
  breadcrumb: string
  eyebrow: string
  title: string
  subtitle: string
  metaRows: MetaRow[]
  coreLaw: string
  corollaries: string[]
  related: string[]
}

export interface DoingDossier {
  kind: 'doing'
  route: string
  section: 'doing'
  slug: string
  breadcrumb: string
  eyebrow: string
  tag: string
  tagTone: SemanticTone
  status: string
  statusTone: SemanticTone
  title: string
  subtitle: string
  metaRows: MetaRow[]
  hypothesis: string
  method: string[]
  observations: string[]
  resultsAndQuestions: { status: 'RESULT' | 'OPEN QUESTION'; tone: SemanticTone; text: string }[]
  related: string[]
}

export interface BuildingDossier {
  kind: 'building'
  route: string
  section: 'building'
  slug: string
  breadcrumb: string
  eyebrow: string
  pillarTag: string
  pillarTone: SemanticTone
  title: string
  pillar: string
  capabilities: { name: string; status: CapabilityStatus }[]
  diagramTitle: string
  diagramAscii: string
  decisions: { title: string; body: string }[]
  demoLabel: string
  related: string[]
}

export type Dossier =
  | ThinkingDossier
  | ColorContractDossier
  | DoingDossier
  | BuildingDossier

export interface RouteSummary {
  route: string
  section: SectionId
  tag: string
  title: string
  desc: string
}

export const DOSSIERS: Record<string, Dossier> = {
  '/thinking/care-benchmark': {
    kind: 'thinking',
    route: '/thinking/care-benchmark',
    section: 'thinking',
    slug: 'care-benchmark',
    breadcrumb: 'fishka.ai / thinking / care-benchmark',
    eyebrow: '01 // THINKING · EVALUATION FRAMEWORK',
    title: 'The CARE Benchmark',
    subtitle:
      'Bridging twenty years of human customer-service pattern recognition into a concrete engineering standard for personal AI.',
    metaRows: [
      { key: 'domain', value: '[ HUMAN-AI INTERACTION & TRUST ]', tone: 'header' },
      { key: 'origin', value: '[ 20 YRS CUSTOMER SERVICE ]', tone: 'neutral' },
      { key: 'application', value: '[ NERAPHIS · DOTCHAT · GUILD ]', tone: 'media' },
    ],
    originStory: [
      'Spend twenty years working in customer service and you develop a quiet allergy to well-intentioned bureaucracy. You watch organizations draft scripts, escalation trees, and policy guardrails designed to "serve customers"—and then watch those exact procedures stall, patronize, or outright block the person trying to solve a real problem.',
      'When I started using modern AI systems daily, the sensation was immediately familiar. Over-eager refusals framed in corporate politeness, silent context drops, hidden routing swaps, and answers optimized to sound compliant rather than be truthful. The CARE Benchmark is my attempt to name those failure modes clearly and turn lived human-service intuition into measurable engineering requirements.',
    ],
    qualities: [
      {
        letter: 'C',
        name: 'Clarity & Candor',
        desc: 'States what it knows, what it does not know, and what the surrounding system just did—without theatrical hedging or false confidence.',
      },
      {
        letter: 'A',
        name: 'Agency & Autonomy',
        desc: 'Treats the user as a capable adult. Preserves choice, exposes real controls, and avoids steering people into pre-approved conversational chutes.',
      },
      {
        letter: 'R',
        name: 'Reliability & Recall',
        desc: 'Honors continuity. Remembers stated constraints accurately, cites provenance when asked, and never quietly invents history.',
      },
      {
        letter: 'E',
        name: 'Empathy Without Script',
        desc: 'Responds to the actual situation in front of it rather than reciting canned policy apologies that waste time and erode trust.',
      },
    ],
    comparison: {
      poor: {
        label: 'POOR CARE // ORGANIZATIONAL REFLEX',
        items: [
          'Hides system prompt overrides and model downgrades behind a uniform chat bubble.',
          'Replies to a nuanced technical edge case with a boilerplate safety lecture instead of clarifying intent.',
          'Silently truncates earlier constraints when the context window fills, then acts surprised when corrected.',
          'Optimizes for sounding polite and harmless even when the answer is factually unusable.',
        ],
      },
      good: {
        label: 'GOOD CARE // INDIVIDUAL-FIRST ENGINEERING',
        items: [
          'Surfaces exact active model, inherited config, and token budget right beside the conversation.',
          'Distinguishes genuine harm from benign complexity; asks one crisp clarifying question when uncertain.',
          'Makes memory assertions inspectable, editable, and explicitly scoped to the user’s workspace.',
          'Prioritizes honest capability boundaries and verifiable next steps over performative warmth.',
        ],
      },
    },
    engineeringBridge: [
      {
        system: 'Neraphis',
        route: '/building/neraphis',
        constraint:
          'CARE’s demand for honest recall forced memory to carry explicit assertion identity and provenance—so a user can inspect why the system believes a fact and revise it directly.',
      },
      {
        system: '.dotChat',
        route: '/building/dotchat',
        constraint:
          'CARE’s insistence on candor drove the Runtime Truth panel and Wire Diagnostics: never hide which endpoint, key, or inherited .dirrc rule actually governed a turn.',
      },
      {
        system: 'The Guild',
        route: '/building/guild',
        constraint:
          'CARE’s focus on agency shaped delegated authority—agents cannot take irreversible actions without explicit permission scopes and deterministic verification gates.',
      },
    ],
    related: ['/thinking/color-contract', '/doing/wirewench', '/building/dotchat'],
  },

  '/thinking/color-contract': {
    kind: 'color-contract',
    route: '/thinking/color-contract',
    section: 'thinking',
    slug: 'color-contract',
    breadcrumb: 'fishka.ai / thinking / color-contract',
    eyebrow: '01 // THINKING · VISUAL GRAMMAR',
    title: 'The Color Contract',
    subtitle:
      'Every hue across BubbleForge, .dotChat, and this site carries one declared job inside a walled namespace. Color is spent, not sprayed.',
    metaRows: [
      { key: 'lineage', value: '[ BUBBLEFORGE → DOTCHAT → FISHKA.AI ]', tone: 'header' },
      { key: 'chrome_rule', value: '[ PINK = ACTIVE / TOUCHED ONLY ]', tone: 'neutral' },
      { key: 'status', value: '[ RATIFIED SPEC ]', tone: 'media' },
    ],
    coreLaw:
      'A hue may mean exactly one thing within a namespace. Namespaces are separated by visible walls. The only sin is letting a hue mean two things inside one namespace with no wall.',
    corollaries: [
      'Color meaning is namespace-local, not global. Seafoam can mean "working" in a status readout and "expression" inside a walled #0D0C0F code block because the border and dark floor tell the eye which dictionary to load.',
      'Body prose stays neutral (#E6E4EA). Every light shade in the original BubbleForge palette was hue-tinted; adding Neutral and BF-Silver gave long technical writing a calm floor so accents actually signal something.',
      'Pink (#FF81C8) belongs strictly to chrome state and fixed brand identity. Links wear Glow Blue (#80C8FF), headers ride the Lavender → Lilac → Petal value ramp, wire/routing wears Warnings Orange (#F9AB79), vault/security wears Dream Blue (#CDE8FF), and errors wear Coral (#F8675C).',
    ],
    related: ['/building/dotchat', '/thinking/care-benchmark', '/doing/wirewench'],
  },

  '/doing/turing': {
    kind: 'doing',
    route: '/doing/turing',
    section: 'doing',
    slug: 'turing',
    breadcrumb: 'fishka.ai / doing / turing',
    eyebrow: '02 // DOING · LAB INVESTIGATION',
    tag: 'INTEROPERABILITY',
    tagTone: 'header',
    status: '[ ACTIVE LAB ]',
    statusTone: 'media',
    title: 'Turing',
    subtitle:
      'Normalizing structural inconsistencies across AI clients, providers, endpoints, and models without reducing everything to the lowest common denominator.',
    metaRows: [
      { key: 'lab_track', value: '[ INTEROPERABILITY ]', tone: 'header' },
      { key: 'status', value: '[ ACTIVE LAB ]', tone: 'media' },
      { key: 'feeds_into', value: '[ DOTCHAT · THE GUILD ]', tone: 'neutral' },
    ],
    hypothesis:
      'If an individual wants true model sovereignty—switching seamlessly between local inference and multiple remote providers—the adapter layer must separate universal conversation semantics from provider-specific quirks rather than pretending every endpoint is "OpenAI-compatible."',
    method: [
      'Cataloged wire-level request/response payloads across local runners (llama.cpp, Ollama) and hosted APIs (Anthropic, OpenAI, Google, OpenRouter).',
      'Built a minimal canonical envelope for messages, tool calls, reasoning traces, and usage telemetry, then tested round-trip fidelity when switching providers mid-thread.',
      'Documented every silent mismatch: system-role placement, streaming delta chunking, finish_reason taxonomy, and tool-call ID constraints.',
    ],
    observations: [
      '"OpenAI-compatible" endpoints routinely diverge on subtle fields—especially tool-call streaming deltas, strict JSON schema enforcement, and empty content blocks.',
      'Reasoning/thinking tokens are exposed in at least four incompatible shapes across providers, making naive UI rendering brittle.',
      'Flattening everything into plain text loses critical metadata needed for cost accounting, context planning, and deterministic replay.',
    ],
    resultsAndQuestions: [
      {
        status: 'RESULT',
        tone: 'media',
        text: 'A layered capability matrix (core envelope + typed provider extensions) preserves fidelity without leaking provider boilerplate into UI components.',
      },
      {
        status: 'OPEN QUESTION',
        tone: 'note',
        text: 'How should multi-turn reasoning traces be represented when a user switches from a reasoning model to a non-reasoning model mid-conversation?',
      },
      {
        status: 'OPEN QUESTION',
        tone: 'note',
        text: 'What is the cleanest way to surface unsupported parameter warnings (e.g., temperature ignored) without cluttering normal chat flow?',
      },
    ],
    related: ['/doing/wirewench', '/building/dotchat', '/thinking/care-benchmark'],
  },

  '/doing/document-processing': {
    kind: 'doing',
    route: '/doing/document-processing',
    section: 'doing',
    slug: 'document-processing',
    breadcrumb: 'fishka.ai / doing / document-processing',
    eyebrow: '02 // DOING · LAB INVESTIGATION',
    tag: 'STRUCTURED DATA',
    tagTone: 'media',
    status: '[ ACTIVE LAB ]',
    statusTone: 'media',
    title: 'Document Processing',
    subtitle:
      'Transforming complex, heterogeneous human information into compact, inspectable structures—like YAML slices—that both software and models can reliably use.',
    metaRows: [
      { key: 'lab_track', value: '[ STRUCTURED DATA ]', tone: 'media' },
      { key: 'status', value: '[ ACTIVE LAB ]', tone: 'media' },
      { key: 'feeds_into', value: '[ NERAPHIS · DOTCHAT ]', tone: 'neutral' },
    ],
    hypothesis:
      'Naive fixed-size text chunking destroys the hierarchy and intent of real-world documents. Transforming heterogeneous inputs into explicit, human-readable YAML slices preserves structural provenance and dramatically improves both deterministic parsing and LLM reasoning.',
    method: [
      'Tested ingestion pipelines against real personal archives: mixed Markdown notes, multi-column PDFs, chat exports, configuration files, and messy email threads.',
      'Designed canonical YAML slice schemas that retain parent-section anchors, timestamps, source hashes, and explicit entity/claim boundaries.',
      'Compared retrieval precision and model hallucination rates between raw vector chunks and structured YAML slices inside Neraphis and dotChat context plans.',
    ],
    observations: [
      'YAML hits a rare sweet spot: compact enough to respect token budgets, strict enough for deterministic validators, and readable enough for a human to audit in a text editor.',
      'Preserving "where this came from" (file path, heading stack, date) prevents models from conflating superseded drafts with current decisions.',
      'Heterogeneous PDFs still require a multi-stage fallback—layout-aware extraction first, flagging low-confidence tables rather than silently mangling numbers.',
    ],
    resultsAndQuestions: [
      {
        status: 'RESULT',
        tone: 'media',
        text: 'YAML slice contracts are now shared across dotChat context attachments and Neraphis memory ingestion.',
      },
      {
        status: 'OPEN QUESTION',
        tone: 'note',
        text: 'Where is the optimal boundary between deterministic regex/AST structural parsing and lightweight local-model semantic normalization?',
      },
      {
        status: 'OPEN QUESTION',
        tone: 'note',
        text: 'How should conflicting assertions extracted from two different document versions be surfaced for human reconciliation?',
      },
    ],
    related: ['/building/neraphis', '/building/dotchat', '/doing/turing'],
  },

  '/doing/wirewench': {
    kind: 'doing',
    route: '/doing/wirewench',
    section: 'doing',
    slug: 'wirewench',
    breadcrumb: 'fishka.ai / doing / wirewench',
    eyebrow: '02 // DOING · LAB INVESTIGATION',
    tag: 'WIRE & ROUTING AUDIT',
    tagTone: 'wire',
    status: '[ ONGOING ]',
    statusTone: 'wire',
    title: 'WireWench',
    subtitle:
      'Empirical auditing of API behavior, routing discrepancies, model identity, and the gap between documented capabilities and observed runtime behavior.',
    metaRows: [
      { key: 'lab_track', value: '[ WIRE & ROUTING AUDIT ]', tone: 'wire' },
      { key: 'status', value: '[ ONGOING ]', tone: 'wire' },
      { key: 'feeds_into', value: '[ CARE · DOTCHAT ]', tone: 'neutral' },
    ],
    hypothesis:
      'Trustworthy AI cannot rely solely on trusting what a model says; a user must also be able to verify what the surrounding transport and routing layer actually executed on the wire.',
    method: [
      'Built lightweight diagnostic probes that capture exact outbound headers, request payloads, HTTP response metadata, latency profiles, and returned model-ID strings.',
      'Compared documented provider behavior (context limits, caching headers, tool-choice guarantees, model aliases) against repeatable live test suites.',
      'Logged silent alias redirects, quantization drift indicators, and discrepancies between reported token counts and actual billed/consumed windows.',
    ],
    observations: [
      'Returned model identifiers frequently differ from requested aliases—sometimes harmlessly (snapshot pins), sometimes silently routing to a fallback tier.',
      'Prompt-caching and rate-limit headers are inconsistently populated across intermediaries, making client-side verification essential for accurate cost and latency diagnostics.',
      'Exposing raw wire traces inside the user interface immediately demystifies "weird model behavior" that users would otherwise blame on their own prompting.',
    ],
    resultsAndQuestions: [
      {
        status: 'RESULT',
        tone: 'media',
        text: 'Directly inspired dotChat’s "Runtime Truth" and "Negotiation Wire" diagnostic panels.',
      },
      {
        status: 'OPEN QUESTION',
        tone: 'note',
        text: 'Can lightweight behavioral fingerprinting reliably detect unannounced quantization or upstream routing changes without burning excessive tokens?',
      },
      {
        status: 'OPEN QUESTION',
        tone: 'note',
        text: 'What minimal telemetry summary gives non-specialist users confidence without overwhelming them with raw HTTP dumps?',
      },
    ],
    related: ['/thinking/care-benchmark', '/doing/turing', '/building/dotchat'],
  },

  '/building/neraphis': {
    kind: 'building',
    route: '/building/neraphis',
    section: 'building',
    slug: 'neraphis',
    breadcrumb: 'fishka.ai / building / neraphis',
    eyebrow: '03 // BUILDING · CONTINUITY',
    pillarTag: 'CONTINUITY',
    pillarTone: 'header',
    title: 'Neraphis',
    pillar:
      'Continuity — Personal memory, assertion identity, provenance, revision, retrieval, and individual control over what an AI knows.',
    capabilities: [
      { name: 'assertion_identity_schema', status: 'WORKING' },
      { name: 'yaml_slice_ingestion_&_export', status: 'WORKING' },
      { name: 'sqlite_structured_index', status: 'WORKING' },
      { name: 'provenance_&_revision_history', status: 'EXPERIMENTAL' },
      { name: 'hybrid_semantic_retrieval', status: 'EXPERIMENTAL' },
      { name: 'conflict_resolution_ui', status: 'PLANNED' },
      { name: 'cross_client_encrypted_sync', status: 'PLANNED' },
    ],
    diagramTitle: 'NERAPHIS // MEMORY & PROVENANCE FLOW',
    diagramAscii: `  [ Sources: Chats, Notes, Docs ]
                 │
                 ▼
      ┌─────────────────────┐
      │   YAML Slice Parser │  ◄── deterministic extraction
      └──────────┬──────────┘
                 │
                 ▼
      ┌─────────────────────┐      ┌──────────────────────┐
      │   Assertion Store   │◄────►│  Provenance & Diffs  │
      │  (SQLite + IDs)     │      │  (who / when / why)  │
      └──────────┬──────────┘      └──────────────────────┘
                 │
                 ▼
      [ Scoped Context Plan ]  ──► dotChat / Local Agents`,
    decisions: [
      {
        title: 'Assertions over opaque vector soup',
        body: 'Instead of stuffing raw embeddings into an uninspectable database, Neraphis models memory as discrete assertions with stable IDs. If the system remembers something outdated, you can locate the exact record, inspect its source, and revise or supersede it.',
      },
      {
        title: 'Human-editable plain-text mirrors',
        body: 'SQLite handles fast structured queries and joins, while YAML slices ensure your personal memory archive remains legible, versionable, and independent of any single runtime.',
      },
      {
        title: 'Explicit forgetting as a first-class feature',
        body: 'Continuity is only healthy when the individual controls what persists. Assertions carry scope tags and lifecycle states so temporary project context does not bleed permanently into personal memory.',
      },
    ],
    demoLabel:
      '[ SCREENSHOT / DEMO FRAME — NERAPHIS ASSERTION INSPECTOR & REVISION TIMELINE ]',
    related: ['/doing/document-processing', '/building/dotchat', '/thinking/care-benchmark'],
  },

  '/building/dotchat': {
    kind: 'building',
    route: '/building/dotchat',
    section: 'building',
    slug: 'dotchat',
    breadcrumb: 'fishka.ai / building / dotchat',
    eyebrow: '03 // BUILDING · INTERACTION',
    pillarTag: 'INTERACTION',
    pillarTone: 'media',
    title: '.dotChat',
    pillar:
      'Interaction — A local-first workspace giving people direct visibility into and control over conversations, context, models, and runtime environment.',
    capabilities: [
      { name: 'hierarchical_workspace_tree', status: 'WORKING' },
      { name: 'dirrc_&_chatrc_config_inheritance', status: 'WORKING' },
      { name: 'local_byok_keyring_&_vault', status: 'WORKING' },
      { name: 'bubbleforge_base16_theming', status: 'WORKING' },
      { name: 'runtime_truth_&_negotiation_wire', status: 'EXPERIMENTAL' },
      { name: 'context_plan_token_budgeter', status: 'EXPERIMENTAL' },
      { name: 'tresk_multi_provider_router', status: 'PLANNED' },
    ],
    diagramTitle: 'DOTCHAT // INHERITANCE & RUNTIME TRUTH',
    diagramAscii: `  ~/.dotChat/
  ├── .dirrc              (global defaults, keyring ref, theme)
  └── workspace/
      └── research/
          ├── .dirrc      (overrides: local model + strict context)
          └── 000.chatrc  (chat-level overrides & pinned YAML slices)
                 │
                 ▼
     ┌───────────────────────┐      ┌────────────────────────┐
     │  Resolved Context Plan│─────►│  Runtime Truth Panel   │
     └───────────┬───────────┘      │  (exact wire payload)  │
                 ▼                  └────────────────────────┘
       [ Local / Remote LLM ]`,
    decisions: [
      {
        title: 'Filesystem mental model (.dirrc / .chatrc)',
        body: 'Flat lists of chat threads break down once you use AI across real projects. Treating folders as inherited configuration scopes lets you set models, system rules, and memory access once per directory and override cleanly per chat.',
      },
      {
        title: 'Inspectable Runtime Truth',
        body: 'Born directly out of WireWench and CARE: every workspace exposes what storage is mounted, whether the keyring is unlocked, which model actually answered, and what context plan was assembled.',
      },
      {
        title: 'Calm, high-contrast craft (BubbleForge)',
        body: 'Built in TypeScript and React with a Base16-driven charcoal palette and strict color namespaces designed for multi-hour technical reading without visual fatigue.',
      },
    ],
    demoLabel:
      '[ SCREENSHOT / DEMO FRAME — .DOTCHAT WORKSPACE & NEGOTIATION WIRE ]',
    related: ['/thinking/color-contract', '/doing/wirewench', '/building/neraphis'],
  },

  '/building/guild': {
    kind: 'building',
    route: '/building/guild',
    section: 'building',
    slug: 'guild',
    breadcrumb: 'fishka.ai / building / guild',
    eyebrow: '03 // BUILDING · AGENCY',
    pillarTag: 'AGENCY & GOVERNANCE',
    pillarTone: 'vault',
    title: 'The Guild',
    pillar:
      'Agency — Coordinated AI work built on specialized agents, explicit governance, deterministic verification gates, delegated authority, and accountable execution.',
    capabilities: [
      { name: 'agent_role_contracts_&_scopes', status: 'WORKING' },
      { name: 'structured_handoff_envelopes', status: 'WORKING' },
      { name: 'deterministic_verification_gates', status: 'EXPERIMENTAL' },
      { name: 'execution_audit_ledger', status: 'EXPERIMENTAL' },
      { name: 'human_approval_checkpoints', status: 'EXPERIMENTAL' },
      { name: 'multi_node_lan_task_dispatch', status: 'PLANNED' },
    ],
    diagramTitle: 'THE GUILD // GOVERNED EXECUTION PIPELINE',
    diagramAscii: `  [ Human Intent + Delegated Authority Scope ]
                       │
                       ▼
           ┌───────────────────────┐
           │  Coordinator / Router │
           └─────┬───────────┬─────┘
                 ▼           ▼
          [ Specialist ] [ Specialist ]
                 │           │
                 └─────┬─────┘
                       ▼
         ╔═══════════════════════════╗
         ║  DETERMINISTIC VERIFY GATE║ ◄── schema, tests, policy check
         ╚═════════════╤═════════════╝
            pass ──► [ Accountable Action + Audit Log ]
            fail ──► [ Escalate to Human ]`,
    decisions: [
      {
        title: 'Probabilistic workers, deterministic gates',
        body: 'Language models are strong at proposing plans and drafting artifacts, but unreliable as self-certifying judges. Every meaningful state change in The Guild must pass a deterministic verification gate before execution.',
      },
      {
        title: 'Narrow, explicit delegated authority',
        body: 'Agents do not inherit blanket permissions. Each role receives a scoped capability contract—what files it may read, which tools it may invoke, and which actions require an explicit human sign-off.',
      },
      {
        title: 'Accountable audit trails',
        body: 'Every handoff, verification result, and side effect is written to a legible execution ledger so you can reconstruct exactly what happened and why.',
      },
    ],
    demoLabel:
      '[ SCREENSHOT / DEMO FRAME — THE GUILD VERIFICATION GATE & AUDIT LEDGER ]',
    related: ['/thinking/care-benchmark', '/building/neraphis', '/doing/turing'],
  },
}

export const ROUTE_SUMMARIES: Record<string, RouteSummary> = {
  '/thinking/care-benchmark': {
    route: '/thinking/care-benchmark',
    section: 'thinking',
    tag: 'THINKING',
    title: 'The CARE Benchmark',
    desc: 'Human-centered evaluation framework bridging service experience to engineering.',
  },
  '/thinking/color-contract': {
    route: '/thinking/color-contract',
    section: 'thinking',
    tag: 'THINKING',
    title: 'The Color Contract',
    desc: 'One hue, one job per namespace — the BubbleForge and .dotChat visual grammar.',
  },
  '/doing/turing': {
    route: '/doing/turing',
    section: 'doing',
    tag: 'DOING // LAB',
    title: 'Turing',
    desc: 'Normalizing inconsistencies across clients, providers, endpoints, and models.',
  },
  '/doing/document-processing': {
    route: '/doing/document-processing',
    section: 'doing',
    tag: 'DOING // LAB',
    title: 'Document Processing',
    desc: 'Turning heterogeneous documents into reliable, inspectable YAML slices.',
  },
  '/doing/wirewench': {
    route: '/doing/wirewench',
    section: 'doing',
    tag: 'DOING // WIRE',
    title: 'WireWench',
    desc: 'Auditing documented API behavior against observed runtime truth.',
  },
  '/building/neraphis': {
    route: '/building/neraphis',
    section: 'building',
    tag: 'BUILDING',
    title: 'Neraphis — Continuity',
    desc: 'Personal memory, assertion identity, provenance, and revision control.',
  },
  '/building/dotchat': {
    route: '/building/dotchat',
    section: 'building',
    tag: 'BUILDING',
    title: '.dotChat — Interaction',
    desc: 'Local-first chat workspace with inherited configs and runtime visibility.',
  },
  '/building/guild': {
    route: '/building/guild',
    section: 'building',
    tag: 'BUILDING',
    title: 'The Guild — Agency',
    desc: 'Governed multi-agent coordination with deterministic verification gates.',
  },
}

export function statusToneFor(status: CapabilityStatus): SemanticTone {
  switch (status) {
    case 'WORKING':
      return 'media'
    case 'EXPERIMENTAL':
      return 'note'
    case 'PLANNED':
      return 'meta'
  }
}
