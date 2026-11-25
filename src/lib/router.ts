import { useCallback, useEffect, useState } from 'react'

export type SectionId = 'thinking' | 'doing' | 'building' | 'who'

export function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/'
  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

export function useRouter() {
  const [route, setRoute] = useState<string>(() =>
    normalizePath(window.location.pathname),
  )
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)

  useEffect(() => {
    const onPopState = () => {
      setRoute(normalizePath(window.location.pathname))
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((target: string, scrollTop = true) => {
    const next = normalizePath(target)
    if (next !== normalizePath(window.location.pathname)) {
      window.history.pushState({}, '', next)
    }
    setRoute(next)
    if (next === '/') {
      setActiveSection(null)
    }
    if (scrollTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const navigateToSection = useCallback((section: SectionId) => {
    const scrollToEl = () => {
      const el = document.getElementById(`section-${section}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    if (normalizePath(window.location.pathname) !== '/') {
      window.history.pushState({}, '', `/#${section}`)
      setRoute('/')
      setActiveSection(section)
      requestAnimationFrame(() => {
        setTimeout(scrollToEl, 30)
      })
    } else {
      window.history.replaceState({}, '', `/#${section}`)
      setActiveSection(section)
      scrollToEl()
    }
  }, [])

  return {
    route,
    activeSection,
    setActiveSection,
    navigate,
    navigateToSection,
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // fall through to textarea fallback
    }
  }
  try {
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(el)
    return ok
  } catch {
    return false
  }
}
