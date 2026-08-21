import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://dhruvtapaniya.com/sitemap.xml", // [DOMAIN TO CONFIRM]
  };
}
