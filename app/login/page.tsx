'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      router.push('/publicar')
      router.refresh()
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '0.875rem 1rem', fontSize: '0.9375rem', fontFamily: 'var(--font-body)',
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--radius-md)',
    color: 'white', outline: 'none', transition: 'all var(--transition-fast)',
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--ivd-black)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'var(--space-xl) var(--container-padding)', position: 'relative', overflow: 'hidden',
    }}>
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none' }} aria-hidden="true" />
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,16,46,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      <div className="glass-dark" style={{
        width: '100%', maxWidth: 420, padding: 'var(--space-2xl)', borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(200,16,46,0.15)', position: 'relative', zIndex: 1,
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-lg)' }}>
            <img src="/escudo-ivd.svg" alt="" width={64} height={64} style={{ objectFit: 'contain', display: 'block' }} aria-hidden="true" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: 'white', marginBottom: 'var(--space-xs)' }}>
            Acceso docentes
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)' }}>
            RevistaIVD · Área de Ciencias Naturales
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div>
            <label htmlFor="username" style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Usuario
            </label>
            <input
              id="username" type="text" value={username} onChange={e => setUsername(e.target.value)}
              placeholder="ej: quimica" required autoComplete="username"
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--ivd-red)'; e.target.style.boxShadow = '0 0 0 3px rgba(200,16,46,0.15)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                required autoComplete="current-password"
                style={{ ...inputStyle, paddingRight: '3.5rem' }}
                onFocus={e => { e.target.style.borderColor = 'var(--ivd-red)'; e.target.style.boxShadow = '0 0 0 3px rgba(200,16,46,0.15)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none' }}
              />
              <button
                type="button" onClick={() => setShowPw(!showPw)}
                style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label={showPw ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ padding: 'var(--space-md) var(--space-lg)', background: 'rgba(200,16,46,0.15)', border: '1px solid rgba(200,16,46,0.3)', borderRadius: 'var(--radius-md)', color: '#FCA5A5', fontSize: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
            <LogIn size={18} />
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 'var(--space-xl)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>
          Solo para docentes del área · No hay registro público
        </p>
      </div>
    </div>
  )
}