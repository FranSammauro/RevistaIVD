'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import AuthButton from '@/components/AuthButton'

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/articulos', label: 'Artículos' },
  { href: '/articulos?cat=quimica', label: 'Química' },
  { href: '/articulos?cat=fisica', label: 'Física' },
  { href: '/articulos?cat=ciencias-de-la-tierra', label: 'Cs. de la Tierra' },
  { href: '/articulos?cat=biologia', label: 'Biología' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === '/'
  const lightMode = !isHome || scrolled

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [pathname])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'background var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base)',
        background: lightMode ? 'rgba(250,250,248,0.92)' : 'transparent',
        backdropFilter: lightMode ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: lightMode ? 'blur(20px)' : 'none',
        borderBottom: lightMode ? '1px solid var(--ivd-gray-200)' : 'none',
        boxShadow: lightMode ? 'var(--shadow-sm)' : 'none',
      }}
    >
      <nav className="container-main" style={{ height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" className="nav-brand" style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', flexShrink: 0,
        }} aria-label="RevistaIVD - Inicio">
          <img src="/escudo-ivd.svg" alt="" width={38} height={38} style={{ display: 'block' }} aria-hidden="true" />
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem',
            letterSpacing: '-0.02em', color: lightMode ? 'var(--ivd-black)' : 'var(--ivd-white)',
            transition: 'color var(--transition-base)', whiteSpace: 'nowrap',
          }}>
            Revista<span style={{ color: 'var(--ivd-red)' }}>IVD</span>
          </span>
        </Link>

        {!isMobile && (
          <div className="nav-links" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} className="nav-link" style={{
                color: lightMode ? 'var(--ivd-gray-700)' : 'rgba(255,255,255,0.85)',
                textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 500,
                letterSpacing: '0.02em', padding: '0.5rem 0.875rem', borderRadius: 'var(--radius-sm)',
                transition: 'all var(--transition-fast)', whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--ivd-red)'; e.currentTarget.style.background = 'var(--ivd-red-soft)' }}
                onMouseLeave={e => { e.currentTarget.style.color = lightMode ? 'var(--ivd-gray-700)' : 'rgba(255,255,255,0.85)'; e.currentTarget.style.background = 'transparent' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {!isMobile && <AuthButton lightMode={lightMode} />}

          {isMobile && (
            <button
              onClick={() => setOpen(prev => !prev)}
              className="focus-visible"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: lightMode ? 'var(--ivd-black)' : 'var(--ivd-white)',
                padding: '0.5rem', borderRadius: 'var(--radius-sm)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
              }}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </nav>

      {isMobile && open && (
        <div className="mobile-menu" style={{
          background: 'rgba(250,250,248,0.98)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--ivd-gray-200)', padding: '0.5rem var(--container-padding) 1.25rem',
          animation: 'slideUp 0.3s ease forwards',
        }}>
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="focus-visible" style={{
              display: 'block', padding: '0.875rem 0', color: 'var(--ivd-gray-700)', textDecoration: 'none',
              fontWeight: 500, fontSize: '1rem', borderBottom: '1px solid var(--ivd-gray-100)',
              transition: 'color var(--transition-fast)', textWrap: 'balance',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ivd-red)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--ivd-gray-700)'}
            >
              {l.label}
            </Link>
          ))}
          <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--ivd-gray-200)' }}>
            <AuthButton lightMode={true} />
          </div>
        </div>
      )}
    </header>
  )
}