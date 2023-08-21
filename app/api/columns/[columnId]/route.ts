import * as z from "zod"
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { db } from "@/lib/db";
import { userHasAccessToSpace } from "@/lib/user-access";
import { updateColumnSchema, routeContextSchema } from "@/lib/validations/columns";

export async function PUT(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const column = await db.column.findFirst({
      where: {
        id: params.columnId
      },
      select: {
        table: {
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

    if (!await userHasAccessToSpace(column!.table.dashboard.spaceId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await request.json();
    const body = updateColumnSchema.parse(json)

    const updateColumn = await db.column.update({
      where: {
        id: params.columnId,
      },
      data: body
    })
    
    return NextResponse.json(updateColumn);
  
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

    const column = await db.column.findFirst({
      where: {
        id: params.columnId
      },
      select: {
        table: {
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

    if (!await userHasAccessToSpace(column!.table.dashboard.spaceId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const deleteColumn = await db.column.deleteMany({
      where: {
        id: params.columnId
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