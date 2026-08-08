export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }

export type Article = {
  slug: string
  title: string
  excerpt: string
  category: string
  tag: string
  date: string
  body: ArticleBlock[]
}

export const categories = [
  { label: "All", value: "all" },
  { label: "Countries", value: "countries" },
  { label: "Visas", value: "visas" },
  { label: "Scholarships", value: "scholarships" },
  { label: "Tests", value: "tests" },
  { label: "Applications", value: "applications" },
]

// NOTE: The article bodies below are FIRST-DRAFT placeholder content written to
// give the layout something to render. The real article copy must be supplied
// by the consultancy team before publishing.
export const articles: Article[] = [
  {
    slug: "how-to-choose-the-right-study-destination",
    title: "How to Choose the Right Study Destination",
    excerpt:
      "Choosing the right country to study in is one of the most important decisions you'll make. This guide covers factors like cost, culture, career prospects, and immigration pathways to help you decide.",
    category: "Countries",
    tag: "countries",
    date: "January 15, 2026",
    body: [
      {
        type: "paragraph",
        text: "Choosing a study destination is about more than picking a famous university. The country you choose affects your budget, your lifestyle, your ability to work while studying, and the options you have after graduation. Start with your own goals, then match them against what each country offers.",
      },
      { type: "heading", text: "Start with your goals" },
      {
        type: "paragraph",
        text: "Ask yourself what you want from this experience. Are you looking for a world-ranked university, a strong technology job market, or an affordable education? Do you plan to settle abroad after studying, or return home? Write your priorities down before comparing destinations.",
      },
      { type: "heading", text: "Compare cost and funding" },
      {
        type: "paragraph",
        text: "Tuition fees and living costs vary enormously between countries. Germany, for example, charges little or no tuition at many public universities, while the USA and UK are significantly more expensive. Research scholarships, assistantships, and part-time work options alongside the base cost.",
      },
      { type: "heading", text: "Check post-study work options" },
      {
        type: "paragraph",
        text: "One of the biggest differences between countries is what happens after you graduate. Work permits and stay-back options can be a deciding factor. Compare each destination's post-study work visa rules before you commit.",
      },
      { type: "heading", text: "Think about lifestyle and safety" },
      {
        type: "paragraph",
        text: "Finally, consider the everyday reality: climate, language, community, food, and safety. A destination that fits your personality is far more likely to help you succeed academically and personally.",
      },
      {
        type: "list",
        items: [
          "List your must-haves and nice-to-haves before researching",
          "Compare total cost, not just tuition",
          "Check post-study work and immigration pathways",
          "Research the international student community and safety",
        ],
      },
      {
        type: "paragraph",
        text: "Your counselor can help you shortlist countries based on your profile. Book a free consultation to discuss your options in detail.",
      },
    ],
  },
  {
    slug: "student-visa-checklist-everything-you-need",
    title: "Student Visa Checklist: Everything You Need",
    excerpt:
      "A comprehensive checklist of documents, requirements, and steps to prepare your student visa application for the USA, Canada, UK, Australia, and more.",
    category: "Visas",
    tag: "visas",
    date: "January 8, 2026",
    body: [
      {
        type: "paragraph",
        text: "A student visa is the final major hurdle between you and your university seat. While every country has its own rules, the core requirements are broadly similar. This checklist helps you prepare a complete, error-free application.",
      },
      { type: "heading", text: "Core documents" },
      {
        type: "list",
        items: [
          "Valid passport with enough validity for the full study period",
          "Official admission letter from your university",
          "Proof of tuition payment or fee waiver",
          "Financial statements showing you can support yourself",
          "Academic documents (transcripts, certificates, test scores)",
          "Passport-size photographs that meet visa photo rules",
        ],
      },
      { type: "heading", text: "Financial proof" },
      {
        type: "paragraph",
        text: "Most embassies want to see evidence that you can cover tuition and living costs. Bank statements, education loan sanction letters, and scholarship letters are the most common documents. Make sure the amounts match the embassy's published minimum requirements.",
      },
      { type: "heading", text: "The interview" },
      {
        type: "paragraph",
        text: "For many destinations the visa interview is where applications succeed or fail. Prepare to explain your course choice, how you will fund your stay, your study plans, and your intention to return home after your studies. Practicing with a mock interview is strongly recommended.",
      },
      { type: "heading", text: "Common mistakes to avoid" },
      {
        type: "list",
        items: [
          "Applying too late after receiving the admission letter",
          "Inconsistent information between forms and documents",
          "Incomplete financial documentation",
          "Missing passport validity requirements",
        ],
      },
      {
        type: "paragraph",
        text: "Our visa team reviews your documents and conducts mock interviews to maximize your chances of approval.",
      },
    ],
  },
  {
    slug: "scholarship-tips-for-international-students",
    title: "Scholarship Tips for International Students",
    excerpt:
      "Learn how to find, apply for, and win scholarships as an international student. From merit-based awards to need-based grants, we cover all the strategies you need.",
    category: "Scholarships",
    tag: "scholarships",
    date: "December 20, 2025",
    body: [
      {
        type: "paragraph",
        text: "Scholarships can turn an unaffordable plan into a realistic one, but the process takes time and strategy. The earlier you start, the more opportunities you can apply for - and the better your applications will be.",
      },
      { type: "heading", text: "Start early" },
      {
        type: "paragraph",
        text: "Many scholarships close nine to twelve months before the academic year begins. Create a calendar of deadlines as soon as you shortlist your universities, and treat scholarship applications as part of your main application workload.",
      },
      { type: "heading", text: "Where to look" },
      {
        type: "list",
        items: [
          "Government scholarships in your destination country",
          "University-specific awards and tuition waivers",
          "Scholarships from your home country's government",
          "Private foundations and corporate sponsorships",
        ],
      },
      { type: "heading", text: "Tailor each application" },
      {
        type: "paragraph",
        text: "A generic application rarely wins. Read the criteria for each scholarship and show exactly how you meet them. Address your academic achievements, leadership, community involvement, and how the award fits your career plans.",
      },
      { type: "heading", text: "Don't ignore small awards" },
      {
        type: "paragraph",
        text: "Smaller scholarships have fewer applicants and are easier to win. Several smaller awards can together cover a large share of your costs, and they add credibility to your overall profile.",
      },
      {
        type: "paragraph",
        text: "Our scholarship team helps you find awards that match your profile and review your applications before submission.",
      },
    ],
  },
  {
    slug: "application-timeline-when-to-start-preparing",
    title: "Application Timeline: When to Start Preparing",
    excerpt:
      "A month-by-month breakdown of when to start your study abroad preparations, from standardized tests to university applications and visa filing.",
    category: "Applications",
    tag: "applications",
    date: "December 10, 2025",
    body: [
      {
        type: "paragraph",
        text: "A strong application is a timely application. Starting 12 to 18 months before your intended intake gives you room to research, test, and prepare without last-minute stress.",
      },
      { type: "heading", text: "12 - 18 months before intake" },
      {
        type: "list",
        items: [
          "Research countries and universities",
          "Shortlist programs that match your profile",
          "Check test requirements (IELTS, TOEFL, GRE, GMAT)",
          "Start budgeting and researching scholarships",
        ],
      },
      { type: "heading", text: "8 - 12 months before intake" },
      {
        type: "paragraph",
        text: "Book your standardized test dates and begin preparation in earnest. Draft your statement of purpose and request recommendation letters early - referees need time, and strong letters take multiple rounds of feedback.",
      },
      { type: "heading", text: "4 - 8 months before intake" },
      {
        type: "paragraph",
        text: "Finalize your university list and submit applications within each university's deadline window. Confirm your test scores are sent directly to the universities, and apply for scholarships whose deadlines fall during this period.",
      },
      { type: "heading", text: "The final stretch" },
      {
        type: "paragraph",
        text: "Once you receive admission letters, compare offers carefully, then move quickly on visa documentation and financial arrangements. Visa processing can take several weeks, so apply the moment your admission letter arrives.",
      },
      {
        type: "paragraph",
        text: "Follow a clear timeline with our counselors to keep every deadline in sight from day one.",
      },
    ],
  },
  {
    slug: "ielts-vs-toefl-which-test-should-you-take",
    title: "IELTS vs TOEFL: Which Test Should You Take?",
    excerpt:
      "A detailed comparison of IELTS and TOEFL, including format differences, scoring, university acceptance, and tips to help you choose the right test for your target country.",
    category: "Tests",
    tag: "tests",
    date: "November 28, 2025",
    body: [
      {
        type: "paragraph",
        text: "IELTS and TOEFL are the two most widely accepted English proficiency tests in the world. Most universities accept either, so the choice often comes down to your strengths and preferences.",
      },
      { type: "heading", text: "Format differences" },
      {
        type: "list",
        items: [
          "IELTS: face-to-face speaking interview; accepts both paper and computer formats",
          "TOEFL: speaking recorded on a computer; internet-based test",
          "IELTS uses a 1-9 band score; TOEFL uses a 0-120 scale",
          "TOEFL is fully multiple-choice except for writing; IELTS includes short-answer and gap-fill questions",
        ],
      },
      { type: "heading", text: "Scoring and acceptance" },
      {
        type: "paragraph",
        text: "Both tests are accepted by thousands of institutions, but some countries and programs have preferences. The USA leans toward TOEFL, while the UK and Australia often prefer IELTS. Always confirm the exact score your universities require.",
      },
      { type: "heading", text: "Which should you choose?" },
      {
        type: "paragraph",
        text: "Choose based on how you perform in each format. If you prefer a live conversation for speaking, IELTS suits you. If you type faster than you speak and prefer fully computer-based testing, TOEFL may be the better fit. Take a free practice test of each to compare.",
      },
      {
        type: "paragraph",
        text: "Our test prep coaches help you plan your preparation and target the right score for your universities.",
      },
    ],
  },
  {
    slug: "top-10-affordable-countries-to-study-abroad",
    title: "Top 10 Affordable Countries to Study Abroad",
    excerpt:
      "Think studying abroad is too expensive? Discover 10 countries that offer world-class education at surprisingly affordable costs, including some with free tuition.",
    category: "Countries",
    tag: "countries",
    date: "November 15, 2025",
    body: [
      {
        type: "paragraph",
        text: "A world-class education doesn't have to mean a six-figure bill. Several countries offer excellent universities at remarkably low tuition - and a few charge almost nothing at all.",
      },
      { type: "heading", text: "The affordable ten" },
      {
        type: "list",
        items: [
          "Germany - near-free tuition at public universities",
          "Norway - low or no tuition fees at public universities",
          "Poland - low tuition with a strong European location",
          "France - affordable tuition, especially at public universities",
          "Malaysia - quality education at a fraction of Western costs",
          "Taiwan - generous scholarships and low living costs",
          "Mexico - low tuition and a vibrant culture",
          "Portugal - affordable EU education in English",
          "Hungary - low tuition and competitive scholarships",
          "Finland - free tuition for many EU students, scholarships for others",
        ],
      },
      { type: "heading", text: "The real cost of affordability" },
      {
        type: "paragraph",
        text: "Remember that tuition is only half the picture. Living costs, health insurance, travel, and part-time work availability all matter. Germany's free tuition, for example, still requires a blocked account for living expenses.",
      },
      { type: "heading", text: "How to compare fairly" },
      {
        type: "paragraph",
        text: "Calculate total annual cost for each country, then subtract the scholarships you are realistically eligible for. That number, not the headline tuition fee, is what you should compare.",
      },
      {
        type: "paragraph",
        text: "Tell us your budget and we will shortlist destinations where you can genuinely afford to study.",
      },
    ],
  },
  {
    slug: "how-to-write-a-winning-statement-of-purpose",
    title: "How to Write a Winning Statement of Purpose",
    excerpt:
      "Your SOP can make or break your application. Learn the structure, dos and don'ts, and real examples of statements that impressed admissions committees.",
    category: "Applications",
    tag: "applications",
    date: "November 5, 2025",
    body: [
      {
        type: "paragraph",
        text: "The statement of purpose is your one chance to speak directly to the admissions committee. A strong SOP connects your past, present, and future into a single, convincing story.",
      },
      { type: "heading", text: "Know your audience" },
      {
        type: "paragraph",
        text: "Admissions officers read hundreds of statements. They want to know why you chose this specific program, why you are qualified, and what you plan to do with the degree. Generic statements get filtered out quickly.",
      },
      { type: "heading", text: "A structure that works" },
      {
        type: "list",
        items: [
          "Opening: hook the reader with your motivation for the field",
          "Academic journey: how your background prepared you",
          "Relevant experience: projects, internships, and achievements",
          "Program fit: why this university and course",
          "Future goals: what you will do after graduation",
        ],
      },
      { type: "heading", text: "Show, don't tell" },
      {
        type: "paragraph",
        text: "Replace statements like 'I am passionate about computer science' with specific evidence - a project you built, a problem you solved, or a paper that changed how you think. Concrete examples are far more memorable than adjectives.",
      },
      { type: "heading", text: "Revise ruthlessly" },
      {
        type: "paragraph",
        text: "Your first draft is a starting point, not the finish line. Cut fluff, check the word limit, proofread for errors, and get feedback from someone who knows your field.",
      },
      {
        type: "paragraph",
        text: "Our application team provides detailed SOP feedback and editing for every student we support.",
      },
    ],
  },
  {
    slug: "gre-preparation-complete-study-guide",
    title: "GRE Preparation: A Complete Study Guide",
    excerpt:
      "Master the GRE with this complete guide covering study plans, practice resources, test-day strategies, and score expectations for top universities.",
    category: "Tests",
    tag: "tests",
    date: "October 22, 2025",
    body: [
      {
        type: "paragraph",
        text: "The GRE is a standardized test widely used for graduate school admissions. With the right plan, a strong score is very achievable - most students simply under-prepare or prepare without structure.",
      },
      { type: "heading", text: "Understand the format" },
      {
        type: "list",
        items: [
          "Verbal Reasoning: reading comprehension, text completion, sentence equivalence",
          "Quantitative Reasoning: arithmetic, algebra, geometry, data analysis",
          "Analytical Writing: issue essay and argument essay",
          "Computer-adaptive scoring adjusts question difficulty as you answer",
        ],
      },
      { type: "heading", text: "Build a study plan" },
      {
        type: "paragraph",
        text: "Give yourself 8 to 12 weeks of consistent study. Take a diagnostic test first to identify weak areas, then spend most of your time on those. Practice in short daily sessions beats occasional marathon sessions.",
      },
      { type: "heading", text: "Practice with real questions" },
      {
        type: "paragraph",
        text: "Use official practice materials whenever possible - they are the closest match to the real test. Track your mistake patterns and review every wrong answer until you understand the reasoning.",
      },
      { type: "heading", text: "Test-day strategy" },
      {
        type: "paragraph",
        text: "On test day, manage your time and pace. Skip and return to difficult questions, keep your essays structured, and don't let one hard question break your rhythm. A calm, steady approach consistently outperforms last-minute cramming.",
      },
      {
        type: "paragraph",
        text: "Our GRE coaching includes diagnostic tests, study plans, and regular mock exams to keep you on track.",
      },
    ],
  },
  {
    slug: "work-while-you-study-part-time-job-rules-by-country",
    title: "Work While You Study: Part-Time Job Rules by Country",
    excerpt:
      "Understand the work regulations for international students in the USA, Canada, UK, Australia, Germany, and Ireland, including hours allowed and job types.",
    category: "Visas",
    tag: "visas",
    date: "October 10, 2025",
    body: [
      {
        type: "paragraph",
        text: "Working part-time while studying can fund your expenses and build your resume - but every country has different rules. Exceeding your work allowance can put your visa at risk, so know your limits.",
      },
      { type: "heading", text: "United States" },
      {
        type: "paragraph",
        text: "F-1 students can generally work on campus up to 20 hours per week during term time and full-time during breaks. Off-campus work requires authorization, usually through Optional Practical Training (OPT) or Curricular Practical Training (CPT).",
      },
      { type: "heading", text: "Canada" },
      {
        type: "paragraph",
        text: "Study permit holders can typically work up to 20 hours per week during academic sessions and full-time during scheduled breaks, without a separate work permit.",
      },
      { type: "heading", text: "United Kingdom" },
      {
        type: "paragraph",
        text: "Student visa holders can usually work up to 20 hours per week during term time, with rules depending on whether your course is at degree level. Work placements may have different limits.",
      },
      { type: "heading", text: "Australia" },
      {
        type: "paragraph",
        text: "Student visa holders can work up to 24 hours per fortnight during study periods and unlimited hours during scheduled breaks.",
      },
      { type: "heading", text: "Germany" },
      {
        type: "paragraph",
        text: "International students can work up to 140 full days or 280 half days per year. Many work as student assistants (HiWi) on campus, which often have separate and more flexible rules.",
      },
      { type: "heading", text: "Ireland" },
      {
        type: "paragraph",
        text: "Stamp 2 students on degree courses can work up to 20 hours per week during term time and up to 40 hours per week during holiday periods.",
      },
      {
        type: "paragraph",
        text: "Work rules change frequently. Confirm the latest limits with your university or counselor before accepting any job.",
      },
    ],
  },
]
