import { inngest } from "@/lib/data/inngest/client";
import { geocodeAd } from "@/lib/data/inngest/functions";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [geocodeAd],
});
