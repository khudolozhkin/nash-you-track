import Dashboard from "@/components/dashboard"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"


export default async function DashboardPage({ params }: { params: { dashboardId: string } }) {
  const dashboard = await db.dashboard.findFirst({
    where: {
      id: params.dashboardId
    },
    select: {
      spaceId: true
    }
  })
  if (dashboard == undefined) notFound()

  
  const user = await getCurrentUser()
  if (user == undefined) {
    notFound()
  }

  const spaceUser = await db.spaceUser.findFirst({
    where: {
      userId: user.id,
      spaceId: dashboard!.spaceId
    },
    select: {
      accessLevel: true
    }
  })


  return (
    <Dashboard accessLevel={spaceUser!.accessLevel} dashboardId={params.dashboardId}/>
  )
}
