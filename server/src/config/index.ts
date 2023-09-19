import "dotenv/config";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url:
        process.env.NODE_ENV === "production"
          ? process.env.POSTGRES_PRISMA_PROD
          : process.env.POSTGRES_PRISMA_DEV,
    },
  },
});
