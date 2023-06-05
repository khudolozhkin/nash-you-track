import { z } from "zod"

export const routeContextSchema = z.object({
  params: z.object({
    dashboardId: z.string(),
  }),
})

export const dashboardSchema = z.object({
  spaceId: z.string().min(20).max(30),
  name: z.string().min(3).max(32),
})

export const putDashboardSchema = z.object({
  name: z.string().min(3).max(32),
})