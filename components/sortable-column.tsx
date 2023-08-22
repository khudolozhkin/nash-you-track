import React, { Key } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Icons } from './ui/icons';
import ColumnName from './column-name';
import ColumnDelete from './column-delete';

export function SortableColumn({item, y}: {item: any, y: number}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: item.id,
    transition: {
      duration: 300, // milliseconds
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    }
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div className='group/column' ref={setNodeRef} style={style} >
      <div className="w-[300px] h-[1111px] bg-brand-background dark:bg-brand-background-dark">
          <div style={{top: `-${y - 26}px`}} className="flex justify-between items-center h-[28px] border-b-[1px] bg-brand-background dark:bg-brand-background-dark border-border z-10 sticky pl-2">
            <div className='group/name flex'>
              <ColumnName item={item}/>
              <div className='group-hover/column:opacity-100 opacity-0 transition-opacity'>
                <Icons.drag className='ml-[-4px] focus:outline-none opacity-50 group-hover/name:opacity-100 transition color cursor-grab active:cursor-grabbing' size={18} {...attributes} {...listeners}/>
              </div>
            </div>
            <ColumnDelete columnId={item.id}/>
          </div>
          <div className="w-fill my-1 mx-1 h-[200px] bg-[red]"></div>
      </div>
    </div>
  );
}