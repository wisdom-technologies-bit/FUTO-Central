import Link from 'next/link'
import { ArrowLeft, Database, FilePlus2 } from 'lucide-react'
import { requireAdmin } from '@/lib/editorial-auth'
import { getEditorialSection, formatEditorialDate } from '@/lib/editorial-data'

const labels: Record<string, [string, string]> = { news: ['Newsroom', 'Manage drafts, published stories and scheduled articles.'], categories: ['Categories', 'Manage the publication taxonomy used across the newsroom.'], events: ['Events', 'Manage upcoming and completed community events.'], submissions: ['Story submissions', 'Review potential stories sent by the FUTO community.'], media: ['Media library', 'Review hosted images and videos.'], admins: ['Administrators', 'Manage editorial access and team roles.'], settings: ['Site settings', 'Manage publication details and configurable contact information.'] }

export default async function EditorialSectionPage({ params }: { params: Promise<{ section: string }> }) {
  await requireAdmin()
  const { section } = await params
  const [title, description] = labels[section] ?? ['Editorial workspace', 'This editorial section is ready for database-backed content.']
  const rows = await getEditorialSection(section)
  return <main className="editorial-main standalone-editor"><Link className="text-link" href="/editorial"><ArrowLeft size={16}/>Back to dashboard</Link><header className="editorial-topbar" style={{ marginTop: 30 }}><div><p className="eyebrow">FUTO CENTRAL / CMS</p><h1>{title}</h1><p className="muted">{description}</p></div>{section === 'news' && <Link className="button button-gold" href="/editorial/news/new"><FilePlus2 size={16}/>Create post</Link>}</header><section className="editorial-panel editorial-table" style={{ marginTop: 20 }}><div className="panel-heading"><h2>Live records</h2><span className="status-pill">{rows.length} records</span></div>{rows.length ? <div className="editorial-list">{rows.map((row: Record<string, unknown>) => <div className="editorial-list-row" key={String(row.id ?? row.key)}><span>{String(row.title ?? row.name ?? row.email ?? row.key ?? row.public_id ?? 'Record')}</span><small>{String(row.status ?? (row.created_at ? formatEditorialDate(String(row.created_at)) : 'Active'))}</small></div>)}</div> : <div className="empty-editorial"><Database size={30}/><strong>No records yet</strong><p>This workspace is connected to Neon and will display new records here.</p></div>}</section></main>
}
