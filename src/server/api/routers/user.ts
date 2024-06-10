import { type supabase } from "@/lib/utils/supabase/client";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export type User = Awaited<
  ReturnType<typeof supabase.auth.getUser>
>["data"]["user"];

export const userRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const user = await ctx.supabase.auth.getUser();

    return user.data.user;
  }),
});
