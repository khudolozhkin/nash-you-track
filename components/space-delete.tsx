'use client'

import { useState } from "react"
import DeleteSpace from "./space-delete-button"

export default function SpaceDelete({userId, spaceId}: {userId: string, spaceId: string}) {
  const [active, setActive] = useState<boolean>(false)

  return (
    <>
      <div className="divide-y divide-delete rounded-md border mt-4 border-delete dark:border-delete-dark">
        <div>
          <h1 className="font-bold text-xl pl-2 pt-1 text-delete dark:text-delete-dark">Опасное зона</h1>
          <h2 className="font-light text-xl pl-2 text-delete dark:text-delete-dark">Действие нельзя будет отменить</h2>
          <div className="pt-4 w-[30%] p-2">
            <DeleteSpace setActive={setActive} userId={userId} spaceId={spaceId} name="Удалить пространство"/>
          </div>
        </div>
      </div>
    </>
  )
}