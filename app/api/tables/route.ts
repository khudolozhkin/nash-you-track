import * as z from "zod"
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { createTableSchema } from "@/lib/validations/table";
import { db } from "@/lib/db";
import { userHasAccessToSpace } from "@/lib/user-access";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = createTableSchema.parse(json)

    const dashboard = await db.dashboard.findFirst({
      where: {
        id: body.data.dashboardId
      },
      select: {
        name: true,
        id: true,
        spaceId: true
      }
    })

    if (dashboard == undefined) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (!await userHasAccessToSpace(dashboard.spaceId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const newTable = await db.table.create({
      data: body.data
    })

    let columnArray: {name: string, tableId: string, sortOrder: number}[] = []

    for (let i = 0; i < body.tableCount; i++) {
      if (i == 0) {
        columnArray.push({name: `Новая колонка ${i+1}`, tableId: newTable.id, sortOrder: 100})
      } else {
      columnArray.push({name: `Новая колонка ${i+1}`, tableId: newTable.id, sortOrder: columnArray[i-1].sortOrder + 200})
      }
    }

    
    const newColumn = await db.column.createMany({
      data: columnArray
    })

    // const newCard = await db.card.create({
    //   data: {
    //     name: "Первая карточка",
    //     columnId: newColumn!.id
    //   }
    // })

    return NextResponse.json(newTable);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}