import * as z from "zod"

export const routeContextSchema = z.object({
  params: z.object({
    cardId: z.string(),
    userId: z.string().optional()
  }),
})

export const updateCardSchema = z.object({
  name: z.string().min(3).max(32).optional(),
  sortOrder: z.number().optional(),
  columnId: z.string().optional(),
  deadline: z.string().nullable().optional(),
  content: z.object({
    blocks: z.array(z.any()),
    time: z.number(),
    version: z.string()
  }).optional(),
  typeId: z.string().optional()
})

export const createCardSchema = z.object({
  name: z.string().min(3).max(32),
  columnId: z.string(),
  dashboardId: z.string()
})

export const createResponsibleUser = z.object({
  userId: z.string()
})