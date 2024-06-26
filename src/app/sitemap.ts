import { type MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://spolubyvanie.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          sk: "https://spolubyvanie.vercel.app/sk",
          en: "https://spolubyvanie.vercel.app/en",
        },
      },
    },
  ];
}
