import * as z from "zod"
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { routeContextSchema, updateCardSchema } from "@/lib/validations/cards";
import { db } from "@/lib/db";
import { userHasAccessToSpace } from "@/lib/user-access";

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

    if (!await userHasAccessToSpace(card!.column.table.dashboard.spaceId, 1)) {
      return new Response("Unauthorized", { status: 403 })
    }

    return NextResponse.json(card);
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

    if (!await userHasAccessToSpace(card!.column.table.dashboard.spaceId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await request.json();
    const body = updateCardSchema.parse(json)

    const updateCard = await db.card.update({
      where: {
        id: params.cardId,
      },
      data: body
    })
    
    return NextResponse.json(updateCard);
  
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

    if (!await userHasAccessToSpace(card!.column.table.dashboard.spaceId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const deleteCard = await db.card.deleteMany({
      where: {
        id: params.cardId
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