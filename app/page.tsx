import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import { getAllArticles, getFeaturedArticles, CATEGORIES } from '@/lib/articles'
import { getCategoryIcon } from '@/components/icons'
import { ArrowRight, ChevronRight, FlaskConical, Atom, Globe, Dna } from 'lucide-react'

const categoryIcons = {
  quimica: <FlaskConical size={28} />,
  fisica: <Atom size={28} />,
  'ciencias-de-la-tierra': <Globe size={28} />,
  biologia: <Dna size={28} />,
}

const globalStyles = `
  .btn-primary:hover { background: var(--ivd-red-dark) !important; border-color: var(--ivd-red-dark) !important; box-shadow: var(--shadow-red) !important; }
  .btn-outline:hover { background: var(--ivd-gray-100) !important; border-color: var(--ivd-gray-300) !important; }
  .btn-outline-hero:hover { background: rgba(255,255,255,0.15) !important; border-color: rgba(255,255,255,0.3) !important; color: white !important; }
  .cat-card:hover { transform: translateY(-4px) !important; box-shadow: var(--shadow-lg) !important; border-color: var(--ivd-gray-300) !important; }
  .link-hover-red:hover { color: var(--ivd-red-dark) !important; }
  .link-hover-red-inverse:hover { color: white !important; background: rgba(255,255,255,0.1) !important; border-color: rgba(255,255,255,0.3) !important; }
  .nav-link:hover { color: var(--ivd-red) !important; background: var(--ivd-red-soft) !important; }
  .footer-link:hover { color: var(--ivd-white) !important; padding-left: 0.5rem !important; }
`

export default function Home() {
  const featured = getFeaturedArticles()
  const all = getAllArticles()
  const recent = all.slice(0, 4)

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="bg-noise" style={{
        position: 'relative', minHeight: '100dvh',
        background: 'var(--ivd-black)', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 15% 30%, rgba(200,16,46,0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 70%, rgba(26,74,138,0.12) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} aria-hidden="true" />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(200,16,46,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,16,46,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} aria-hidden="true" />
        <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none' }} aria-hidden="true" />

        <div className="container-main" style={{ paddingTop: 120, position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-lg)', opacity: 0, animation: 'fadeUp 0.7s ease 0.1s forwards' }}>
              <div className="red-line-lg" />
              <span className="font-caption" style={{ color: 'var(--ivd-red)' }}>
                Instituto Verbo Divino · Pilar
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(3.5rem, 9vw, 8rem)', lineHeight: 0.95, color: 'white', marginBottom: '0.125em', opacity: 0, animation: 'fadeUp 0.7s ease 0.2s forwards' }}>
              Revista
            </h1>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(3.5rem, 9vw, 8rem)', lineHeight: 0.95, color: 'var(--ivd-red)', marginBottom: 'var(--space-xl)', opacity: 0, animation: 'fadeUp 0.7s ease 0.3s forwards' }}>
              IVD
            </h1>
            <p style={{ fontSize: 'clamp(1.0625rem, 2.2vw, 1.375rem)', color: 'rgba(255,255,255,0.65)', maxWidth: 580, lineHeight: 1.75, marginBottom: 'var(--space-2xl)', opacity: 0, animation: 'fadeUp 0.7s ease 0.4s forwards' }}>
              Ciencias Naturales para la secundaria: Química, Física, Ciencias de la Tierra y Biología — explicadas con rigor y curiosidad.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', opacity: 0, animation: 'fadeUp 0.7s ease 0.5s forwards' }}>
              <Link href="/articulos" className="btn btn-primary btn-lg">
                Explorar artículos <ArrowRight size={18} />
              </Link>
              <Link href="/articulos?cat=quimica" className="btn btn-outline btn-lg btn-outline-hero" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' }}>
                Ver Química
              </Link>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-2xl)', marginTop: 'var(--space-3xl)', paddingTop: 'var(--space-xl)', borderTop: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap', opacity: 0, animation: 'fadeUp 0.7s ease 0.6s forwards' }}>
              {[
                { n: String(all.length), label: 'Artículos publicados' },
                { n: String(Object.keys(CATEGORIES).length), label: 'Disciplinas' },
                { n: '2025', label: 'Edición actual' },
              ].map(s => (
                <div key={s.label} style={{ flex: 1, minWidth: 140 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: 'white', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '0.25rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 'var(--space-xl)', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0, animation: 'fadeIn 1s ease 1.2s forwards' }}>
          <span className="font-caption" style={{ color: 'rgba(255,255,255,0.3)' }}>Explorar</span>
          <div style={{ width: 1.5, height: 56, background: 'linear-gradient(to bottom, rgba(200,16,46,0.7), transparent)', borderRadius: 1 }} />
        </div>
      </section>

      {/* ── MARQUEE TICKER ───────────────────────────────────────── */}
      <div style={{ background: 'var(--ivd-red)', padding: '0.75rem 0', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', animation: 'marquee 40s linear infinite', whiteSpace: 'nowrap' }}>
          {Array(5).fill(['QUÍMICA', 'FÍSICA', 'CIENCIAS DE LA TIERRA', 'BIOLOGÍA']).flat().map((item, i) => (
            <span key={i} style={{ marginRight: '4rem', fontSize: '0.7rem', fontWeight: 700, color: 'white', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              · {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURED ARTICLES ────────────────────────────────────── */}
      <section className="container-main" style={{ padding: 'var(--space-4xl) var(--container-padding)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-2xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-sm)' }}>
              <div className="red-line" />
              <span className="font-caption" style={{ color: 'var(--ivd-red)' }}>Destacados</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--ivd-black)' }}>
              Artículos destacados
            </h2>
          </div>
          <Link href="/articulos" className="focus-visible link-hover-red" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--ivd-red)', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem', padding: 'var(--space-sm) 0' }}>
            Ver todos <ChevronRight size={16} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-lg)' }}>
          {featured.length > 0 ? featured.map(article => (
            <ArticleCard key={article.slug} article={article} variant="featured" />
          )) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--space-4xl) 0', color: 'var(--ivd-gray-500)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 'var(--space-sm)' }}>Próximamente artículos destacados</p>
              <p>Los docentes pueden marcar artículos como destacados al publicarlos.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────── */}
      <section className="bg-noise" style={{
        position: 'relative', background: 'var(--ivd-black)', padding: 'var(--space-4xl) var(--container-padding)',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(200,16,46,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} aria-hidden="true" />
        <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-sm)' }}>
              <div className="red-line" />
              <span className="font-caption" style={{ color: 'var(--ivd-red)' }}>Disciplinas</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'white' }}>
              Explorá por área
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-md)' }}>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <Link key={key} href={`/articulos?cat=${key}`} className="cat-card focus-visible" style={{
                textDecoration: 'none', display: 'block', padding: 'var(--space-xl)',
                borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)', transition: 'all var(--transition-base)', cursor: 'pointer',
              }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 'var(--radius-md)',
                  background: `${cat.color}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 'var(--space-md)', color: cat.color, border: `1px solid ${cat.color}30`,
                }}>
                  {categoryIcons[key as keyof typeof categoryIcons] || getCategoryIcon(key, 28, cat.color)}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white', fontSize: '1.1875rem', marginBottom: 'var(--space-sm)' }}>{cat.label}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: cat.color, fontSize: '0.8125rem', fontWeight: 600 }}>
                  Explorar <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT ARTICLES ──────────────────────────────────────── */}
      <section className="container-main" style={{ padding: 'var(--space-4xl) var(--container-padding)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-2xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-sm)' }}>
              <div className="red-line" />
              <span className="font-caption" style={{ color: 'var(--ivd-red)' }}>Últimos artículos</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--ivd-black)' }}>
              Lo más reciente
            </h2>
          </div>
          <Link href="/articulos" className="focus-visible link-hover-red" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--ivd-red)', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem', padding: 'var(--space-sm) 0' }}>
            Ver todos <ChevronRight size={16} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
          {recent.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="bg-noise" style={{
        position: 'relative', background: 'var(--ivd-black-soft)', padding: 'var(--space-4xl) var(--container-padding)', marginTop: 'var(--space-4xl)',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(200,16,46,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} aria-hidden="true" />
        <div className="container-narrow" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 600 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-md)', color: 'var(--ivd-red)' }}>
            <div className="red-line" />
            <span className="font-caption">Mantenete al día</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'white', marginBottom: 'var(--space-md)' }}>
            ¿Querés publicar en RevistaIVD?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.0625rem', marginBottom: 'var(--space-xl)', lineHeight: 1.7 }}>
            Si sos docente del área de Ciencias Naturales del IVD, tenés acceso al panel de publicación.
          </p>
          <Link href="/login" className="btn btn-primary btn-lg">
            Acceder como docente <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}