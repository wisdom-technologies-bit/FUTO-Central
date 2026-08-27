import type { Metadata } from 'next'
import NewsPage from '@/components/futo/news-page'

export const metadata: Metadata = {
  title: 'FUTO News — Latest News, Updates & Stories | FUTO Central',
  description: 'Read the latest FUTO news, campus updates, academic stories, student life, events, sports, technology developments and opportunities on FUTO Central.',
  openGraph: { title: 'FUTO News — Latest News, Updates & Stories | FUTO Central', description: 'The latest stories and updates from the FUTO community.' },
}

export default function Page() { return <NewsPage /> }
