import Link from "next/link"
import { Icons } from "@/components/ui/icons"
import { workConfig } from "@/config/work"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/account-nav"
import { getCurrentUser } from "@/lib/session"

export default async function NotFound() {
  const user = await getCurrentUser()
  
  return (
    <main className="bg-general-background dark:bg-general-background-dark">
      <div className="flex min-h-screen flex-col">
      <header className="w-full sticky top-0 border-b border-border dark:border-border-dark mr-auto ml-auto pr-8 pl-8 z-40 bg-general-background dark:bg-general-background-dark">
        <div className="flex h-14 items-center justify-between py-6">
          <MainNav items={workConfig.mainNav} userId={user?.id}/>
          <UserAccountNav name={user?.name} email={user?.email} picture={user?.image}/>
        </div>
      </header>
      <div className="w-full flex justify-center mt-10">
        <div className="flex min-h-[400px] max-w-[600px] flex-col items-center justify-center rounded-md border border-border dark:border-border-dark p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-background dark:bg-brand-background-dark">
            <Icons.notFound size={50} />
          </div>
            <h1 className="font-semibold text-xl md:text-2xl text-primary dark:text-primary-dark">Такая страничка не найдена :(</h1>
        </div>
      </div>
    </div>
    </main>
  )
}