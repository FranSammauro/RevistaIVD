'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PenLine, LogIn, User, ChevronDown } from 'lucide-react'

export default function AuthButton({ lightMode }: { lightMode: boolean }) {
  const [user, setUser] = useState<{ displayName: string; category: string } | null | undefined>(undefined)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    fetch('/api/me').then(r => r.json()).then(d => setUser(d.user))
  }, [])

  if (user === undefined) return <div style={{ width: 90 }} aria-hidden="true" />

  if (user) {
    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus-visible"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1rem', background: 'var(--ivd-red)', color: 'white',
            border: 'none', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', fontWeight: 600,
            fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all var(--transition-fast)',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--ivd-red-dark)'; e.currentTarget.style.boxShadow = 'var(--shadow-red)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--ivd-red)'; e.currentTarget.style.boxShadow = 'none' }}
          aria-expanded={menuOpen} aria-haspopup="true"
        >
          <PenLine size={15} /> Publicar <ChevronDown size={12} />
        </button>

        {menuOpen && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0, zIndex: 50,
            background: 'var(--ivd-white)', border: '1px solid var(--ivd-gray-200)', borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xl)', minWidth: 240, padding: 'var(--space-sm)', overflow: 'hidden',
            animation: 'scaleIn 0.2s ease forwards',
          }}>
            <div style={{ padding: 'var(--space-md) var(--space-lg)', borderBottom: '1px solid var(--ivd-gray-100)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--ivd-red-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ivd-red)' }}>
                  <User size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--ivd-black)' }}>{user.displayName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ivd-gray-500)', textTransform: 'capitalize' }}>{user.category}</div>
                </div>
              </div>
            </div>
            <Link href="/publicar" onClick={() => setMenuOpen(false)} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: 'var(--space-sm) var(--space-lg)',
              color: 'var(--ivd-gray-700)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
              borderRadius: 'var(--radius-sm)', transition: 'background var(--transition-fast)',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--ivd-gray-100)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <PenLine size={16} style={{ color: 'var(--ivd-red)' }} /> Nuevo artículo
            </Link>
            <hr style={{ border: 'none', borderTop: '1px solid var(--ivd-gray-100)', margin: 'var(--space-sm) 0' }} />
            <button onClick={async () => { await fetch('/api/logout', { method: 'POST' }); window.location.href = '/' }} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: 'var(--space-sm) var(--space-lg)',
              color: 'var(--ivd-red)', background: 'none', border: 'none', width: '100%', textAlign: 'left',
              fontSize: '0.875rem', fontWeight: 500, fontFamily: 'var(--font-body)', cursor: 'pointer',
              borderRadius: 'var(--radius-sm)', transition: 'background var(--transition-fast)',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--ivd-red-soft)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <LogIn size={16} /> Cerrar sesión
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <Link href="/login" className="focus-visible" style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      padding: '0.5rem 1rem', border: `1px solid ${lightMode ? 'var(--ivd-gray-300)' : 'rgba(255,255,255,0.2)'}`,
      color: lightMode ? 'var(--ivd-red)' : 'rgba(255,255,255,0.85)', textDecoration: 'none',
      borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', fontWeight: 600,
      fontFamily: 'var(--font-body)', transition: 'all var(--transition-fast)', whiteSpace: 'nowrap',
      background: lightMode ? 'transparent' : 'rgba(255,255,255,0.05)',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--ivd-red)'
        e.currentTarget.style.color = 'white'
        e.currentTarget.style.borderColor = 'var(--ivd-red)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = lightMode ? 'transparent' : 'rgba(255,255,255,0.05)'
        e.currentTarget.style.color = lightMode ? 'var(--ivd-red)' : 'rgba(255,255,255,0.85)'
        e.currentTarget.style.borderColor = lightMode ? 'var(--ivd-gray-300)' : 'rgba(255,255,255,0.2)'
      }}
    >
      <LogIn size={15} /> Docentes
    </Link>
  )
}