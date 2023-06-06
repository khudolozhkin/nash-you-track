import { getCurrentUser } from "./session"
import { db } from "./db"

export async function userHasAccessToSpace(spaceId: string, accessLevel: number) {
  const user = await getCurrentUser()

  if (user == undefined) {
    return false
  }

  const spaceUser = await db.spaceUser.findFirst({
    where: {
      userId: user.id,
      spaceId: spaceId
    },
    select: {
      accessLevel: true
    }
  })

  if (spaceUser == undefined) {
    return false
  }

  if (accessLevel <= spaceUser!.accessLevel) {
    return true
  }

  return false
}