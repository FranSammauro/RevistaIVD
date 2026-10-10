'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import { CATEGORIES } from '@/lib/types'
import { getCategoryIcon } from '@/components/icons'
import type { ArticleMeta } from '@/lib/types'
import { Search, Filter } from 'lucide-react'

function ArticlesContent({ initialArticles }: { initialArticles: ArticleMeta[] }) {
  const searchParams = useSearchParams()
  const catParam = searchParams.get('cat')
  const [activeCategory, setActiveCategory] = useState<string | null>(catParam)
  const [query, setQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => { setActiveCategory(catParam) }, [catParam])

  const filtered = initialArticles
    .filter(a => !activeCategory || a.category === activeCategory)
    .filter(a =>
      !query ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(query.toLowerCase())
    )

  return (
    <div style={{ paddingTop: 96, minHeight: '100vh' }}>
      <section className="bg-noise" style={{
        position: 'relative', background: 'var(--ivd-black)', padding: 'var(--space-3xl) var(--container-padding)',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(200,16,46,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} aria-hidden="true" />
        <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: 'var(--space-lg)', opacity: 0, animation: 'fadeUp 0.6s ease forwards' }}>
            <span className="font-caption" style={{ color: 'var(--ivd-red)' }}>RevistaIVD</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', lineHeight: 1.1, marginBottom: 'var(--space-lg)', opacity: 0, animation: 'fadeUp 0.6s ease 0.1s forwards' }}>
            {activeCategory ? CATEGORIES[activeCategory]?.label : 'Todos los artículos'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.0625rem', maxWidth: 560, opacity: 0, animation: 'fadeUp 0.6s ease 0.2s forwards' }}>
            {activeCategory
              ? `Explorá los artículos de ${CATEGORIES[activeCategory]?.label.toLowerCase()}.`
              : 'Navegá por todo el catálogo de divulgación científica.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
            <div className="glass" style={{ display: 'flex', gap: 'var(--space-sm)', padding: 'var(--space-sm)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--ivd-gray-200)' }}>
              <Search size={18} style={{ color: 'var(--ivd-gray-400)', flexShrink: 0, margin: 'auto 0 auto var(--space-sm)' }} aria-hidden="true" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar por título, autor o contenido..."
                className="input"
                style={{ border: 'none', background: 'transparent', padding: 'var(--space-sm) 0', fontSize: '0.9375rem', flex: 1 }}
                aria-label="Buscar artículos"
              />
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveCategory(null)}
                className={`btn ${!activeCategory ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '0.5rem 1.125rem', fontSize: '0.8125rem' }}
              >
                Todos
              </button>
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key === activeCategory ? null : key)}
                  className={`btn ${activeCategory === key ? 'btn-primary' : 'btn-outline'}`}
                  style={{
                    padding: '0.5rem 1.125rem', fontSize: '0.8125rem',
                    background: activeCategory === key ? cat.color : undefined,
                    borderColor: activeCategory === key ? cat.color : undefined,
                    color: activeCategory === key ? 'white' : undefined,
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                    {getCategoryIcon(key, 13, activeCategory === key ? 'white' : cat.color)}
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-main" style={{ padding: 'var(--space-3xl) var(--container-padding)' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-4xl) 0', color: 'var(--ivd-gray-500)' }}>
            <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)' }}>🔍</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 'var(--space-sm)' }}>No se encontraron artículos</h2>
            <p style={{ fontSize: '1rem' }}>Probá con otros términos o cambá la categoría.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-lg)' }}>
            {filtered.map((article, index) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default function ArticlesClient({ initialArticles }: { initialArticles: ArticleMeta[] }) {
  return (
    <Suspense fallback={
      <div style={{ paddingTop: 96, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-pulse-soft" style={{ width: '100%', maxWidth: '1200px', padding: '0 var(--container-padding)' }}>
          <div style={{ height: 200, background: 'var(--ivd-gray-100)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-xl)' }} />
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ height: 380, background: 'var(--ivd-gray-100)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-lg)' }} />
          ))}
        </div>
      </div>
    }>
      <ArticlesContent initialArticles={initialArticles} />
    </Suspense>
  )
}