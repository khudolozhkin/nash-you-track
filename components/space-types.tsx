import { userHasAccessToSpace } from "@/lib/user-access"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { Icons } from "./ui/icons"
import SpaceTypesCreate from "./space-types-create"
import SpaceTypesDelete from "./space-types-delete"

export default async function SpaceTypes({ spaceId }: {spaceId: string}) {
  if (!await userHasAccessToSpace(spaceId, 7)) {
    return notFound()
  }
  const types = await db.cardType.findMany({
    where: {
      spaceId: spaceId
    },
    select: {
      name: true,
      color: true,
      id: true
    }
  })

  return (
    <>
      <div className="w-full flex justify-between">
        <div className="w-full flex justify-between mt-10">
          <h1 className="font-bold text-xl">Типы карточек</h1>
        </div>
      </div>
      <div className="w-full flex-wrap flex mt-2 gap-2">
        {types.map((type) => 
          <div key={type.id} style={{backgroundColor: type.color}} className={`items-center cursor-default font-medium text-lg px-2 text-[white] w-fit flex items-center px-1 md:h-full font-base rounded-lg max-h-[28px]`}>
            <p className="opacity-[85%] mr-1">{type.name}</p>
            <SpaceTypesDelete typeId={type.id} spaceId={spaceId}/>
          </div>
        )}
        <SpaceTypesCreate spaceId={spaceId}/>
      </div>
    </>
  )
}