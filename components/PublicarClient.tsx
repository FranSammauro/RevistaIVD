'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCategoryIcon } from '@/components/icons'
import { CATEGORIES } from '@/lib/types'
import { LogOut, Send, FileText, Star, Clock } from 'lucide-react'

interface User { username: string; displayName: string; category: string }

export default function PublicarClient({ user }: { user: User }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [readTime, setReadTime] = useState(5)
  const [featured, setFeatured] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const cat = CATEGORIES[user.category]

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setSuccess('')
    setPublishing(true)
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, excerpt, content, readTime, featured }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setSuccess(`¡Artículo publicado! Podés verlo en /articulos/${data.slug}`)
      setTitle(''); setExcerpt(''); setContent(''); setReadTime(5); setFeatured(false)
    } catch {
      setError('Error al publicar. Intentá de nuevo.')
    } finally {
      setPublishing(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: '1px solid var(--ivd-gray)', borderRadius: 8,
    outline: 'none', color: 'var(--ivd-black)',
    fontFamily: 'var(--font-body)',
  }

  const labelStyle = {
    display: 'block', fontSize: '0.78rem', fontWeight: 700 as const,
    color: 'var(--ivd-red)', letterSpacing: '0.08em',
    textTransform: 'uppercase' as const, marginBottom: '0.6rem',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivd-gray)', paddingTop: 80 }}>
      {/* Header */}
      <div style={{ background: 'var(--ivd-black)', borderBottom: '1px solid rgba(200,16,46,0.2)', padding: '1rem 1.25rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/escudo-ivd.png" alt="IVD" width={32} height={32} style={{ objectFit: 'contain', display: 'block' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white', fontSize: '1rem' }}>
                Revista<span style={{ color: 'var(--ivd-red)' }}>IVD</span> · Panel docente
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ color: cat?.color }}>{getCategoryIcon(user.category, 11, cat?.color)}</span>
                {user.displayName} · {cat?.label}
              </div>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: 5, background: 'none',
            border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)',
            borderRadius: 8, padding: '7px 13px', cursor: 'pointer',
            fontSize: '0.82rem', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap',
          }}>
            <LogOut size={14} /> Salir
          </button>
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1.25rem' }}>
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <div className="red-line" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ivd-red)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Nuevo artículo</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: 'var(--ivd-black)' }}>
            Publicar en {cat?.label}
          </h1>
        </div>

        <form onSubmit={handlePublish}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: 'white', borderRadius: 12, padding: '1.25rem', border: '1px solid var(--ivd-gray)' }}>
              <label style={labelStyle}><FileText size={13} style={{ display: 'inline', marginRight: 5 }} />Título *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} required
                placeholder="Ej: Reacciones de oxidación en la vida cotidiana"
                style={{ ...inputStyle, fontSize: '1.05rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}
                onFocus={e => (e.target.style.borderColor = 'var(--ivd-red)')}
                onBlur={e => (e.target.style.borderColor = 'var(--ivd-gray)')}
              />
            </div>

            <div style={{ background: 'white', borderRadius: 12, padding: '1.25rem', border: '1px solid var(--ivd-gray)' }}>
              <label style={labelStyle}>Resumen (2-3 oraciones) *</label>
              <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} required rows={3}
                placeholder="Una descripción breve que aparece en las tarjetas..."
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={e => (e.target.style.borderColor = 'var(--ivd-red)')}
                onBlur={e => (e.target.style.borderColor = 'var(--ivd-gray)')}
              />
            </div>

            <div style={{ background: 'white', borderRadius: 12, padding: '1.25rem', border: '1px solid var(--ivd-gray)' }}>
              <label style={labelStyle}>Contenido (Markdown) *</label>
              <p style={{ fontSize: '0.77rem', color: 'var(--ivd-gray-mid)', marginBottom: '0.6rem' }}>
                <code style={{ background: 'var(--ivd-gray)', padding: '1px 5px', borderRadius: 3 }}>## Título</code>{' '}
                <code style={{ background: 'var(--ivd-gray)', padding: '1px 5px', borderRadius: 3 }}>**negrita**</code>{' '}
                <code style={{ background: 'var(--ivd-gray)', padding: '1px 5px', borderRadius: 3 }}>*itálica*</code>{' '}
                <code style={{ background: 'var(--ivd-gray)', padding: '1px 5px', borderRadius: 3 }}>&gt; cita</code>
              </p>
              <textarea value={content} onChange={e => setContent(e.target.value)} required rows={18}
                placeholder="## Introducción&#10;&#10;Escribí el contenido acá..."
                style={{ ...inputStyle, fontFamily: 'var(--font-mono)', fontSize: '0.88rem', resize: 'vertical', lineHeight: 1.7 }}
                onFocus={e => (e.target.style.borderColor = 'var(--ivd-red)')}
                onBlur={e => (e.target.style.borderColor = 'var(--ivd-gray)')}
              />
            </div>

            <div style={{ background: 'white', borderRadius: 12, padding: '1.25rem', border: '1px solid var(--ivd-gray)', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div>
                <label style={labelStyle}><Clock size={13} style={{ display: 'inline', marginRight: 5 }} />Lectura (min)</label>
                <input type="number" min={1} max={30} value={readTime} onChange={e => setReadTime(Number(e.target.value))}
                  style={{ width: 70, padding: '8px 10px', border: '1px solid var(--ivd-gray)', borderRadius: 8, fontSize: '0.95rem', fontFamily: 'var(--font-body)', outline: 'none', textAlign: 'center' }}
                />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: 'var(--ivd-red)', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ivd-gray-dark)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Star size={14} color="var(--ivd-red)" /> Destacado
                </span>
              </label>
            </div>

            {error && <div style={{ padding: '12px 16px', background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: 10, color: '#cc0000', fontSize: '0.88rem' }}>⚠️ {error}</div>}
            {success && <div style={{ padding: '12px 16px', background: '#f0fff4', border: '1px solid #b3e6c5', borderRadius: 10, color: '#1a7a3a', fontSize: '0.88rem' }}>✅ {success}</div>}

            <button type="submit" disabled={publishing}
              style={{
                padding: '13px 28px', background: publishing ? 'rgba(200,16,46,0.5)' : 'var(--ivd-red)',
                color: 'white', border: 'none', borderRadius: 10, fontWeight: 700,
                fontSize: '0.95rem', cursor: publishing ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontFamily: 'var(--font-body)', alignSelf: 'flex-start',
              }}>
              <Send size={16} />
              {publishing ? 'Publicando...' : 'Publicar artículo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
