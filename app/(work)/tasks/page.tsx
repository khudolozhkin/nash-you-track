import { Icons } from "@/components/ui/icons"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Metadata } from "next"
import ResponsibleForCard from "@/components/responsible-card"

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
            <ResponsibleForCard key={item.card.id} item={item.card}/>
          )}
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
