import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { siteConfig } from '@/config/site'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "нашютрек",
    "nashyoutrack"
  ],
  authors: [
    {
      name: "Alexander Khudolozhkin",
      url: "https://homepage-xp.vercel.app/",
    },
  ],
  creator: "Alexander Khudolozhkin",
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="ru">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{duration: 3000}}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
