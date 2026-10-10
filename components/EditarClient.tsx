'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCategoryIcon } from '@/components/icons'
import { CATEGORIES } from '@/lib/types'
import type { ArticleMeta } from '@/lib/types'
import { LogOut, Save, FileText, Star, Clock, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'

interface User { username: string; displayName: string; category: string }
interface Article extends ArticleMeta { content: string }

export default function EditarClient({ user, article }: { user: User; article: Article }) {
  const router = useRouter()
  const [title, setTitle] = useState(article.title)
  const [excerpt, setExcerpt] = useState(article.excerpt)
  const [content, setContent] = useState(article.content)
  const [readTime, setReadTime] = useState(article.readTime)
  const [featured, setFeatured] = useState(article.featured)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const cat = CATEGORIES[user.category]
  const categoryColor = cat?.color || '#C8102E'

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setSuccess('')
    setSaving(true)
    try {
      const res = await fetch(`/api/articles/${article.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, excerpt, content, readTime, featured }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setSuccess('¡Cambios guardados!')
      setTimeout(() => router.push(`/articulos/${data.slug ?? article.slug}`), 1200)
    } catch {
      setError('Error al guardar.')
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem', fontSize: '0.9375rem', fontFamily: 'var(--font-body)',
    background: 'var(--ivd-white)', border: '1px solid var(--ivd-gray-200)', borderRadius: 'var(--radius-md)',
    color: 'var(--ivd-black)', outline: 'none', transition: 'all var(--transition-fast)',
  }

  const textareaStyle: React.CSSProperties = {
    ...inputStyle, resize: 'vertical', lineHeight: 1.7, fontFamily: 'var(--font-mono)', fontSize: '0.875rem',
  }

  const labelStyle = {
    display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--ivd-red)',
    letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivd-gray-50)', paddingTop: 96 }}>
      <header className="glass-dark" style={{
        position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(200,16,46,0.15)',
        padding: 'var(--space-md) var(--container-padding)',
      }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/escudo-ivd.svg" alt="" width={36} height={36} style={{ display: 'block' }} aria-hidden="true" />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white', fontSize: '1.0625rem' }}>
                Revista<span style={{ color: 'var(--ivd-red)' }}>IVD</span> · Editar
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ color: cat?.color }}>{getCategoryIcon(user.category, 12, cat?.color || 'currentColor')}</span>
                {user.displayName}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link href={`/articulos/${article.slug}`} className="focus-visible" style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.8125rem',
              padding: '0.5rem 0.875rem', borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)',
              fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', transition: 'all var(--transition-fast)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
            >
              <ArrowLeft size={15} /> Ver artículo
            </Link>
            <button onClick={handleLogout} className="focus-visible" style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'none',
              border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)',
              borderRadius: 'var(--radius-md)', padding: '0.5rem 0.875rem', cursor: 'pointer',
              fontSize: '0.8125rem', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap',
              transition: 'all var(--transition-fast)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
            >
              <LogOut size={15} /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="container-main" style={{ padding: 'var(--space-3xl) var(--container-padding) var(--space-4xl)' }}>
        <div style={{ marginBottom: 'var(--space-2xl)', maxWidth: 800 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-sm)' }}>
            <div className="red-line" />
            <span className="font-caption">Editando artículo</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--ivd-black)' }}>
            {title || 'Sin título'}
          </h1>
        </div>

        <form onSubmit={handleSave} style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

            <div className="card" style={{ padding: 'var(--space-lg)' }}>
              <label style={labelStyle}><FileText size={14} style={{ display: 'inline-block', marginRight: '0.375rem', verticalAlign: '-1px' }} /> Título *</label>
              <input
                value={title} onChange={e => setTitle(e.target.value)} required
                style={{ ...inputStyle, fontSize: '1.0625rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}
              />
            </div>

            <div className="card" style={{ padding: 'var(--space-lg)' }}>
              <label style={labelStyle}>Resumen *</label>
              <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} required rows={3} style={textareaStyle} />
            </div>

            <div className="card" style={{ padding: 'var(--space-lg)' }}>
              <label style={labelStyle}>Contenido (Markdown) *</label>
              <div style={{ marginBottom: '0.5rem', padding: 'var(--space-sm) var(--space-md)', background: 'var(--ivd-gray-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--ivd-gray-100)', fontSize: '0.75rem', color: 'var(--ivd-gray-600)' }}>
                <strong>Referencia rápida:</strong>{' '}
                <code style={{ background: 'var(--ivd-white)', padding: '0.125rem 0.375rem', borderRadius: '3px', margin: '0 0.125rem' }}>## Título</code>
                <code style={{ background: 'var(--ivd-white)', padding: '0.125rem 0.375rem', borderRadius: '3px', margin: '0 0.125rem' }}>**negrita**</code>
                <code style={{ background: 'var(--ivd-white)', padding: '0.125rem 0.375rem', borderRadius: '3px', margin: '0 0.125rem' }}>*itálica*</code>
                <code style={{ background: 'var(--ivd-white)', padding: '0.125rem 0.375rem', borderRadius: '3px', margin: '0 0.125rem' }}>{'>>'} cita</code>
                <code style={{ background: 'var(--ivd-white)', padding: '0.125rem 0.375rem', borderRadius: '3px', margin: '0 0.125rem' }}>• lista</code>
                <code style={{ background: 'var(--ivd-white)', padding: '0.125rem 0.375rem', borderRadius: '3px', margin: '0 0.125rem' }}>```código```</code>
              </div>
              <textarea value={content} onChange={e => setContent(e.target.value)} required rows={24} style={{ ...textareaStyle, minHeight: 480 }} />
            </div>

            <div className="card" style={{ padding: 'var(--space-lg)', display: 'flex', gap: 'var(--space-xl)', flexWrap: 'wrap', alignItems: 'center' }}>
              <div>
                <label style={labelStyle}><Clock size={14} style={{ display: 'inline-block', marginRight: '0.375rem', verticalAlign: '-1px' }} /> Lectura (min)</label>
                <input type="number" min={1} max={30} value={readTime} onChange={e => setReadTime(Number(e.target.value))}
                  style={{ width: 80, padding: '0.625rem 0.875rem', border: '1px solid var(--ivd-gray-200)', borderRadius: 'var(--radius-md)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)', outline: 'none', textAlign: 'center', background: 'var(--ivd-white)', color: 'var(--ivd-black)' }}
                />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem 0.875rem', background: 'var(--ivd-gray-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--ivd-gray-200)' }}>
                <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: 'var(--ivd-red)', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ivd-gray-700)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Star size={15} color="var(--ivd-red)" /> Destacado en portada
                </span>
              </label>
            </div>

            {error && (
              <div style={{ padding: 'var(--space-md) var(--space-lg)', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 'var(--radius-md)', color: '#991B1B', fontSize: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div style={{ padding: 'var(--space-md) var(--space-lg)', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 'var(--radius-md)', color: '#166534', fontSize: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle size={18} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                <span>{success}</span>
              </div>
            )}

            <button type="submit" disabled={saving} className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start', minWidth: 200 }}>
              <Save size={18} />
              {saving ? 'Guardando…' : 'Guardar cambios'}
            </button>

          </div>
        </form>
      </main>
    </div>
  )
}