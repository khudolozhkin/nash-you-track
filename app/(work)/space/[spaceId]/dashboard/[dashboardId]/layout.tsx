import type { Metadata, ResolvingMetadata } from 'next'
import { db } from "@/lib/db"


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

export default function dashboardLayout(props: { children: React.ReactNode, modal: React.ReactNode }) {
  return (
    <>
      {props.children}
      {props.modal}
    </>
  )
}
