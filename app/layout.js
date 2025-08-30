import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Blog Platform - Latest Articles and Stories',
    template: '%s | Blog Platform'
  },
  description: 'Discover the latest articles, insights, and stories from our expert writers.',
  keywords: 'blog, articles, stories, insights, latest news',
  authors: [{ name: 'Blog Platform' }],
  creator: 'Blog Platform',
  publisher: 'Blog Platform',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Blog Platform',
    title: 'Blog Platform - Latest Articles and Stories',
    description: 'Discover the latest articles, insights, and stories from our expert writers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Platform - Latest Articles and Stories',
    description: 'Discover the latest articles, insights, and stories from our expert writers.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
