import { userHasAccessToSpace } from "@/lib/user-access"
import { db } from "@/lib/db"
import SpaceUserItem from "./space-user-item"

export default async function SpaceUsers({spaceId}: {spaceId: string}) {

  
  if (!await userHasAccessToSpace(spaceId, 7)) {
    return []
  }

  const users = await db.spaceUser.findMany({
    where: {
      spaceId: spaceId
    },
    select: {
      userId: true,
      accessLevel: true,
      user: {
        select: {
          name: true,
          email: true,
          image: true
        }
      }
    }
  })

  return (
    <>
      <h1 className="font-bold text-xl mt-4">Пользователи</h1>
      <div className="divide-y divide-border rounded-md border mt-2 border-border dark:border-border-dark">
        {users.map((item, index) => (<SpaceUserItem key={index} userItem={item}/>))}
      </div>
    </>
  )
}