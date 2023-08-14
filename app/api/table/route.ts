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
        id: body.dashboardId
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

    if (!await userHasAccessToSpace(dashboard.id, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const newTable = await db.table.create({
      data: body
    })

    const newColumn = await db.column.create({
      data: {
        name: "Первая колонка",
        boardId: newTable!.id
      }
    })

    const newCard = await db.card.create({
      data: {
        name: "Первая карточка",
        columnId: newColumn!.id
      }
    })

    return NextResponse.json(newTable);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}