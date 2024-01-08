'use client'

import { Icons } from "@/components/ui/icons"
import { getColor } from "@/lib/deadline"

export default function ResponsibleForCard(card: any) {
  return (
    <>
      <div onClick={() => {window.open(`/space/${card.item.column.table.dashboard.space.id}/dashboard/${card.item.column.table.dashboardId}/card/${card.item.id}`, '_blank')}}
          className="py-2 px-1 cursor-pointer dark:bg-brand-background-dark bg-brand-background rounded-md cursor"
          >
            <div
             className="hover:underline flex px-2 py-1 items-center text-secondary dark:text-secondary-dark">
              <p className="truncate whitespace-nowrap">{card.item.column.table.dashboard.space.name}</p>
              <Icons.arrow className="rotate-[-90deg] mx-1" size={15}/>
              <p className="truncate whitespace-nowrap">{card.item.column.table.dashboard.name}</p>
              <Icons.arrow className="rotate-[-90deg] mx-1" size={15}/>
              <p className="truncate whitespace-nowrap">{card.item.column.table.name}</p>
            </div>
            <div className="flex whitespace-wrap items-center px-2 py-1 font-bold text-primary dark:text-primary-dark text-lg">
              {card.item.column.name} | {card.item.name}
            </div>
            { card.item.deadline != null ? 
              <div className="flex whitespace-wrap items-center px-2 py-1 pb-2 font-bold text-primary dark:text-primary-dark text-lg">
                <p style={{backgroundColor: getColor(card.item.deadline), color: 'white'}} className="font-semibold opacity-[100%] px-[5px] py-[1px] text-sm rounded-lg">{card.item.deadline?.getDate()}-{(Number(card.item.deadline?.getMonth())+1).toString()}-{card.item.deadline?.getFullYear()}</p>
              </div> : <></>
            }
        </div>
    </>
  )
}