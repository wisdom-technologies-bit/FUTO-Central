import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FUTO Central — FUTO News, Campus Updates & Stories',
  description: 'FUTO Central brings you the latest news, announcements, campus stories, academic updates, events, opportunities and developments from the Federal University of Technology, Owerri.',
  generator: 'v0.app',
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-32x32-vEY30c4JOE2iKePtBlVSFF4A4q9cnk.png',
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apple-touch-icon-EycjI1VWLDfAqe9dcQIwwzxBfxbbBp.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#073b25',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
