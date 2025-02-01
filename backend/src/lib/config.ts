import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const configSchema = z.object({
  HTTP_HOST: z.string().default("localhost"),
  HTTP_PORT: z.coerce.number().default(8000),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  EXAMPLE_MESSAGE: z.string().default("Hello, world!"),
  PASSWORD_SALT: z.string().min(1),
});

export const config = configSchema.parse(process.env);
