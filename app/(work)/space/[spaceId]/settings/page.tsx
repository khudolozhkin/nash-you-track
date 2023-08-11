import SpaceDelete from "@/components/space-delete"
import SpaceInvites from "@/components/space-invites"
import SpaceName from "@/components/space-name"
import SpaceUsers from "@/components/space-users-list"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

async function getSpaceInfo(spaceId: string) {
  const spaceInfo = await db.space.findFirst({
    where: {
      id: spaceId
    },
    select: {
      name: true,
      description: true,
      createdAt: true
    }
  })
  return spaceInfo
}

export default async function Dashboard({ params }: { params: { spaceId: string } }) {
  const spaceInfo = await getSpaceInfo(params.spaceId)
  const user = await getCurrentUser() 

  return (
    <div className="flex justify-center w-full">
     <div className="pt-4 container max-w-3xl">
      <SpaceName name={spaceInfo!.name} description={spaceInfo!.description} spaceId={params.spaceId}/>
      <SpaceUsers spaceId={params.spaceId} />
      <SpaceInvites spaceId={params.spaceId} />
      <SpaceDelete userId={user!.id} spaceId={params.spaceId}/>
     </div>
    </div>
  )
}
