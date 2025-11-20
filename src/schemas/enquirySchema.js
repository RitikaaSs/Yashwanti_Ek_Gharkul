import { z } from "zod";

export const enquirySchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Enter valid email"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(1, "Message is required"),
});
