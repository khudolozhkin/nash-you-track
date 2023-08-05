'use client'

import { useEffect, useState } from "react"
import { Icons } from "./ui/icons"

type SpaceItem = {
  spaceId: string,
  userId: string,
  space: {
      name: string;
      description: string | null;
  }
}

export default function SpacePinOperation({ spaceId, space, userId }: SpaceItem) {
  const [spaces, setSpaces] = useState(JSON.parse(localStorage.getItem(`${userId}spaces`) || "[]"))
  const [isPinned, setIsPinned] = useState<boolean>(false)

  useEffect(() => {
    localStorage.setItem(`${userId}spaces`, JSON.stringify(spaces))
    const filter = spaces.filter((item) => item.id == spaceId)
    if (filter.length > 0) setIsPinned(true)
  }, [spaces])

  const addSpace = (id: string, name: string, description: string | null) => {
    const newSpace = {id, name, description}
    setSpaces((spaces) => [...spaces, newSpace])
  }

  const removeSpace = (id: string) => {
    const newSpaces = spaces.filter((item) => item.id != id)
    setSpaces(newSpaces)
    localStorage.setItem(`${userId}spaces`, JSON.stringify(spaces))
    setIsPinned(false)
  }

  return (
    <>
      {(isPinned) ? <>
        <div onClick={() => {removeSpace(spaceId)}} className="cursor-pointer relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-hover-item dark:hover:bg-hover-item-dark data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <Icons.pinOff size={20} className="mr-2"/>
            Открепить
        </div>
      </> : <>
        <div onClick={() => {addSpace(spaceId, space.name, space.description)}} className="cursor-pointer relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-hover-item dark:hover:bg-hover-item-dark data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <Icons.pin size={20} className="mr-2"/>
            Закрепить
        </div>
      </>}
    </>
  )
}