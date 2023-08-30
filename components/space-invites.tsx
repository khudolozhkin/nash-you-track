import { userHasAccessToSpace } from "@/lib/user-access"
import { db } from "@/lib/db"
import SpaceInviteItem from "./space-invite-item"
import SpaceCreateInviteButton from "./space-invite-create"

export default async function SpaceInvites({spaceId}: {spaceId: string}) {
  
  if (!await userHasAccessToSpace(spaceId, 7)) {
    return []
  }

  const invites = await db.invite.findMany({
    where: {
      spaceId: spaceId
    },
    select: {
      id: true,
      userId: true,
      accessLevel: true,
      active: true,
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
      {invites.length == 0 ? <></> : <>
        <div className="w-full flex justify-between mt-4">
          <h1 className="text-xl font-light text-secondary dark:text-secondary-dark">Приглашения</h1>
        </div>
        <div className="opacity-60 divide-y divide-border rounded-md border mt-4 border-border dark:border-border-dark">
          {invites.map((item, index) => (<SpaceInviteItem spaceId={spaceId} key={index} inviteItem={item}/>))}
        </div>
      </>}
    </>
  )
}