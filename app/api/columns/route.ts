import * as z from "zod"
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { createColumnSchema } from "@/lib/validations/columns";
import { db } from "@/lib/db";
import { userHasAccessToSpace } from "@/lib/user-access";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = createColumnSchema.parse(json)

    const board = await db.board.findFirst({
      where: {
        id: body.boardId
      },
      select: {
        dashboardId: true
      }
    })

    if (board == undefined) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (!await userHasAccessToSpace(board.dashboardId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const newColumn = await db.column.create({
      data: body
    })

    return NextResponse.json(newColumn);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}