"use client"

import type { ReactNode } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { Mail, Phone } from "lucide-react"

function PageBanner() {
  return (
    <section className="bg-accent pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="animate-fade-up font-heading text-4xl font-extrabold tracking-tight text-accent-foreground md:text-5xl text-balance">
          Terms and Conditions
        </h1>
        <p className="animate-fade-up-delay-1 mx-auto mt-4 max-w-2xl text-accent-foreground/70 leading-relaxed text-pretty">
          The terms and conditions that govern your use of the Quilon Educational Consultancy
          Private Limited website and services.
        </p>
      </div>
    </section>
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
    <Section title="Contact Information">
      <p>
        If you have any questions or concerns regarding these Terms and Conditions, please contact
        us at:
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
          <span>+91 92077 74401</span>
        </li>
      </ul>
    </Section>
  )
}

export default function TermsOfServicePage() {
  return (
    <PageWrapper>
      <PageBanner />
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mt-0 flex flex-col gap-12">
            <Section title="Acceptance of Terms">
              <p>
                By accessing or using the website of Quilon Educational Consultancy Private Limited
                (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to comply with and be
                bound by these Terms and Conditions (&quot;Terms&quot;). If you do not agree with any
                part of these Terms, please do not use our website or services.
              </p>
            </Section>

            <Section title="Services">
              <p>
                Quilon Educational Consultancy Private Limited is an educational consultancy based in
                Kottarakara, Kerala, India. We provide guidance and support to students seeking higher
                education opportunities abroad. Our services include, but are not limited to, career
                counseling, university shortlisting, application assistance, documentation support,
                scholarship guidance, visa assistance, and pre-departure orientation.
              </p>
            </Section>

            <Section title="Client Responsibilities">
              <p>As a client of our services, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Provide accurate, complete, and truthful information about your academic history,
                  financial situation, and personal background.
                </li>
                <li>
                  Submit all required documents within the deadlines communicated by our team.
                </li>
                <li>
                  Take responsibility for decisions made regarding university applications, visa
                  applications, and other procedures, based on the guidance provided by us.
                </li>
                <li>
                  Not engage in any form of fraud, misrepresentation, or submission of false
                  documents in any application process.
                </li>
              </ul>
            </Section>

            <Section title="Fees and Payments">
              <p>
                Our service fees are communicated to you before the commencement of any paid service.
                All payments must be made in accordance with the payment schedule agreed upon with our
                team. Fees, once paid, are subject to our Refund Policy.
              </p>
              <p>
                We do not guarantee admission to any university, approval of any visa, or award of any
                scholarship. All outcomes are determined by the respective universities, embassies, or
                funding bodies.
              </p>
            </Section>

            <Section title="Refund Policy">
              <p>
                Our Refund Policy governs the eligibility and processing of refunds. Please refer to
                our{" "}
                <a href="/refund-policy" className="text-primary hover:underline">
                  Refund Policy
                </a>{" "}
                for detailed information on refund eligibility, the refund process, and
                non-refundable services.
              </p>
            </Section>

            <Section title="Privacy Policy">
              <p>
                We are committed to protecting your personal information. Please review our{" "}
                <a href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </a>{" "}
                to understand how we collect, use, and protect your data.
              </p>
            </Section>

            <Section title="Limitation of Liability">
              <p>
                To the maximum extent permitted by law, Quilon Educational Consultancy Private
                Limited, its directors, employees, and representatives shall not be liable for any
                indirect, incidental, consequential, or special damages arising out of or in
                connection with your use of our website or services.
              </p>
              <p>
                Our total liability to you, whether in contract, tort, or otherwise, shall in no
                event exceed the total amount of fees you have paid to us for the services provided.
              </p>
            </Section>

            <Section title="Intellectual Property">
              <p>
                All content on this website, including text, graphics, logos, images, and software,
                is the property of Quilon Educational Consultancy Private Limited or its licensors
                and is protected by applicable intellectual property laws. You may not reproduce,
                distribute, modify, or otherwise use our content without our prior written permission.
              </p>
            </Section>

            <Section title="Modifications to Terms">
              <p>
                We may update these Terms and Conditions from time to time. Any changes will be posted
                on this page with an updated &quot;last updated&quot; date. Your continued use of the
                website after changes are posted constitutes your acceptance of the revised Terms.
              </p>
            </Section>

            <Section title="Third-Party Links and Services">
              <p>
                Our website may contain links to external websites, such as university websites or
                government portals. These links are provided for your convenience only. We do not
                control and are not responsible for the content, policies, or practices of any
                third-party website.
              </p>
            </Section>

            <Section title="Governing Law and Jurisdiction">
              <p>
                These Terms are governed by and construed in accordance with the laws of India. Any
                disputes arising out of or in connection with these Terms or your use of our website
                shall be subject to the exclusive jurisdiction of the courts at Kottarakara, Kerala,
                India.
              </p>
            </Section>

            <Section title="Termination">
              <p>
                We reserve the right to suspend or terminate your access to our services, without
                notice, for any reason, including but not limited to a breach of these Terms, or
                conduct that we determine to be harmful to other users, third parties, or us.
              </p>
            </Section>

            <ContactUs />
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
