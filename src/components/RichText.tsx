import type { MouseEvent, ReactNode } from 'react'

interface RichTextProps {
  text: string
  onNavigate?: (path: string) => void
}

/**
 * Lightweight inline formatter for editorial copy.
 * Supports **bold**, *italic*, and [label](/internal/route) links
 * without raw HTML injection.
 */
export function RichText({ text, onNavigate }: RichTextProps) {
  const nodes: ReactNode[] = []
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\(\/[^)]+\))/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]
    const key = `${match.index}-${token.slice(0, 12)}`

    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('*') && token.endsWith('*')) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>)
    } else if (token.startsWith('[')) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)
      if (linkMatch) {
        const [, label, href] = linkMatch
        nodes.push(
          <a
            key={key}
            href={href}
            className="inline-dossier-link"
            onClick={(e: MouseEvent<HTMLAnchorElement>) => {
              if (
                !onNavigate ||
                e.metaKey ||
                e.ctrlKey ||
                e.shiftKey ||
                e.altKey ||
                e.button !== 0
              ) {
                return
              }
              e.preventDefault()
              onNavigate(href)
            }}
          >
            {label}
          </a>,
        )
      } else {
        nodes.push(token)
      }
    }

    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return <>{nodes}</>
}
