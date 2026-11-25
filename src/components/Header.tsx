import type { MouseEvent } from 'react'
import type { SectionId } from '../lib/router'
import { FishkaEmblem } from './FishkaEmblem'

interface HeaderProps {
  route: string
  activeSection: SectionId | null
  onNavigate: (path: string) => void
  onNavigateSection: (section: SectionId) => void
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'thinking', label: 'THINKING' },
  { id: 'doing', label: 'DOING' },
  { id: 'building', label: 'BUILDING' },
  { id: 'who', label: 'WHO' },
]

export function Header({
  route,
  activeSection,
  onNavigate,
  onNavigateSection,
}: HeaderProps) {
  const displayPath = route === '/' ? '' : route.replace(/^\//, '')

  const handleHomeClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    onNavigate('/')
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="header-left">
          <a
            href="/"
            onClick={handleHomeClick}
            className="brand-link"
            aria-label="Return to fishka.ai homepage"
          >
            <FishkaEmblem size={24} className="brand-emblem" />
            <span className="brand-wordmark">
              fishka<span className="brand-tld">.ai</span>
            </span>
          </a>

          {displayPath ? (
            <>
              <span className="header-slash" aria-hidden="true">
                /
              </span>
              <span className="header-route" title={route}>
                {displayPath}
              </span>
            </>
          ) : null}
        </div>

        <nav className="primary-nav" aria-label="Primary sections">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
                    return
                  }
                  e.preventDefault()
                  onNavigateSection(item.id)
                }}
                className={isActive ? 'nav-link is-active' : 'nav-link'}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
