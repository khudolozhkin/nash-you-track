'use client'

import CardName from "@/components/card-name"
import CardOperations from "@/components/card-operations"
import CardType from "@/components/card-type"
import CardUsers from "@/components/card-users"
import { Editor } from "@/components/editor"
import Modal from "@/components/ui/modal"
import { notFound, usePathname } from "next/navigation"
import { redirect } from "next/navigation"
import useSWRImmutable, { mutate } from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())

export default function CardPage({ params }: { params: { cardId: string, spaceId: string, dashboardId: string } }) {
  const { data, error, isValidating} = useSWRImmutable(`/api/cards/${params.cardId}`, fetcher)

  if (data) {

    return (
      <div className="flex overflow-y-auto justify-center w-full dark:bg-general-background-dark bg-general-background">
        <div className="py-4 container rounded-md h-fit max-w-3xl dark:bg-brand-background-dark bg-general-background flex flex-col flex-1 gap-4 mt-4">
          <div className="px-[26px]">
            <div className="flex justify-between">
              <CardName card={data} cardId={params.cardId}/>
              <CardOperations cardId={params.cardId}/>
            </div>
            <CardType cardId={params.cardId} spaceId={params.spaceId} card={data}/>
            <CardUsers cardId={params.cardId} spaceId={params.spaceId} card={data}/>
          </div>
          <Editor card={data} cardId={params.cardId}/>
        </div>
      </div>
    )
  }
}