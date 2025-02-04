import { z } from "zod";

export const zEditProfileTrpcScheme = z.object({
  nick: z
    .string()
    .regex(
      /^[a-z0-9-]+$/,
      "Nick may contain only lowercase letters, numbers and dashes"
    )
    .min(1, "Nick is required"),
  name: z.string().max(50).default(""),
});
