import Dashboard from "@/components/dashboard"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { spaceId: string, dashboardId: string }
}

export async function generateMetadata(

  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const spaceInfo = await db.space.findFirst({
    where: {
      id: params.spaceId
    },
    select: {
      name: true,
      description: true,
    }
  })
 
  const dashboardInfo = await db.dashboard.findFirst({
    where: {
      id: params.dashboardId
    },
    select: {
      name: true
    }
  })

  return {
    title: `${dashboardInfo?.name} | ${spaceInfo?.name}`,
    description: spaceInfo?.description
  }
}

export default async function DashboardPage({ params }: { params: { dashboardId: string } }) {
  const dashboard = await db.dashboard.findFirst({
    where: {
      id: params.dashboardId
    },
    select: {
      spaceId: true,
      tables: {
        select: {
          name: true
        }
      }
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
