export const SITE_URL = "https://www.quilonconsultancy.com"
export const SITE_NAME = "Quilon Educational Consultancy"
export const DEFAULT_OG_IMAGE = "/images/hero-students.jpg"

export const BUSINESS = {
  name: "Quilon Educational Consultancy",
  description:
    "Study abroad consultancy in Kollam, Kerala — university admissions, student visa guidance, IELTS preparation, scholarships, and career matching for students.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/qec-logo.png`,
  telephone: "+91 94977 71392",
  telephoneAlt: "+91 92077 74401",
  email: "info@quilonconsultancy.com",
  streetAddress: "Opp. Swayamvara Silks, Pulamon Junction",
  addressLocality: "Kottarakara",
  addressRegion: "Kerala",
  postalCode: "691531",
  addressCountry: "IN",
  latitude: 9.0068898,
  longitude: 76.7832048,
  priceRange: "₹₹",
  openingHours: [
    { days: "Mon-Fri", opens: "09:00", closes: "18:00" },
    { days: "Sat", opens: "10:00", closes: "16:00" },
  ],
} as const

const DAY_NAMES: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    description: BUSINESS.description,
    image: BUSINESS.logo,
    url: BUSINESS.url,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    openingHoursSpecification: BUSINESS.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.split("-").map((d) => DAY_NAMES[d]),
      opens: h.opens,
      closes: h.closes,
    })),
  }
}
