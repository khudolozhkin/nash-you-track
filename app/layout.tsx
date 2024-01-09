'use client'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { siteConfig } from '@/config/site'
import { Toaster } from 'react-hot-toast'
import { YandexMetricaProvider } from 'next-yandex-metrica';

export default function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="ru">
      <body>
      <YandexMetricaProvider
        tagID={12341234}
        initParameters={{ clickmap: true, trackLinks: true, accurateTrackBounce: true }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{duration: 3000}}
          />
        </ThemeProvider>
      </YandexMetricaProvider>
      </body>
    </html>
  )
}
