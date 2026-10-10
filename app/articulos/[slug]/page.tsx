import { getArticleBySlug, getAllArticles, CATEGORIES } from '@/lib/articles'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Clock, ArrowLeft, User, Calendar, Share2, Bookmark } from 'lucide-react'
import { getCategoryIcon } from '@/components/icons'
import ArticleActions from '@/components/ArticleActions'

export async function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const cookieStore = await cookies()
  const raw = cookieStore.get('auth_user')?.value
  let currentUserCategory: string | null = null
  if (raw) { try { currentUserCategory = JSON.parse(raw).category } catch {} }
  const canEdit = currentUserCategory === article.category

  const cat = CATEGORIES[article.category]
  const dateStr = new Date(article.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })

  const html = article.content
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[^]*?<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .split('\n\n').map(block => {
      const t = block.trim()
      if (!t) return ''
      if (t.startsWith('<')) return t
      return `<p>${t}</p>`
    }).join('\n')

  return (
    <div style={{ paddingTop: 96 }}>
      <article className="bg-noise" style={{
        position: 'relative', background: article.coverColor, overflow: 'hidden',
        padding: 'clamp(var(--space-2xl), 8vw, var(--space-4xl)) var(--container-padding)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', top: '50%', right: '5%', transform: 'translateY(-50%)', opacity: 0.06, scale: '10', transformOrigin: 'center right' }}>
          {getCategoryIcon(article.category, 48, 'white')}
        </div>

        <div className="container-narrow" style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)', flexWrap: 'wrap' }}>
            <Link href="/articulos" className="focus-visible" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
              padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-sm)',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
              transition: 'all var(--transition-fast)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
            >
              <ArrowLeft size={15} /> Volver
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.5rem' }}>●</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.375rem 1rem', borderRadius: '999px',
              background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
              color: 'white', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            }}>
              {getCategoryIcon(article.category, 14, 'white')} {cat?.label}
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)', color: 'white', lineHeight: 1.1, marginBottom: 'var(--space-lg)', textWrap: 'balance' }}>
            {article.title}
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.125rem', lineHeight: 1.7, marginBottom: 'var(--space-xl)', maxWidth: 580 }}>
            {article.excerpt}
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-xl)', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>
              <User size={15} /> {article.author}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>
              <Calendar size={15} /> {dateStr}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>
              <Clock size={15} /> {article.readTime} min lectura
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', marginLeft: 'auto' }}>
              <button className="focus-visible" style={{
                width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: 'white',
                cursor: 'pointer', transition: 'all var(--transition-fast)',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
                aria-label="Compartir artículo"
              >
                <Share2 size={18} />
              </button>
              <button className="focus-visible" style={{
                width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: 'white',
                cursor: 'pointer', transition: 'all var(--transition-fast)',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
                aria-label="Guardar artículo"
              >
                <Bookmark size={18} />
              </button>
            </div>
          </div>
        </div>
      </article>

      <div className="container-narrow" style={{ padding: 'var(--space-4xl) var(--container-padding) var(--space-4xl)' }}>
        <div className="prose-ivd drop-cap" dangerouslySetInnerHTML={{ __html: html }} />

        <div style={{ marginTop: 'var(--space-4xl)', paddingTop: 'var(--space-2xl)', borderTop: '1px solid var(--ivd-gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <Link href="/articulos" className="focus-visible" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            color: 'var(--ivd-red)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem',
            padding: '0.5rem 0', transition: 'color var(--transition-fast)',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--ivd-red-dark)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--ivd-red)'}
          >
            <ArrowLeft size={16} /> Ver más artículos
          </Link>

          {canEdit && <ArticleActions slug={slug} />}
        </div>

        <nav style={{ marginTop: 'var(--space-3xl)', paddingTop: 'var(--space-xl)', borderTop: '1px solid var(--ivd-gray-200)' }} aria-label="Artículos relacionados">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ivd-black)', marginBottom: 'var(--space-lg)' }}>
            Más en {cat?.label}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
            {getAllArticles()
              .filter(a => a.category === article.category && a.slug !== article.slug)
              .slice(0, 3)
              .map(related => (
                <ArticleCard key={related.slug} article={related} variant="compact" />
              ))}
          </div>
        </nav>
      </div>
    </div>
  )
}