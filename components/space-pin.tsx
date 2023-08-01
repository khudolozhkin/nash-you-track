'use client'

import { useEffect, useState } from "react"
import { Icons } from "./ui/icons"

type SpaceItem = {
  spaceItem: {
    spaceId: string;
    userId: string;
    accessLevel: number;
    space: {
        name: string;
        description: string;
    }
  }
}

export default function SpacePinOperation({ spaceItem }: SpaceItem) {
  let spaces = [{}]

  useEffect(() => {
    const spaces = localStorage.getItem('spaces')
    if (spaces) {
      console.log(spaces)
    } else {
      localStorage.setItem('spaces', JSON.stringify([{}]));
    }
  }, [])

  function addSpace(spaceId: string, name: string, description: string) {
    let newSpaceItem = {
      spaceId: spaceId,
      name: name,
      description: description
    }
    spaces.push(newSpaceItem)
  } 

  return (
    <div onClick={() => {addSpace(spaceItem.spaceId, spaceItem.space.name, spaceItem.space.description)}} className="flex">
          <Icons.pin size={20} className="mr-2"/>
          Закрепить
    </div>
  )
}