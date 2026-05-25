import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  // Auth check
  const cookieStore = await cookies()
  const raw = cookieStore.get('auth_user')?.value
  if (!raw) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  let user: { username: string; displayName: string; category: string }
  try { user = JSON.parse(raw) } catch {
    return NextResponse.json({ error: 'Sesión inválida' }, { status: 401 })
  }

  const { title, excerpt, content, readTime, featured } = await req.json()

  if (!title || !excerpt || !content) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60)

  const date = new Date().toISOString().split('T')[0]

  // Category color map
  const coverColors: Record<string, string> = {
    quimica: '#C8102E',
    fisica: '#1A4A8A',
    'ciencias-de-la-tierra': '#2D6A2D',
    biologia: '#7A3B8C',
  }

  const mdx = `---
title: "${title.replace(/"/g, "'")}"
slug: ${slug}
excerpt: "${excerpt.replace(/"/g, "'")}"
category: ${user.category}
author: "${user.displayName}"
date: "${date}"
readTime: ${readTime || 5}
featured: ${featured ? 'true' : 'false'}
coverColor: "${coverColors[user.category] || '#C8102E'}"
---

${content}
`

  const articlesDir = path.join(process.cwd(), 'content/articulos')
  if (!fs.existsSync(articlesDir)) fs.mkdirSync(articlesDir, { recursive: true })

  const filePath = path.join(articlesDir, `${slug}.mdx`)
  if (fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Ya existe un artículo con ese título' }, { status: 409 })
  }

  fs.writeFileSync(filePath, mdx, 'utf8')

  return NextResponse.json({ ok: true, slug })
}
