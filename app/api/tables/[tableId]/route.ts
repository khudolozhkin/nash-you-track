import * as z from "zod"
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { db } from "@/lib/db";
import { userHasAccessToSpace } from "@/lib/user-access";
import { routeContextSchema, updateTableSchema } from "@/lib/validations/table";

export async function PUT(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const table = await db.table.findFirst({
      where: {
        id: params.tableId
      },
      select: {
        dashboard: {
          select: {
            id: true,
            spaceId: true
          }
        }
      }
    })

    if (!await userHasAccessToSpace(table!.dashboard.spaceId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await request.json();
    const body = updateTableSchema.parse(json)

    const updateTable = await db.table.update({
      where: {
        id: params.tableId,
      },
      data: body
    })
    
    return NextResponse.json({updateTable, dashboardId: table?.dashboard.id});
  
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

    
    const table = await db.table.findFirst({
      where: {
        id: params.tableId
      },
      select: {
        dashboard: {
          select: {
            spaceId: true,
            id: true
          }
        }
      }
    })

    if (!await userHasAccessToSpace(table!.dashboard.spaceId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const deleteTable = await db.table.deleteMany({
      where: {
        id: params.tableId
      }
    })

    return NextResponse.json({dashboardId: table?.dashboard.id}, { status: 200 });
  } catch (error) {

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}