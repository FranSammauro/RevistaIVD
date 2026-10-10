"use client"
import Link from 'next/link'
import { CATEGORIES } from '@/lib/types'
import { getCategoryIcon } from '@/components/icons'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ivd-black)', color: 'var(--ivd-white)', paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-xl)', marginTop: 'var(--space-4xl)', position: 'relative' }}>
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} aria-hidden="true" />
      <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.5fr repeat(2, 1fr) 1.2fr',
          gap: 'var(--space-3xl)', paddingBottom: 'var(--space-2xl)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-md)' }}>
              <img src="/escudo-ivd.svg" alt="" width={40} height={40} style={{ display: 'block' }} aria-hidden="true" />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
                Revista<span style={{ color: 'var(--ivd-red)' }}>IVD</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: 260 }}>
              La revista digital de Ciencias Naturales del Instituto Verbo Divino, Pilar.
              Rigor científico, curiosidad pedagógica.
            </p>
            <a href="https://www.institutoverbodivino.edu.ar" target="_blank" rel="noopener noreferrer"
              className="btn btn-outline-red btn-sm" style={{ marginTop: 'var(--space-md)', width: 'fit-content', borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ivd-red)'; e.currentTarget.style.color = 'var(--ivd-red)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
            >
              Sitio oficial del IVD
            </a>
          </div>

          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivd-red)', marginBottom: 'var(--space-lg)' }}>
              Disciplinas
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <li key={key}>
                  <Link href={`/articulos?cat=${key}`} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                    color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                    fontSize: '0.9375rem', fontWeight: 500,
                    padding: '0.25rem 0', borderRadius: 'var(--radius-sm)',
                    transition: 'all var(--transition-fast)',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--ivd-white)'; e.currentTarget.style.paddingLeft = '0.5rem' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.paddingLeft = '0' }}
                  >
                    <span style={{ color: cat.color, flexShrink: 0 }}>
                      {getCategoryIcon(key, 16, cat.color)}
                    </span>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivd-red)', marginBottom: 'var(--space-lg)' }}>
              Navegación
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {[
                { href: '/articulos', label: 'Todos los artículos' },
                { href: '/articulos?cat=quimica', label: 'Química' },
                { href: '/articulos?cat=fisica', label: 'Física' },
                { href: '/articulos?cat=ciencias-de-la-tierra', label: 'Ciencias de la Tierra' },
                { href: '/articulos?cat=biologia', label: 'Biología' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} style={{
                    display: 'inline-block', color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                    fontSize: '0.9375rem', fontWeight: 500, padding: '0.25rem 0',
                    borderRadius: 'var(--radius-sm)', transition: 'all var(--transition-fast)',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--ivd-white)'; e.currentTarget.style.paddingLeft = '0.5rem' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.paddingLeft = '0' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivd-red)', marginBottom: 'var(--space-lg)' }}>
              Institución
            </h4>
            <address style={{ fontStyle: 'normal', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
              Instituto Verbo Divino<br />
              Pilar, Buenos Aires<br />
              Área de Ciencias Naturales
            </address>
          </div>
        </div>

        <div style={{ paddingTop: 'var(--space-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} RevistaIVD · Instituto Verbo Divino
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)' }}>
            Ciencias Naturales · Secundaria · Divulgación Científica
          </p>
        </div>
      </div>
    </footer>
  )
}