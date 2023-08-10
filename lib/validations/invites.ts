import * as z from "zod"

export const inviteSchema = z.object({
  spaceId: z.string().min(20).max(30),
  accessLevel: z.number(),
  userEmail: z.string()
})

export const routeContextSchema = z.object({
  params: z.object({
    inviteId: z.string(),
  }),
})

export const inviteResponse = z.object({
  response: z.boolean()
})
