'use client'

import { Icons } from "./ui/icons"

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
  
  const getColor = (deadline) => {
    let cardDate = new Date(deadline)
    let currentDate = new Date()

    if (currentDate < cardDate) {
      let dayPlus = new Date(24 * 3600 * 1000);
      if (dayPlus < cardDate) {
        // console.log("Больше дня")
        return "#a5a5a5a1"
      }
    } else {
      if (currentDate.getDay() == cardDate.getDay()) {
        // console.log("Остался один день")
        return "#D39D00"
      } else {
        // console.log("Просрочено")
        return "#b31f1f"
      }
    }
  }
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