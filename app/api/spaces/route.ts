import * as z from "zod"
import { userSpaceSchema } from "@/lib/validations/spaces";
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (user == undefined) {
      return new Response("Unauthorized", { status: 403 })
    }
    
    const spaces = await db.user.findMany({
      where: {
        id: user?.id,
      },
      select: {
        spaces: {
          select: {
            spaceId: true,
            userId: true,
            accessLevel: true,
            space: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
  
    return NextResponse.json(spaces[0]);
  
  } catch (error) {

    return new Response(null, { status: 500 })
  
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (user == undefined) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await request.json();
    const body = userSpaceSchema.parse(json)

    const newSpace = await db.space.create({
      data: {
        name: body.name
      }
    })

    const newOwnerSpace = await db.spaceUser.create({
      data: {
        accessLevel: 7,
        userId: `${user?.id}`,
        spaceId: newSpace?.id
      }
    })

    return NextResponse.json({newOwnerSpace, newSpace});

  } catch (error) {

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}