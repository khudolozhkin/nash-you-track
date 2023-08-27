import CardName from "@/components/card-name"
import { Editor } from "@/components/editor"
import Modal from "@/components/ui/modal"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { userHasAccessToSpace } from "@/lib/user-access"
import { usePathname } from "next/navigation"
import { redirect } from "next/navigation"
import CardOperations from "@/components/card-operations"
import { notFound } from "next/navigation"

async function getCardForUser(cardId: string) {
  try {
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
      notFound()
    } 
  } catch (error) {
    notFound()
  }
}

export default async function CardModal({ params }: { params: { cardId: string } }) {
  const card = await getCardForUser(params.cardId)
  
  if (card == null) {
    return redirect('/')
  }

  return (
    <Modal>
     <div className="flex justify-center">
      <div className="pt-4 container max-w-3xl flex flex-col flex-1 gap-4 mt-4">
        <div className="px-[26px]">
          <div className="flex justify-between">
            <CardName card={card} cardId={params.cardId}/>
            <CardOperations cardId={params.cardId}/>
          </div>
        </div>
        <Editor card={card} cardId={params.cardId}/>
      </div>
     </div>
    </Modal>
  )
}