'use client'

import { Icons } from "./ui/icons"
import { getColor } from "@/lib/deadline"

type Cards = {
  deadline: Date | null;
    id: string;
    name: string;
    dashboardId: string;
    dashboard: {
        name: string;
    };
    space: {
        name: string;
        id: string;
    };
    column: {
      name: string
    }
}[]

export default function DeadlinesCards({cards}: {cards: Cards}) {
  
  
  return (
    <>
      {cards.map((card) => <>
        <div className="cursor-pointer dark:bg-brand-background-dark bg-brand-background rounded-md cursor"
          onClick={() => {window.open(`/space/${card.space.id}/dashboard/${card.dashboardId}/card/${card.id}`, '_blank')}}
        >
          <div className="hover:underline flex px-2 py-1 items-center text-secondary dark:text-secondary-dark">
            <p className="truncate whitespace-nowrap">{card.space.name}</p>
            <Icons.arrow className="rotate-[-90deg] mx-1" size={15}/>
            <p className="truncate whitespace-nowrap">{card.dashboard.name}</p>
          </div>
          <div className="flex whitespace-wrap items-center px-2 font-bold text-primary dark:text-primary-dark text-lg">
           {card.column.name} | {card.name}
          </div>
          <div className="flex whitespace-wrap items-center px-2 py-1 pb-2 font-bold text-primary dark:text-primary-dark text-lg">
            <p style={{backgroundColor: getColor(card.deadline), color: 'white'}} className="font-semibold opacity-[100%] px-[5px] py-[1px] text-sm rounded-lg">{card.deadline?.getDate()}-{(Number(card.deadline?.getMonth())+1).toString()}-{card.deadline?.getFullYear()}</p>
          </div>
        </div>
      </>)}
    </>
  )
}