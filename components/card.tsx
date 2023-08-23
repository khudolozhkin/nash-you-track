'use client'

import { usePathname, useRouter } from "next/navigation";

type Card = {
  id: string;
  name: string;
  sortOrder: Number;
  columnId: string;
}

export default function Card({card} : {card: Card}) {
  const router = useRouter()
  const pathname = usePathname()
  
  function onDragOverHandler(e) {
    e.preventDefault()
  }

  function onDragLeaveHandler(e) {
    e.preventDefault()
  }

  function onDragStartHandler(e) {
    e.preventDefault()
  }

  function onDragEndHandler(e) {
    e.preventDefault()
  }

  function onDropHandler(e) {
    e.preventDefault()
  }

  return (
    <div draggable={true}
      onDragOver={(e) => {onDragOverHandler(e)}}
      onDragLeave={(e) => {}}
      onDragStart={(e) => {}}
      onDragEnd={(e) => {}}
      onDrop={(e) => {}}
      onClick={() => {router.push(`${pathname}/card/${card.id}`)}}
      className='item mt-2 group/card min-h-[60px] opacity-100 dark:bg-hover-item-dark bg-hover-item transition-opacity duration-300 cursor-pointer'>
      <div className='pl-2 flex flex-col'>
          <div className="h-[1px] group-hover/card:h-[4px] transition-all w-[40px] rounded-b bg-themed-color"></div>
          <p className="mt-1">{card.name}</p>
      </div>
    </div>
  )
}