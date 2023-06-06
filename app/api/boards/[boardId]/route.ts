import * as z from "zod"
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { db } from "@/lib/db";
import { userHasAccessToSpace } from "@/lib/user-access";
import { routeContextSchema, updateBoardSchema } from "@/lib/validations/boards";

export async function PUT(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const board = await db.board.findFirst({
      where: {
        id: params.boardId
      },
      select: {
        dashboard: {
          select: {
            spaceId: true
          }
        }
      }
    })

    if (!await userHasAccessToSpace(board!.dashboard.spaceId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await request.json();
    const body = updateBoardSchema.parse(json)

    const updateBoard = await db.board.update({
      where: {
        id: params.boardId,
      },
      data: body
    })
    
    return NextResponse.json(updateBoard);
  
  } catch (error) {

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    
    const board = await db.board.findFirst({
      where: {
        id: params.boardId
      },
      select: {
        dashboard: {
          select: {
            spaceId: true
          }
        }
      }
    })

    if (!await userHasAccessToSpace(board!.dashboard.spaceId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const deleteBoard = await db.board.deleteMany({
      where: {
        id: params.boardId
      }
    })

    return NextResponse.json(true, { status: 200 });
  } catch (error) {

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}