import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/constants";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = siteConfig.url || "https://yourportfolio.com";
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}