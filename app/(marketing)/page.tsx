import { MainNav } from '@/components/main-nav';
import UserAuthButton from '@/components/user-auth-button'
import { getCurrentUser } from '@/lib/session'
import { marketingConfig } from '@/config/marketing';

export default async function Home() {
  let user = await getCurrentUser();
  return (
    <>
    </>
  )
}
