import Button from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import SpaceCreateButton from "@/components/space-create-button"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function DashboardSpace() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  const userSpaces = await db.user.findMany({
    where: {
      id: user?.id,
    },
    select: {
      spaces: {
        select: {
          spaceId: true,
          userId: true,
          accessLevel: true,
          space: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  return (
    <div className="pt-4 container max-w-5xl flex flex-col flex-1 gap-4">
     <div className="flex items-center justify-between w-full md:px-2">
      <div className="flex-col">
        <h1 className="font-semibold text-3xl md:text-4xl text-primary dark:text-primary-dark">Пространства</h1>
        <p className="text-lg font-light text-secondary dark:text-secondary-dark">Создавайте и управляйте пространствами</p>
      </div>
      <SpaceCreateButton />
     </div>
     {userSpaces[0].spaces.map((item, index) => <h1 key={index}>{item.space.name}</h1>)}
    </div>
  )
}
