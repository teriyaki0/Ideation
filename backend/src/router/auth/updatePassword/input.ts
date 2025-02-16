import { z } from "zod";

export const zEditPasswordTrpcScheme = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: z.string().min(1, "New password is required"),
});
