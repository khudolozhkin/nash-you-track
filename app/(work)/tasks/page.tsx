import { Icons } from "@/components/ui/icons"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Metadata } from "next"
import ResponsibleForCard from "@/components/responsible-card"
import { useParams } from "next/navigation"
import TaskFilter from "@/components/task-filter"

export const metadata: Metadata = {
  title: 'Задачи',
  description: 'Менеджер проектов с общими пространствами, таблицами и карточками.',
}

export default async function MyTasks({searchParams}: {searchParams?: { [key: string]: string | undefined };}) {
  const { space } = searchParams ?? { space: "" };
  const user = await getCurrentUser()
  let responsibleForCards

  if (!user) {
    redirect("/")
  }

  if (space != undefined) {
    responsibleForCards = await db.responsibleUserForCard.findMany({
      where: {
        userId: user?.id,
        card: {
          spaceId: space
        }
      },
      select: {
        card: {
          select: {
            id: true,
            name: true,
            deadline: true,
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
  } else {
    responsibleForCards = await db.responsibleUserForCard.findMany({
      where: {
        userId: user?.id,
      },
      select: {
        card: {
          select: {
            id: true,
            name: true,
            deadline: true,
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
    <div className="flex flex-col items-center justify-center">
        {responsibleForCards.length > 0 ? <>
        <TaskFilter spaces={userSpaces[0].spaces} spaceParams={space}/>
          <div className="container max-w-5xl flex flex-1 gap-4 mt-4 grid grid-cols-1 md:grid-cols-2 gap-2"> 
          {responsibleForCards.map((item) => <>
              <ResponsibleForCard key={item.card.id} item={item.card}/>
          </>
          )}
        </div>
        </> : <>
        <TaskFilter spaces={userSpaces[0].spaces} spaceParams={space}/>
        <div className="container max-w-5xl flex flex-1 gap-4 mt-4">  
            <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-md border border-border dark:border-border-dark p-8 text-center animate-in fade-in-50">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-background dark:bg-brand-background-dark">
                <Icons.noTasks size={50} />
              </div>
              <h1 className="font-semibold text-xl md:text-2xl text-primary dark:text-primary-dark">У вас нет отмеченных карточек</h1>
              <p className="mb-4 text-lg font-light text-secondary dark:text-secondary-dark">Добавьте себя ответственным в карточке чтобы она появилась здесь</p>
            </div>
          </div>
        </>}
    </div>
  )
}
