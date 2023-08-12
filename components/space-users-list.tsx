import { userHasAccessToSpace } from "@/lib/user-access"
import { db } from "@/lib/db"
import SpaceUserItem from "./space-user-item"
import SpaceCreateInviteButton from "./space-create-invite-button"

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
      <div className="w-full flex justify-between mt-10">
        <h1 className="font-bold text-xl">Пользователи</h1>
        <SpaceCreateInviteButton spaceId={spaceId}/>
      </div>
      <div className="divide-y divide-border rounded-md border mt-4 border-border dark:border-border-dark">
        {users.map((item, index) => (<SpaceUserItem spaceId={spaceId} key={index} userItem={item}/>))}
      </div>
    </>
  )
}