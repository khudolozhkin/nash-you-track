import { MainNav } from '@/components/main-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import UserAuthButton from '@/components/user-auth-button'
import UserLogoutButton from '@/components/user-logout-button';
import { getCurrentUser } from '@/lib/session'
import { marketingConfig } from '@/config/marketing';

export default async function Home() {
  let user = await getCurrentUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MainNav items={marketingConfig.mainNav} />
      <UserAuthButton />
      <UserLogoutButton />
      <h1>{user?.name} {user?.email} {user?.image} {user?.id}</h1>
      <ThemeToggle />
    </main>
  )
}
