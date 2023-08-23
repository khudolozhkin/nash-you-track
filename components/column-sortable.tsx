import React, { Key } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Icons } from './ui/icons';
import ColumnName from './column-name';
import ColumnDelete from './column-delete';
import CardCreate from './card-create';
import Card from './card';

type Column = {
  id: string;
  name: string;
  sortOrder: Key;
  cards: {
      id: string;
      name: string;
      sortOrder: Number;
      columnId: string;
  }[];
}

type Card = {
  id: string;
  name: string;
  sortOrder: Number;
  columnId: string;
}

export function SortableColumn({column, y}: {column: Column, y: number}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: column.id,
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
      <div className="w-[300px] h-full bg-brand-background dark:bg-brand-background-dark">
          <div style={{top: `-${y - 26}px`}} className="flex justify-between items-center h-[28px] border-b-[1px] bg-brand-background dark:bg-brand-background-dark border-border z-10 sticky pl-2">
            <div className='group/name flex'>
              <ColumnName item={column}/>
              <div className='group-hover/column:opacity-100 opacity-0 transition-opacity duration-300'>
                <Icons.drag className='ml-[-4px] focus:outline-none opacity-50 group-hover/name:opacity-100 transition color cursor-grab active:cursor-grabbing' size={18} {...attributes} {...listeners}/>
              </div>
            </div>
            <ColumnDelete columnId={column.id}/>
          </div>
          <div className="px-2">
            {column.cards.map((card: Card, index) => (
              <Card card={card} key={card.id}/>
            ))}
            <CardCreate columnId={column.id}/>
          </div>
      </div>
    </div>
  );
}