import Link from 'next/link'
import { ArrowLeft, Database, FilePlus2 } from 'lucide-react'
import { requireAdmin } from '@/lib/editorial-auth'

const labels: Record<string, [string, string]> = { news: ['Newsroom', 'Manage drafts, published stories and scheduled articles.'], categories: ['Categories', 'Manage the publication taxonomy used across the newsroom.'], events: ['Events', 'Manage upcoming and completed community events.'], submissions: ['Story submissions', 'Review potential stories sent by the FUTO community.'], media: ['Media library', 'Review Cloudinary-hosted images and videos.'], admins: ['Administrators', 'Manage editorial access and team roles.'], settings: ['Site settings', 'Manage publication details and configurable contact information.'] }

export default async function EditorialSectionPage({ params }: { params: Promise<{ section: string }> }) {
  await requireAdmin()
  const { section } = await params
  const [title, description] = labels[section] ?? ['Editorial workspace', 'This editorial section is ready for database-backed content.']
  return <main className="editorial-main standalone-editor"><Link className="text-link" href="/editorial"><ArrowLeft size={16}/>Back to dashboard</Link><header className="editorial-topbar" style={{ marginTop: 30 }}><div><p className="eyebrow">FUTO CENTRAL / CMS</p><h1>{title}</h1><p className="muted">{description}</p></div>{section === 'news' && <Link className="button button-gold" href="/editorial/news/new"><FilePlus2 size={16}/>Create post</Link>}</header><section className="empty-editorial editorial-panel" style={{ marginTop: 20, minHeight: 360 }}><Database size={30}/><strong>Database connection required</strong><p>This workspace does not invent or display content until DATABASE_URL is configured and the schema in <code>seed-database.sql</code> has been applied.</p><Link className="text-link" href="/editorial">Return to dashboard</Link></section></main>
}
