import * as z from "zod"
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { routeContextSchema, changeSpaceSchema } from '@/lib/validations/spaces';
import { db } from "@/lib/db";
import { userHasAccessToSpace } from "@/lib/user-access";


export async function GET(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  
  try {
    const { params } = routeContextSchema.parse(context)

    if (!await userHasAccessToSpace(params.spaceId, 1)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const spaceInfo = await db.space.findUnique({
      where: {
        id: params.spaceId
      },
      select: {
        name: true,
        createdAt: true,
        dashboards: true,
        users: true
      }
    })

    return NextResponse.json(spaceInfo);
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

    if (!await userHasAccessToSpace(params.spaceId, 7)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const deleteSpace = await db.space.deleteMany({
      where: {
        id: params.spaceId
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



export async function PUT(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    if (!await userHasAccessToSpace(params.spaceId, 7)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await request.json();
    const body = changeSpaceSchema.parse(json)

    const updateSpace = await db.space.update({
      where: {
        id: params.spaceId,
      },
      data: body
    })
    
    return NextResponse.json(updateSpace);
  
  } catch (error) {

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })

  }
}