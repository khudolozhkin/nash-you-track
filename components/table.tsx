import { Icons } from "./ui/icons"
import TableName from "./table-name"
import TableOperations from "./table-operations";

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

export default function Table({table} : {table: Table}) {
  

  return (
    <div className='group/table rounded-md w-fit py-1 px-2 bg-brand-background dark:bg-brand-background-dark'>
      <div className=" justify-between leading-[initial] items-center flex">
        <div className="flex items-center">
          <Icons.drag className="handle mr-2 cursor-grab active:cursor-grabbing" size={18}/>
          <TableName table={table}/>
        </div>

        <div className="group/burger ml-2 flex items-center">
          <TableOperations tableId={table.id}/>
        </div>
      </div>
      <div className="w-[400px] h-[100px]"></div>
    </div>
  )
}