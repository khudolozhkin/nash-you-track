import * as z from "zod"
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { db } from "@/lib/db";
import { dashboardSchema } from "@/lib/validations/dashboards";
import { userHasAccessToSpace } from "@/lib/user-access";

export async function POST(request: Request) {
  try {

    const json = await request.json();
    const body = dashboardSchema.parse(json)

    if (!await userHasAccessToSpace (body.spaceId, 4)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const newDashboard = await db.dashboard.create({
      data: {
        name: body.name,
        spaceId: body.spaceId
      }
    })

    return NextResponse.json(newDashboard);

  } catch (error) {

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}