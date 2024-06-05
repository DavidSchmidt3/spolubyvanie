import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type RouterOutput } from "../root";

export type UserSettings = RouterOutput["userSettings"]["get"];
export const userSettingsRouter = createTRPCRouter({
  get: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.db.user_settings.findFirst({
      where: {
        id: input,
      },
    });
  }),
});
