import * as z from "zod"

export const routeContextSchema = z.object({
  params: z.object({
    spaceId: z.string(),
    typeId: z.string().optional()
  }),
})

export const createTypeSchema = z.object({
  name: z.string().min(3).max(32),
  color: z.string()
})