import { Icons } from "@/components/ui/icons"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Задачи',
  description: 'Менеджер проектов с общими пространствами, таблицами и карточками.',
}

export default async function MyTasks() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  const responsibleForCards = await db.responsibleUserForCard.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      card: {
        select: {
          id: true,
          name: true,
          column: {
            select: {
              name: true,
              table: {
                select: {
                  name: true,
                  dashboardId: true,
                  dashboard: {
                    select: {
                      name: true,
                      space: {
                        select: {
                          name: true,
                          id: true
                        }
                      }
                    }
                  }
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
      <div className="pt-4 container flex flex-wrap max-w-5xl flex flex-1 gap-4 mt-4">
        {responsibleForCards.length > 0 ? <>
          {responsibleForCards.map((item) => 
          <div
          className="w-[calc(50%-30px)] min-w-[300px] p-3 dark:bg-brand-background-dark bg-brand-background rounded-md"
          key={item.card.id}>
            <Link 
             href={`/space/${item.card.column.table.dashboard.space.id}/dashboard/${item.card.column.table.dashboardId}/`}
             className="hover:underline flex px-2 py-1 items-center text-secondary dark:text-secondary-dark">
              <p className="truncate whitespace-nowrap">{item.card.column.table.dashboard.space.name}</p>
              <Icons.arrow className="rotate-[-90deg] mx-1" size={15}/>
              <p className="truncate whitespace-nowrap">{item.card.column.table.dashboard.name}</p>
              <Icons.arrow className="rotate-[-90deg] mx-1" size={15}/>
              <p className="truncate whitespace-nowrap">{item.card.column.table.name}</p>
            </Link>
            <Link href={`/space/${item.card.column.table.dashboard.space.id}/dashboard/${item.card.column.table.dashboardId}/card/${item.card.id}`} className="flex whitespace-wrap items-center px-2 py-1 font-bold text-primary dark:text-primary-dark text-lg">
              {item.card.column.name} | {item.card.name}
            </Link>
          </div>)}
        </> : <>
          <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-md border border-border dark:border-border-dark p-8 text-center animate-in fade-in-50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-background dark:bg-brand-background-dark">
              <Icons.noTasks size={50} />
            </div>
            <h1 className="font-semibold text-xl md:text-2xl text-primary dark:text-primary-dark">У вас нет отмеченных карточек</h1>
            <p className="mb-4 text-lg font-light text-secondary dark:text-secondary-dark">Добавьте себя ответственным в карточке чтобы она появилась здесь</p>
          </div>
        </>}
      </div>
    </div>
  )
}
