import { z } from "zod"

export const routeContextSchema = z.object({
  params: z.object({
    spaceId: z.string(),
    userId: z.string().optional()
  }),
})

export const routeContextSchemaWithUserId = z.object({
  params: z.object({
    spaceId: z.string(),
    userId: z.string()
  }),
})

export const updateSpaceUserSchema = z.object({
  accessLevel: z.number()
})