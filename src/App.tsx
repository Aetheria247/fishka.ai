import { useCallback, useEffect, useRef, useState } from 'react'
import { DossierPage } from './components/DossierPage'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HomePage } from './components/HomePage'
import { DOSSIERS } from './data/dossiers'
import { useRouter, type SectionId } from './lib/router'

const SECTION_IDS: SectionId[] = ['thinking', 'doing', 'building', 'who']

export function App() {
  const { route, activeSection, setActiveSection, navigate, navigateToSection } =
    useRouter()
  const [toastMsg, setToastMsg] = useState<string>('')
  const [toastVisible, setToastVisible] = useState<boolean>(false)
  const toastTimer = useRef<number | null>(null)

  const activeDossier = DOSSIERS[route]
  const resolvedSection: SectionId | null = activeDossier
    ? activeDossier.section
    : activeSection

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg)
    setToastVisible(true)
    if (toastTimer.current !== null) {
      window.clearTimeout(toastTimer.current)
    }
    toastTimer.current = window.setTimeout(() => {
      setToastVisible(false)
    }, 2400)
  }, [])

  // Keep document title synchronized with the active route
  useEffect(() => {
    document.title = activeDossier
      ? `${activeDossier.title} — fishka.ai`
      : 'fishka.ai — Editorial Dossier'
  }, [activeDossier])

  // Track which homepage section is in view so Chrome Pink reflects "you are here"
  useEffect(() => {
    if (activeDossier) return

    const elements = SECTION_IDS.map((id) =>
      document.getElementById(`section-${id}`),
    ).filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          const id = visible[0].target.id.replace('section-', '') as SectionId
          setActiveSection(id)
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [activeDossier, setActiveSection])

  // Scroll to hash section on direct load (e.g. /#building)
  useEffect(() => {
    if (route !== '/') return
    const hash = window.location.hash.replace(/^#/, '') as SectionId
    if (SECTION_IDS.includes(hash)) {
      const el = document.getElementById(`section-${hash}`)
      if (el) {
        setActiveSection(hash)
        el.scrollIntoView({ behavior: 'auto', block: 'start' })
      }
    }
  }, [route, setActiveSection])

  return (
    <div className="site-shell">
      <Header
        route={route}
        activeSection={resolvedSection}
        onNavigate={navigate}
        onNavigateSection={navigateToSection}
      />

      <div className="container">
        {activeDossier ? (
          <DossierPage
            key={activeDossier.route}
            dossier={activeDossier}
            onNavigate={navigate}
            onToast={showToast}
          />
        ) : (
          <HomePage
            onNavigate={navigate}
            onNavigateSection={navigateToSection}
          />
        )}
      </div>

      <Footer
        route={route}
        onNavigate={navigate}
        onNavigateSection={navigateToSection}
      />

      <div
        role="status"
        aria-live="polite"
        className={toastVisible ? 'toast is-visible' : 'toast'}
      >
        <span className="toast-dot" aria-hidden="true" />
        <span>{toastMsg}</span>
      </div>
    </div>
  )
}

export default App
