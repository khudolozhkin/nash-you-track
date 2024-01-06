'use client'

import { usePathname, useRouter } from "next/navigation"
import { Key, useContext } from "react"
import { TransferContext } from "@/context/transferCard"
import { mutate } from 'swr'
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import Avatar from "./ui/avatar"


type TransferContext = {
  transferCard: {
    currentCard?: string,
    currentColumn?: string,
    targetCard?: string,
    targetColumn?: string
  }, 
  setTransferContext: Function
}

type TransferCard = {
  currentCard?: string,
  currentColumn?: string,
  targetCard?: string,
  targetColumn?: string
}

type Card = {
  id: string;
  name: string;
  sortOrder: Number;
  columnId: string;
  deadline: string;
  Type?: {
    name?: string,
    color?: string,
    id?: string
  }
  responsibleUsers: {
    user: {
        image: string;
        name: string;
        id: string;
    };
}[];
}

type Column = {
  id: string;
  name: string;
  sortOrder: Key;
  tableId: string;
  cards: {
      id: string;
      name: string;
      sortOrder: Number;
      columnId: string;
      Type?: {
        name?: string,
        color?: string,
        id?: string
      },
      responsibleUsers: {
        user: {
            image: string;
            name: string;
            id: string;
        };
    }[];
  }[];
}

export default function Card({card, column, data} : {card: Card, column: Column, data: any}) {
  const router = useRouter()
  const pathname = usePathname()
    // @ts-ignore
  const transferContext = useContext<TransferContext>(TransferContext)
  
  function onDragOverHandler(e) {
    e.preventDefault()
    if (e.target.className.split(' ')[0] == 'card') {
      e.target.parentElement.previousSibling.style.opacity = '100%'
    }
  }

  function onDragLeaveHandler(e) {
    e.preventDefault()
    if (e.target.className.split(' ')[0] == 'card') {
      e.target.parentElement.previousSibling.style.opacity = '0%'
    }
  }

  function onDragStartHandler(e) {
    let target
    if (e.type == 'touchstart') {
      target = e.target.parentElement
    } else {
      target = e.target.lastChild
    }
    target.style.opacity = '10%'
    transferContext.setTransferContext({targetCard: card.id, targetColumn: column.name})
  }

  function onDragEndHandler(e, card, column) {
    e.preventDefault()
    e.target.firstChild.style.opacity = '0%'
    e.target.lastChild.style.opacity = '100%'
    if (e.target.className == 'card') {
      let cardInfo = Object.assign({currentCard: card.id, currentColumn: column.id}, transferContext.transferCard)
      makeTransfer(cardInfo)
    }
  }

  function onDropHandler(e, card, column) {
    e.preventDefault()
    e.target.parentElement.previousSibling.style.opacity = '0%'
    transferContext.setTransferContext({targetCard: card.id, targetColumn: column.id})
  }

  async function makeTransfer(cardInfo: TransferCard) {
    if (cardInfo.currentCard == cardInfo.targetCard || cardInfo.targetColumn == column.name) {
      return
    }

    let newSortOrder
    for (let i = 0; i < data.tables.length; i++) {
      let tempColumnIndex = data.tables[i].columns.findIndex(column => column.id == cardInfo.targetColumn)
      
      if (tempColumnIndex != -1) {  
        let tempCardIndex = data.tables[i].columns[tempColumnIndex].cards.findIndex(card => card.id == cardInfo.targetCard)
        
        if (tempCardIndex == 0) {
          newSortOrder = (Number(data.tables[i].columns[tempColumnIndex].cards[tempCardIndex].sortOrder) + 1) / 2
        } else {
          newSortOrder = (Number(data.tables[i].columns[tempColumnIndex].cards[tempCardIndex].sortOrder) + Number(data.tables[i].columns[tempColumnIndex].cards[tempCardIndex - 1].sortOrder)) / 2
        }
      }
    }
    
    const dataBody = JSON.stringify({
      columnId: cardInfo.targetColumn,
      sortOrder: newSortOrder
    })
    const response = await fetch(`/api/cards/${cardInfo.currentCard}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataBody
    })

    if (response.status != 200) {
      toast.custom((t) => (
        <ErrorToast t={t} header={`Что-то пошло не так`}/>
      ))
    }

    if (response.status == 200) {
      mutate(`/api/dashboards/${pathname.split('/')[4]}`)
    }
  }
  
  return (
    <div
      style={{touchAction: 'auto'}} draggable={true}
      onDragOver={(e) => onDragOverHandler(e)}
      onDragLeave={(e) => {onDragLeaveHandler(e)}}
      onDragStart={(e) => {onDragStartHandler(e)}}
      onDragEnd={(e) => {onDragEndHandler(e, card, column)}}
      onDrop={(e) => {onDropHandler(e, card, column)}}
      onClick={() => {router.push(`${pathname}/card/${card.id}`)}} 
      className="card"
    >
      <div style={{opacity: '0%'}} className="transition-all bg-themed-color dark:bg-themed-color-dark mt-[3px] shadow-3xl dark:shadow-4xl rounded h-[2px] w-full"></div>
      <div
        className='mt-[3px] group/card h-[60px] w-full opacity-100 dark:bg-hover-item-dark bg-hover-item transition-opacity duration-300 cursor-pointer'
      >
        <a draggable={false} className="card relative z-[5] top-[-6px] left-0 bottom-0 right-0 block h-[calc(100%+9px)] w-full"></a>
        <div className='relative z-[1] top-[-69px] pl-2 flex flex-col'>
            <div style={{backgroundColor: (card!.Type?.color) ? card!.Type!.color : 'transparent'}} className="h-[2px] group-hover/card:h-[4px] transition-all w-[40px] rounded-b"></div>
            <p className="mt-1 truncate">{card.name}</p>
            <div className="flex gap-1 items-center">
              {card.responsibleUsers.length > 3 ? <>
                <Avatar url={card.responsibleUsers[0].user.image} h={20} w={20}/>
                <Avatar url={card.responsibleUsers[1].user.image} h={20} w={20}/>
                <div className="flex items-center justify-center min-w-[20px] h-[20px] bg-general-background dark:bg-general-background-dark rounded-full">
                  <p className="text-xs px-1">+{card.responsibleUsers.length - 2}</p>
                </div>
              </> : <>
                {card.responsibleUsers.map((item) => <Avatar url={item.user.image} h={20} w={20} key={item.user.id}/>)}
              </>}
              {card.deadline != null ? <>
                <p className="bg-brand-background opacity-[80%] dark:bg-brand-background-dark px-[5px] py-[2px] text-sm rounded-lg">{card.deadline.toString().slice(0, 10)}</p>
              </> : <></>}
            </div>
        </div>
      </div>
    </div>
  )
}