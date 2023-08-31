import { Icons } from "./ui/icons"
import TableName from "./table-name"
import TableOperations from "./table-operations"
import { SortableColumn } from "./column-sortable";
import { useState, Key } from "react";
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
} from '@dnd-kit/core'
import {
  sortableKeyboardCoordinates,
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  rectSortingStrategy
} from '@dnd-kit/sortable'
import { mutate } from 'swr'
import { usePathname } from "next/navigation";

type Table = {
  name: string,
  id: string,
  top: number,
  left: number,
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
          }
      }[];
  }[];
}

export default function Table({table, x, y, swrData} : {table: Table, x: number, y: number, swrData: any}) {
  const pathname = usePathname()
  
  const [localOrder, setLocalOrder] = useState<{ id: UniqueIdentifier; }[]>(table.columns.map(item => ({
    id: item.id,
  })))

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function onDragHandler(e: any) {
    const {active, over} = e
    let activeColumnIndex = table.columns.findIndex(column => column.id == active.id);
    const activeTableIndex = swrData.tables.findIndex(tables => tables.id == table.id)

    setLocalOrder((items) => {
      const oldIndex = items.findIndex(item => item.id == active.id)
      const newIndex = items.findIndex(item => item.id == over.id)

      return arrayMove(items, oldIndex, newIndex)
    })

    const oldIndex = table.columns.findIndex(column => column.id == active.id)
    const newIndex = table.columns.findIndex(column => column.id == over.id)

    let newSortOrder
    if (oldIndex != newIndex) {
      if (newIndex == 0) {
        newSortOrder = (Number(table.columns[0].sortOrder) + 1) / 2
      }
      if (newIndex == table.columns.length - 1) {
        newSortOrder = Number(table.columns[newIndex].sortOrder) + 200
      }
      if (newIndex != 0 && newIndex != table.columns.length - 1) {
        if (Math.abs(newIndex - oldIndex) != 1) {
          newSortOrder = (Number(table.columns[newIndex].sortOrder) + Number(table.columns[newIndex - ((newIndex - oldIndex) > 0 ? -1 : 1)].sortOrder)) / 2
        } else {
          newSortOrder = (Number(table.columns[newIndex + (newIndex - oldIndex)].sortOrder) + Number(table.columns[newIndex].sortOrder)) / 2
        }
      }

      let data = JSON.stringify({
        sortOrder: newSortOrder
      })
  
  
      const response = await fetch(`/api/columns/${active.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data
      })
  
      if (response.status != 200) {
        
      }
  
      if (response.status == 200) {
        let responseBody = await response.json()
        swrData.tables[activeTableIndex].columns[activeColumnIndex].sortOrder = newSortOrder
        mutate(`/api/dashboards/${pathname.split('/')[4]}`, {swrData})
      }

    }

  }


  table.columns.sort(function (a, b) {
    return Number(a.sortOrder) - Number(b.sortOrder);
  })
  
  return (
    <div className='group/table overflow-clip rounded-md w-fit py-1 px-2 bg-brand-background dark:bg-brand-background-dark'>
      <div style={{top: `-${y + 1}px`}} className={`sticky z-[1000] py-1 bg-brand-background dark:bg-brand-background-dark justify-between leading-[initial] items-center flex`}>
        <div className="flex items-center">
          <Icons.drag className="handle mr-2 cursor-grab active:cursor-grabbing" size={18}/>
          <TableName table={table}/>
        </div>

        <div className="w-full justify-end overflow-visible ml-2 transition-opacity flex items-center">
          <div className="">
            <TableOperations swrData={swrData} tableId={table.id}/>
          </div>
        </div>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => {onDragHandler(e)}}> 
        <SortableContext strategy={rectSortingStrategy} items={localOrder}>
          <div className="flex pt-1 divide-x divide-border">
                {table.columns.map((item, index) =>
                  <SortableColumn data={swrData} y={y} column={item} key={item.id}/>
                )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}