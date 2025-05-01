import { z } from "zod";

export const createSlotValidationSchema = z.object({
  service: z.string({
    required_error: "Service is required",
  }),
  date: z
    .string({ required_error: "Date is required" })
    .min(1, "Date is required"),
  startTime: z
    .string({ required_error: "Start time is required" })
    .min(1, "Start time is required"),
  endTime: z
    .string({ required_error: "End time is required" })
    .min(1, "End time is required"),
});
