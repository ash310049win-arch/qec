"use client"

import type { ReactNode } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AlertCircle, Mail, Phone, MapPin } from "lucide-react"

function PageBanner() {
  return (
    <section className="bg-accent pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="animate-fade-up font-heading text-4xl font-extrabold tracking-tight text-accent-foreground md:text-5xl text-balance">
          Privacy Policy
        </h1>
        <p className="animate-fade-up-delay-1 mx-auto mt-4 max-w-2xl text-accent-foreground/70 leading-relaxed text-pretty">
          How Quilon Educational Consultancy collects, uses, and protects your personal
          information when you use our website and services.
        </p>
      </div>
    </section>
  )
}

function LegalNotice() {
  return (
    <div className="rounded-xl border border-border bg-secondary p-6">
      <p className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <span>
          <strong className="font-semibold text-foreground">Important notice:</strong> This page
          contains template/placeholder legal content prepared as a starting point. It is not legal
          advice and has not been reviewed or approved by a lawyer. Please have it reviewed by a
          qualified legal professional or someone with appropriate knowledge before treating it as
          final.
        </span>
      </p>
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-foreground">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  )
}

function ContactUs() {
  return (
    <Section title="Contact Us">
      <p>
        If you have any questions about this Privacy Policy or how we handle your personal
        information, please contact us at:
      </p>
      <ul className="flex flex-col gap-3 text-sm">
        <li className="flex items-start gap-3">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>
            <a href="mailto:info@quilonconsultancy.com" className="text-primary hover:underline">
              info@quilonconsultancy.com
            </a>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>+91 94977 71392 &nbsp;|&nbsp; +91 92077 74401</span>
        </li>
        <li className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>
            Opp. Swayamvara Silks, Pulamon Junction,
            <br />
            Kottarakara, Kollam, Kerala - 691531, India
          </span>
        </li>
      </ul>
    </Section>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper>
      <PageBanner />
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <LegalNotice />

          <div className="mt-10 flex flex-col gap-12">
            <Section title="Overview">
              <p>
                Quilon Educational Consultancy (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
                is an educational consultancy based in Kottarakara, Kerala, India that helps
                students pursue higher education abroad. This Privacy Policy explains how we
                collect, use, disclose, and protect your personal information when you visit our
                website or use our services. By using our website, you agree to the practices
                described in this Policy.
              </p>
              <p>
                We are committed to protecting your privacy and handling your personal information
                responsibly, in accordance with applicable laws in India, including the Digital
                Personal Data Protection Act, 2023, and other applicable regulations.
              </p>
            </Section>

            <Section title="Information We Collect">
              <p>
                <strong className="font-semibold text-foreground">Information you provide directly:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="font-semibold text-foreground">Contact form:</strong> When you
                  submit our contact or consultation form, we collect your name, email address,
                  phone number, and message, along with any optional details you choose to provide
                  such as your current education level, desired country, and target intake.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">Course Finder quiz:</strong>{" "}
                  When you use our Course Finder tool, we collect the student preference data you
                  enter, including areas of interest, preferred destination, academic stream, budget
                  range, intended timeline, and test readiness. This information is used to generate
                  personalized study-abroad recommendations.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">Communications:</strong> If you
                  contact us by email, phone, or WhatsApp, we may keep a record of that
                  correspondence.
                </li>
              </ul>
              <p>
                <strong className="font-semibold text-foreground">Information collected automatically:</strong>{" "}
                Like most websites, we may collect basic technical information such as browser type,
                device information, and pages visited. This section should be reviewed against any
                analytics, hosting, or logging tools actually in use on this website.
              </p>
            </Section>

            <Section title="How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your inquiries and provide study-abroad consultation services.</li>
                <li>
                  Generate personalized study-abroad recommendations and matching results based on
                  your Course Finder preferences.
                </li>
                <li>Schedule consultations and follow up with you about your enquiry.</li>
                <li>
                  Provide information about programs, universities, visas, scholarships, and other
                  relevant services.
                </li>
                <li>Improve our website, services, and user experience.</li>
                <li>Comply with legal and regulatory obligations.</li>
              </ul>
              <p>
                Where you have provided your details through the Course Finder without submitting a
                contact form, your quiz answers are used only to generate your recommendations.
              </p>
            </Section>

            <Section title="Legal Basis for Processing">
              <p>We process your personal information on the following grounds:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="font-semibold text-foreground">Consent:</strong> You provide
                  your information voluntarily through our forms and tools.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">Legitimate interest:</strong>{" "}
                  Responding to enquiries and delivering our services requires us to use your
                  information.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">Legal obligation:</strong> We may
                  process information where required to comply with applicable laws.
                </li>
              </ul>
            </Section>

            <Section title="Third-Party Sharing">
              <p>
                We do not sell, rent, or trade your personal information to third parties. We may
                share your information only in the following limited circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  With trusted service providers (such as email, hosting, or communication
                  providers) who help us operate our website and deliver our services, and who are
                  bound by confidentiality obligations.
                </li>
                <li>
                  Where required by law, regulation, or legal process, or to protect our legal
                  rights and the safety of our users.
                </li>
              </ul>
            </Section>

            <Section title="Cookies and Similar Technologies">
              <p>
                We do not currently use cookies or similar tracking technologies to collect personal
                information. If we introduce cookies, analytics, or tracking tools in the future,
                this Policy will be updated to describe them, and this section should be reviewed
                against the actual technologies in use on the website.
              </p>
            </Section>

            <Section title="Data Retention">
              <p>
                We retain your personal information only for as long as necessary to fulfil the
                purposes described in this Policy, or as required by applicable law. When your
                information is no longer needed, we take reasonable steps to delete or
                anonymize it.
              </p>
            </Section>

            <Section title="Data Security">
              <p>
                We take reasonable technical and organizational measures to protect your personal
                information from unauthorized access, disclosure, alteration, or destruction. Please
                note that no method of transmission over the internet or method of electronic
                storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </Section>

            <Section title="Your Rights">
              <p>
                Depending on applicable law, you may have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you.</li>
                <li>Request correction of inaccurate or incomplete information.</li>
                <li>Request deletion of your personal information.</li>
                <li>Withdraw your consent at any time.</li>
                <li>Lodge a complaint with the appropriate data protection authority.</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the details below. We will
                respond to your request within a reasonable time.
              </p>
            </Section>

            <Section title="Children&apos;s Privacy">
              <p>
                Our website is intended for students and their families and is not directed to
                children under the age of consent without parental involvement. If you believe that
                a minor has provided us with personal information without appropriate consent,
                please contact us and we will take steps to remove the information.
              </p>
            </Section>

            <Section title="Changes to This Privacy Policy">
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on
                this page with an updated &quot;last updated&quot; date. Please review this page
                periodically to stay informed about how we protect your information.
              </p>
            </Section>

            <ContactUs />
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
