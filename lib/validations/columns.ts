import * as z from "zod"

export const routeContextSchema = z.object({
  params: z.object({
    columnId: z.string(),
  }),
})

export const updateColumnSchema = z.object({
  name: z.string().min(3).max(32).optional(),
  sortOrder: z.number().optional(),
  boardId: z.string().optional()
})

export const createColumnSchema = z.object({
  tableId: z.string()
})