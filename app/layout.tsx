import type React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import YoutubePlayer from '@/components/play/youtube-player'
import {
  APP_DESCRIPTION,
  APP_SITE_URL,
  APP_SLOGAN,
  APP_TITLE,
  APP_KEYWORDS,
} from '@/lib/constants'

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_TITLE}`,
    default: `${APP_TITLE} | ${APP_SLOGAN}`,
  },
  description: APP_DESCRIPTION,
  keywords: APP_KEYWORDS,
  metadataBase: new URL(APP_SITE_URL),
  alternates: {
    canonical: APP_SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: APP_SITE_URL,
    siteName: APP_TITLE,
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${APP_SITE_URL}/thompstar.png`,
        width: 1200,
        height: 630,
        alt: APP_TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: [`${APP_SITE_URL}/thompstar.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body>
        <Toaster position='top-center' />
        <ThemeProvider attribute='class'>
          {children}
          <YoutubePlayer />
        </ThemeProvider>
      </body>
    </html>
  )
}
