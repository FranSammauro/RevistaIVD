"use client"
import Link from 'next/link'
import { ArticleMeta, CATEGORIES } from '@/lib/types'
import { Clock, ArrowUpRight } from 'lucide-react'
import { getCategoryIcon } from '@/components/icons'

interface Props {
  article: ArticleMeta
  variant?: 'default' | 'featured' | 'compact'
}

export default function ArticleCard({ article, variant = 'default' }: Props) {
  const cat = CATEGORIES[article.category]
  const dateStr = new Date(article.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
  const categoryIcon = getCategoryIcon(article.category, 14, cat?.color || 'currentColor')

  if (variant === 'featured') {
    return (
      <Link href={`/articulos/${article.slug}`} className="card card-featured" style={{
        textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden',
        borderRadius: 'var(--radius-xl)', background: article.coverColor,
        minHeight: 460, padding: 'var(--space-2xl)', flexDirection: 'column', justifyContent: 'flex-end',
        cursor: 'pointer', transition: 'transform var(--transition-slow), box-shadow var(--transition-slow)',
      }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = 'var(--shadow-xl), var(--shadow-red)' }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none' }}
      >
        <div className="bg-noise" style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }} aria-hidden="true" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.75) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 'var(--space-xl)', right: 'var(--space-xl)', opacity: 0.08, color: 'white', transform: 'scale(5)', transformOrigin: 'top right' }}>
          {getCategoryIcon(article.category, 28, 'white')}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            padding: '0.375rem 0.875rem', borderRadius: '999px',
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
            color: 'white', fontSize: '0.6875rem', fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 'var(--space-md)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          }}>
            {categoryIcon}
            {cat?.label}
          </span>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2.125rem)', fontWeight: 700, color: 'white', lineHeight: 1.15, marginBottom: 'var(--space-md)' }}>
            {article.title}
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: 'var(--space-xl)', maxWidth: 480 }}>
            {article.excerpt}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8125rem' }}>{article.author}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem' }}>
                <Clock size={13} /> {article.readTime} min
              </span>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform var(--transition-base)' }}>
              <ArrowUpRight size={20} color={article.coverColor} />
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/articulos/${article.slug}`} className="card card-compact" style={{ textDecoration: 'none', display: 'block' }}>
        <article style={{ display: 'flex', gap: 'var(--space-md)', padding: 'var(--space-md) 0', borderBottom: '1px solid var(--ivd-gray-100)', transition: 'opacity var(--transition-fast)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
        >
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--radius-md)', flexShrink: 0,
            background: `${article.coverColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: cat?.color, border: `1px solid ${cat?.color}30`,
          }}>
            {getCategoryIcon(article.category, 24, cat?.color || 'currentColor')}
          </div>
          <div style={{ minWidth: 0 }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: cat?.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{cat?.label}</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--ivd-black)', lineHeight: 1.3, marginTop: '0.25rem' }}>
              {article.title}
            </h3>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/articulos/${article.slug}`} className="card card-default" style={{ textDecoration: 'none', display: 'block' }}>
      <article style={{
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        border: '1px solid var(--ivd-gray-200)', background: 'var(--ivd-white)',
        transition: 'all var(--transition-base)', cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%',
      }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'translateY(-4px)'
          el.style.boxShadow = 'var(--shadow-lg)'
          el.style.borderColor = `${article.coverColor}80`
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'translateY(0)'
          el.style.boxShadow = 'none'
          el.style.borderColor = 'var(--ivd-gray-200)'
        }}
      >
        <div style={{ height: 4, background: article.coverColor }} />
        <div style={{ padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              fontSize: '0.6875rem', fontWeight: 700, color: cat?.color,
              textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              {categoryIcon}
              {cat?.label}
            </span>
            <time style={{ fontSize: '0.75rem', color: 'var(--ivd-gray-500)' }} dateTime={article.date}>{dateStr}</time>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1875rem', fontWeight: 700, color: 'var(--ivd-black)', lineHeight: 1.3, marginBottom: 'var(--space-sm)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {article.title}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--ivd-gray-600)', lineHeight: 1.7, marginBottom: 'var(--space-lg)', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {article.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'var(--space-sm)', borderTop: '1px solid var(--ivd-gray-100)', marginTop: 'auto' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--ivd-gray-700)', fontWeight: 500 }}>{article.author}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--ivd-gray-500)' }}>
              <Clock size={13} /> {article.readTime} min
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}