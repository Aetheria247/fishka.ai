import type { MouseEvent } from 'react'
import type { SectionId } from '../lib/router'
import { FishkaBeacon } from './FishkaBeacon'

interface FooterProps {
  route: string
  onNavigate: (path: string) => void
  onNavigateSection: (section: SectionId) => void
}

export function Footer({ route, onNavigate, onNavigateSection }: FooterProps) {
  const linkProps = (path: string) => ({
    href: path,
    className: route === path ? 'tree-leaf is-current' : 'tree-leaf',
    onClick: (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      e.preventDefault()
      onNavigate(path)
    },
  })

  const sectionProps = (section: SectionId) => ({
    href: `/#${section}`,
    className: 'tree-dir',
    onClick: (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      e.preventDefault()
      onNavigateSection(section)
    },
  })

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="site-tree" aria-label="Site directory tree">
          <div className="tree-root">fishka.ai/</div>
          <div className="tree-branch">
            <div>
              <span className="tree-trace">├──</span>
              <a {...sectionProps('thinking')}>thinking/</a>
            </div>
            <div className="tree-children">
              <div>
                <span className="tree-trace">├──</span>
                <a {...linkProps('/thinking/care-benchmark')}>care-benchmark/</a>
              </div>
              <div>
                <span className="tree-trace">└──</span>
                <a {...linkProps('/thinking/color-contract')}>color-contract/</a>
              </div>
            </div>

            <div>
              <span className="tree-trace">├──</span>
              <a {...sectionProps('doing')}>doing/</a>
            </div>
            <div className="tree-children">
              <div>
                <span className="tree-trace">├──</span>
                <a {...linkProps('/doing/turing')}>turing/</a>
              </div>
              <div>
                <span className="tree-trace">├──</span>
                <a {...linkProps('/doing/document-processing')}>document-processing/</a>
              </div>
              <div>
                <span className="tree-trace">└──</span>
                <a {...linkProps('/doing/wirewench')}>wirewench/</a>
              </div>
            </div>

            <div>
              <span className="tree-trace">├──</span>
              <a {...sectionProps('building')}>building/</a>
            </div>
            <div className="tree-children">
              <div>
                <span className="tree-trace">├──</span>
                <a {...linkProps('/building/neraphis')}>neraphis/</a>
              </div>
              <div>
                <span className="tree-trace">├──</span>
                <a {...linkProps('/building/dotchat')}>dotchat/</a>
              </div>
              <div>
                <span className="tree-trace">└──</span>
                <a {...linkProps('/building/guild')}>guild/</a>
              </div>
            </div>

            <div>
              <span className="tree-trace">└──</span>
              <a {...sectionProps('who')}>who/</a>
            </div>
          </div>
        </div>

        <div className="colophon">
          <div className="colophon-meta">
            <div className="colophon-name">
              fishka<span className="brand-tld">.ai</span>
            </div>
            <div className="colophon-sub">BubbleForge · Editorial Dossier</div>
            <p className="colophon-note">
              Thinking → Doing → Building → Who.
              <br />
              Built to explain, not to sell.
            </p>
          </div>

          <div className="footer-beacon-slot">
            <FishkaBeacon size={84} />
          </div>
        </div>
      </div>
    </footer>
  )
}
