import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { siteConfig } from '@/config/site'

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
        </ThemeProvider>
      </body>
    </html>
  )
}
