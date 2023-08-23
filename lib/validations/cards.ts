import * as z from "zod"

export const routeContextSchema = z.object({
  params: z.object({
    cardId: z.string(),
  }),
})

export const updateCardSchema = z.object({
  name: z.string().min(3).max(32).optional(),
  sortOrder: z.number().optional(),
  columnId: z.string().optional(),
  content: z.object({}).optional()
})

export const createCardSchema = z.object({
  name: z.string().min(3).max(32),
  columnId: z.string(),
})