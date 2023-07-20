import { marketingConfig } from "@/config/marketing"
import { MainNav } from "@/components/main-nav"
import UserLogoutButton from "@/components/user-logout-button"


export default function WorkspaceLayout({
  children
}: {
  children: React.ReactNode
}) {
  
  
  return (
    <>
      <div className="flex min-h-screen flex-col">
      <header className="w-full mr-auto ml-auto pr-8 pl-8 z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <UserLogoutButton />
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
    </>
  )
}