import { z } from "zod";

export const zSignInTrpcScheme = z.object({
  nick: z.string().min(1, "Nick is required"),
  password: z.string().min(1, "Password is required"),
});
