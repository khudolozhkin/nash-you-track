import * as z from "zod"
import { getCurrentUser } from "@/lib/session"
import { NextResponse } from 'next/server'
import { db } from "@/lib/db"
import { userHasAccessToSpace } from "@/lib/user-access";
import { routeContextSchema } from "@/lib/validations/members";

export async function GET(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    if (!await userHasAccessToSpace (params.spaceId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }
    
    const users = await db.spaceUser.findMany({
      where: {
        spaceId: params.spaceId
      },
      select: {
        accessLevel: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    })
  
    return NextResponse.json(users);
  
  } catch (error) {

    return new Response(null, { status: 500 })
  
  }
}