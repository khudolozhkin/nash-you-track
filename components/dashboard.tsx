'use client'

import Table from '@/components/table-draggable'
import DashboardRightClick from '@/components/ui/dashboard-right-click-menu'
import useSWRImmutable, { mutate } from 'swr'
import TableNonDraggable from './table-not-draggable'
import toast from 'react-hot-toast'
import { HelpToast } from "./ui/toast";
import TableDraggable from '@/components/table-draggable'
import { Key, useState } from 'react'
import TransferCardProvider from '@/context/transferCard'

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
    top: number,
    left: number,
    id: string,
    columns: {
        id: string  
        name: string;
        sortOrder: Key;
        tableId: string;
        cards: {
            id: string;
            name: string;
            sortOrder: Number;
            columnId: string;
            type?: {
              name?: string,
              color?: string,
              id?: string
            },
            responsibleUsers: []
        }[];
    }[];
}

const fetcher = (url) => fetch(url).then(res => res.json())

export default function Dashboard({dashboardId, accessLevel}: {dashboardId: string, accessLevel: number}) {
  const { data, isLoading} = useSWRImmutable(`/api/dashboards/${dashboardId}`, fetcher , { refreshInterval: 60000,  keepPreviousData: true })

  if (isLoading) {
    return (
      <>
      <DashboardRightClick dashboardId={dashboardId}>
          <div style={{transform: 'translate(50px, 100px)'}} className='animate-pulse rounded-md bg-brand-background dark:bg-brand-background-dark w-[700px] h-[300px]'></div>
          <div style={{transform: 'translate(350px, 200px)'}} className='animate-pulse rounded-md bg-brand-background dark:bg-brand-background-dark w-[600px] h-[900px]'></div>
        </DashboardRightClick>
      </>
    )
  }

  if (data) {
    
    if (data.swrData != undefined) {
      return (
        <DashboardRightClick dashboardId={dashboardId}>
            {data.swrData.tables.map((table: Table, index) => (
                <TableDraggable swrData={data} dashboardId={dashboardId} table={table} key={table.id}/> 
            ))}
        </DashboardRightClick>
      )
    }
    
    return (
      <TransferCardProvider>
        <DashboardRightClick dashboardId={dashboardId}>
            {data.tables.map((table: Table, index) => (
                <TableDraggable swrData={data} dashboardId={dashboardId} table={table} key={table.id}/> 
            ))}
        </DashboardRightClick>
      </TransferCardProvider>  
    )
  }
}