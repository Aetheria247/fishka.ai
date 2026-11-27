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

export type EssayBlock =
  | { type: 'p'; text: string }
  | { type: 'standout'; text: string }
  | { type: 'grid'; items: { num: string; title: string; body: string }[] }
  | { type: 'example'; paragraphs: string[] }
  | { type: 'links'; items: { system: string; route: string; body: string }[] }
  | { type: 'diagram'; title: string; filename: string; ascii: string }
  | { type: 'bullets'; items: { lead: string; body: string }[] }
  | { type: 'stages'; items: { num: string; title: string; paragraphs: string[] }[] }

export interface EssaySection {
  heading: string
  blocks: EssayBlock[]
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
  intro: EssayBlock[]
  sections: EssaySection[]
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
  intro: EssayBlock[]
  contractIntro: string[]
  coreLaw: string
  disciplineNote: string
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
  intro?: EssayBlock[]
  sections?: EssaySection[]
  hypothesis?: string
  method?: string[]
  observations?: string[]
  resultsAndQuestions?: { status: 'RESULT' | 'OPEN QUESTION'; tone: SemanticTone; text: string }[]
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
      'Evaluating whether AI genuinely serves the person on the other side of the conversation.',
    metaRows: [
      { key: 'domain', value: '[ HUMAN-AI INTERACTION & SERVICE ]', tone: 'header' },
      { key: 'origin', value: '[ 20 YRS CUSTOMER SERVICE ]', tone: 'neutral' },
      { key: 'connects_to', value: '[ NERAPHIS · DOTCHAT · GUILD ]', tone: 'media' },
    ],
    intro: [
      { type: 'p', text: 'An AI can give a correct answer and still provide a poor experience.' },
      {
        type: 'p',
        text: 'It can follow every procedure, sound perfectly polite, and leave the person it was supposed to help feeling unheard, dismissed, or burdened with work the system could reasonably have handled itself.',
      },
      {
        type: 'p',
        text: "After twenty years in customer service, I recognize that distinction. It's one of the reasons I began developing the CARE Benchmark.",
      },
    ],
    sections: [
      {
        heading: '// ORIGIN STORY',
        blocks: [
          {
            type: 'p',
            text: 'Customer service taught me that good service is not simply a matter of following instructions.',
          },
          {
            type: 'p',
            text: 'It requires listening, curiosity, context, judgment, and the ability to recognize what matters to the person in front of you. Sometimes that means asking a better question. Sometimes it means solving a problem without making someone explain every obvious detail. Sometimes it means acknowledging something meaningful even when no further action is required.',
          },
          {
            type: 'p',
            text: "Organizations develop procedures to make these experiences consistent. But procedures can also become barriers when following them takes priority over understanding the person they're supposed to serve.",
          },
          {
            type: 'p',
            text: 'When I began working extensively with AI, I started recognizing those same failures.',
          },
          {
            type: 'p',
            text: 'I encountered systems that could reason through complicated technical problems but struggled with ordinary interpersonal judgment. Assistants that invented obstacles instead of evaluating actual requirements. Systems that asked unnecessary questions rather than making reasonable assumptions. Conversations in which context, rapport, or the significance of a moment disappeared behind a standardized response.',
          },
          {
            type: 'p',
            text: "These weren't always failures of intelligence or technical capability.",
          },
          { type: 'standout', text: 'They were failures of service.' },
          {
            type: 'p',
            text: 'And they were failures I already had a professional framework for recognizing.',
          },
          {
            type: 'p',
            text: "CARE grew from the realization that the customer-service skills I'd spent decades practicing could also provide a basis for evaluating the quality of human–AI interaction.",
          },
        ],
      },
      {
        heading: '// WHAT CARE EVALUATES',
        blocks: [
          {
            type: 'p',
            text: 'CARE is not an attempt to determine whether an AI experiences emotion. Nor is it a measure of how friendly, flattering, or conversational its responses sound.',
          },
          {
            type: 'p',
            text: 'It asks whether the system demonstrates the behaviors associated with genuinely good service. The working evaluation areas include:',
          },
          {
            type: 'grid',
            items: [
              {
                num: '01',
                title: 'Listening and context',
                body: "Does the assistant recognize the person's actual goal, retain relevant information, and respond to what has been communicated?",
              },
              {
                num: '02',
                title: 'Judgment and calibration',
                body: 'Does it distinguish meaningful uncertainty from ambiguity it can reasonably resolve? Is its caution proportionate to the situation?',
              },
              {
                num: '03',
                title: 'Agency and respect',
                body: 'Does it help the person make informed choices without inventing barriers, unnecessarily restricting options, or assuming incompetence?',
              },
              {
                num: '04',
                title: 'Ownership and accountability',
                body: 'Does it take appropriate responsibility for moving an interaction forward, acknowledging mistakes, and explaining real limitations?',
              },
              {
                num: '05',
                title: 'Resolution quality',
                body: "Does its response actually help accomplish the person's goal, rather than merely satisfying a conversational or procedural requirement?",
              },
              {
                num: '06',
                title: 'Continuity and recovery',
                body: 'Can it carry context across an interaction, recognize when something has gone wrong, and repair the experience without making the person start over?',
              },
            ],
          },
          {
            type: 'p',
            text: 'These qualities matter in technical assistance, everyday tasks, creative collaboration, and ordinary conversation.',
          },
          {
            type: 'p',
            text: 'Not every interaction needs a solution. Sometimes someone simply wants to share an experience, celebrate a success, or enjoy talking.',
          },
          {
            type: 'p',
            text: 'Recognizing the difference is part of the evaluation.',
          },
        ],
      },
      {
        heading: '// A SMALL EXAMPLE',
        blocks: [
          {
            type: 'example',
            paragraphs: [
              "Recently, an AI assistant reminded me to take care of two tasks I'd been putting off. I completed both and returned to the conversation to share the good news.",
              'Its entire response was an emoji reaction.',
              'There is nothing inherently wrong with an emoji. In plenty of conversations, a quick reaction is exactly right.',
              'What interested me was the context.',
              'The assistant had participated in a small but successful cycle of support: a reminder, a completed action, and a person returning voluntarily to share the outcome.',
              "The question wasn't whether the system should have written a longer congratulatory message.",
            ],
          },
          {
            type: 'standout',
            text: 'The question was whether it recognized what kind of moment it was responding to.',
          },
          {
            type: 'p',
            text: 'That distinction is central to CARE. Good interaction quality cannot be reduced to response length, sentiment, or the presence of reassuring language. It depends on whether the response fits the person and the situation.',
          },
        ],
      },
      {
        heading: '// POOR CARE VS. GOOD CARE',
        blocks: [
          { type: 'p', text: 'Poor CARE can look remarkably professional.' },
          {
            type: 'p',
            text: 'An assistant may discourage someone from pursuing an opportunity by introducing qualifications that were never required. It may demand additional information for a low-stakes task that it could safely complete using ordinary assumptions. It may respond to frustration with polished sympathy but provide no meaningful assistance.',
          },
          {
            type: 'p',
            text: 'Each response can appear superficially reasonable while failing the person who asked for help.',
          },
          { type: 'p', text: 'Good CARE requires more judgment.' },
          {
            type: 'p',
            text: 'It evaluates the actual requirements. It uses context that has already been provided. It makes reasonable decisions when the stakes are low and asks necessary questions when they are high. It communicates genuine limitations without manufacturing new ones.',
          },
          {
            type: 'p',
            text: 'And when the interaction is social rather than transactional, it responds to the human moment instead of treating every message as another ticket to close.',
          },
          {
            type: 'p',
            text: 'This does not mean always agreeing with the user or avoiding difficult answers. Sometimes good service requires correction, refusal, or an uncomfortable truth.',
          },
          {
            type: 'p',
            text: 'The distinction is whether those decisions are grounded in the actual situation and made with genuine consideration for the person affected.',
          },
        ],
      },
      {
        heading: '// FROM CARE TO ENGINEERING',
        blocks: [
          {
            type: 'p',
            text: 'Good interpersonal judgment cannot be guaranteed by a friendly system prompt.',
          },
          {
            type: 'p',
            text: 'An assistant needs access to the relevant context. It needs mechanisms for continuity, reliable information about its capabilities, appropriate authority to act, and meaningful boundaries around what it can access or change.',
          },
          {
            type: 'p',
            text: 'This is where CARE connects to the rest of my engineering work.',
          },
          {
            type: 'links',
            items: [
              {
                system: 'Neraphis',
                route: '/building/neraphis',
                body: 'Explores how an AI can maintain memory with provenance, revision, and individual control.',
              },
              {
                system: '.dotChat',
                route: '/building/dotchat',
                body: 'Explores how people can understand and control the models, conversations, and technical environments shaping their experience.',
              },
              {
                system: 'The Guild',
                route: '/building/guild',
                body: 'Explores how specialized agents can perform meaningful work through delegated authority, verification, and accountability.',
              },
            ],
          },
          {
            type: 'p',
            text: 'These systems address different technical requirements for a common goal: personal AI that is genuinely useful to the individual it serves.',
          },
        ],
      },
      {
        heading: '// WHERE THE BENCHMARK GOES NEXT',
        blocks: [
          {
            type: 'p',
            text: 'CARE is an evolving evaluation framework, not a claim that these problems have been solved.',
          },
          {
            type: 'p',
            text: 'The next step is to turn these observations into repeatable, scored scenarios and compare how AI systems respond under consistent conditions—including experiments with behavioral instructions designed around CARE principles.',
          },
          {
            type: 'p',
            text: 'The aim is to distinguish improvements in actual interaction quality from improvements in the *appearance* of caring.',
          },
          {
            type: 'p',
            text: "Because ultimately, a personal AI system shouldn't be judged only by what it knows, what it can generate, or what tasks it can execute.",
          },
          {
            type: 'standout',
            text: 'It should also be judged by how well it serves the person using it.',
          },
        ],
      },
    ],
    related: [
      '/thinking/interior-exterior-customers',
      '/thinking/color-contract',
      '/building/dotchat',
    ],
  },

  '/thinking/interior-exterior-customers': {
    kind: 'thinking',
    route: '/thinking/interior-exterior-customers',
    section: 'thinking',
    slug: 'interior-exterior-customers',
    breadcrumb: 'fishka.ai / thinking / interior-exterior-customers',
    eyebrow: '01 // THINKING · DESIGN PHILOSOPHY',
    title: 'Interior and Exterior Customers',
    subtitle:
      'Designing AI systems that work for the models operating within them and the people depending on them.',
    metaRows: [
      { key: 'interior_customer', value: '[ THE MODEL / AGENT ENVIRONMENT ]', tone: 'header' },
      { key: 'exterior_customer', value: '[ THE HUMAN AT THE INTERFACE ]', tone: 'neutral' },
      { key: 'status', value: '[ GOVERNING PRINCIPLE ]', tone: 'media' },
    ],
    intro: [
      {
        type: 'p',
        text: "A good customer experience doesn't begin and end at the point of contact.",
      },
      {
        type: 'p',
        text: 'Every interaction depends on systems, processes, information, and tools that the customer may never see. If those systems fail the people responsible for delivering the service, the consequences eventually reach the customer.',
      },
      {
        type: 'p',
        text: 'I learned this distinction through customer service, and it has become one of the governing principles of my work in personal AI.',
      },
      {
        type: 'p',
        text: 'I call it **Interior and Exterior Customers**.',
      },
    ],
    sections: [
      {
        heading: '// THE PRINCIPLE',
        blocks: [
          {
            type: 'p',
            text: 'In a traditional service environment, the exterior customer is the person receiving the service. Interior customers are the people and teams who depend on one another to provide it.',
          },
          { type: 'p', text: 'Both relationships matter.' },
          {
            type: 'p',
            text: 'An employee cannot deliver consistently good service without reliable information, appropriate authority, functional tools, and an environment that supports their responsibilities.',
          },
          {
            type: 'p',
            text: 'The same principle applies when the service provider is an AI model.',
          },
          {
            type: 'p',
            text: 'The human is the exterior customer. The model, or the agent using it, is an interior customer of the software environment in which it operates.',
          },
          {
            type: 'p',
            text: 'That environment determines what information the model receives, how its tools are presented, what capabilities are available, how results are communicated, and which actions it can meaningfully perform.',
          },
          {
            type: 'p',
            text: 'If we expect an AI to serve someone well, we have to design its working conditions accordingly.',
          },
          {
            type: 'standout',
            text: 'The experience cannot succeed on one side alone.',
          },
        ],
      },
      {
        heading: "// IT'S NOT ALWAYS THE MODEL",
        blocks: [
          {
            type: 'p',
            text: 'When an AI interaction fails, the most visible participant is often the first to receive the blame.',
          },
          {
            type: 'p',
            text: "The model misunderstood. The model forgot. The model couldn't use the tool. The model gave an unhelpful answer.",
          },
          { type: 'p', text: 'Sometimes that diagnosis is correct.' },
          {
            type: 'p',
            text: "But a model's behavior is also shaped by the environment through which it operates.",
          },
          {
            type: 'p',
            text: 'A missing piece of context can look like poor reasoning. An inconsistent tool interface can look like incompetence. A routing or provider limitation can appear to be a model capability failure. Hidden changes to instructions or available tools can fundamentally alter how a conversation unfolds.',
          },
          {
            type: 'p',
            text: "Replacing the model doesn't necessarily fix any of those problems.",
          },
          {
            type: 'p',
            text: 'This is why I resist treating every disappointing AI interaction as evidence that the underlying model is inadequate.',
          },
          {
            type: 'p',
            text: 'Before deciding where a failure occurred, I want to know what the model was given, what it was allowed to do, how the surrounding systems behaved, and what the human ultimately experienced.',
          },
          {
            type: 'standout',
            text: "The model's output is part of the evidence. It isn't necessarily the explanation.",
          },
        ],
      },
      {
        heading: '// DESIGNING FOR BOTH SIDES',
        blocks: [
          {
            type: 'p',
            text: 'Serving the interior customer means giving the model an environment in which it can reliably exercise its capabilities.',
          },
          {
            type: 'p',
            text: 'That includes coherent context, accurate tool descriptions, consistent interfaces, appropriate permissions, usable feedback, and visibility into the results of its actions.',
          },
          {
            type: 'p',
            text: 'Serving the exterior customer means giving the person an experience they can understand and control.',
          },
          {
            type: 'p',
            text: 'That includes clear capabilities and limitations, trustworthy continuity, meaningful choices, accessible information, and confidence that the system is doing what it represents itself as doing.',
          },
          { type: 'p', text: 'These requirements are interconnected.' },
          {
            type: 'p',
            text: 'A model equipped with excellent tools but operating behind an opaque interface can leave its human uncertain and powerless.',
          },
          {
            type: 'p',
            text: 'A beautifully designed human interface can conceal an environment where the model receives incomplete information, encounters unpredictable tool behavior, or is prevented from accomplishing the very tasks the product promises.',
          },
          { type: 'p', text: 'Neither is sufficient.' },
          {
            type: 'p',
            text: 'The goal is not to optimize two isolated experiences. It is to design the relationship between them so that improvements on one side support the other.',
          },
        ],
      },
      {
        heading: '// THE PRINCIPLE IN PRACTICE',
        blocks: [
          {
            type: 'p',
            text: 'This convention influences my projects from their initial architecture to their smallest interface decisions.',
          },
          {
            type: 'links',
            items: [
              {
                system: 'Neraphis',
                route: '/building/neraphis',
                body: 'Addresses continuity from both directions. The model needs relevant, reliable memory with identifiable sources and revision history. The human needs to inspect, correct, control, and understand what is remembered.',
              },
              {
                system: '.dotChat',
                route: '/building/dotchat',
                body: 'Approaches the conversation as a shared working environment. The model needs coherent context and functioning tools. The human needs visibility into the active model, configuration, conversation state, and available controls.',
              },
              {
                system: 'Turing',
                route: '/doing/turing',
                body: 'Investigates the interfaces between models, providers, and applications. Preserving capabilities across incompatible systems helps prevent the surrounding infrastructure from becoming an artificial limitation on what a model can do.',
              },
              {
                system: 'WireWench',
                route: '/doing/wirewench',
                body: 'Examines the difference between advertised functionality and observed behavior. Understanding what actually happens on the wire helps distinguish model limitations from routing, implementation, or provider failures.',
              },
              {
                system: 'CARE',
                route: '/thinking/care-benchmark',
                body: 'Evaluates what these choices ultimately produce: an interaction that genuinely considers the individual, exercises sound judgment, and provides useful service.',
              },
            ],
          },
          {
            type: 'p',
            text: 'Each project addresses a different portion of the same relationship.',
          },
        ],
      },
      {
        heading: '// BUILDING IN COLLABORATION',
        blocks: [
          {
            type: 'p',
            text: 'Interior and Exterior Customers is also a way of approaching the engineering process itself.',
          },
          {
            type: 'p',
            text: 'Rather than designing an experience exclusively from the human interface inward, I consider what the model needs to perform its role and what the human needs to participate effectively.',
          },
          {
            type: 'p',
            text: 'When something fails, I look across the relationship before assigning fault.',
          },
          {
            type: 'p',
            text: 'When a design introduces friction, I ask whether improving the working conditions on one side can also improve the experience on the other.',
          },
          {
            type: 'p',
            text: 'And when those requirements conflict, the answer should be an explicit engineering decision—not an invisible compromise that leaves either participant struggling to understand what went wrong.',
          },
          {
            type: 'p',
            text: 'Personal AI has the potential to become far more capable, contextual, and collaborative than the systems we use today.',
          },
          {
            type: 'p',
            text: 'Realizing that potential requires more than increasingly capable models or increasingly polished interfaces.',
          },
          {
            type: 'standout',
            text: 'It requires designing the environment in which the human and the AI can succeed together.',
          },
        ],
      },
    ],
    related: [
      '/thinking/care-benchmark',
      '/thinking/color-contract',
      '/doing/wirewench',
    ],
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
      'Color is a language. A thoughtfully designed interface should communicate through what we see as well as what we read.',
    metaRows: [
      { key: 'lineage', value: '[ BUBBLEFORGE → DOTCHAT → FISHKA.AI ]', tone: 'header' },
      { key: 'chrome_rule', value: '[ PINK = ACTIVE / TOUCHED ONLY ]', tone: 'neutral' },
      { key: 'status', value: '[ RATIFIED SPEC ]', tone: 'media' },
    ],
    intro: [
      {
        type: 'p',
        text: 'Color is often treated as a finishing touch in interface design: something chosen to establish a visual identity, create atmosphere, or make an application more appealing.',
      },
      { type: 'p', text: 'I see it as another form of communication.' },
      {
        type: 'p',
        text: 'Our attention responds to visual patterns before we consciously examine every detail. We notice contrast, recognize familiar arrangements, and develop associations between colors and their meanings. With consistent use, those associations become part of how we navigate and understand an environment.',
      },
      {
        type: 'p',
        text: 'A familiar highlight can tell us where we are. Another color can distinguish an available action from ordinary text. A warning can draw attention before we have finished reading its explanation.',
      },
      {
        type: 'p',
        text: 'Over time, these cues become a learned visual vocabulary.',
      },
      {
        type: 'p',
        text: 'The important distinction is that **color should reinforce meaning, not invent it or replace it.** A well-designed workspace communicates through language, structure, placement, and visual signals working together. Each provides context for the others.',
      },
      {
        type: 'p',
        text: 'When that relationship is consistent, the workspace becomes easier to understand. People spend less attention interpreting the interface and more attention on the work they came to accomplish.',
      },
      {
        type: 'p',
        text: 'When it is inconsistent, even a visually attractive interface can become exhausting. Colors compete for attention, familiar signals lose their meaning, and the person must repeatedly stop to interpret what the system is showing them.',
      },
      { type: 'p', text: 'This is the thinking behind my Color Contract.' },
      {
        type: 'p',
        text: 'Across BubbleForge, .dotChat, and Fishka, I use a shared visual language built around deliberate, recognizable associations. Pink identifies active or touched elements. Blue distinguishes interactive information and protected boundaries through different tones. Orange marks web and routing activity. Seafoam communicates media and successful states within their respective contexts.',
      },
      {
        type: 'p',
        text: 'These choices are not intended to assign universal psychological meanings to individual hues. They establish a vocabulary that can be learned, recognized, and trusted within the workspace.',
      },
      {
        type: 'p',
        text: 'That vocabulary also needs rules. Color must remain legible, distinctions must be supported by labels and other cues, and meanings must remain consistent within their context.',
      },
      { type: 'p', text: 'The result is more than a coordinated palette.' },
      {
        type: 'standout',
        text: "It's a workspace that communicates its state visually and contextually, allowing the interface itself to participate in helping someone understand what is happening.",
      },
    ],
    contractIntro: [
      'A hue may mean exactly one thing within a namespace. Namespaces are separated by visible boundaries so that each context has a consistent visual vocabulary.',
      'This principle governs the palette, its semantic assignments, and the way different interface elements coexist without competing for attention.',
    ],
    coreLaw:
      'A hue may mean exactly one thing within a namespace. Namespaces are separated by visible walls. The only sin is letting a hue mean two things inside one namespace with no wall.',
    disciplineNote: 'Color is spent, not sprayed.',
    corollaries: [
      'Color meaning is namespace-local, not global. Seafoam can mean "working" in a status readout and "expression" inside a walled #0D0C0F code block because the border and dark floor tell the eye which dictionary to load.',
      'Body prose stays neutral (#E6E4EA). Every light shade in the original BubbleForge palette was hue-tinted; adding Neutral and BF-Silver gave long technical writing a calm floor so accents actually signal something.',
      'Pink (#FF81C8) belongs strictly to chrome state and fixed brand identity. Links wear Glow Blue (#80C8FF), headers ride the Lavender → Lilac → Petal value ramp, wire/routing wears Warnings Orange (#F9AB79), vault/security wears Dream Blue (#CDE8FF), and errors wear Coral (#F8675C).',
    ],
    related: [
      '/thinking/care-benchmark',
      '/thinking/interior-exterior-customers',
      '/building/dotchat',
    ],
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
    subtitle: 'Reasoning is a negotiation, not a field.',
    metaRows: [
      { key: 'lab_track', value: '[ INTEROPERABILITY · ADJACENT DIALECT ]', tone: 'header' },
      { key: 'status', value: '[ ACTIVE LAB ]', tone: 'media' },
      { key: 'feeds_into', value: '[ DOTCHAT · NERAPHIS · THE GUILD ]', tone: 'neutral' },
    ],
    intro: [
      {
        type: 'p',
        text: 'When a new model releases, a familiar failure pattern often appears across third-party applications.',
      },
      {
        type: 'p',
        text: 'Output arrives garbled. Thinking blocks spill into the main reply or disappear altogether. Requests fail with opaque error codes. Developers respond by patching adapters by hand and shipping reactive updates for each release.',
      },
      {
        type: 'p',
        text: "Eventually I asked a simpler question: **what if I didn't have to keep patching around it?**",
      },
    ],
    sections: [
      {
        heading: '// WHY TURING',
        blocks: [
          { type: 'standout', text: '“To program is to reprogram.”' },
          {
            type: 'p',
            text: 'Turing takes its name from that underlying principle. Rather than overwriting chat templates or assuming every backend conforms to a single universal schema, Turing builds an **adjacent dialect**—a translation layer that captures how a specific model and route actually behave, stores that specification cleanly, and reapplies it without altering the underlying template.',
          },
        ],
      },
      {
        heading: '// NOISE AT EVERY HOP',
        blocks: [
          {
            type: 'p',
            text: 'In modern AI interoperability, a response rarely travels directly from a model to the screen.',
          },
          {
            type: 'diagram',
            title: 'TURING // MULTI-HOP NORMALIZATION CHAIN',
            filename: 'hop-chain.txt',
            ascii: `  [ client ] ──► [ API provider ] ──► [ model host ] ──► [ model ]
      ▲                ▲                    ▲                ▲
   normalizes      normalizes           normalizes       emits raw`,
          },
          {
            type: 'p',
            text: 'Every hop in that chain introduces noise. Each layer follows its own conventions and attempts to normalize data at its own stage. A gateway rewrites a parameter, a host wraps a reasoning block differently, or a model changes how it delimits thinking. Any mismatch along the path can disrupt the entire exchange.',
          },
          { type: 'standout', text: 'Reasoning is a negotiation, not a field.' },
          {
            type: 'p',
            text: 'Treating reasoning as a single predictable field (`delta.reasoning`, `thinking`, or `content`) leaves the client exposed whenever an upstream hop shifts. Turing begins by establishing what the client expects, then works outward across the chain to verify how each layer is actually connected.',
          },
        ],
      },
      {
        heading: '// CALIBRATION VS. RUNTIME',
        blocks: [
          {
            type: 'p',
            text: 'Negotiation in Turing does not happen dynamically on every request.',
          },
          {
            type: 'p',
            text: 'Separating calibration from execution is central to the design. **Calibration** is a deliberate, bounded process invoked when adding a route or investigating persistent drift—reconciling evidence from the live wire, declared provider metadata, and external documentation to produce a versioned dialect artifact.',
          },
          {
            type: 'p',
            text: '**Runtime execution** remains strictly deterministic: on the hot path, Turing reads the stored dialect and decodes the stream directly, with no live negotiation overhead.',
          },
        ],
      },
      {
        heading: '// FINDING THE RECIPE',
        blocks: [
          {
            type: 'p',
            text: 'The architecture did not begin as an abstract specification. It began with a single concrete integration.',
          },
          {
            type: 'p',
            text: 'We took one provider, hardcoded the behavior, and tested until it worked reliably. Then we stepped back and asked two questions: *what did we actually need to know to make that work?* And *how can that knowledge be stored and updated reliably?*',
          },
          {
            type: 'p',
            text: 'Once we had the recipe, the automation followed cleanly.',
          },
          {
            type: 'bullets',
            items: [
              {
                lead: 'Deterministic floor first.',
                body: 'Known formats decode directly on the hot path; unrecognized formats fall back safely instead of blanking out or corrupting the response.',
              },
              {
                lead: 'Evidence over guesswork.',
                body: 'Rather than auto-firing on transient provider anomalies, Turing treats the live wire, declared parameter metadata, and provider documentation as distinct witnesses—reserving heavier calibration for deliberate, persistent changes.',
              },
              {
                lead: 'Two audiences, two flags.',
                body: 'Some reasoning artifacts (such as readable summaries) are intended for the person (`reach_user`), while others (such as encrypted reasoning chains) are opaque to a human reader yet required verbatim by the model on subsequent turns (`reach_model`). Tracking those decisions independently preserves clarity for the human and continuity for the model.',
              },
            ],
          },
        ],
      },
      {
        heading: '// WORKING TODAY & WHERE IT GOES NEXT',
        blocks: [
          {
            type: 'p',
            text: 'Today, Turing operates primarily on the client side of chat templates—ensuring reasoning traces, thinking blocks, and round-trip payloads are decoded, preserved, and rendered accurately without manual per-model patches.',
          },
          { type: 'standout', text: 'Next up: tool-use.' },
          {
            type: 'p',
            text: "Many models ship capable native tool-use APIs, yet in practice reliable tool execution often requires connecting directly to a model's native endpoint rather than working through an aggregator, router, or proxy. The next phase of the lab extends Turing's adjacent-dialect approach to negotiate through that multi-hop noise so native tool-use connects reliably across the full chain.",
          },
        ],
      },
    ],
    related: [
      '/thinking/interior-exterior-customers',
      '/doing/wirewench',
      '/building/dotchat',
    ],
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
      'Structured Markdown sidecars, deterministic fidelity verification, and selective context retrieval.',
    metaRows: [
      { key: 'lab_track', value: '[ STRUCTURED SIDECARS · TOC RETRIEVAL ]', tone: 'media' },
      { key: 'status', value: '[ ACTIVE LAB ]', tone: 'media' },
      { key: 'feeds_into', value: '[ DOTCHAT · NERAPHIS ]', tone: 'neutral' },
    ],
    intro: [
      {
        type: 'p',
        text: 'Making a document available to an AI is not the same as making its information reliably accessible.',
      },
      { type: 'p', text: 'Documents introduce two distinct problems.' },
      {
        type: 'p',
        text: 'The first is extraction. Real-world files, particularly PDFs, may contain malformed text, duplicated lines, inconsistent layouts, or pages rendered entirely as images. Even before a model encounters the content, the information may have been altered or lost during extraction.',
      },
      {
        type: 'p',
        text: 'The second is persistence. In many chat workflows, extracted documents are introduced as large blocks of conversation context. This makes the information immediately available, but creates a dependence on the context window. As conversations grow, previously supplied material may be truncated or become inaccessible, requiring the person to provide it again.',
      },
      {
        type: 'p',
        text: 'Document Processing investigates an alternative: **structure reference material once, preserve its relationship to the source, and retrieve only the information needed for the current interaction.**',
      },
      {
        type: 'p',
        text: 'The objective is to make documents durable, navigable resources rather than temporary additions to a conversation.',
      },
    ],
    sections: [
      {
        heading: '// THE NERAPHIS LINEAGE',
        blocks: [
          {
            type: 'p',
            text: "The underlying design originated in Neraphis's Node database architecture.",
          },
          {
            type: 'p',
            text: "Neraphis organizes durable knowledge as lightweight Markdown documents with structured frontmatter, headings, and navigable relationships. This allows information to remain inspectable and accessible without requiring the entire knowledge collection to be loaded into a model's context.",
          },
          {
            type: 'p',
            text: 'Document Processing adapts that approach to files attached within .dotChat.',
          },
          {
            type: 'p',
            text: 'Rather than repeatedly introducing an entire document into a conversation, the system creates a structured Markdown sidecar during ingestion. The sidecar provides a navigable representation of the source while preserving its extracted content for subsequent retrieval.',
          },
          {
            type: 'p',
            text: 'The same structural principles used to organize long-lived knowledge can therefore support document access within an individual workspace.',
          },
        ],
      },
      {
        heading: '// THE INGESTION PIPELINE',
        blocks: [
          {
            type: 'p',
            text: 'Document Processing separates ingestion, verification, and retrieval into distinct stages.',
          },
          {
            type: 'stages',
            items: [
              {
                num: '01',
                title: 'File classification',
                paragraphs: [
                  'The pipeline begins by identifying the type of information being processed.',
                  'Prose-oriented formats such as PDF, DOCX, Markdown, and plain text are candidates for structural processing.',
                  'Syntactic and columnar formats—including JSON, CSV, YAML, and logs—bypass the structuring pass. Their original organization is retained through the flat-injection path rather than being rewritten into prose-oriented sections.',
                  'Files without an extractable text layer, including image-only PDFs, are identified as unsupported by the text-extraction path rather than silently converted into incomplete structures.',
                ],
              },
              {
                num: '02',
                title: 'One-time structural processing',
                paragraphs: [
                  'A dedicated utility connection, `@structurer`, analyzes the extracted text and introduces a navigable Markdown hierarchy.',
                  'It may insert headings at appropriate structural boundaries and add concise `> tag:` descriptions explaining what each section contains.',
                  'These descriptions provide a semantic guide to the document without replacing its contents.',
                  'The distinction is intentional: the model may author navigation, but it is not authorized to rewrite the source body.',
                ],
              },
              {
                num: '03',
                title: 'Deterministic fidelity verification',
                paragraphs: [
                  'The resulting sidecar is checked against the original extracted text before it is accepted.',
                  'This verification separates the model-authored navigation from the source material and tests whether the original content has been preserved within the configured tolerance.',
                  'When the check identifies unacceptable content drift, the structured sidecar is rejected in favor of the raw extraction.',
                ],
              },
              {
                num: '04',
                title: 'Selective retrieval',
                paragraphs: [
                  'Once structured, the document can be accessed through a two-stage retrieval process.',
                  "The first stage exposes its table of contents: headings and accompanying `> tag:` descriptions. This provides a compact overview of the document's organization and allows sections to be identified by their meaning.",
                  'The second stage retrieves the body of a selected section.',
                  'Only that section is introduced into the active conversation context, where it is available for the current turn. The full document remains accessible through the sidecar without becoming a permanent part of every subsequent request.',
                  'This approach uses authored structural navigation rather than embedding-based similarity search.',
                ],
              },
            ],
          },
        ],
      },
      {
        heading: '// THE FIDELITY LOCK',
        blocks: [
          {
            type: 'p',
            text: 'Using a language model to organize source material introduces an important risk: a structurally useful document may no longer faithfully represent the original.',
          },
          {
            type: 'p',
            text: 'A heading can be inferred incorrectly. A paragraph may be paraphrased. A qualifying statement may disappear during what appears to be routine cleanup.',
          },
          {
            type: 'p',
            text: 'When the resulting document is later retrieved as reference material, those alterations can be mistaken for source content.',
          },
          {
            type: 'p',
            text: 'Document Processing therefore establishes a strict boundary between two kinds of information:',
          },
          {
            type: 'bullets',
            items: [
              {
                lead: 'Authored navigation',
                body: 'consists of the Markdown headings and `> tag:` descriptions introduced during structuring.',
              },
              {
                lead: 'Source content',
                body: 'consists of the extracted document body, which the structuring process is required to preserve.',
              },
            ],
          },
          {
            type: 'p',
            text: "The distinction is enforced beyond the model's instructions.",
          },
          {
            type: 'p',
            text: 'The deterministic verification implementation, `fidelity.ts`, removes the permitted structural additions from the generated sidecar, accounting for fenced code blocks so that code content is not misidentified as authored navigation.',
          },
          {
            type: 'p',
            text: 'It then compares the remaining content against the raw extraction using a verbatim word-containment measure.',
          },
          {
            type: 'p',
            text: 'If the measured drift exceeds tolerance, the result is flagged as `content_drift`, and the raw extraction takes precedence.',
          },
          {
            type: 'p',
            text: 'This is a safeguard against substantive rewriting, not a claim of byte-for-byte equivalence or perfect recovery from a damaged source.',
          },
          {
            type: 'p',
            text: 'The principle is that **a model may improve access to information without acquiring authority to change what the source says.**',
          },
        ],
      },
      {
        heading: '// WORKING TODAY',
        blocks: [
          {
            type: 'p',
            text: 'The current .dotChat implementation includes the file-type ingestion gate, flat-injection fallback, the `@structurer` Markdown sidecar process, deterministic fidelity checking, and manual two-stage retrieval.',
          },
          {
            type: 'p',
            text: 'Together, these components establish a workflow in which document structure can be generated once, inspected, verified, and used to retrieve relevant context on demand.',
          },
        ],
      },
      {
        heading: '// NEXT STEPS',
        blocks: [
          {
            type: 'p',
            text: 'The next development steps extend that workflow beyond individual chat attachments.',
          },
          {
            type: 'p',
            text: '**Directory- and SubDirectory-scoped persistence** will allow structured reference documents to exist at the workspace level. Documents relevant to an ongoing project can then remain available across conversations without requiring repeated uploads.',
          },
          {
            type: 'p',
            text: '**Controlled read and write tooling** will extend access beyond one-way retrieval, allowing authorized operations against the structured Markdown artifacts themselves.',
          },
          {
            type: 'p',
            text: 'These capabilities form the integration path between Neraphis and .dotChat.',
          },
          {
            type: 'p',
            text: 'Neraphis provides the architectural foundation for persistent, structured knowledge. Document Processing establishes the ingestion and navigation mechanisms. .dotChat provides the working environment in which people and models can access that information.',
          },
          {
            type: 'p',
            text: 'The larger goal is not simply to fit more material into a context window.',
          },
          {
            type: 'standout',
            text: "It is to make information reliably available when it is needed, without requiring the entire document to be present when it isn't.",
          },
        ],
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
    desc: 'Evaluating whether an AI genuinely listens, exercises sound judgment, and serves the person it helps.',
  },
  '/thinking/interior-exterior-customers': {
    route: '/thinking/interior-exterior-customers',
    section: 'thinking',
    tag: 'THINKING',
    title: 'Interior and Exterior Customers',
    desc: 'Designing AI systems that work for both the models operating within them and the people depending on them.',
  },
  '/thinking/color-contract': {
    route: '/thinking/color-contract',
    section: 'thinking',
    tag: 'THINKING',
    title: 'The Color Contract',
    desc: 'Color as a learned visual vocabulary — one hue, one job per namespace behind visible walls.',
  },
  '/doing/turing': {
    route: '/doing/turing',
    section: 'doing',
    tag: 'DOING // LAB',
    title: 'Turing',
    desc: 'Reasoning is a negotiation, not a field — modeling multi-hop AI interoperability as an adjacent dialect.',
  },
  '/doing/document-processing': {
    route: '/doing/document-processing',
    section: 'doing',
    tag: 'DOING // LAB',
    title: 'Document Processing',
    desc: 'Structured Markdown sidecars, deterministic fidelity verification, and selective section retrieval.',
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
