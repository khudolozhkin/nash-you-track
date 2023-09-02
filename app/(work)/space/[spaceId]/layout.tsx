import DashboardList from "@/components/dashboard-list";
import SpaceSetting from "@/components/space-settings";
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session";
import { userHasAccessToSpace } from "@/lib/user-access";
import { notFound, redirect } from "next/navigation"
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { spaceId: string }
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
      createdAt: true,
      dashboards: true,
    }
  })
 
  return {
    title: spaceInfo?.name,
    description: spaceInfo?.description
  }
}

async function getDashboardsForSpace(spaceId: string) {
  
  if (!await userHasAccessToSpace(spaceId, 1)) {
    return notFound()
  }
  
  const spaceInfo = await db.space.findFirst({
    where: {
      id: spaceId
    },
    select: {
      name: true,
      description: true,
      createdAt: true,
      dashboards: true,
    }
  })
    
  return spaceInfo
}

async function getAccessLevel(spaceId: string, userId: string) {
  const accessLevel = await db.spaceUser.findFirst({
    where: {
      userId: userId,
      spaceId: spaceId
    },
    select: {
      accessLevel: true,
      space: {
        select: {
          name: true
        }
      }
    }
  })
  return accessLevel
}

export default async function SpaceLayout({ children, params }: { children: React.ReactNode, params: { spaceId: string } }) {
  const user = await getCurrentUser()
  const accessLevel = await getAccessLevel(params.spaceId, user!.id)
  const space = await getDashboardsForSpace(params.spaceId)
  
  return (
    <>
      <div className="static flex h-[calc(100vh-57px)]">
        <div className="h-full overflow-y-auto overscroll-y-auto no-scrollbar overflow-hidden relative max-w-[300px] min-w-[250px] flex border-r border-border dark:border-border-dark px-2 py-2 flex-col">
          <div className="mx-4 flex justify-center">
            <h1 className="whitespace-nowrap truncate font-bold text-xl md:text-2xl text-primary dark:text-primary-dark">{space?.name}</h1>
          </div>
          <DashboardList accessLevel={accessLevel!.accessLevel} spaceId={params.spaceId} dashboards={space?.dashboards} />
          {(accessLevel!.accessLevel >= 7) ? <SpaceSetting spaceId={params.spaceId}/> : <></>}
        </div>
        {children}
      </div>
    </>
  )
}

