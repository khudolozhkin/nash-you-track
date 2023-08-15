'use client'

import Table from '@/components/table'
import DashboardRightClick from '@/components/ui/dashboard-right-click-menu'
import useSWRImmutable, { mutate } from 'swr'

type Tables = {
  spaceId: string;
    name: string;
    tables: {
        name: string;
        top: number;
        left: number;
        columns: {
            name: string;
            sortOrder: Number;
            cards: {
                id: string;
                name: string;
                sortOrder: Number;
                columnId: string;
            }[];
        }[];
    }[];
} | null

type Table = {
  name: string,
  id: string,
  top: number,
  left: number,
  columns: {
      name: string;
      sortOrder: Number;
      cards: {
          id: string;
          name: string;
          sortOrder: Number;
          columnId: string;
      }[];
  }[];
}

const fetcher = (url) => fetch(url).then(res => res.json())

export default function Dashboard({dashboardId}: {dashboardId: string}) {
  const { data, error, isLoading } = useSWRImmutable(`/api/dashboards/${dashboardId}`, fetcher)
  
  if(isLoading) {
    return (
      <>Грузит</>
    )
  }

  if (data) {
    return (
      <>
        <DashboardRightClick dashboardId={dashboardId}>
          {data.tables.map((table: Table, index) => (
              <Table dashboardId={dashboardId} table={table} key={index}/> 
          ))}
        </DashboardRightClick>
      </>
    )
  }
}