import { routeContextSchema, updateCardSchema } from "@/lib/validations/cards"
import { userHasAccessToSpace } from "@/lib/user-access"
import * as z from "zod"
import { db } from "@/lib/db"
import { NextResponse } from 'next/server'


export async function GET(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const card = await db.card.findFirst({
      where: {
        id: params.cardId
      },
      select: {
        name: true,
        content: true,
        Type: {
          select: {
            name: true,
            color: true,
            id: true
          }
        },
        column: {
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
        }
      }
    })

    if (!await userHasAccessToSpace(card!.column.table.dashboard.spaceId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const types = await db.cardType.findMany({
      where: {
        spaceId: card!.column.table.dashboard.spaceId
      }
    })

    return NextResponse.json(types);
  } catch (error) {
    
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}