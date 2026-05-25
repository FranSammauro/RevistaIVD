'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn, Eye, EyeOff } from 'lucide-react'

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

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--ivd-black)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(200,16,46,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(200,16,46,0.06) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,16,46,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20, padding: '3rem',
        width: '100%', maxWidth: 420,
        backdropFilter: 'blur(12px)',
        position: 'relative', zIndex: 1,
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <img src="/escudo-ivd.png" alt="IVD" width={56} height={56} style={{ objectFit: "contain", display: "block" }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: 'white', marginBottom: '0.35rem' }}>
            Acceso docentes
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>
            RevistaIVD · Área de Ciencias Naturales
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="ej: quimica"
              required
              autoComplete="username"
              style={{
                width: '100%', padding: '12px 16px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10, color: 'white', fontSize: '0.95rem',
                outline: 'none', fontFamily: 'var(--font-body)',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--ivd-red)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{
                  width: '100%', padding: '12px 44px 12px 16px',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 10, color: 'white', fontSize: '0.95rem',
                  outline: 'none', fontFamily: 'var(--font-body)',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--ivd-red)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 4 }}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ padding: '10px 14px', background: 'rgba(200,16,46,0.15)', border: '1px solid rgba(200,16,46,0.4)', borderRadius: 8, color: '#ff6b6b', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '13px', background: loading ? 'rgba(200,16,46,0.5)' : 'var(--ivd-red)',
              color: 'white', border: 'none', borderRadius: 10, fontWeight: 700,
              fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '0.5rem', fontFamily: 'var(--font-body)',
            }}
          >
            <LogIn size={18} />
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)' }}>
          Solo para docentes del área · No hay registro público
        </p>
      </div>
    </div>
  )
}
