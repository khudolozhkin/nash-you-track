import { workConfig } from "@/config/work"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/account-nav"
import { getCurrentUser } from "@/lib/session"


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
          <MainNav items={workConfig.mainNav} />
          <nav>
            <UserAccountNav name={user?.name} email={user?.email} picture={user?.image}/>
          </nav>
        </div>
      </header>
      <div className="flex justify-center">{children}</div>
    </div>
    </main>
  )
}