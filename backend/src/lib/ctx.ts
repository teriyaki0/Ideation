import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";

export const createAppContext = () => {
  const prisma = new PrismaClient();
  const redis = new Redis({
    host: "127.0.0.1",
    port: 6379,
  });
  return {
    prisma,
    redis,
    stop: async () => {
      await prisma.$disconnect();
      redis.disconnect();
    },
  };
};

export type AppContext = ReturnType<typeof createAppContext>;
