import SpaceDelete from "@/components/space-delete"
import SpaceInvites from "@/components/space-invites"
import SpaceName from "@/components/space-name"
import SpaceUsers from "@/components/space-users-list"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"
import { userHasAccessToSpace } from "@/lib/user-access"
import SpaceTypes from "@/components/space-types"
import DeadlinesCards from "@/components/space-cards-deadline"
import { Icons } from "@/components/ui/icons"

async function getSpaceDeadlines(spaceId: string) {
  const cards = await db.card.findMany({
    where: {
      spaceId: spaceId,
      deadline: { not: null },
    },
    orderBy: {
      deadline: 'asc'
    },
    select: {
      id: true,
      name: true,
      deadline: true,
      dashboardId: true,
      dashboard: {
        select: {
          name: true
        }
      },
      space: {
        select: {
          name: true,
          id: true
        }
      },
      column: {
        select: {
          name: true
        }
      }
    }
  })
  return cards
}

export default async function Dashboard({ params }: { params: { spaceId: string } }) {
  const cards = await getSpaceDeadlines(params.spaceId)
  
  if (!await userHasAccessToSpace(params.spaceId, 1)) {
    notFound()
  }

  return (
    <div className="flex sm:justify-center w-full overflow-auto">
     <div className="pt-4 container sm:min-w-[500px] min-w-[100%] max-w-3xl">
        {cards.length > 0 ? <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <DeadlinesCards cards={cards}/>
          </div>
        </> : <>
          <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-md border border-border dark:border-border-dark p-8 text-center animate-in fade-in-50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-background dark:bg-brand-background-dark">
              <Icons.deadline size={50} />
            </div>
            <h1 className="font-semibold text-xl md:text-2xl text-primary dark:text-primary-dark">Нет карточек с поставленным дедлайном</h1>
            <p className="mb-4 text-lg font-light text-secondary dark:text-secondary-dark">Добавьте срок выполнения задачи и они будут видны здесь</p>
          </div>
        </>}
     </div>
    </div>
  )
}
