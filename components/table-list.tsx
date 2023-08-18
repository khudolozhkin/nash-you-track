'use client'

import TableDraggable from "./table-draggable"

export default function TableList({tables, dashboardId}: {tables: [], dashboardId: string}) {
  return (
    <>
      {tables.map((table, index) => (
              <TableDraggable dashboardId={dashboardId} table={table} key={index}/> 
      ))}
    </>
  )
}