import { z } from "zod";

export const configSchema = z.object({
  VITE_BACKEND_URL: z.string().trim().url().min(1),
});

export const config = configSchema.parse(import.meta.env);
