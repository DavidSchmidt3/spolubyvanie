import { type SettingsFormValues } from "@/app/[locale]/_components/forms/settings-form";
import { type Database } from "@/lib/utils/supabase/types/database";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

export type UserSettings = Database["public"]["Tables"]["user_settings"]["Row"];
export const userSettingsRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const user = await ctx.supabase.auth.getUser();

    if (!user.data.user) {
      // throw new TRPCError({
      //   code: "UNAUTHORIZED",
      //   message: "User is not authenticated",
      // });
      return null;
    }

    return ctx.db.user_settings.findFirst({
      where: {
        id: user.data.user.id,
      },
    }) as unknown as UserSettings;
  }),
  update: publicProcedure
    .input(z.custom<SettingsFormValues>())
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.supabase.auth.getUser();

      if (!user.data.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated",
        });
      }

      return ctx.db.user_settings.upsert({
        where: {
          id: user.data.user.id,
        },
        create: {
          ...input,
          id: user.data.user.id,
        },
        update: input,
      });
    }),
});
