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
        }[];
    }[];
}

const fetcher = (url) => fetch(url).then(res => res.json())

export default function Dashboard({dashboardId, accessLevel}: {dashboardId: string, accessLevel: number}) {
  const { data, error, isValidating} = useSWRImmutable(`/api/dashboards/${dashboardId}`, fetcher , { refreshInterval: 20000,  keepPreviousData: true })

  if (data) {
    
    // if (accessLevel < 4) {
    //   return (
    //     <div className="w-full h-full box-border overflow-auto">
    //       {data.tables.map((table: Table, index) => (
    //         <TableNonDraggable dashboardId={dashboardId} table={table} key={index}/> 
    //       ))}
    //     </div>
    //   )
    // }
    
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