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

export default function Table({table, x, y} : {table: Table, x: number, y: number}) {

  return (
    <div className='group/table overflow-clip rounded-md w-fit py-1 px-2 bg-brand-background dark:bg-brand-background-dark'>
      <div style={{top: `-${y + 1}px`}} className={`sticky py-1 bg-brand-background dark:bg-brand-background-dark justify-between leading-[initial] items-center flex`}>
        <div className="flex items-center">
          <Icons.drag className="handle mr-2 cursor-grab active:cursor-grabbing" size={18}/>
          <TableName table={table}/>
        </div>

        <div className="w-full justify-end overflow-visible ml-2 transition-opacity flex items-center">
          <div className="">
            <TableOperations tableId={table.id}/>
          </div>
        </div>
      </div>
      <div className="flex pt-1 divide-x divide-border">
        {table.columns.map((item, index) => <div className="w-[250px] h-[1500px]" key={table.id}>
            <div style={{top: `-${y - 26}px`}} className="h-[28px] border-b-[1px] bg-brand-background dark:bg-brand-background-dark border-border z-10 sticky pl-2">{item.name}</div>
            <div className="w-fill my-1 mx-1 h-[200px] bg-[red]"></div>
          </div>)}
      </div>
    </div>
  )
}