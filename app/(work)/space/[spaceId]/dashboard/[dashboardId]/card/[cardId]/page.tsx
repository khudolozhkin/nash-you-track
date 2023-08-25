import CardName from "@/components/card-name"
import { Editor } from "@/components/editor"
import Modal from "@/components/ui/modal"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { userHasAccessToSpace } from "@/lib/user-access"
import { usePathname } from "next/navigation"
import { redirect } from "next/navigation"

async function getCardForUser(cardId: string) {
  const card = await db.card.findFirst({
    where: {
      id: cardId,
    },
    select: {
      name: true,
      content: true,
      column: {
        select: {
          table: {
            select: {
              dashboard: {
                select: {
                  spaceId: true
                }
              }
            }
          }
        }
      }
    }
  })
  
  if (await userHasAccessToSpace(card!.column.table.dashboard.spaceId, 4)) {
    return card
  } else {
    redirect('/')
  }
}

export default async function CardPage({ params }: { params: { cardId: string } }) {
  const card = await getCardForUser(params.cardId)
  
  if (card == null) {
    return redirect('/')
  }

  return (
    <div className="flex overflow-y-scroll justify-center w-full dark:bg-general-background-dark bg-general-background">
      <div className="py-4 container rounded-md h-fit max-w-3xl dark:bg-brand-background-dark bg-general-background flex flex-col flex-1 gap-4 mt-4">
        <div className="px-[26px]">
          <CardName card={card} cardId={params.cardId}/>
        </div>
        <Editor card={card}/>
      </div>
    </div>
  )
}