import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userSettingsRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.string())
    .query(({ input, ctx }) => {
      return ctx.db.user_settings.findFirst({
        where: {
          user_id: input,
        },
      });
    }),
});
