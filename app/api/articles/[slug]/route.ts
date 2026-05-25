import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDir = path.join(process.cwd(), 'content/articulos')

async function getAuthUser() {
  const cookieStore = await cookies()
  const raw = cookieStore.get('auth_user')?.value
  if (!raw) return null
  try { return JSON.parse(raw) as { category: string; username: string; displayName: string } } catch { return null }
}

// GET single article (for edit page)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(article)
}

// PUT - update article (owner only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const article = getArticleBySlug(slug)
  if (!article) return NextResponse.json({ error: 'Artículo no encontrado' }, { status: 404 })
  if (article.category !== user.category) {
    return NextResponse.json({ error: 'Sin permisos para editar este artículo' }, { status: 403 })
  }

  const { title, excerpt, content, readTime, featured } = await req.json()
  if (!title || !excerpt || !content) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  const filePath = path.join(articlesDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 })

  // Read existing frontmatter to preserve date, coverColor, etc.
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(raw)

  const updated = `---
title: "${title.replace(/"/g, "'")}"
slug: ${slug}
excerpt: "${excerpt.replace(/"/g, "'")}"
category: ${data.category}
author: "${data.author}"
date: "${data.date}"
readTime: ${readTime || data.readTime}
featured: ${featured ? 'true' : 'false'}
coverColor: "${data.coverColor}"
---

${content}
`
  fs.writeFileSync(filePath, updated, 'utf8')
  return NextResponse.json({ ok: true, slug })
}

// DELETE - remove article (owner only)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const articles = getAllArticles()
  const article = articles.find(a => a.slug === slug)
  if (!article) return NextResponse.json({ error: 'Artículo no encontrado' }, { status: 404 })
  if (article.category !== user.category) {
    return NextResponse.json({ error: 'Sin permisos para eliminar este artículo' }, { status: 403 })
  }

  const filePath = path.join(articlesDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 })

  fs.unlinkSync(filePath)
  return NextResponse.json({ ok: true })
}
