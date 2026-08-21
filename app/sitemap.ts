import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dhruvtapaniya.com", // [DOMAIN TO CONFIRM]
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
