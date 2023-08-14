'use client'

import DashboardRightClick from '@/components/ui/dashboard-right-click-menu';
import { usePathname } from 'next/navigation'
import Draggable from 'react-draggable'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())

export default function Dashboard({ params }: { params: { dashboardId: string } }) {
  const { data, error, isLoading } = useSWR(`/api/dashboards/${params.dashboardId}`, fetcher)
  
  return (
    <>
      <DashboardRightClick dashboardId={params.dashboardId}>
        <Draggable
          axis="both"
          defaultPosition={{x: 0, y: 0}}
          grid={[1, 1]}
          scale={1}
          bounds={{left: 0, top: 0}}
          >
          <div className='w-[300px] h-[200px] bg-brand-background-dark'>
          </div>
        </Draggable>
      </DashboardRightClick>
    </>
  )
}
