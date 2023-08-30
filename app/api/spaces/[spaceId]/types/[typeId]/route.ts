import * as z from "zod"
import { getCurrentUser } from "@/lib/session"
import { NextResponse } from 'next/server'
import { db } from "@/lib/db"
import { userHasAccessToSpace } from "@/lib/user-access"
import { createTypeSchema, routeContextSchema } from "@/lib/validations/cardTypes"


export async function DELETE(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    
    if (!await userHasAccessToSpace(params.spaceId, 7)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const deleteType = await db.cardType.delete({
      where: {
        id: params.typeId
      }
    })

    return NextResponse.json(true)
  } catch (error) {

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}