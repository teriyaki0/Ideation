import { z } from "zod";

export const zSignUpTrpcScheme = z.object({
  nick: z
    .string()
    .regex(
      /^[a-z0-9-]+$/,
      "Nick may contain only lowercase letters, numbers and dashes"
    )
    .min(1, "Nick is required"),
  password: z.string().min(1, "Password is required"),
});
