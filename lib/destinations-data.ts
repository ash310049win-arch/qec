export type MotifKey =
  | "cherry-blossom"
  | "maple-leaf"
  | "thistle-tartan"
  | "stars-stripes"
  | "boomerang-southern-cross"
  | "eagle-bavaria"
  | "shamrock"
  | "fern-koru"
  | "fleur-de-lis"
  | "tulip-windmill"
  | "palm-falcon"
  | "mugunghwa"
  | "orchid-merlion"
  | "eagle-amber"
  | "hibiscus"

export type HeroCard = {
  label: string
  image: string
  alt: string
  vertical?: boolean
}

export type WhyPoint = {
  title: string
  text: string
  icon: "briefcase" | "award" | "wallet" | "alert"
}

export type FeaturedUniversity = {
  name: string
  city: string
}

export type CountryData = {
  slug: string
  name: string
  flag: string
  datasetCountry: string
  heroImage: string
  headline: string
  eyebrow: string
  tagline: string
  motif: MotifKey
  heroCards: HeroCard[]
  whyTitle: string
  whyPoints: WhyPoint[]
  featuredUniversities: FeaturedUniversity[]
  popularCourses: string[]
  cost: {
    tuition: string
    living: string
    note: string
  }
  visa: {
    type: string
    funds: string
    documents: string[]
    postStudyWorkName: string
    postStudyWorkDuration: string
    intakes: string[]
  }
  services: { title: string; text: string }[]
  closing: { heading: string; text: string }
}

export const COUNTRIES: CountryData[] = [
  {
    slug: "japan",
    name: "Japan",
    flag: "https://flagcdn.com/jp.svg",
    datasetCountry: "Japan",
    heroImage: "/images/dest-japan-hero.jpg",
    headline: "STUDY IN JAPAN",
    eyebrow: "Where precision, technology, and tradition meet",
    tagline:
      "Robotics labs, cherry-blossom campuses, and a post-study J-Find visa up to 2 years — Japan pairs world-class STEM with some of the most affordable national tuition on earth.",
    motif: "cherry-blossom",
    heroCards: [
      {
        label: "Tokyo",
        image: "/images/dest-japan-1.jpg",
        alt: "Tokyo cityscape at dusk",
      },
      {
        label: "Osaka",
        image: "/images/dest-japan-2.jpg",
        alt: "Osaka Castle against a bright blue sky",
        vertical: true,
      },
      {
        label: "Top Universities",
        image: "/images/dest-japan-3.jpg",
        alt: "Students in a focused group study session at a Tokyo university",
      },
      {
        label: "Student Life",
        image: "/images/dest-japan-4.jpg",
        alt: "Art students sketching in a Tokyo studio",
        vertical: true,
      },
    ],
    whyTitle: "Why Japan?",
    whyPoints: [
      {
        icon: "briefcase",
        title: "Post-study work",
        text: "The J-Find visa gives recent graduates up to 2 years to find a job or start a business in Japan — with a clear path to a work visa once hired.",
      },
      {
        icon: "award",
        title: "Standout strength",
        text: "A global leader in robotics, AI, semiconductors, and automotive engineering, with deep university–industry research ties.",
      },
      {
        icon: "wallet",
        title: "Cost positioning",
        text: "National universities charge roughly ₹3L–₹12L per year in tuition — among the most affordable top-tier options worldwide.",
      },
      {
        icon: "alert",
        title: "The honest caveat",
        text: "Japanese language matters: most programs and jobs expect JLPT N2 or better. English-taught degrees exist but are limited.",
      },
    ],
    featuredUniversities: [
      { name: "University of Tokyo", city: "Tokyo" },
      { name: "Kyoto University", city: "Kyoto" },
      { name: "Osaka University", city: "Osaka" },
      { name: "Tohoku University", city: "Sendai" },
      { name: "Nagoya University", city: "Nagoya" },
      { name: "Tokyo Institute of Technology", city: "Tokyo" },
      { name: "Waseda University", city: "Tokyo" },
      { name: "Keio University", city: "Tokyo" },
      { name: "Kyushu University", city: "Fukuoka" },
    ],
    popularCourses: [
      "Robotics & Mechatronics",
      "Artificial Intelligence & Data Science",
      "Semiconductor & Electronic Engineering",
      "Life Sciences & Biotechnology",
      "Computer Science",
      "Business & Global Management",
      "Automotive Engineering",
      "Design & Film",
    ],
    cost: {
      tuition: "₹3L–₹12L per year at national universities; private universities run higher",
      living: "₹6L–₹12L per year — Tokyo is priciest, regional cities far more affordable",
      note: "Approximate estimate for planning only. Figures shift with exchange rates and your lifestyle; we work out a realistic budget with you.",
    },
    visa: {
      type: "Student visa (留学 / Certificate of Eligibility route)",
      funds: "Show roughly ¥1.5M–¥2M (₹8L–₹11L) in bank funds for tuition plus one year of living costs",
      documents: [
        "Certificate of Eligibility (CoE) issued by your university",
        "Valid passport with enough remaining validity",
        "University admission letter",
        "Proof of funds / bank statement",
        "Passport photos & application forms",
      ],
      postStudyWorkName: "J-Find visa",
      postStudyWorkDuration: "Up to 2 years after graduation",
      intakes: ["April (main intake)", "October", "Some programs in September"],
    },
    services: [
      {
        title: "Counseling & University Selection",
        text: "From Waseda and Keio in Tokyo to national powerhouses in Osaka, Sendai, and Fukuoka, we shortlist Japanese universities that fit your profile, budget, and JLPT level.",
      },
      {
        title: "Applications & Documentation",
        text: "Japanese applications run on precise timelines — entrance exams, research plans, and recommendation letters. We keep every deadline and every form on track.",
      },
      {
        title: "Visa Counseling & Interview Prep",
        text: "We prepare your Certificate of Eligibility file and student visa application so the consulate review is smooth and documents are complete the first time.",
      },
      {
        title: "Test Preparation",
        text: "JLPT prep toward the N2 level most programs require, plus IELTS/TOEFL and EJU guidance where your chosen program needs them.",
      },
      {
        title: "Scholarships & Funding",
        text: "We hunt down MEXT embassy recommendations, JASSO scholarships, and university tuition-waiver programs to bring your Japan budget down.",
      },
      {
        title: "Pre-Departure & Arrival Support",
        text: "Housing in a dorm or guesthouse, part-time work rules, bank setup, and a Tokyo or Osaka arrival orientation so you start strong.",
      },
    ],
    closing: {
      heading: "Your Japan Journey Starts Here",
      text: "One free conversation with a Quilon counselor turns 'I'd love to study in Japan' into a concrete plan — universities, budget, timeline, and visa.",
    },
  },
  {
    slug: "usa",
    name: "United States",
    flag: "https://flagcdn.com/us.svg",
    datasetCountry: "United States",
    heroImage: "/images/dest-usa-hero.jpg",
    headline: "STUDY IN THE USA",
    eyebrow: "Home to the world's most prestigious campuses",
    tagline:
      "Ivy League prestige, unmatched research funding, and OPT work opportunities that stretch up to 3 years for STEM graduates.",
    motif: "stars-stripes",
    heroCards: [
      {
        label: "New York",
        image: "/images/dest-usa-1.jpg",
        alt: "Aerial view of the New York City skyline",
      },
      {
        label: "San Francisco",
        image: "/images/dest-usa-2.jpg",
        alt: "Sunny skyline of downtown San Francisco",
        vertical: true,
      },
      {
        label: "Top Universities",
        image: "/images/dest-usa-3.jpg",
        alt: "Historic building at Yale University in New Haven",
      },
      {
        label: "Student Life",
        image: "/images/dest-usa-4.jpg",
        alt: "Students crossing a leafy American university campus",
        vertical: true,
      },
    ],
    whyTitle: "Why the USA?",
    whyPoints: [
      {
        icon: "briefcase",
        title: "Post-study work",
        text: "Optional Practical Training (OPT) gives 12 months of work after graduation — extended to 24 additional months for STEM degrees (up to 3 years total).",
      },
      {
        icon: "award",
        title: "Standout strength",
        text: "More top-ranked universities than any other country, with unmatched research budgets and Silicon Valley–style industry pipelines.",
      },
      {
        icon: "wallet",
        title: "Cost positioning",
        text: "Tuition is high — roughly $25k–$60k per year — but scholarships, assistantships, and strong graduate salaries offset it for many students.",
      },
      {
        icon: "alert",
        title: "The honest caveat",
        text: "Admissions are competitive, the F-1 visa interview is demanding, and the path from OPT to permanent residence is longer than in Canada.",
      },
    ],
    featuredUniversities: [
      { name: "Massachusetts Institute of Technology", city: "Cambridge, MA" },
      { name: "Stanford University", city: "Stanford, CA" },
      { name: "Harvard University", city: "Cambridge, MA" },
      { name: "California Institute of Technology", city: "Pasadena, CA" },
      { name: "Princeton University", city: "Princeton, NJ" },
      { name: "Yale University", city: "New Haven, CT" },
      { name: "Columbia University", city: "New York, NY" },
      { name: "University of California, Berkeley", city: "Berkeley, CA" },
      { name: "University of California, Los Angeles", city: "Los Angeles, CA" },
    ],
    popularCourses: [
      "Computer Science & AI",
      "Data Science & Analytics",
      "Business Administration (MBA)",
      "Engineering",
      "Healthcare & Life Sciences",
      "Economics & Finance",
      "Media & Communication",
    ],
    cost: {
      tuition: "$25k–$60k per year depending on public vs. private and course level",
      living: "$12k–$25k per year — cities like NYC and San Francisco cost far more than college towns",
      note: "Approximate estimate for planning only. Scholarships, assistantships, and on-campus work can meaningfully reduce the real cost.",
    },
    visa: {
      type: "F-1 Student Visa",
      funds: "Show full first-year tuition plus living costs (often $40k–$70k) in bank funds",
      documents: [
        "Form I-20 issued by your university (via SEVP)",
        "SEVIS I-901 fee receipt",
        "DS-160 confirmation",
        "Financial documents & sponsor letter",
        "Passport, photos, and visa interview appointment",
      ],
      postStudyWorkName: "OPT (Optional Practical Training)",
      postStudyWorkDuration: "12 months, +24 more for STEM (up to 3 years)",
      intakes: ["Fall (August–September)", "Spring (January)", "Summer (limited)"],
    },
    services: [
      {
        title: "Counseling & University Selection",
        text: "We match your grades and test scores against reach, match, and safety schools — from MIT and Stanford to state universities that fund international students.",
      },
      {
        title: "Applications & Documentation",
        text: "Common App, supplemental essays, SOPs, and recommendation letters — crafted to stand out in the most competitive applicant pool on earth.",
      },
      {
        title: "Visa Counseling & Interview Prep",
        text: "We prepare your I-20 file, DS-160, and run mock F-1 interviews so the most scrutiny-heavy visa process in the world feels routine.",
      },
      {
        title: "Test Preparation",
        text: "SAT, GRE, GMAT, IELTS, and TOEFL plans matched to your target schools and their score ranges.",
      },
      {
        title: "Scholarships & Funding",
        text: "Merit scholarships, need-based aid, teaching and research assistantships, and education-loan guidance to close the US funding gap.",
      },
      {
        title: "Pre-Departure & Arrival Support",
        text: "Campus housing, airport pickup, banking, health insurance, and orientation for your first semester stateside.",
      },
    ],
    closing: {
      heading: "Your American Dream, Planned",
      text: "A free consultation maps your profile to the right universities, a realistic budget, and an OPT-ready career plan from day one.",
    },
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "https://flagcdn.com/ca.svg",
    datasetCountry: "Canada",
    heroImage: "/images/dest-canada-hero.jpg",
    headline: "STUDY IN CANADA",
    eyebrow: "Quality education with a clear path to PR",
    tagline:
      "Post-Graduation Work Permits of up to 3 years and one of the world's most welcoming immigration systems make Canada the pragmatic first choice.",
    motif: "maple-leaf",
    heroCards: [
      {
        label: "Toronto",
        image: "/images/dest-canada-1.jpg",
        alt: "Cityscape of downtown Toronto",
      },
      {
        label: "Vancouver",
        image: "/images/dest-canada-2.jpg",
        alt: "Modern high-rise buildings in downtown Vancouver",
        vertical: true,
      },
      {
        label: "Top Universities",
        image: "/images/dest-canada-3.jpg",
        alt: "Historic building at the University of British Columbia",
      },
      {
        label: "Student Life",
        image: "/images/dest-canada-4.jpg",
        alt: "Student studying outdoors on a Vancouver campus",
        vertical: true,
      },
    ],
    whyTitle: "Why Canada?",
    whyPoints: [
      {
        icon: "briefcase",
        title: "Post-study work",
        text: "The PGWP grants up to 3 years of work after graduation — and Canadian work experience counts directly toward permanent residence.",
      },
      {
        icon: "award",
        title: "Standout strength",
        text: "University of Toronto, UBC, McGill, and Waterloo rank globally, and Canadian degrees are recognized everywhere.",
      },
      {
        icon: "wallet",
        title: "Cost positioning",
        text: "Tuition (CAD 15k–35k) is meaningfully cheaper than the US, with co-op programs that let you earn while you study.",
      },
      {
        icon: "alert",
        title: "The honest caveat",
        text: "Toronto and Vancouver housing is tight and pricey, and PGWP field-of-study rules tightened from November 2024 — pick programs wisely.",
      },
    ],
    featuredUniversities: [
      { name: "University of Toronto", city: "Toronto, ON" },
      { name: "McGill University", city: "Montreal, QC" },
      { name: "University of British Columbia", city: "Vancouver, BC" },
      { name: "University of Waterloo", city: "Waterloo, ON" },
      { name: "University of Alberta", city: "Edmonton, AB" },
      { name: "University of Montreal", city: "Montreal, QC" },
      { name: "McMaster University", city: "Hamilton, ON" },
      { name: "Western University", city: "London, ON" },
      { name: "Queen's University", city: "Kingston, ON" },
    ],
    popularCourses: [
      "Computer Science & IT",
      "Business Analytics & Finance",
      "Engineering",
      "Healthcare & Nursing",
      "Data Science & AI",
      "Environmental Science",
      "Project Management",
    ],
    cost: {
      tuition: "CAD 15k–35k per year depending on province and program",
      living: "CAD 12k–20k per year — Toronto and Vancouver push the top of that range",
      note: "Approximate estimate for planning only. Co-op placements and part-time work (20 hrs/week) can offset living costs.",
    },
    visa: {
      type: "Study Permit",
      funds: "Prove tuition plus living costs — at least CAD 20,635 for living plus first-year fees",
      documents: [
        "Letter of acceptance from a Designated Learning Institution",
        "Proof of funds (bank statements / GIC)",
        "Study plan / letter of explanation",
        "Passport, photos, and medical results (if applicable)",
        "CAQ (Quebec) where required",
      ],
      postStudyWorkName: "PGWP (Post-Graduation Work Permit)",
      postStudyWorkDuration: "Up to 3 years depending on program length",
      intakes: ["Fall (September)", "Winter (January)", "Summer (May)"],
    },
    services: [
      {
        title: "Counseling & University Selection",
        text: "We match you with universities and colleges across Ontario, BC, and Quebec — plus co-op and PGWP-eligible programs that protect your post-study options.",
      },
      {
        title: "Applications & Documentation",
        text: "From OUAC-style portals to individual applications, we handle SOPs, transcripts, and the documents Canadian universities expect.",
      },
      {
        title: "Visa Counseling & Interview Prep",
        text: "We build a rock-solid Study Permit file — proof of funds, GIC, and study plan — the top reasons Canadian visa files get approved.",
      },
      {
        title: "Test Preparation",
        text: "IELTS/TOEFL for most programs, plus GRE/GMAT where your target school requires them.",
      },
      {
        title: "Scholarships & Funding",
        text: "University scholarships, provincial awards, and education-loan and GIC guidance to fund your Canadian plan.",
      },
      {
        title: "Pre-Departure & Arrival Support",
        text: "Housing leads in Toronto and Vancouver, banking setup, health coverage, and arrival orientation.",
      },
    ],
    closing: {
      heading: "Canada, Within Reach",
      text: "Book a free consultation to map your profile to PGWP-eligible programs and a realistic PR pathway.",
    },
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    flag: "https://flagcdn.com/gb.svg",
    datasetCountry: "United Kingdom",
    heroImage: "/images/dest-united-kingdom-hero.jpg",
    headline: "STUDY IN THE UK",
    eyebrow: "Prestige, history, and a fast track to a degree",
    tagline:
      "One-year master's degrees, Russell Group prestige, and the 2-year Graduate Route visa make the UK a high-return choice.",
    motif: "thistle-tartan",
    heroCards: [
      {
        label: "London",
        image: "/images/dest-uk-1.jpg",
        alt: "Red double-decker buses on a London street",
      },
      {
        label: "Oxford",
        image: "/images/dest-uk-2.jpg",
        alt: "Historic university buildings in Oxford",
        vertical: true,
      },
      {
        label: "Top Universities",
        image: "/images/dest-uk-3.jpg",
        alt: "Gothic Revival architecture at the University of Oxford",
      },
      {
        label: "Student Life",
        image: "/images/dest-uk-4.jpg",
        alt: "University students socialising on a British campus",
        vertical: true,
      },
    ],
    whyTitle: "Why the UK?",
    whyPoints: [
      {
        icon: "briefcase",
        title: "Post-study work",
        text: "The Graduate Route lets you stay and work for 2 years after any UK degree (3 for PhD) without needing a sponsor first.",
      },
      {
        icon: "award",
        title: "Standout strength",
        text: "Oxford, Cambridge, Imperial, and LSE anchor a system where most master's degrees finish in just one year — saving time and money.",
      },
      {
        icon: "wallet",
        title: "Cost positioning",
        text: "One-year master's means one year of living costs; tuition runs roughly £15k–£30k depending on course and university.",
      },
      {
        icon: "alert",
        title: "The honest caveat",
        text: "London living is expensive, and the Graduate Route's long-term future is subject to government review — plan with a backup.",
      },
    ],
    featuredUniversities: [
      { name: "University of Oxford", city: "Oxford" },
      { name: "University of Cambridge", city: "Cambridge" },
      { name: "Imperial College London", city: "London" },
      { name: "London School of Economics and Political Science", city: "London" },
      { name: "University College London", city: "London" },
      { name: "University of Edinburgh", city: "Edinburgh" },
      { name: "University of Manchester", city: "Manchester" },
      { name: "King's College London", city: "London" },
      { name: "University of Bristol", city: "Bristol" },
    ],
    popularCourses: [
      "Business & Finance (MSc/MBA)",
      "Law (LLM)",
      "Computer Science & AI",
      "Engineering",
      "Medicine & Healthcare",
      "International Relations",
      "Arts & Humanities",
      "Data Science",
    ],
    cost: {
      tuition: "£15k–£30k per year for most postgraduate courses",
      living: "£12k–£20k per year — London is the most expensive city in the UK to live in",
      note: "Approximate estimate for planning only. One-year programs limit total cost; part-time work (20 hrs/week) is allowed on a Student visa.",
    },
    visa: {
      type: "Student visa (formerly Tier 4)",
      funds: "Show first-year tuition plus living costs — ~£1,483/month in London, ~£1,136/month elsewhere, for 9 months",
      documents: [
        "Confirmation of Acceptance for Studies (CAS)",
        "Proof of funds (28-day bank statement)",
        "English language evidence (IELTS/TOEFL)",
        "Passport and passport photos",
        "TB test certificate (if applicable)",
      ],
      postStudyWorkName: "Graduate Route",
      postStudyWorkDuration: "2 years (3 for PhD)",
      intakes: ["September (main intake)", "January"],
    },
    services: [
      {
        title: "Counseling & University Selection",
        text: "From Oxbridge to Russell Group and modern universities, we shortlist by course strength, employability, and your budget — including one-year master's.",
      },
      {
        title: "Applications & Documentation",
        text: "UCAS for undergraduates, direct applications for postgraduate, and the personal statements that UK admissions committees read closely.",
      },
      {
        title: "Visa Counseling & Interview Prep",
        text: "We prepare your CAS-linked Student visa file and evidence so the UKVI rules are satisfied on the first attempt.",
      },
      {
        title: "Test Preparation",
        text: "IELTS for your UKVI requirements, plus GMAT for finance and MBA routes.",
      },
      {
        title: "Scholarships & Funding",
        text: "Chevening, Commonwealth, university merit awards, and GREAT scholarships — plus loan guidance for Indian students.",
      },
      {
        title: "Pre-Departure & Arrival Support",
        text: "Housing in London or regional cities, bank accounts, BRP collection guidance, and orientation.",
      },
    ],
    closing: {
      heading: "Your UK Degree, Priced and Planned",
      text: "A free consultation shows you exactly what a UK degree costs, which universities fit, and how the Graduate Route can pay it back.",
    },
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "https://flagcdn.com/au.svg",
    datasetCountry: "Australia",
    heroImage: "/images/dest-australia-hero.jpg",
    headline: "STUDY IN AUSTRALIA",
    eyebrow: "World-class education in a sun-soaked setting",
    tagline:
      "Post-Study Work of 2–4 years, eight global top-100 universities, and a famously laid-back, safe student lifestyle.",
    motif: "boomerang-southern-cross",
    heroCards: [
      {
        label: "Sydney",
        image: "/images/dest-australia-1.jpg",
        alt: "Sydney downtown skyline with modern skyscrapers",
      },
      {
        label: "Melbourne",
        image: "/images/dest-australia-2.jpg",
        alt: "Yarra River flowing through downtown Melbourne at night",
        vertical: true,
      },
      {
        label: "Top Universities",
        image: "/images/dest-australia-3.jpg",
        alt: "Historic sandstone quadrangle at the University of Sydney",
      },
      {
        label: "Student Life",
        image: "/images/dest-australia-4.jpg",
        alt: "Graduates celebrating outdoors in Australia",
        vertical: true,
      },
    ],
    whyTitle: "Why Australia?",
    whyPoints: [
      {
        icon: "briefcase",
        title: "Post-study work",
        text: "The Temporary Graduate visa offers 2–4 years of work after graduation depending on your degree level — and counts toward PR points.",
      },
      {
        icon: "award",
        title: "Standout strength",
        text: "The Group of Eight universities (Melbourne, Sydney, ANU, UNSW...) dominate global rankings with strong industry and research links.",
      },
      {
        icon: "wallet",
        title: "Cost positioning",
        text: "Tuition runs AUD 25k–45k per year, offset by generous work rights — up to 24 hrs/week during study and full-time in breaks.",
      },
      {
        icon: "alert",
        title: "The honest caveat",
        text: "Visa and English requirements tightened recently, and Australia's cost of living has climbed — budget carefully.",
      },
    ],
    featuredUniversities: [
      { name: "University of Melbourne", city: "Melbourne, VIC" },
      { name: "University of Sydney", city: "Sydney, NSW" },
      { name: "Australian National University", city: "Canberra, ACT" },
      { name: "Monash University", city: "Melbourne, VIC" },
      { name: "University of Queensland", city: "Brisbane, QLD" },
      { name: "University of New South Wales", city: "Sydney, NSW" },
      { name: "University of Adelaide", city: "Adelaide, SA" },
      { name: "University of Western Australia", city: "Perth, WA" },
      { name: "RMIT University", city: "Melbourne, VIC" },
    ],
    popularCourses: [
      "Nursing & Healthcare",
      "IT & Cybersecurity",
      "Engineering",
      "Business & MBA",
      "Data Science & AI",
      "Marine & Environmental Science",
      "Hospitality & Tourism",
      "Architecture",
    ],
    cost: {
      tuition: "AUD 25k–45k per year depending on course and university",
      living: "AUD 22k–35k per year — Sydney and Melbourne are the priciest cities",
      note: "Approximate estimate for planning only. Student visa holders can work up to 24 hrs/week during term and full-time in holidays.",
    },
    visa: {
      type: "Subclass 500 Student Visa",
      funds: "Show first-year tuition, living costs (~AUD 29,710), and OSHC health cover",
      documents: [
        "Confirmation of Enrolment (CoE)",
        "Proof of funds and Genuine Student (GS) statement",
        "English test results (IELTS/PTE)",
        "Health insurance (OSHC)",
        "Passport, photos, and character documents",
      ],
      postStudyWorkName: "Temporary Graduate Visa (Subclass 485)",
      postStudyWorkDuration: "2–4 years depending on degree level",
      intakes: ["February (main intake)", "July"],
    },
    services: [
      {
        title: "Counseling & University Selection",
        text: "We match you to Group of Eight and technology universities across Sydney, Melbourne, Brisbane, and Perth — balancing ranking with PR-friendly courses.",
      },
      {
        title: "Applications & Documentation",
        text: "We prepare applications, Genuine Student statements, and the course documentation Australian universities require.",
      },
      {
        title: "Visa Counseling & Interview Prep",
        text: "Your Subclass 500 file, financial evidence, and OSHC arrangements handled so nothing trips up the Department of Home Affairs.",
      },
      {
        title: "Test Preparation",
        text: "IELTS and PTE preparation targeted at the scores Australian universities and visas require.",
      },
      {
        title: "Scholarships & Funding",
        text: "International merit scholarships and Australia Awards support, plus education-loan guidance.",
      },
      {
        title: "Pre-Departure & Arrival Support",
        text: "Housing leads, airport pickup, TFN and bank setup, and orientation in your new Australian city.",
      },
    ],
    closing: {
      heading: "Your Australian Adventure, Mapped",
      text: "A free consultation turns your degree goals into a university shortlist, budget, and 485-visa career plan.",
    },
  },
  {
    slug: "germany",
    name: "Germany",
    flag: "https://flagcdn.com/de.svg",
    datasetCountry: "Germany",
    heroImage: "/images/dest-germany-hero.jpg",
    headline: "STUDY IN GERMANY",
    eyebrow: "Tuition-free excellence in the heart of Europe",
    tagline:
      "Near-zero tuition at world-class public universities, Europe's largest economy, and an 18-month job-seeker visa after graduation.",
    motif: "eagle-bavaria",
    heroCards: [
      {
        label: "Berlin",
        image: "/images/dest-germany-1.jpg",
        alt: "Berlin skyline with historic architecture",
      },
      {
        label: "Frankfurt",
        image: "/images/dest-germany-2.jpg",
        alt: "Twilight skyline of Frankfurt's financial district",
        vertical: true,
      },
      {
        label: "Top Universities",
        image: "/images/dest-germany-3.jpg",
        alt: "Humboldt University of Berlin seen from Bebelplatz",
      },
      {
        label: "Student Life",
        image: "/images/dest-germany-4.jpg",
        alt: "University students collaborating in a study session",
        vertical: true,
      },
    ],
    whyTitle: "Why Germany?",
    whyPoints: [
      {
        icon: "briefcase",
        title: "Post-study work",
        text: "An 18-month residence permit to seek a job after graduation — with a fast route to an EU Blue Card once you're hired.",
      },
      {
        icon: "award",
        title: "Standout strength",
        text: "Most public universities charge no tuition — TU Munich, RWTH Aachen, and Heidelberg rival the best in the world for engineering and research.",
      },
      {
        icon: "wallet",
        title: "Cost positioning",
        text: "You pay only a small semester fee (usually €150–€350), so total cost is mostly living expenses of ~€1,000/month.",
      },
      {
        icon: "alert",
        title: "The honest caveat",
        text: "Most bachelor's and many master's programs are taught in German — APS verification and B2/C1 language proof are real hurdles.",
      },
    ],
    featuredUniversities: [
      { name: "Technical University of Munich (TUM)", city: "Munich" },
      { name: "RWTH Aachen University", city: "Aachen" },
      { name: "Ludwig Maximilian University of Munich", city: "Munich" },
      { name: "Heidelberg University", city: "Heidelberg" },
      { name: "Humboldt University of Berlin", city: "Berlin" },
      { name: "Karlsruhe Institute of Technology", city: "Karlsruhe" },
      { name: "Technical University of Berlin", city: "Berlin" },
      { name: "University of Stuttgart", city: "Stuttgart" },
      { name: "University of Freiburg", city: "Freiburg" },
    ],
    popularCourses: [
      "Mechanical Engineering",
      "Automotive Engineering",
      "Computer Science & AI",
      "Industrial Engineering",
      "Renewable Energy & Sustainability",
      "Automation & Robotics",
      "Physics",
      "Data Science",
    ],
    cost: {
      tuition: "No tuition at most public universities — just a €150–€350 semester fee",
      living: "€10k–€14k per year — blocked account set at ~€11,904/year for visa purposes",
      note: "Approximate estimate for planning only. You must fund a blocked account upfront; private universities do charge tuition.",
    },
    visa: {
      type: "National (D) Student Visa",
      funds: "Blocked account of ~€11,904 per year (or sponsorship letter)",
      documents: [
        "University admission letter",
        "Blocked account confirmation",
        "APS certificate",
        "German or English language proof",
        "Passport, photos, and health insurance confirmation",
      ],
      postStudyWorkName: "18-month job-seeker residence permit",
      postStudyWorkDuration: "18 months after graduation",
      intakes: ["Winter semester (October)", "Summer semester (April)"],
    },
    services: [
      {
        title: "Counseling & University Selection",
        text: "We shortlist English-taught master's programs and German-taught bachelor's across TU Munich, RWTH, and TU9 engineering universities that fit your profile.",
      },
      {
        title: "Applications & Documentation",
        text: "Uni-Assist, university portals, and APS document preparation handled to German precision standards.",
      },
      {
        title: "Visa Counseling & Interview Prep",
        text: "We guide your blocked account setup and National (D) visa file so the German embassy review is smooth.",
      },
      {
        title: "Test Preparation",
        text: "German language (Goethe/Telc) toward the B2/C1 level most programs need, plus IELTS and GRE where required.",
      },
      {
        title: "Scholarships & Funding",
        text: "DAAD scholarships, university merit awards, and financial-planning guidance for the blocked account.",
      },
      {
        title: "Pre-Departure & Arrival Support",
        text: "Anmeldung (registration), housing, health insurance (public/private), and arrival orientation in Germany.",
      },
    ],
    closing: {
      heading: "Germany on a Student Budget",
      text: "A free consultation reveals which German universities take you, what language prep looks like, and how tuition-free really works.",
    },
  },
  {
    slug: "ireland",
    name: "Ireland",
    flag: "https://flagcdn.com/ie.svg",
    datasetCountry: "Ireland",
    heroImage: "/images/dest-ireland-hero.jpg",
    headline: "STUDY IN IRELAND",
    eyebrow: "Europe's English-speaking tech hub",
    tagline:
      "Google, Meta, and Apple call Dublin home, English is the medium of instruction, and the stay-back scheme keeps you working for up to 2 years.",
    motif: "shamrock",
    heroCards: [
      {
        label: "Dublin",
        image: "/images/dest-ireland-1.jpg",
        alt: "Aerial view of Dublin cityscape with bridges",
      },
      {
        label: "Galway",
        image: "/images/dest-ireland-2.jpg",
        alt: "Aerial view of Galway city and its cathedral",
        vertical: true,
      },
      {
        label: "Top Universities",
        image: "/images/dest-ireland-3.jpg",
        alt: "Campanile at Trinity College Dublin under blue skies",
      },
      {
        label: "Student Life",
        image: "/images/dest-ireland-4.jpg",
        alt: "Rugby training on the Trinity College Dublin pitches",
        vertical: true,
      },
    ],
    whyTitle: "Why Ireland?",
    whyPoints: [
      {
        icon: "briefcase",
        title: "Post-study work",
        text: "The stay-back option gives 1 year for level 8 degrees and 2 years for level 9+ master's and PhDs to find work in Ireland.",
      },
      {
        icon: "award",
        title: "Standout strength",
        text: "Europe's tech headquarters — pharma and data giants cluster in Dublin, making Trinity and UCD graduates highly recruitable.",
      },
      {
        icon: "wallet",
        title: "Cost positioning",
        text: "Tuition runs roughly €12k–€25k — cheaper than the US and comparable to the UK, with strong part-time work rights.",
      },
      {
        icon: "alert",
        title: "The honest caveat",
        text: "Ireland's housing shortage means accommodation in Dublin is scarce and pricey — plan accommodation before you arrive.",
      },
    ],
    featuredUniversities: [
      { name: "University of Dublin, Trinity College", city: "Dublin" },
      { name: "University College Dublin", city: "Dublin" },
      { name: "Dublin City University", city: "Dublin" },
      { name: "University of Limerick", city: "Limerick" },
      { name: "University College Cork", city: "Cork" },
      { name: "National University of Ireland, Galway", city: "Galway" },
      { name: "Technological University of the Shannon", city: "Limerick" },
    ],
    popularCourses: [
      "Data Analytics & Data Science",
      "Computer Science & Software",
      "Pharmaceutical & Bio-sciences",
      "Business & Finance",
      "Cloud & Cybersecurity",
      "Biotechnology",
      "Engineering",
    ],
    cost: {
      tuition: "€12k–€25k per year for most programs",
      living: "€12k–€18k per year — Dublin accommodation is the biggest single cost",
      note: "Approximate estimate for planning only. EU and non-EU fees differ; part-time work is allowed (20 hrs/week in term).",
    },
    visa: {
      type: "Study Visa / Stamp 2 permission",
      funds: "Show tuition plus at least €10,000 (per-year living proof) — higher for Dublin",
      documents: [
        "Letter of acceptance from an Irish institution",
        "Proof of funds (6 months of statements)",
        "Passport, photos, and application form",
        "English proficiency (IELTS/TOEFL)",
        "Health insurance confirmation",
      ],
      postStudyWorkName: "Third Level Graduate Scheme (stay-back)",
      postStudyWorkDuration: "1 year (level 8) or 2 years (level 9+)",
      intakes: ["September", "January"],
    },
    services: [
      {
        title: "Counseling & University Selection",
        text: "We match you with Trinity, UCD, DCU, and universities across Cork, Galway, and Limerick — prioritizing courses aligned to Ireland's tech and pharma clusters.",
      },
      {
        title: "Applications & Documentation",
        text: "Postgraduate portals, research proposals, and recommendation letters handled with Irish deadlines in mind.",
      },
      {
        title: "Visa Counseling & Interview Prep",
        text: "We prepare your study-visa file and Stamp 2 registration steps with INIS (now ISD).",
      },
      {
        title: "Test Preparation",
        text: "IELTS/TOEFL for English-taught programs and GMAT for finance and business routes.",
      },
      {
        title: "Scholarships & Funding",
        text: "University merit scholarships and Irish Government education opportunities, plus loan guidance.",
      },
      {
        title: "Pre-Departure & Arrival Support",
        text: "We help you secure housing early — the #1 challenge in Dublin — plus GNIB/IRP registration and orientation.",
      },
    ],
    closing: {
      heading: "Ireland's Tech Doorstep",
      text: "A free consultation maps your profile to Irish programs with the strongest stay-back and Big Tech recruiting pipelines.",
    },
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    flag: "https://flagcdn.com/nz.svg",
    datasetCountry: "New Zealand",
    heroImage: "/images/dest-new-zealand-hero.jpg",
    headline: "STUDY IN NEW ZEALAND",
    eyebrow: "Quality of life meets quality of education",
    tagline:
      "Safe, scenic, and English-speaking — with post-study work of 1–3 years and a transparent points system toward residence.",
    motif: "fern-koru",
    heroCards: [
      {
        label: "Auckland",
        image: "/images/dest-new-zealand-1.jpg",
        alt: "Auckland city with a view of the Sky Tower",
      },
      {
        label: "Wellington",
        image: "/images/dest-new-zealand-2.jpg",
        alt: "Aerial view of Wellington Harbour",
        vertical: true,
      },
      {
        label: "Top Universities",
        image: "/images/dest-new-zealand-3.jpg",
        alt: "University campus building with lawns in New Zealand",
      },
      {
        label: "Student Life",
        image: "/images/dest-new-zealand-4.jpg",
        alt: "Group hiking adventure in Wellington, New Zealand",
        vertical: true,
      },
    ],
    whyTitle: "Why New Zealand?",
    whyPoints: [
      {
        icon: "briefcase",
        title: "Post-study work",
        text: "Post-study work visas last 1–3 years depending on your qualification level, and skilled NZ work experience earns points toward residence.",
      },
      {
        icon: "award",
        title: "Standout strength",
        text: "A globally respected education system with strong research output, set in one of the world's safest, most scenic countries.",
      },
      {
        icon: "wallet",
        title: "Cost positioning",
        text: "Tuition runs NZD 25k–40k per year with generous part-time work rights (20 hrs/week) to offset living costs.",
      },
      {
        icon: "alert",
        title: "The honest caveat",
        text: "A small job market with limited seats — competition for places at Auckland and Otago is real, and pathways are skills-dependent.",
      },
    ],
    featuredUniversities: [
      { name: "University of Auckland", city: "Auckland" },
      { name: "University of Otago", city: "Dunedin" },
      { name: "Victoria University of Wellington", city: "Wellington" },
      { name: "University of Canterbury", city: "Christchurch" },
      { name: "Massey University", city: "Palmerston North" },
      { name: "Auckland University of Technology", city: "Auckland" },
      { name: "University of Waikato", city: "Hamilton" },
      { name: "Lincoln University", city: "Lincoln, Canterbury" },
    ],
    popularCourses: [
      "Information Technology",
      "Engineering",
      "Nursing & Healthcare",
      "Agriculture & Agribusiness",
      "Environmental Science",
      "Business & Management",
      "Tourism & Hospitality",
      "Data Science",
    ],
    cost: {
      tuition: "NZD 25k–40k per year depending on program",
      living: "NZD 20k–28k per year — Auckland is the most expensive city",
      note: "Approximate estimate for planning only. Students can work up to 20 hrs/week during term and full-time in holidays.",
    },
    visa: {
      type: "Student Visa (Fee Paying Student)",
      funds: "Show tuition plus at least NZD 20,000 per year for living costs",
      documents: [
        "Offer of place from a licensed NZ institution",
        "Proof of funds (bank statements)",
        "Passport and photos",
        "English proficiency (IELTS/TOEFL)",
        "Medical and police clearance (if applicable)",
      ],
      postStudyWorkName: "Post-study work visa",
      postStudyWorkDuration: "1–3 years depending on qualification level",
      intakes: ["February (main intake)", "July"],
    },
    services: [
      {
        title: "Counseling & University Selection",
        text: "We shortlist across Auckland, Otago, Wellington, and Canterbury — focusing on courses that align with NZ skills shortages and residence points.",
      },
      {
        title: "Applications & Documentation",
        text: "Applications, transcripts, and references handled for NZ's eight universities.",
      },
      {
        title: "Visa Counseling & Interview Prep",
        text: "A thorough student visa file — funds, medicals, and character — so Immigration New Zealand clears you quickly.",
      },
      {
        title: "Test Preparation",
        text: "IELTS/PTE for NZ requirements, plus GMAT where MBA or business programs ask for it.",
      },
      {
        title: "Scholarships & Funding",
        text: "NZ international scholarships and university awards, plus education-loan guidance.",
      },
      {
        title: "Pre-Departure & Arrival Support",
        text: "Accommodation, bank and IRD number setup, insurance, and orientation in your new Kiwi city.",
      },
    ],
    closing: {
      heading: "New Zealand, Step by Step",
      text: "A free consultation shows you which NZ programs match your goals and how post-study work builds toward residence.",
    },
  },
  {
    slug: "france",
    name: "France",
    flag: "https://flagcdn.com/fr.svg",
    datasetCountry: "France",
    heroImage: "/images/dest-france-hero.jpg",
    headline: "STUDY IN FRANCE",
    eyebrow: "Engineering excellence with a Grand École edge",
    tagline:
      "Low public tuition, Grandes Écoles prestige, and a job-seeker permit extended to 2 years — France rewards ambition.",
    motif: "fleur-de-lis",
    heroCards: [
      {
        label: "Paris",
        image: "/images/dest-france-1.jpg",
        alt: "Panoramic view of Paris cityscape from Montmartre",
      },
      {
        label: "Paris by Night",
        image: "/images/dest-france-2.jpg",
        alt: "Stunning night view of Paris from the Eiffel Tower",
        vertical: true,
      },
      {
        label: "Top Universities",
        image: "/images/dest-france-3.jpg",
        alt: "Autumn day at the Sorbonne in Paris",
      },
      {
        label: "Student Life",
        image: "/images/dest-france-4.jpg",
        alt: "Diverse students celebrating in front of a modern campus",
        vertical: true,
      },
    ],
    whyTitle: "Why France?",
    whyPoints: [
      {
        icon: "briefcase",
        title: "Post-study work",
        text: "The job-seeker permit (APS) was extended to 24 months from 2025 — a full two years to find work aligned with your degree.",
      },
      {
        icon: "award",
        title: "Standout strength",
        text: "Grandes Écoles like École Polytechnique and Sciences Po pair with low public tuition (roughly €3k–€15k) and a powerhouse engineering culture.",
      },
      {
        icon: "wallet",
        title: "Cost positioning",
        text: "Public university tuition is a fraction of UK/US fees, and Paris is the only truly expensive city in the equation.",
      },
      {
        icon: "alert",
        title: "The honest caveat",
        text: "Outside English-taught programs, solid French is essential — and the Prefecture paperwork can be slow; patience is part of the plan.",
      },
    ],
    featuredUniversities: [
      { name: "Sorbonne Université", city: "Paris" },
      { name: "École Polytechnique", city: "Palaiseau" },
      { name: "Sciences Po Paris", city: "Paris" },
      { name: "HEC Paris", city: "Jouy-en-Josas" },
      { name: "INSEAD", city: "Fontainebleau" },
      { name: "Grenoble École de Management", city: "Grenoble" },
      { name: "École normale supérieure Paris-Saclay", city: "Gif-sur-Yvette" },
      { name: "Institut National Polytechnique de Toulouse", city: "Toulouse" },
    ],
    popularCourses: [
      "Engineering (Grandes Écoles)",
      "Data Science & AI",
      "Business & Management",
      "Fashion & Luxury Management",
      "Hospitality & Culinary Arts",
      "Economics & Finance",
      "Architecture & Design",
    ],
    cost: {
      tuition: "€3k–€15k per year at public universities; business schools run higher",
      living: "€9k–€15k per year — Paris is the priciest, provincial cities far cheaper",
      note: "Approximate estimate for planning only. French students receive housing aid (APL) which can cut rent significantly.",
    },
    visa: {
      type: "Long-stay student visa (VLS-TS)",
      funds: "Show roughly €615/month (€7,380/year) in most cities; Paris asks for more",
      documents: [
        "Admission letter from a French institution (or Campus France approval)",
        "Proof of funds for the year",
        "Passport and photos",
        "French or English language evidence",
        "Campus France interview (where applicable)",
      ],
      postStudyWorkName: "APS / job-seeker & business-creator permit",
      postStudyWorkDuration: "Up to 2 years (from 2025)",
      intakes: ["September (main intake)", "January"],
    },
    services: [
      {
        title: "Counseling & University Selection",
        text: "We match you with Grandes Écoles, business schools, and public universities — steering toward programs where English or entry-level French works.",
      },
      {
        title: "Applications & Documentation",
        text: "Campus France processes, university portals, and the motivated letters French admissions expect.",
      },
      {
        title: "Visa Counseling & Interview Prep",
        text: "We prepare your VLS-TS file and Campus France interview so the consulate stage is calm and complete.",
      },
      {
        title: "Test Preparation",
        text: "TEF/TCF French for the DELF/DALF pathway and English tests for English-taught programs.",
      },
      {
        title: "Scholarships & Funding",
        text: "Eiffel scholarships, Eiffel Excellence, French government awards, and housing-aid (APL) guidance.",
      },
      {
        title: "Pre-Departure & Arrival Support",
        text: "Housing, OFII validation, bank account, APL applications, and orientation in your French city.",
      },
    ],
    closing: {
      heading: "France, on Your Terms",
      text: "A free consultation shows how low French tuition plus the 2-year APS can fit your budget and career goals.",
    },
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    flag: "https://flagcdn.com/nl.svg",
    datasetCountry: "Netherlands",
    heroImage: "/images/dest-netherlands-hero.jpg",
    headline: "STUDY IN THE NETHERLANDS",
    eyebrow: "English-taught innovation at Europe's crossroads",
    tagline:
      "Nearly all master's programs are taught in English, TU Delft and Erasmus rank globally, and the one-year orientation visa keeps you hunting after graduation.",
    motif: "tulip-windmill",
    heroCards: [
      {
        label: "Amsterdam",
        image: "/images/dest-netherlands-1.jpg",
        alt: "Classic canal houses lining an Amsterdam canal",
      },
      {
        label: "The Hague",
        image: "/images/dest-netherlands-2.jpg",
        alt: "Scenic view of The Hague skyline with Binnenhof",
        vertical: true,
      },
      {
        label: "Top Universities",
        image: "/images/dest-netherlands-3.jpg",
        alt: "Historic building of the University of Amsterdam",
      },
      {
        label: "Student Life",
        image: "/images/dest-netherlands-4.jpg",
        alt: "Young adults relaxing by an Amsterdam canal",
        vertical: true,
      },
    ],
    whyTitle: "Why the Netherlands?",
    whyPoints: [
      {
        icon: "briefcase",
        title: "Post-study work",
        text: "The one-year orientation year (Zoekjaar) lets any graduate stay and work freely for 12 months to find a job — no sponsor needed upfront.",
      },
      {
        icon: "award",
        title: "Standout strength",
        text: "TU Delft, Eindhoven, and Erasmus Rotterdam lead in engineering, water-tech, and business — with the highest share of English-taught programs in Europe.",
      },
      {
        icon: "wallet",
        title: "Cost positioning",
        text: "Tuition is €8k–€20k — higher than Germany, lower than the US — and Dutch part-time work rights are generous.",
      },
      {
        icon: "alert",
        title: "The honest caveat",
        text: "The Dutch housing crisis makes student accommodation genuinely hard to find — start looking months before arrival.",
      },
    ],
    featuredUniversities: [
      { name: "University of Amsterdam", city: "Amsterdam" },
      { name: "Delft University of Technology", city: "Delft" },
      { name: "Eindhoven University of Technology", city: "Eindhoven" },
      { name: "Utrecht University", city: "Utrecht" },
      { name: "Leiden University", city: "Leiden" },
      { name: "Erasmus University Rotterdam", city: "Rotterdam" },
      { name: "University of Groningen", city: "Groningen" },
      { name: "Wageningen University", city: "Wageningen" },
      { name: "Radboud University", city: "Nijmegen" },
    ],
    popularCourses: [
      "Computer Science & Data Science",
      "Engineering (TU Delft & Eindhoven)",
      "Business & Finance (Erasmus)",
      "Water Management & Sustainability",
      "AI & Robotics",
      "Supply Chain & Logistics",
      "Psychology & Social Sciences",
    ],
    cost: {
      tuition: "€8k–€20k per year for most non-EU programs",
      living: "€12k–€18k per year — Amsterdam is the costliest city",
      note: "Approximate estimate for planning only. You must prove ~€1,500/month in living funds when applying for the residence permit.",
    },
    visa: {
      type: "MVV + residence permit (VVR) via your university",
      funds: "Prove ~€1,500/month living costs; tuition is paid separately",
      documents: [
        "Admission letter from a Dutch institution",
        "Proof of funds / bank statement",
        "Passport and photos",
        "English proficiency (IELTS/TOEFL)",
        "MVV application through the IND",
      ],
      postStudyWorkName: "Orientation year (Zoekjaar) visa",
      postStudyWorkDuration: "1 year after graduation",
      intakes: ["September (main intake)", "February"],
    },
    services: [
      {
        title: "Counseling & University Selection",
        text: "We match you with technical and research universities across the Randstad and beyond — prioritizing English-taught programs that fit your profile.",
      },
      {
        title: "Applications & Documentation",
        text: "Studielink and university-specific applications, motivation letters, and CVs done Dutch-thorough.",
      },
      {
        title: "Visa Counseling & Interview Prep",
        text: "We guide your MVV and IND residence-permit steps so the IND timeline is respected.",
      },
      {
        title: "Test Preparation",
        text: "IELTS/TOEFL for English-taught entry, plus GRE/GMAT for selective business and tech programs.",
      },
      {
        title: "Scholarships & Funding",
        text: "Orange Tulip, Holland Scholarship, and university grants — plus financial planning for living-cost proof.",
      },
      {
        title: "Pre-Departure & Arrival Support",
        text: "We help you start the housing search early, plus BSN registration, bank setup, and orientation.",
      },
    ],
    closing: {
      heading: "The Netherlands, Open for Business",
      text: "A free consultation shows which Dutch programs admit you and how the Zoekjaar can turn a degree into a career.",
    },
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    flag: "https://flagcdn.com/ae.svg",
    datasetCountry: "United Arab Emirates",
    heroImage: "/images/dest-uae-hero.jpg",
    headline: "STUDY IN THE UAE",
    eyebrow: "A global hub with tax-free ambition",
    tagline:
      "Dubai and Abu Dhabi universities, a gateway to the Gulf's booming economy, and modern campuses from Khalifa to MBZUAI.",
    motif: "palm-falcon",
    heroCards: [
      {
        label: "Dubai",
        image: "/images/dest-uae-1.jpg",
        alt: "Dubai night cityscape with illuminated roads",
      },
      {
        label: "Abu Dhabi",
        image: "/images/dest-uae-2.jpg",
        alt: "Modern architectural building in Abu Dhabi",
        vertical: true,
      },
      {
        label: "Top Universities",
        image: "/images/dest-uae-3.jpg",
        alt: "Majestic architecture at a university in Sharjah",
      },
      {
        label: "Student Life",
        image: "/images/dest-uae-4.jpg",
        alt: "Student studying in a Dubai library",
        vertical: true,
      },
    ],
    whyTitle: "Why the UAE?",
    whyPoints: [
      {
        icon: "briefcase",
        title: "Post-study work",
        text: "No long automatic PSW, but a job-seeker visit visa (60–120 days) and the 5-year Green Visa give graduates real runway to land tax-free employment.",
      },
      {
        icon: "award",
        title: "Standout strength",
        text: "Khalifa University, UAE University, and MBZUAI (AI-focused) are climbing fast, right inside the Gulf's fastest-growing economy.",
      },
      {
        icon: "wallet",
        title: "Cost positioning",
        text: "Tuition runs AED 30k–90k per year — competitive with the West, with zero income tax on your future earnings.",
      },
      {
        icon: "alert",
        title: "The honest caveat",
        text: "Post-study employment is employer-dependent, and living costs in Dubai are high. Plan the job search early.",
      },
    ],
    featuredUniversities: [
      { name: "Khalifa University of Science and Technology", city: "Abu Dhabi" },
      { name: "American University of Sharjah", city: "Sharjah" },
      { name: "United Arab Emirates University", city: "Al Ain" },
      { name: "Mohamed bin Zayed University of Artificial Intelligence", city: "Abu Dhabi" },
      { name: "Abu Dhabi University", city: "Abu Dhabi" },
      { name: "University of Dubai", city: "Dubai" },
      { name: "Ajman University", city: "Ajman" },
    ],
    popularCourses: [
      "Business & Finance",
      "Engineering",
      "Computer Science & AI",
      "Aviation Management",
      "Hospitality & Tourism",
      "Health Sciences",
      "Architecture & Construction",
    ],
    cost: {
      tuition: "AED 30k–90k per year depending on university and program",
      living: "AED 40k–70k per year — Dubai rents dominate the budget",
      note: "Approximate estimate for planning only. Universities often bundle housing; scholarships at Khalifa and UAEU are substantial.",
    },
    visa: {
      type: "Student residence visa (university-sponsored)",
      funds: "Show tuition plus living funds for the year (universities specify amounts)",
      documents: [
        "University admission and enrollment confirmation",
        "Proof of funds / sponsor bank statement",
        "Passport with 6+ months validity",
        "Medical tests and Emirates ID application",
        "Attested degree certificates (for master's)",
      ],
      postStudyWorkName: "Job-seeker visa → Green Visa / employer-sponsored work visa",
      postStudyWorkDuration: "60–120 days job-seeker; Green Visa 5 years (self-sponsored)",
      intakes: ["September (main intake)", "January"],
    },
    services: [
      {
        title: "Counseling & University Selection",
        text: "We shortlist across Dubai and Abu Dhabi — from Khalifa's research programs to business schools and AI pioneers — matching budget and goals.",
      },
      {
        title: "Applications & Documentation",
        text: "Applications, attested documents, and the admission files UAE universities and MOE accreditation expect.",
      },
      {
        title: "Visa Counseling & Interview Prep",
        text: "We guide your student residence visa, medical tests, and Emirates ID steps so you arrive legal and settled.",
      },
      {
        title: "Test Preparation",
        text: "IELTS/TOEFL plus EmSAT where required, and GMAT for business programs.",
      },
      {
        title: "Scholarships & Funding",
        text: "Khalifa and UAEU scholarships, partial merit awards, and education-loan guidance for Gulf-bound students.",
      },
      {
        title: "Pre-Departure & Arrival Support",
        text: "Housing leads in Dubai and Abu Dhabi, Emirates ID and bank setup, and arrival orientation.",
      },
    ],
    closing: {
      heading: "Your Gulf Gateway",
      text: "A free consultation shows which UAE universities match your profile and how to plan a tax-free career in the Emirates.",
    },
  },
  {
    slug: "south-korea",
    name: "South Korea",
    flag: "https://flagcdn.com/kr.svg",
    datasetCountry: "Korea, Republic of",
    heroImage: "/images/dest-south-korea-hero.jpg",
    headline: "STUDY IN SOUTH KOREA",
    eyebrow: "K-tech, K-culture, and a D-10 job-seeker visa",
    tagline:
      "Seoul National, KAIST, and Yonsei anchor a tech powerhouse, and the D-10 visa now offers up to 3 years to find work after graduation.",
    motif: "mugunghwa",
    heroCards: [
      {
        label: "Seoul",
        image: "/images/dest-south-korea-1.jpg",
        alt: "Seoul cityscape with cherry blossoms in spring",
      },
      {
        label: "Seoul Old & New",
        image: "/images/dest-south-korea-2.jpg",
        alt: "Seoul skyline mixing traditional hanok and modern towers",
        vertical: true,
      },
      {
        label: "Top Universities",
        image: "/images/dest-south-korea-3.jpg",
        alt: "Grand Peace Palace at Kyung Hee University",
      },
      {
        label: "Student Life",
        image: "/images/dest-south-korea-4.jpg",
        alt: "Students walking across the Seoul National University campus",
        vertical: true,
      },
    ],
    whyTitle: "Why South Korea?",
    whyPoints: [
      {
        icon: "briefcase",
        title: "Post-study work",
        text: "The D-10 job-seeker visa now allows up to 3 years of stay for job hunting — new graduates converting from D-2 are exempt from the points test.",
      },
      {
        icon: "award",
        title: "Standout strength",
        text: "KAIST, Seoul National, and POSTECH rank among the world's best for engineering and semiconductor research — Samsung and SK Hynix recruit on campus.",
      },
      {
        icon: "wallet",
        title: "Cost positioning",
        text: "Tuition runs KRW 4–8M (~₹2.5–5L) per year — cheaper than the West — with strong scholarship culture (GKS, NIIED).",
      },
      {
        icon: "alert",
        title: "The honest caveat",
        text: "Korean language (TOPIK) is the gatekeeper for most programs and many jobs — budget a year of language study if you're starting from zero.",
      },
    ],
    featuredUniversities: [
      { name: "Seoul National University", city: "Seoul" },
      { name: "Korea University", city: "Seoul" },
      { name: "Yonsei University", city: "Seoul" },
      { name: "KAIST (Korea Advanced Institute of Science & Technology)", city: "Daejeon" },
      { name: "Sungkyunkwan University", city: "Suwon" },
      { name: "Hanyang University", city: "Seoul" },
      { name: "Pohang University of Science and Technology", city: "Pohang" },
      { name: "Kyung Hee University", city: "Seoul" },
      { name: "Ewha Womans University", city: "Seoul" },
    ],
    popularCourses: [
      "AI & Computer Science",
      "Semiconductor & Electronics Engineering",
      "Business & Global Management",
      "K-Culture & Design",
      "Biotechnology & Health Science",
      "Automotive Engineering",
      "Korean Language & Literature",
    ],
    cost: {
      tuition: "KRW 4–8M (₹2.5L–₹5L) per year at most universities",
      living: "KRW 10–14M (₹6L–₹8.5L) per year — Seoul is the priciest city",
      note: "Approximate estimate for planning only. GKS and university scholarships cover or slash both tuition and living costs for strong applicants.",
    },
    visa: {
      type: "D-2 Student Visa",
      funds: "Show roughly KRW 12–20M in bank funds for tuition plus a year of living costs",
      documents: [
        "Certificate of Admission from a Korean university",
        "Proof of funds / bank statement",
        "Passport and photos",
        "TOPIK or English test evidence",
        "Background check (as requested)",
      ],
      postStudyWorkName: "D-10 Job-Seeker Visa",
      postStudyWorkDuration: "Up to 3 years (points-exempt for new graduates)",
      intakes: ["March (main intake)", "September"],
    },
    services: [
      {
        title: "Counseling & University Selection",
        text: "From Seoul National to KAIST and the SKY universities, we match your grades and language level to the right Korean program.",
      },
      {
        title: "Applications & Documentation",
        text: "Korean university applications, research plans, and recommendation letters handled to the exacting standards Korean admissions expect.",
      },
      {
        title: "Visa Counseling & Interview Prep",
        text: "We prepare your D-2 visa file and guide the immigration steps for a smooth landing in Seoul or Daejeon.",
      },
      {
        title: "Test Preparation",
        text: "TOPIK preparation toward the level your program needs, plus English tests for international tracks.",
      },
      {
        title: "Scholarships & Funding",
        text: "GKS (Global Korea Scholarship), NIIED grants, and university scholarships that make Korea one of the most affordable choices.",
      },
      {
        title: "Pre-Departure & Arrival Support",
        text: "Dorm and goshiwon housing, ARC (alien registration), mobile and bank setup, and orientation in Korea.",
      },
    ],
    closing: {
      heading: "Korea's Tech Future, Yours",
      text: "A free consultation shows which Korean universities take you, what TOPIK level to target, and how the D-10 visa works in practice.",
    },
  },
  {
    slug: "singapore",
    name: "Singapore",
    flag: "https://flagcdn.com/sg.svg",
    datasetCountry: "Singapore",
    heroImage: "/images/dest-singapore-hero.jpg",
    headline: "STUDY IN SINGAPORE",
    eyebrow: "The world's most wired city-state",
    tagline:
      "NUS and NTU rank in the global top 20, English is the medium of instruction, and graduates plug straight into Asia's financial and tech heart.",
    motif: "orchid-merlion",
    heroCards: [
      {
        label: "Singapore",
        image: "/images/dest-singapore-1.jpg",
        alt: "Bird's-eye view of the Singapore cityscape from Mount Faber",
      },
      {
        label: "Marina Bay",
        image: "/images/dest-singapore-2.jpg",
        alt: "Singapore city skyline at dusk with modern skyscrapers",
        vertical: true,
      },
      {
        label: "Top Universities",
        image: "/images/dest-singapore-3.jpg",
        alt: "Modern architectural campus with lush landscaping in Singapore",
      },
      {
        label: "Student Life",
        image: "/images/dest-singapore-4.jpg",
        alt: "Engaged students in a Singapore classroom",
        vertical: true,
      },
    ],
    whyTitle: "Why Singapore?",
    whyPoints: [
      {
        icon: "briefcase",
        title: "Post-study work",
        text: "No automatic PSW — but a 1-year LTVP to job-hunt plus employer-sponsored Employment/S Passes (EP minimum ~SGD 5,600/mo) reward strong graduates.",
      },
      {
        icon: "award",
        title: "Standout strength",
        text: "NUS and NTU rank top-20 globally with elite engineering, computer science, and finance programs in Asia's most connected business hub.",
      },
      {
        icon: "wallet",
        title: "Cost positioning",
        text: "Tuition runs SGD 30k–50k per year — premium, but graduate salaries and Singapore's financial muscle often justify the outlay.",
      },
      {
        icon: "alert",
        title: "The honest caveat",
        text: "There is no stay-back entitlement — your job offer (and the employer's pass application) decides your future, so build your profile early.",
      },
    ],
    featuredUniversities: [
      { name: "National University of Singapore", city: "Singapore" },
      { name: "Nanyang Technological University", city: "Singapore" },
      { name: "Singapore Management University", city: "Singapore" },
      { name: "Singapore University of Technology and Design", city: "Singapore" },
    ],
    popularCourses: [
      "Computer Science & AI",
      "Data Science & Analytics",
      "Engineering",
      "Finance & Business",
      "Biomedical Science",
      "Architecture & Design",
      "Supply Chain & Logistics",
    ],
    cost: {
      tuition: "SGD 30k–50k per year for most international students",
      living: "SGD 15k–25k per year — housing is the biggest single expense",
      note: "Approximate estimate for planning only. Singapore universities are among the most selective in Asia — budget for both cost and competition.",
    },
    visa: {
      type: "Student's Pass (STP) via ICA",
      funds: "Show tuition plus at least SGD 1,000–1,500/month for living costs",
      documents: [
        "Offer of admission from a Singapore institution",
        "Proof of funds / bank statement",
        "Passport with 6+ months validity",
        "English proficiency (IELTS/TOEFL)",
        "Medical report (if required)",
      ],
      postStudyWorkName: "LTVP (job search) → Employment Pass / S Pass",
      postStudyWorkDuration: "1-year LTVP job search; passes tied to employer sponsorship",
      intakes: ["August (main intake)", "January"],
    },
    services: [
      {
        title: "Counseling & University Selection",
        text: "We assess your candidacy honestly for NUS, NTU, SMU, and SUTD — Singapore's universities are selective, and fit matters more than reach.",
      },
      {
        title: "Applications & Documentation",
        text: "Highly polished applications, personal statements, and referee inputs for Singapore's competitive portals.",
      },
      {
        title: "Visa Counseling & Interview Prep",
        text: "We prepare your Student's Pass file so ICA processing is fast and uneventful.",
      },
      {
        title: "Test Preparation",
        text: "IELTS/TOEFL for entry, plus GRE/GMAT for the postgraduate programs that need them.",
      },
      {
        title: "Scholarships & Funding",
        text: "University merit scholarships and MOE tuition-grant guidance (with its bond obligations clearly explained).",
      },
      {
        title: "Pre-Departure & Arrival Support",
        text: "Housing (on-campus and private), STP card collection, bank setup, and arrival orientation.",
      },
    ],
    closing: {
      heading: "Singapore, Strategically",
      text: "A free consultation gives you a realistic view of Singapore admissions and a plan to stand out to employers on a 1-year LTVP.",
    },
  },
  {
    slug: "poland",
    name: "Poland",
    flag: "https://flagcdn.com/pl.svg",
    datasetCountry: "Poland",
    heroImage: "/images/dest-poland-hero.jpg",
    headline: "STUDY IN POLAND",
    eyebrow: "European quality at a fraction of the price",
    tagline:
      "Low tuition, EU membership, and a 9-month post-graduation permit to find work — one of Europe's most budget-friendly quality options.",
    motif: "eagle-amber",
    heroCards: [
      {
        label: "Warsaw",
        image: "/images/dest-poland-1.jpg",
        alt: "Historic tram and skyscrapers in the Warsaw cityscape",
      },
      {
        label: "Wrocław",
        image: "/images/dest-poland-2.jpg",
        alt: "Aerial view of the Wrocław cityscape",
        vertical: true,
      },
      {
        label: "Top Universities",
        image: "/images/dest-poland-3.jpg",
        alt: "Facade of Jagiellonian University in Kraków",
      },
      {
        label: "Student Life",
        image: "/images/dest-poland-4.jpg",
        alt: "Students studying in a sunlit classroom",
        vertical: true,
      },
    ],
    whyTitle: "Why Poland?",
    whyPoints: [
      {
        icon: "briefcase",
        title: "Post-study work",
        text: "Graduates of full-time Polish programs can apply for a 9-month temporary residence permit to look for work — and work without a separate permit.",
      },
      {
        icon: "award",
        title: "Standout strength",
        text: "University of Warsaw and Jagiellonian (one of Europe's oldest) offer respected degrees in medicine, engineering, and CS inside the EU.",
      },
      {
        icon: "wallet",
        title: "Cost positioning",
        text: "Tuition is among Europe's lowest — roughly €2k–€6k per year — with living costs to match.",
      },
      {
        icon: "alert",
        title: "The honest caveat",
        text: "English-taught programs are growing but limited, and Polish salary levels are below Western Europe — plan for the long game.",
      },
    ],
    featuredUniversities: [
      { name: "University of Warsaw", city: "Warsaw" },
      { name: "Jagiellonian University", city: "Kraków" },
      { name: "Warsaw University of Technology", city: "Warsaw" },
      { name: "Adam Mickiewicz University of Poznan", city: "Poznań" },
      { name: "AGH University of Science and Technology", city: "Kraków" },
      { name: "Gdansk University of Technology", city: "Gdańsk" },
      { name: "Nicolaus Copernicus University of Torun", city: "Toruń" },
    ],
    popularCourses: [
      "Computer Science",
      "Engineering",
      "Medicine (English-medium)",
      "Business & Management",
      "Architecture",
      "Law & International Relations",
      "Economics",
    ],
    cost: {
      tuition: "€2k–€6k per year for most programs",
      living: "€6k–€10k per year — Warsaw and Kraków are the priciest Polish cities",
      note: "Approximate estimate for planning only. Polish public universities charge a fraction of Western European fees for international students.",
    },
    visa: {
      type: "National (D) Student Visa",
      funds: "Show roughly PLN 15k–18k (≈€3.5k–€4k) for living costs plus tuition",
      documents: [
        "Admission letter from a Polish university",
        "Proof of funds for studies and living",
        "Passport and photos",
        "English or Polish proficiency evidence",
        "Health insurance confirmation",
      ],
      postStudyWorkName: "9-month temporary residence permit for graduates",
      postStudyWorkDuration: "9 months after graduation (once, immediately after)",
      intakes: ["October (main intake)", "February"],
    },
    services: [
      {
        title: "Counseling & University Selection",
        text: "We shortlist across Warsaw, Kraków, and Gdańsk — prioritizing English-taught medicine, CS, and engineering that suit your profile and budget.",
      },
      {
        title: "Applications & Documentation",
        text: "Polish applications, language certificates, and apostilled documents handled to European standards.",
      },
      {
        title: "Visa Counseling & Interview Prep",
        text: "We prepare your National (D) visa file so the Polish consulate review is quick and complete.",
      },
      {
        title: "Test Preparation",
        text: "IELTS/TOEFL for English programs and B2-level Polish for Polish-taught routes.",
      },
      {
        title: "Scholarships & Funding",
        text: "Polish government scholarships, university merit awards, and loan guidance for budget-minded students.",
      },
      {
        title: "Pre-Departure & Arrival Support",
        text: "Housing, PESEL registration, bank setup, health insurance, and orientation in your Polish city.",
      },
    ],
    closing: {
      heading: "Poland, Priced to Move",
      text: "A free consultation shows how an EU degree in Poland fits a realistic budget and a 9-month runway to a career.",
    },
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    flag: "https://flagcdn.com/my.svg",
    datasetCountry: "Malaysia",
    heroImage: "/images/dest-malaysia-hero.jpg",
    headline: "STUDY IN MALAYSIA",
    eyebrow: "English-medium degrees at Southeast Asian prices",
    tagline:
      "Twinning degrees from UK and Australian universities, vibrant campus life in KL, and a 12-month Graduate Pass to kick-start your career.",
    motif: "hibiscus",
    heroCards: [
      {
        label: "Kuala Lumpur",
        image: "/images/dest-malaysia-1.jpg",
        alt: "Breathtaking skyline of Kuala Lumpur at dusk",
      },
      {
        label: "KL Skyline",
        image: "/images/dest-malaysia-2.jpg",
        alt: "Kuala Lumpur skyline featuring the KL Tower",
        vertical: true,
      },
      {
        label: "Top Universities",
        image: "/images/dest-malaysia-3.jpg",
        alt: "Academic buildings on a Malaysian university campus",
      },
      {
        label: "Student Life",
        image: "/images/dest-malaysia-4.jpg",
        alt: "Graduate student celebrating in a park in Malaysia",
        vertical: true,
      },
    ],
    whyTitle: "Why Malaysia?",
    whyPoints: [
      {
        icon: "briefcase",
        title: "Post-study work",
        text: "The Graduate Pass lets degree graduates stay for 12 months to work part-time or seek full-time roles — no employer sponsor needed upfront.",
      },
      {
        icon: "award",
        title: "Standout strength",
        text: "Universiti Malaya ranks top-100 globally, and Monash and Taylor's offer UK/Australian degrees at Malaysian prices.",
      },
      {
        icon: "wallet",
        title: "Cost positioning",
        text: "Tuition runs MYR 25k–60k per year — a fraction of UK/US costs — with low living expenses and English as the teaching language.",
      },
      {
        icon: "alert",
        title: "The honest caveat",
        text: "English-medium job opportunities are growing but selective, and some degree recognitions vary — choose accredited programs.",
      },
    ],
    featuredUniversities: [
      { name: "University of Malaya", city: "Kuala Lumpur" },
      { name: "Universiti Kebangsaan Malaysia", city: "Bangi" },
      { name: "Universiti Putra Malaysia", city: "Serdang" },
      { name: "Universiti Teknologi Malaysia", city: "Johor Bahru" },
      { name: "Universiti Sains Malaysia", city: "Penang" },
      { name: "Monash University Malaysia", city: "Petaling Jaya" },
      { name: "Taylor's University", city: "Subang Jaya" },
      { name: "Sunway University", city: "Petaling Jaya" },
      { name: "UCSI University", city: "Kuala Lumpur" },
    ],
    popularCourses: [
      "Business & Accounting",
      "Information Technology",
      "Engineering",
      "Medicine & Health Sciences",
      "Hospitality & Tourism",
      "Media & Design",
      "Actuarial Science",
    ],
    cost: {
      tuition: "MYR 25k–60k per year depending on university and twinning program",
      living: "MYR 15k–25k per year — KL is affordable by international standards",
      note: "Approximate estimate for planning only. Twinning programs cost more but deliver a foreign university's degree locally.",
    },
    visa: {
      type: "Student Pass (eVAL + endorsement)",
      funds: "Show tuition plus ~MYR 1,000–1,500/month for living costs",
      documents: [
        "Offer of admission / registration letter",
        "eVAL and visa approval letter",
        "Passport with 18+ months validity",
        "Proof of funds / bank statement",
        "Health insurance and medical exam (as required)",
      ],
      postStudyWorkName: "Graduate Pass (Social Visit Pass)",
      postStudyWorkDuration: "12 months after graduation",
      intakes: ["February", "September", "Rolling intakes at private universities"],
    },
    services: [
      {
        title: "Counseling & University Selection",
        text: "We match you to public research universities and private campuses in KL — including twinning degrees from UK and Australian universities.",
      },
      {
        title: "Applications & Documentation",
        text: "University and twinning-program applications, transcripts, and the documents EMGS expects.",
      },
      {
        title: "Visa Counseling & Interview Prep",
        text: "We guide your Student Pass application through EMGS from eVAL to endorsement for a smooth arrival.",
      },
      {
        title: "Test Preparation",
        text: "IELTS/TOEFL for English-medium entry and any professional exams your course requires.",
      },
      {
        title: "Scholarships & Funding",
        text: "Malaysian government and university scholarships plus merit awards at private institutions.",
      },
      {
        title: "Pre-Departure & Arrival Support",
        text: "Housing leads in KL and Penang, Student Pass collection, bank and mobile setup, and orientation.",
      },
    ],
    closing: {
      heading: "Malaysia, the Smart Start",
      text: "A free consultation shows how an accredited Malaysian degree — or a UK/Australian twinning degree — fits your budget.",
    },
  },
]

export const COUNTRY_BY_SLUG: Record<string, CountryData> = Object.fromEntries(
  COUNTRIES.map((country) => [country.slug, country])
)

export function getCountryBySlug(slug: string): CountryData | undefined {
  return COUNTRY_BY_SLUG[slug]
}
