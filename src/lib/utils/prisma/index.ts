import { PrismaClient } from "@prisma/client";
import { createPaginator } from "prisma-extension-pagination";

import { env } from "@/env";

const paginate = createPaginator({
  pages: {
    limit: 10, // set default limit to 10
    includePageCount: true, // include counters by default
  },
});

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.VERCEL_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  }).$extends({
    model: {
      advertisements: {
        paginate,
      },
    },
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.VERCEL_ENV !== "production") globalForPrisma.prisma = db;

type ExtendedPrismaClient = typeof db;
export type TransactionalPrismaClient = Parameters<
  Parameters<ExtendedPrismaClient["$transaction"]>[0]
>[0];
