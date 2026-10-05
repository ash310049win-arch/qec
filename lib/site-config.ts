export const SITE_URL = "https://www.quilonconsultancy.in"
export const SITE_NAME = "Quilon Educational Consultancy"
export const DEFAULT_OG_IMAGE = "/images/hero-students-new.jpg"

export const BUSINESS = {
  name: "Quilon Educational Consultancy",
  description:
    "Study abroad consultancy in Kollam, Kerala — university admissions, student visa guidance, IELTS preparation, scholarships, and career matching for students.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/qec-logo.png`,
  telephone: "+91 94977 71392",
  telephoneAlt: "+91 92077 74401",
  email: "info@quilonconsultancy.com",
  streetAddress: "6/730, Kunnumpurathu Building, Ampalakara P.O.",
  addressLocality: "Valakom, Kottarakara",
  addressRegion: "Kerala",
  postalCode: "691532",
  addressCountry: "IN",
  latitude: 9.0068898,
  longitude: 76.7832048,
  priceRange: "₹₹",
  openingHours: [
    { days: "Mon-Fri", opens: "09:00", closes: "18:00" },
    { days: "Sat", opens: "10:00", closes: "16:00" },
  ],
} as const

export type OfficeLocation = {
  id: string
  city: string
  label: string
  addressLines: string[]
  mapsQuery: string
  mapsUrl: string
  embedUrl: string
}

function office(
  id: string,
  city: string,
  label: string,
  addressLines: string[],
  mapsQuery: string
): OfficeLocation {
  const encoded = encodeURIComponent(mapsQuery)
  return {
    id,
    city,
    label,
    addressLines,
    mapsQuery,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encoded}`,
    embedUrl: `https://www.google.com/maps?q=${encoded}&z=15&output=embed`,
  }
}

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  office(
    "ampalakara",
    "Ampalakara",
    "Head Office",
    [
      "6/730, Kunnumpurathu Building, Ampalakara P.O.",
      "Valakom, Kottarakara, Kollam, Kerala - 691532",
    ],
    "6/730, Kunnumpurathu Building, Ampalakara P.O., Valakom, Kottarakara, Kollam, Kerala 691532"
  ),
  office(
    "kottarakara",
    "Kottarakara",
    "Branch Office",
    ["Opposite Swayamwara Skills, Pulamon P.O", "Kottarakara (Kollam), Kerala"],
    "Opposite Swayamwara Skills, Pulamon P.O, Kottarakara, Kollam, Kerala 691531"
  ),
  office(
    "kollam",
    "Kollam",
    "Branch Office",
    ["High School Jn", "Kollam, Kerala - 691009"],
    "High School Jn, Kollam, Kerala 691009"
  ),
  office(
    "anchal",
    "Anchal",
    "Branch Office",
    ["College Jn", "Anchal, Kollam, Kerala - 691306"],
    "College Jn, Anchal, Kollam, Kerala 691306"
  ),
  office(
    "karunagappally",
    "Karunagappally",
    "Branch Office",
    ["Opposite H&J Mall", "Karunagappally, Kerala - 690518"],
    "Opposite H&J Mall, Karunagappally, Kerala 690518"
  ),
  office(
    "adimali",
    "Adimali",
    "Branch Office",
    [
      "Service Station Road, Old Putheyath Building",
      "Near Krishna Jewellery, Adimali",
      "Adimali - 685561",
    ],
    "Service Station Road, Old Putheyath Building, Near Krishna Jewellery, Adimali, Kerala 685561"
  ),
  office(
    "trivandrum",
    "Trivandrum",
    "Branch Office",
    [
      "Near Ameya Collections, Vanross Road",
      "Oottukuzhy Jn, Trivandrum, Kerala - 695001",
    ],
    "Near Ameya Collections, Vanross Road, Oottukuzhy Jn, Trivandrum, Kerala 695001"
  ),
]

export const HEAD_OFFICE = OFFICE_LOCATIONS[0]

export const BRANCH_OFFICES = OFFICE_LOCATIONS.slice(1)

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
