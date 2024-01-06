'use client'

import CardName from "@/components/card-name"
import { Editor } from "@/components/editor"
import Modal from "@/components/ui/modal"
import { usePathname } from "next/navigation"
import { redirect } from "next/navigation"
import CardOperations from "@/components/card-operations"
import { notFound } from "next/navigation"
import CardType from "@/components/card-type"
import useSWRImmutable, { mutate } from 'swr'
import CardUsers from "@/components/card-users"
import CardDeadline from "@/components/card-deadline"


const fetcher = (url) => fetch(url).then(res => res.json())

export default function CardModal({ params }: { params: { cardId: string, spaceId: string, dashboardId: string } }) {
  const { data, error, isValidating} = useSWRImmutable(`/api/cards/${params.cardId}`, fetcher)
  
  if (data) {
    
    return (
      <Modal>
       <div className="flex justify-center">
        <div className="pt-4 container max-w-3xl flex flex-col flex-1 gap-4 mt-4">
          <div className="px-[26px]">
            <div className="flex justify-between">
              <CardName card={data} cardId={params.cardId}/>
              <CardOperations cardId={params.cardId}/>
            </div>
            <CardType cardId={params.cardId} spaceId={params.spaceId} card={data}/>
            <CardUsers cardId={params.cardId} spaceId={params.spaceId} card={data}/>
            <CardDeadline cardId={params.cardId} spaceId={params.spaceId} card={data}/>
          </div>
          <Editor card={data} cardId={params.cardId}/>
        </div>
       </div>
      </Modal>
    )
  }
}