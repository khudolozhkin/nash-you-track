'use client'

import { useState, useEffect } from "react"

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

export default function TableName({table} : {table: Table}) {
  return (
    <>
      <input className="mb-[2px] text-lg h-[18px] outline-none bg-brand-background dark:bg-brand-background-dark" value={table.name} size={table.name.length}/>
    </>
  )
}