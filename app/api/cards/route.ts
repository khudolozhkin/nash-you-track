import * as z from "zod"
import { NextResponse } from 'next/server';
import { createCardSchema } from "@/lib/validations/cards";
import { db } from "@/lib/db";
import { userHasAccessToSpace } from "@/lib/user-access";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = createCardSchema.parse(json)

    const column = await db.column.findFirst({
      where: {
        id: body.columnId
      },
      select: {
        board: {
          select: {
            dashboard: {
              select: {
                spaceId: true
              }
            }
          }
        }
      }
    })

    if (column == undefined) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (!await userHasAccessToSpace(column.board.dashboard.spaceId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const newCard = await db.card.create({
      data: body
    })

    return NextResponse.json(newCard);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}