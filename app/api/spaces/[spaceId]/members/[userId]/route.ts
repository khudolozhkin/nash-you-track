import * as z from "zod"
import { getCurrentUser } from "@/lib/session"
import { NextResponse } from 'next/server'
import { db } from "@/lib/db"
import { userHasAccessToSpace } from "@/lib/user-access";
import { routeContextSchema, updateSpaceUserSchema, routeContextSchemaWithUserId } from "@/lib/validations/members";

export async function GET(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    if (!await userHasAccessToSpace (params.spaceId, 7)) {
      return new Response("Unauthorized", { status: 403 })
    }
    
    const users = await db.spaceUser.findMany({
      where: {
        spaceId: params.spaceId,
        userId: params.userId
      },
      select: {
        accessLevel: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
  
    return NextResponse.json(users[0]);
  
  } catch (error) {

    return new Response(null, { status: 500 })
  
  }
}


export async function DELETE(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const user = await getCurrentUser()
    
    if (params.userId == user?.id) {
      
      const spaceUser = await db.spaceUser.findFirst({
        where: {
          userId: params.userId,
          spaceId: params.spaceId
        },
        select: {
          userId: true,
          accessLevel: true
        }
      })

      if (spaceUser?.accessLevel == 7) {
        return new Response("Unauthorized", { status: 403 })
      }
      
      const deleteUser = await db.spaceUser.deleteMany({
        where: {
          userId: params.userId,
          spaceId: params.spaceId
        },
      })
  
      return NextResponse.json(true, { status: 200 });

    } else {
      if (!await userHasAccessToSpace(params.spaceId, 7)) {
        return new Response("Unauthorized", { status: 403 })
      }
      
      const spaceUser = await db.spaceUser.findFirst({
        where: {
          userId: params.userId,
          spaceId: params.spaceId
        },
        select: {
          userId: true,
          accessLevel: true
        }
      })

      if (spaceUser?.accessLevel == 7) {
        return new Response("Unauthorized", { status: 403 })
      }

      const deleteUser = await db.spaceUser.deleteMany({
        where: {
          userId: params.userId,
          spaceId: params.spaceId
        },
      })
  
      return NextResponse.json(true, { status: 200 });
    }
  } catch (error) {

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}


export async function PUT(
  request: Request,
  context: z.infer<typeof routeContextSchemaWithUserId>
) {
  try {
    const { params } = routeContextSchemaWithUserId.parse(context)

    const json = await request.json();
    const body = updateSpaceUserSchema.parse(json)

    if (body.accessLevel == 1 || body.accessLevel == 4) {
      
      if (!await userHasAccessToSpace (params.spaceId, 7)) {
        return new Response("Unauthorized", { status: 403 })
      }

      const spaceUserUpdate = await db.spaceUser.update({
        where: {
          userId_spaceId: { userId:params!.userId, spaceId:params.spaceId }
        },
        data: {
          accessLevel: body.accessLevel
        }
      })

      return NextResponse.json(spaceUserUpdate);

    } else {
      return new Response("Unauthorized", { status: 403 })
    }

  } catch (error) {

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}