"use client"

import type { ReactNode } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AlertCircle, Mail, Phone, MapPin } from "lucide-react"

function PageBanner() {
  return (
    <section className="bg-accent pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="animate-fade-up font-heading text-4xl font-extrabold tracking-tight text-accent-foreground md:text-5xl text-balance">
          Terms of Service
        </h1>
        <p className="animate-fade-up-delay-1 mx-auto mt-4 max-w-2xl text-accent-foreground/70 leading-relaxed text-pretty">
          The terms and conditions that govern your use of the Quilon Educational Consultancy
          website and services.
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
        If you have any questions about these Terms of Service, please contact us at:
      </p>
      <ul className="flex flex-col gap-3 text-sm">
        <li className="flex items-start gap-3">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>
            <a href="mailto:quilonconsultancy@gmail.com" className="text-primary hover:underline">
              quilonconsultancy@gmail.com
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

export default function TermsOfServicePage() {
  return (
    <PageWrapper>
      <PageBanner />
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <LegalNotice />

          <div className="mt-10 flex flex-col gap-12">
            <Section title="Acceptance of These Terms">
              <p>
                Welcome to the Quilon Educational Consultancy (&quot;we&quot;, &quot;us&quot;, or
                &quot;our&quot;) website. By accessing or using our website, including the contact
                form and career-matcher tool, you agree to be bound by these Terms of Service
                (&quot;Terms&quot;). If you do not agree with any part of these Terms, please do not
                use our website or services.
              </p>
            </Section>

            <Section title="Our Services">
              <p>
                Quilon Educational Consultancy is an educational consultancy based in Kottarakara,
                Kerala, India. We help students plan and pursue higher education abroad through
                services including personalized counseling, university shortlisting, application and
                statement of purpose support, scholarship guidance, standardized test preparation,
                visa assistance, and pre-departure support.
              </p>
            </Section>

            <Section title="Use of the Website">
              <p>By using our website, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the website only for lawful purposes and in a way that does not infringe the rights of others.</li>
                <li>Provide accurate, current, and complete information when using our forms and tools.</li>
                <li>Not attempt to gain unauthorized access to the website, its servers, or its systems.</li>
                <li>Not interfere with the normal operation of the website.</li>
              </ul>
            </Section>

            <Section title="Career Matcher Tool">
              <p>
                The Career Matcher is an interactive tool that provides personalized study-abroad
                recommendations based on the preferences you enter, such as your interests, preferred
                destination, academic stream, budget, timeline, and test readiness. The results are
                provided for general guidance and information purposes only. They are not a guarantee
                of admission, visa approval, scholarship, or any specific outcome, and should not be
                treated as professional career or financial advice.
              </p>
            </Section>

            <Section title="Contact Form and Communications">
              <p>
                When you submit our contact form, we use the information you provide (such as your
                name, email address, phone number, and message) to respond to your enquiry. By
                providing your contact details, you agree that we may contact you in relation to your
                enquiry. Please review our Privacy Policy for details on how we handle your personal
                information.
              </p>
            </Section>

            <Section title="Intellectual Property">
              <p>
                All content on this website, including text, graphics, logos, images, and software,
                is the property of Quilon Educational Consultancy or its licensors and is protected
                by applicable intellectual property laws. You may not reproduce, distribute, modify,
                or otherwise use our content without our prior written permission.
              </p>
            </Section>

            <Section title="No Guarantees and Disclaimer">
              <p>
                We make every effort to provide accurate and useful information, but we do not
                warrant that our website or its content is error-free, complete, or current. Study
                abroad decisions, including admission decisions, visa outcomes, and scholarship
                awards, are made by third parties (such as universities and government authorities)
                and are outside our control. We are not responsible for decisions made by those
                third parties.
              </p>
            </Section>

            <Section title="Limitation of Liability">
              <p>
                To the maximum extent permitted by law, Quilon Educational Consultancy and its
                team shall not be liable for any direct, indirect, incidental, consequential, or
                special damages arising out of or in connection with your use of our website or
                services. Nothing in these Terms limits any liability that cannot be limited under
                applicable law.
              </p>
            </Section>

            <Section title="Third-Party Links">
              <p>
                Our website may contain links to external websites, such as university websites or
                government portals. These links are provided for your convenience only. We do not
                control and are not responsible for the content, policies, or practices of any
                third-party website.
              </p>
            </Section>

            <Section title="Governing Law and Jurisdiction">
              <p>
                These Terms are governed by the laws of India. Any disputes arising out of or in
                connection with these Terms or your use of our website shall be subject to the
                exclusive jurisdiction of the courts at Kollam, Kerala, India.
              </p>
            </Section>

            <Section title="Changes to These Terms">
              <p>
                We may update these Terms of Service from time to time. Any changes will be posted
                on this page with an updated &quot;last updated&quot; date. Your continued use of
                the website after changes are posted constitutes your acceptance of the revised
                Terms.
              </p>
            </Section>

            <ContactUs />
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
