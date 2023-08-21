'use client'

import TableDraggable from "./table-draggable"

export default function TableList({tables, dashboardId, swrData}: {tables: [], dashboardId: string, swrData: any}) {
  return (
    <>
      {tables.map((table, index) => (
              <TableDraggable swrData={swrData} dashboardId={dashboardId} table={table} key={index}/> 
      ))}
    </>
  )
}