import * as z from "zod"
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/session'
import { db } from '@/lib/db'
import { inviteResponse, routeContextSchema } from "@/lib/validations/invites"
import { userHasAccessToSpace } from "@/lib/user-access"

export async function DELETE(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const invite = await db.invite.findFirst({
      where: {
        id: params.inviteId
      },
      select: {
        spaceId: true,
        userId: true,
        accessLevel: true,
        active: true
      }
    })

    if (!await userHasAccessToSpace(invite!.spaceId, 7)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const deleteInvite = await db.invite.delete({
      where: {
        userId_spaceId: {userId: invite!.userId, spaceId: invite!.spaceId}
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
    const json = await request.json();
    const body = inviteResponse.parse(json)
    const user = await getCurrentUser()

    const invite = await db.invite.findFirst({
      where: {
        id: params.inviteId
      },
      select: {
        spaceId: true,
        userId: true,
        accessLevel: true,
        active: true
      }
    })

    if (user?.id != invite?.userId) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (body.response) {
      const newSpaceUser = await db.spaceUser.create({
        data: {
          spaceId: invite!.spaceId,
          accessLevel: invite!.accessLevel,
          userId: invite!.userId,
        }
      })

      const updateInviteState = await db.invite.delete({
        where: {
          userId_spaceId: {userId: invite!.userId, spaceId: invite!.spaceId}
        }
      })

      return NextResponse.json({spaceId: newSpaceUser.spaceId}, { status: 200 });

    } else {
      
      const updateInviteState = await db.invite.update({
          where: {
            userId_spaceId: {userId: invite!.userId, spaceId: invite!.spaceId}
          },
          data: {
            active: false
          }
        })
      }
    
      return NextResponse.json(true, { status: 200 });
  
  } catch (error) {

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })

  }
}