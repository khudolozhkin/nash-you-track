import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { db } from '@/lib/db';


export async function GET() {
  let user = await getCurrentUser();
  const space = await db.user.findMany({
    where: {
      id: user?.id
    },
    select: {
      spaces: true
    },
  })

  return NextResponse.json(space[0]);
}

export async function POST(request: Request) {
  let user = await getCurrentUser();
  const body = await request.json();

  const newSpace = await db.space.create({
    data: {
      name: body.name
    }
  })


  const newOwnerSpace = await db.spaceUser.create({
    data: {
      permission: "OWNER",
      userId: `${user?.id}`,
      spaceId: newSpace?.id
    }
  })
  

  return NextResponse.json(newOwnerSpace);
}