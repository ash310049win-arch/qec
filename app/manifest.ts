import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Quilon Educational Consultancy",
    short_name: "Quilon Consultancy",
    description:
      "Study abroad consultancy in Kollam, Kerala — university admissions, student visa guidance, IELTS preparation, scholarships, and career matching for students.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#e02424",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
