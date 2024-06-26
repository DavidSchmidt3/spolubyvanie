import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/auth", "/password-reset", "/password-change"],
    },
    sitemap: "https://spolubyvanie.vercel.app/sitemap",
  };
}
