import * as z from "zod"
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/session'
import { db } from '@/lib/db'
import { inviteSchema } from "@/lib/validations/invites"
import { userHasAccessToSpace } from "@/lib/user-access"

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (user == undefined) {
      return new Response("Unauthorized", { status: 403 })
    }
    
    const invites = await db.invite.findMany({
      where: {
        userId: user.id
      },
      select: {
        id: true,
        active: true,
        space: {
          select: {
            name: true
          }
        }
      }
    }
    )

    if (invites.length == 0) {
      return NextResponse.json([]);
    }
  
    return NextResponse.json(invites);
  
  } catch (error) {

    return new Response(null, { status: 500 })
  
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = inviteSchema.parse(json)

    if (!await userHasAccessToSpace(body.spaceId, 7) || body.accessLevel > 4) {
      return new Response("Unauthorized", { status: 403 })
    }

    const user = await db.user.findFirst({
      where: {
        email: body.userEmail
      },
      select: {
        id: true
      }
    })

    const newInvite = await db.invite.create({
      data: {
        accessLevel: body.accessLevel,
        spaceId: body.spaceId,
        userId: user!.id,
        active: true
      }
    })

    return NextResponse.json({newInvite});

  } catch (error) {

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}