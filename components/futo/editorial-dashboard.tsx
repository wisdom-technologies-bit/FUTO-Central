'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, FilePlus2, LayoutDashboard, LogOut, Menu, Settings, ShieldCheck, Tags, Upload, Users, X } from 'lucide-react'
import type { EditorialOverview } from '@/lib/editorial-data'

const items = [['Dashboard', '/editorial', LayoutDashboard], ['News', '/editorial/news', FilePlus2], ['Create Post', '/editorial/news/new', FilePlus2], ['Categories', '/editorial/categories', Tags], ['Events', '/editorial/events', FilePlus2], ['Submissions', '/editorial/submissions', FilePlus2], ['Media', '/editorial/media', Upload], ['Admins', '/editorial/admins', Users], ['Settings', '/editorial/settings', Settings]] as const

export function EditorialDashboard({ overview }: { overview: EditorialOverview }) {
  const [open, setOpen] = useState(false)
  return <div className="editorial-shell">
    <aside className={open ? 'editorial-sidebar is-open' : 'editorial-sidebar'}>
      <div className="editorial-brand"><ShieldCheck size={20} /><span>FUTO Central</span><button className="editorial-close" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={18} /></button></div>
      <p className="editorial-kicker">Editorial Dashboard</p>
      <nav className="editorial-nav" aria-label="Editorial navigation">{items.map(([label, href, Icon]) => <Link href={href} key={label} onClick={() => setOpen(false)}><Icon size={17} />{label}</Link>)}</nav>
      <div className="editorial-sidebar-bottom"><Link href="/"><ArrowLeft size={16} />View public site</Link><form action="/api/editorial/logout" method="post"><button type="submit"><LogOut size={16} />Log out</button></form></div>
    </aside>
    {open && <button className="editorial-overlay" onClick={() => setOpen(false)} aria-label="Close navigation" />}
    <main className="editorial-main"><header className="editorial-topbar"><button className="editorial-menu" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={21} /></button><div><p className="eyebrow">FUTO CENTRAL / CMS</p><h1>Good morning, editor</h1></div><Link className="button button-gold" href="/editorial/news/new"><FilePlus2 size={16} />Create post</Link></header>
      <section className="editorial-notice"><div><strong>Neon database connected</strong><p>Live editorial content and server actions are now backed by the configured Neon database.</p></div><span className="status-pill">Operational</span></section>
      <section className="editorial-stats" aria-label="Editorial overview">{[['Articles', overview.articles], ['Published', overview.published], ['Drafts', overview.drafts], ['Submissions', overview.submissions]].map(([label, value]) => <article key={label as string}><span>{label}</span><strong>{value}</strong><small>Live database count</small></article>)}</section>
      <section className="editorial-grid"><article className="editorial-panel"><div className="panel-heading"><div><p className="eyebrow">CONTENT WORKFLOW</p><h2>Recent articles</h2></div><Link href="/editorial/news">View all</Link></div>{overview.recentArticles.length ? <div className="editorial-list">{overview.recentArticles.map((article) => <Link href={`/editorial/news?article=${article.id}`} className="editorial-list-row" key={article.id}><span>{article.title}</span><small>{article.status}</small></Link>)}</div> : <div className="empty-editorial"><FilePlus2 size={26} /><strong>No articles yet</strong><p>Create the first draft for the newsroom.</p><Link className="text-link" href="/editorial/news/new">Create a draft</Link></div>}</article><article className="editorial-panel"><div className="panel-heading"><div><p className="eyebrow">COMMUNITY DESK</p><h2>Story submissions</h2></div><Link href="/editorial/submissions">View all</Link></div><div className="empty-editorial"><Users size={26} /><strong>{overview.submissions ? `${overview.submissions} submissions need review` : 'No submissions need review'}</strong><p>Incoming community stories are synced from Neon.</p></div></article></section>
    </main>
  </div>
}

export function EditorialLogin() { return <main className="editorial-login"><div className="login-card"><div className="editorial-brand"><ShieldCheck size={22} /><span>FUTO Central</span></div><p className="eyebrow">EDITORIAL DASHBOARD</p><h1>Sign in to your desk</h1><p className="muted">Secure access for the FUTO Central editorial team.</p><form action="/api/editorial/login" method="post" onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); fetch('/api/editorial/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: form.get('email'), password: form.get('password') }) }).then(async (response) => { if (response.ok) window.location.href = '/editorial'; else alert('Invalid credentials') }).catch(() => alert('Unable to sign in')) }}><label htmlFor="email">Email<input id="email" name="email" type="email" required autoComplete="email" /></label><label htmlFor="password">Password<input id="password" name="password" type="password" required autoComplete="current-password" /></label><button className="button button-green" type="submit">Sign in</button></form><Link className="muted text-link" href="/">Return to public site</Link></div></main> }
