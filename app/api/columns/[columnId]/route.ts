import * as z from "zod"
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { db } from "@/lib/db";
import { userHasAccessToSpace } from "@/lib/user-access";
import { updateColumnSchema, routeContextSchema } from "@/lib/validations/columns";
import { Column, Prisma } from "@prisma/client";
import { Data } from "@dnd-kit/core";

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
        sortOrder: true,
        table: {
          select: {
            columns: true,
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

    if (body?.sortOrder == column?.sortOrder) {
      for (let i = 0; i < column!.table.columns.length; i++) {
        if (i == 0) {
          column!.table.columns[i].sortOrder = new Prisma.Decimal(100)
          const updateColumn = await db.column.update({
            where: {
              id: column!.table.columns[i].id
            },
            data: column!.table.columns[i]
          })
          
        } else {
          let tempSortOrder = Number(column!.table.columns[i-1].sortOrder) + 200
          column!.table.columns[i].sortOrder = new Prisma.Decimal(tempSortOrder)
          const updateColumn = await db.column.update({
            where: {
              id: column!.table.columns[i].id
            },
            data: column!.table.columns[i]
          })
        }
      }
    }

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