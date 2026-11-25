export type PaletteGroupId =
  | 'ground'
  | 'reading'
  | 'chrome'
  | 'headers'
  | 'traces'
  | 'syntax'
  | 'held'

export interface PaletteToken {
  id: string
  group: PaletteGroupId
  name: string
  hex: string
  rgb: string
  variable: string
  job: string
  constraint?: string
  alias?: string
}

export interface PaletteGroupMeta {
  id: PaletteGroupId
  label: string
  wall: string
}

export interface SyntaxSlot {
  slot: string
  role: string
  tokenId: string
  note?: string
}

function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '')
  const r = Number.parseInt(clean.slice(0, 2), 16)
  const g = Number.parseInt(clean.slice(2, 4), 16)
  const b = Number.parseInt(clean.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

function defineToken(
  input: Omit<PaletteToken, 'rgb' | 'hex'> & { hex: string },
): PaletteToken {
  const hex = input.hex.toUpperCase()
  return {
    ...input,
    hex,
    rgb: hexToRgb(hex),
  }
}

export const PALETTE_GROUPS: PaletteGroupMeta[] = [
  {
    id: 'ground',
    label: 'GROUND // ARCHITECTURE',
    wall: 'Surfaces, panels, borders, and walled viewports. Never semantic signals.',
  },
  {
    id: 'reading',
    label: 'READING // NEUTRAL INK',
    wall: 'Added beyond the master set so body prose stays calm and non-tinted.',
  },
  {
    id: 'chrome',
    label: 'CHROME // STATE & IDENTITY',
    wall: 'Pink means active, selected, or fixed brand furniture. Zero pink in prose.',
  },
  {
    id: 'headers',
    label: 'PROSE // HEADERS & INTERACTION',
    wall: 'Single-hue Lavender value ramp for hierarchy; Glow Blue strictly for links.',
  },
  {
    id: 'traces',
    label: 'TRACES // BOUNDED SEMANTIC AXIS',
    wall: 'One hue per domain or status signal. Never sprayed into free prose.',
  },
  {
    id: 'syntax',
    label: 'SYNTAX // WALLED CODE VIEWPORT',
    wall: 'Base16 syntax grammar lives inside recessed #0D0C0F boxes, separated from prose.',
  },
  {
    id: 'held',
    label: 'HELD // UNASSIGNED PIGMENTS',
    wall: 'Present in BubbleForge master set with no post. Parked to prevent color creep.',
  },
]

export const PALETTE_TOKENS: PaletteToken[] = [
  // Ground
  defineToken({
    id: 'black',
    group: 'ground',
    name: 'BF-Black',
    hex: '#0D0C0F',
    variable: '--canvas',
    job: 'Page floor and the recessed background of walled code/diagram viewports.',
    alias: 'base16 00',
  }),
  defineToken({
    id: 'charcoal',
    group: 'ground',
    name: 'BF-Charcoal',
    hex: '#141318',
    variable: '--inset',
    job: 'Dossier cards and inset panels.',
    constraint: 'True RGB is 20, 19, 24 (the legacy HTML sheet printed Gunmetal by typo).',
  }),
  defineToken({
    id: 'graphite',
    group: 'ground',
    name: 'BF-Graphite',
    hex: '#1A181E',
    variable: '--panel',
    job: 'Primary surfaces and hover elevation.',
    alias: 'base16 01',
  }),
  defineToken({
    id: 'ash',
    group: 'ground',
    name: 'BF-Ash',
    hex: '#25232A',
    variable: '--elevated',
    job: 'Raised controls and inline-code capsules.',
  }),
  defineToken({
    id: 'gunmetal',
    group: 'ground',
    name: 'BF-Gunmetal',
    hex: '#2E2C33',
    variable: '--line-soft',
    job: 'Soft card borders and dotted-leader traces.',
    alias: 'dotChat --line-soft',
  }),
  defineToken({
    id: 'fog',
    group: 'ground',
    name: 'BF-Fog',
    hex: '#3A3842',
    variable: '--line',
    job: 'Active structural borders and selection fill inside code walls.',
    alias: 'dotChat --line · base16 02',
  }),

  // Reading
  defineToken({
    id: 'neutral',
    group: 'reading',
    name: 'Neutral',
    hex: '#E6E4EA',
    variable: '--neutral',
    job: 'Primary body text across all reading surfaces.',
    constraint: 'Added because every light shade in BubbleForge was hue-tinted.',
    alias: 'dotChat --neutral · --md-fg',
  }),
  defineToken({
    id: 'silver',
    group: 'reading',
    name: 'BF-Silver',
    hex: '#B8B6C2',
    variable: '--secondary',
    job: 'Secondary readable copy, summaries, and table headers.',
    alias: 'dotChat --silver',
  }),
  defineToken({
    id: 'feather',
    group: 'reading',
    name: 'BF-Feather',
    hex: '#807E8A',
    variable: '--meta',
    job: 'Metadata, timestamps, inactive nav links, and [PLANNED] status.',
    alias: 'dotChat --bright',
  }),
  defineToken({
    id: 'smoke',
    group: 'reading',
    name: 'BF-Smoke',
    hex: '#6A6875',
    variable: '--muted',
    job: 'Dim secondary labels and ghosted markdown syntax punctuation.',
    constraint: 'Too dim for body sentences.',
    alias: 'dotChat --muted',
  }),
  defineToken({
    id: 'mist',
    group: 'reading',
    name: 'BF-Mist',
    hex: '#514F5C',
    variable: '--faint',
    job: 'Low-contrast horizontal rules and structural dividers.',
    constraint: 'Distinct from Aetheria Mist (#FFB3DF), which is a chrome pink.',
    alias: 'dotChat --faint',
  }),

  // Chrome
  defineToken({
    id: 'pink',
    group: 'chrome',
    name: 'Aetheria Pink (Core)',
    hex: '#FF81C8',
    variable: '--chrome',
    job: 'Active navigation, selected/overridden state, and fixed brand identity.',
    constraint: 'Zero pink in body prose so chrome state and content never collide.',
    alias: 'dotChat --pink',
  }),
  defineToken({
    id: 'aetheria-mist',
    group: 'chrome',
    name: 'Aetheria Mist',
    hex: '#FFB3DF',
    variable: '--chrome-dim',
    job: 'Demoted decorative pink and Chat nodes in workspace trees.',
    alias: 'dotChat --mist',
  }),
  defineToken({
    id: 'bloom',
    group: 'chrome',
    name: 'Aetheria Bloom',
    hex: '#FF4FA3',
    variable: '--bloom',
    job: 'Destructive actions and danger state.',
    constraint: 'Runtime errors wear Coral (#F8675C) so failures and destructive chrome stay distinct.',
    alias: 'dotChat --bloom · base16 08',
  }),

  // Headers & Interaction
  defineToken({
    id: 'lavender',
    group: 'headers',
    name: 'Aetheria Lavender',
    hex: '#E5A3FF',
    variable: '--header-1',
    job: 'Primary section headers (H1/eyebrows) and thought traces behind a wall.',
    alias: 'H1 · --trace-thought',
  }),
  defineToken({
    id: 'lilac',
    group: 'headers',
    name: 'Aetheria Lilac',
    hex: '#E7BBFF',
    variable: '--header-2',
    job: 'Second-rank headers (H2), Dir nodes, and Settings suite signature.',
    alias: 'H2 · dotChat --lilac',
  }),
  defineToken({
    id: 'petal',
    group: 'headers',
    name: 'Aetheria Petal',
    hex: '#F1D3FF',
    variable: '--header-3',
    job: 'Third-rank headers (H3+) and Base16 keywords.',
    alias: 'H3+ · base16 0E',
  }),
  defineToken({
    id: 'glow-blue',
    group: 'headers',
    name: 'Glow Blue',
    hex: '#80C8FF',
    variable: '--link',
    job: 'Links, interactive affordances, tool traces, and focus outlines.',
    constraint: 'Never used for body prose — one blue means clickable across the site.',
    alias: 'dotChat --md-link · --trace-tool',
  }),
  defineToken({
    id: 'starlight',
    group: 'headers',
    name: 'Starlight Blue',
    hex: '#A8D8FF',
    variable: '--truth',
    job: 'Link hover tint and Runtime Truth indicators.',
    alias: 'dotChat --ink-dim',
  }),
  defineToken({
    id: 'drift',
    group: 'headers',
    name: 'Seafoam Drift',
    hex: '#C1FFF0',
    variable: '--code',
    job: 'Inline code text inside elevated capsules and SubDir tree nodes.',
    constraint: 'Distinct from Seafoam Core (#A8FFE8), which owns media and [WORKING].',
    alias: 'base16 03',
  }),

  // Traces
  defineToken({
    id: 'seafoam',
    group: 'traces',
    name: 'Seafoam Core',
    hex: '#A8FFE8',
    variable: '--media',
    job: 'Media/visual surfaces, [WORKING] / [ACTIVE LAB] status, and Good CARE checks.',
    alias: 'dotChat --trace-media · --ok',
  }),
  defineToken({
    id: 'pearl',
    group: 'traces',
    name: 'Seafoam Pearl',
    hex: '#DFFFF9',
    variable: '--prefs',
    job: 'Theme and preference surfaces.',
  }),
  defineToken({
    id: 'vault',
    group: 'traces',
    name: 'Dream Blue',
    hex: '#CDE8FF',
    variable: '--vault',
    job: 'Vault, secrets, sensitive boundaries, and Chthonis security ops.',
    constraint: 'Never spent on generic links or hover states.',
    alias: 'dotChat --vault',
  }),
  defineToken({
    id: 'wire',
    group: 'traces',
    name: 'Warnings (Orange)',
    hex: '#F9AB79',
    variable: '--wire',
    job: 'Wire diagnostics, external web traces, routing (WireWench / Tresk), and caution.',
    constraint: 'Sherbet (#FBC7A6) and Peach (#FDDCCD) are lighter tints of this same job.',
    alias: 'dotChat --trace-web · --warning',
  }),
  defineToken({
    id: 'classes',
    group: 'traces',
    name: 'Classes (Yellow)',
    hex: '#FCF5AC',
    variable: '--note',
    job: '[EXPERIMENTAL] status, [OPEN QUESTION] callouts, notes, and types.',
    alias: 'base16 0A · quieted #EDE4A6',
  }),
  defineToken({
    id: 'sunlight',
    group: 'traces',
    name: 'Sunlight',
    hex: '#FFFDDE',
    variable: '--sun',
    job: 'Filesystem and site-tree connector traces.',
  }),
  defineToken({
    id: 'coral',
    group: 'traces',
    name: 'Coral',
    hex: '#F8675C',
    variable: '--error',
    job: 'Error traces, diff deletions, and Poor CARE failure states.',
    constraint: 'Added outside BubbleForge so errors never collide with chrome pink.',
    alias: 'dotChat --trace-error · b08',
  }),

  // Syntax
  defineToken({
    id: 'string-rose',
    group: 'syntax',
    name: 'String Rose',
    hex: '#F0BAD6',
    variable: '--string',
    job: 'Syntax strings inside walled code blocks only.',
    constraint: 'Retired from page foreground when Neutral (#E6E4EA) arrived.',
    alias: 'base16 0B',
  }),

  // Held
  defineToken({
    id: 'held-glow',
    group: 'held',
    name: 'Aetheria Glow',
    hex: '#FFC6EB',
    variable: '--held-glow',
    job: 'Unassigned.',
    constraint: 'Parked between Mist and Veil so decorative pink does not multiply.',
  }),
  defineToken({
    id: 'held-veil',
    group: 'held',
    name: 'Aetheria Veil',
    hex: '#FFE6F6',
    variable: '--held-veil',
    job: 'Unassigned.',
    constraint: 'Lightest BubbleForge pink; held off-duty.',
  }),
  defineToken({
    id: 'held-butter',
    group: 'held',
    name: 'Butter',
    hex: '#FFF9C9',
    variable: '--held-butter',
    job: 'Unassigned.',
    constraint: 'Sits between Classes and Sunlight; both posts are already filled.',
  }),
]

export const PALETTE_BY_ID: Record<string, PaletteToken> = Object.fromEntries(
  PALETTE_TOKENS.map((t) => [t.id, t]),
)

export const SYNTAX_SLOTS: SyntaxSlot[] = [
  { slot: '00', role: 'Background', tokenId: 'black' },
  { slot: '01', role: 'Lighter BG', tokenId: 'graphite' },
  { slot: '02', role: 'Selection', tokenId: 'fog' },
  { slot: '03', role: 'Comments', tokenId: 'drift' },
  { slot: '04', role: 'Dark FG', tokenId: 'bloom', note: 'Inside code wall only' },
  { slot: '05', role: 'Default FG', tokenId: 'pink', note: 'Inside code wall only' },
  { slot: '06', role: 'Light FG', tokenId: 'lilac' },
  { slot: '07', role: 'Lightest FG', tokenId: 'starlight' },
  { slot: '08', role: 'Errors', tokenId: 'bloom', note: 'Outside wall, errors are Coral' },
  { slot: '09', role: 'Warnings', tokenId: 'wire' },
  { slot: '0A', role: 'Classes / Types', tokenId: 'classes' },
  { slot: '0B', role: 'Strings', tokenId: 'string-rose' },
  { slot: '0C', role: 'Expressions', tokenId: 'seafoam' },
  { slot: '0D', role: 'Functions', tokenId: 'glow-blue' },
  { slot: '0E', role: 'Keywords', tokenId: 'petal' },
  { slot: '0F', role: 'Special', tokenId: 'lavender' },
]
