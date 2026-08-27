import { requireAdmin } from '@/lib/editorial-auth'
import { EditorialDashboard } from '@/components/futo/editorial-dashboard'

export const metadata = { title: 'Editorial Dashboard | FUTO Central', robots: { index: false, follow: false } }

export default async function EditorialPage() {
  await requireAdmin()
  return <EditorialDashboard />
}
