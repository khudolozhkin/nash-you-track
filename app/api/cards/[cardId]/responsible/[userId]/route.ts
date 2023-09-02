import * as z from "zod"
import { NextResponse } from 'next/server';
import { createResponsibleUser, routeContextSchema } from "@/lib/validations/cards";
import { db } from "@/lib/db";
import { userHasAccessToSpace } from "@/lib/user-access";


export async function DELETE(
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

    if (!await userHasAccessToSpace(card!.column.table.dashboard.spaceId, 4) || params.userId == undefined) {
      return new Response("Unauthorized", { status: 403 })
    }

    const deleteUser = await db.responsibleUserForCard.delete({
      where: {
        userId_cardId: {userId: params.userId, cardId: params.cardId}
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