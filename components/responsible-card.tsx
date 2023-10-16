'use client'

import { Icons } from "@/components/ui/icons"

type Item = {
  card: {
      id: string;
      name: string;
      column: {
          name: string;
          table: {
              name: string;
              dashboardId: string;
              dashboard: {
                  name: string;
                  space: {
                      id: string;
                      name: string;
                  };
              };
          };
      };
  };
}

export default function ResponsibleForCard(card: any) {
  return (
    <>
      <div onClick={() => {window.open(`/space/${card.item.column.table.dashboard.space.id}/dashboard/${card.item.column.table.dashboardId}/card/${card.item.id}`, '_blank')}}
          className="cursor-pointer w-[calc(50%-30px)] min-w-[300px] p-3 dark:bg-brand-background-dark bg-brand-background rounded-md"
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
        </div>
    </>
  )
}