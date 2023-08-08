import * as z from "zod"
import { getCurrentUser } from '@/lib/session';
import { NextResponse } from 'next/server';
import { db } from "@/lib/db";
import { routeContextSchema, updateDashboardSchema } from "@/lib/validations/dashboards";
import { userHasAccessToSpace } from "@/lib/user-access";


export async function GET(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const dashboard = await db.dashboard.findFirst({
      where: {
        id: params.dashboardId
      },
      select: {
        spaceId: true,
        name: true,
        boards: {
          select: {
            name: true,
            top: true,
            left: true,
            columns: {
              select: {
                name: true,
                sortOrder: true,
                cards: {
                  select: {
                    id: true,
                    name: true,
                    sortOrder: true,
                    columnId: true
                  }
                }
              } 
            }
          }
        }
      }
    })

    if (!await userHasAccessToSpace(dashboard!.spaceId, 1)) {
      return new Response("Unauthorized", { status: 403 })
    }

    return NextResponse.json(dashboard);
  } catch (error) {
    
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const json = await request.json();
    const body = updateDashboardSchema.parse(json)

    const dashboard = await db.dashboard.findFirst({
      where: {
        id: params.dashboardId
      },
      select: {
        spaceId: true,
        name: true
      }
    })


    if (!await userHasAccessToSpace (dashboard!.spaceId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const dashboardUpdate = await db.dashboard.update({
      where: {
        id: params.dashboardId,
      },
      data: {
        name: body.name
      }
    })

    return NextResponse.json(dashboardUpdate);

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

    
    const dashboard = await db.dashboard.findFirst({
      where: {
        id: params.dashboardId
      },
      select: {
        spaceId: true
      }
    })

    if (!await userHasAccessToSpace(dashboard!.spaceId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const deleteBoard = await db.dashboard.deleteMany({
      where: {
        id: params.dashboardId
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