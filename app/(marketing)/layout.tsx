import { marketingConfig } from "@/config/marketing"
import { MainNav } from "@/components/main-nav"
import UserAuthButton from "@/components/user-auth-button"
import { getCurrentUser } from "@/lib/session"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  authors: [
    {
      name: "Alexander Khudolozhkin",
      url: "https://github.com/Halatnbly",
    },
  ],
}

export default async function WorkspaceLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  
  return (
    <main className="bg-general-background dark:bg-general-background-dark">
      <div className="flex min-h-screen flex-col">
        <header className="w-full sticky top-0 border-b border-border dark:border-border-dark mr-auto ml-auto pr-8 pl-8 z-40 bg-general-background dark:bg-general-background-dark">
          <div className="flex h-14 items-center justify-between py-6">
            <MainNav userId={user?.id} items={marketingConfig.mainNav} />
            <nav>
              <UserAuthButton />
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </div>
    </main>
  )
}