import { z } from "zod";

export const zCreateIdeaTrpcScheme = z.object({
  name: z.string().min(1, "Name is required"),
  nick: z
    .string()
    .regex(
      /^[a-z0-9-]+$/,
      "Nick may contain only lowercase letters, numbers and dashes"
    )
    .min(1, "Nick is required"),
  description: z.string().min(1, "Description is required"),
  text: z.string().min(50, "Text should be at least 100 characters long"),
});
