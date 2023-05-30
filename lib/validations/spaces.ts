import * as z from "zod"

export const userSpaceSchema = z.object({
  name: z.string().min(3).max(32),
})

export const routeContextSchema = z.object({
  params: z.object({
    spaceId: z.string(),
  }),
})

export const changeSpaceSchema = z.object({
  name: z.string().min(3).max(32).optional()
})