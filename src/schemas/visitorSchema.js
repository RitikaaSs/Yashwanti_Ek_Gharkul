import { z } from "zod";

export const visitorSchema = z.object({
  visitname: z.string().min(1, "Name is required"),
  visitemail: z.string().email("Enter valid email"),
  visitphone: z
    .string()
    .min(10, "Number must be at least 10 digits")
    .max(10, "Number is too long")
    .regex(/^[0-9]+$/, "Number must contain only digits"),
  visitdate: z.string().min(1, "Please select"),
  visitslote: z.string().min(1, "Please select"),
  visitpurpose: z.string().min(1, "Please select"),
  visitvisitors: z.string().min(1, "Visitors count is required"),
});
