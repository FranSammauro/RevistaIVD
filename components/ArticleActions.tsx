'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, AlertCircle, CheckCircle, X } from 'lucide-react'

export default function ArticleActions({ slug }: { slug: string }) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!confirming) { setConfirming(true); return }
    setDeleting(true)
    const res = await fetch(`/api/articles/${slug}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/articulos')
      router.refresh()
    } else {
      setDeleting(false)
      setConfirming(false)
      alert('Error al eliminar el artículo.')
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--ivd-gray-500)', fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Acciones:
      </span>
      <a href={`/publicar/editar/${slug}`} className="focus-visible" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
        padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)',
        border: '1px solid var(--ivd-gray-200)', color: 'var(--ivd-gray-700)', textDecoration: 'none',
        fontSize: '0.8125rem', fontWeight: 600, fontFamily: 'var(--font-body)',
        background: 'var(--ivd-white)', transition: 'all var(--transition-fast)',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#1A4A8A'; e.currentTarget.style.color = '#1A4A8A'; e.currentTarget.style.background = '#EFF6FF' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--ivd-gray-200)'; e.currentTarget.style.color = 'var(--ivd-gray-700)'; e.currentTarget.style.background = 'var(--ivd-white)' }}
      >
        <Pencil size={14} /> Editar
      </a>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="focus-visible"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
          padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)',
          border: `1px solid ${confirming ? '#C8102E' : 'var(--ivd-gray-200)'}`,
          background: confirming ? '#C8102E' : 'var(--ivd-white)',
          color: confirming ? 'white' : 'var(--ivd-gray-700)',
          fontSize: '0.8125rem', fontWeight: 600, fontFamily: 'var(--font-body)',
          cursor: deleting ? 'not-allowed' : 'pointer', transition: 'all var(--transition-fast)',
        }}
        onMouseEnter={e => {
          if (!confirming && !deleting) {
            e.currentTarget.style.borderColor = '#C8102E'
            e.currentTarget.style.color = '#C8102E'
            e.currentTarget.style.background = '#FEF2F2'
          }
        }}
        onMouseLeave={e => {
          if (!confirming && !deleting) {
            e.currentTarget.style.borderColor = 'var(--ivd-gray-200)'
            e.currentTarget.style.color = 'var(--ivd-gray-700)'
            e.currentTarget.style.background = 'var(--ivd-white)'
          }
        }}
      >
        <Trash2 size={14} />
        {deleting ? 'Eliminando…' : confirming ? '¿Confirmar?' : 'Eliminar'}
      </button>
      {confirming && !deleting && (
        <button onClick={() => setConfirming(false)} className="focus-visible" style={{
          fontSize: '0.8125rem', color: 'var(--ivd-gray-500)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
          display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem 0',
        }}>
          <X size={14} /> Cancelar
        </button>
      )}
    </div>
  )
}