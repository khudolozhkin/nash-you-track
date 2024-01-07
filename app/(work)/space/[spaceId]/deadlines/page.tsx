import SpaceDelete from "@/components/space-delete"
import SpaceInvites from "@/components/space-invites"
import SpaceName from "@/components/space-name"
import SpaceUsers from "@/components/space-users-list"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"
import { userHasAccessToSpace } from "@/lib/user-access"
import SpaceTypes from "@/components/space-types"

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
  if (!await userHasAccessToSpace(params.spaceId, 1)) {
    notFound()
  }

  return (
    <div className="flex sm:justify-center w-full overflow-auto">
     <div className="pt-4 container sm:min-w-[500px] min-w-[calc(100vw)] max-w-3xl">
      hahaha
     </div>
    </div>
  )
}
