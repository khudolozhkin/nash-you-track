import Button from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import SpaceCreateButton from "@/components/space-create-button"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import SpaceItem from "@/components/space-item"
import { space } from "postcss/lib/list"

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
              name: true,
              description: true,
              dashboards: {
                select: {
                  id: true
                }
              }
            }
          }
        }
      }
    }
  })
  
  return (
    <div className="flex justify-center">
    <div className="pt-4 container max-w-5xl flex flex-col flex-1 gap-4 mt-4">
     <div className="flex items-center justify-between w-full md:px-2">
      <div className="flex-col">
        <h1 className="font-semibold text-3xl md:text-4xl text-primary dark:text-primary-dark">Пространства</h1>
        <p className="text-lg font-light text-secondary dark:text-secondary-dark">Создавайте и управляйте пространствами</p>
      </div>
      <SpaceCreateButton />
     </div>
      <div className="divide-y divide-border rounded-md border border-border dark:border-border-dark">
        {(userSpaces[0].spaces.length > 0) ?
          (userSpaces[0].spaces.map((item, index) => <SpaceItem dashboards={userSpaces[0].spaces[0].space.dashboards} key={index} spaceItem={item}/>))
          :
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-border dark:border-border-dark p-8 text-center animate-in fade-in-50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-background dark:bg-brand-background-dark">
              <Icons.space size={50} />
            </div>
            <h1 className="font-semibold text-xl md:text-2xl text-primary dark:text-primary-dark">У вас нет пространств</h1>
            <p className="mb-4 text-lg font-light text-secondary dark:text-secondary-dark">Создайте их чтобы начать работу</p>
            <SpaceCreateButton />
          </div>
        }
      </div>
    </div>
    </div>
  )
}
