"use client"

import type { ReactNode } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { Mail, Phone } from "lucide-react"

function PageBanner() {
  return (
    <section className="bg-accent pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="animate-fade-up font-heading text-4xl font-extrabold tracking-tight text-accent-foreground md:text-5xl text-balance">
          Refund Policy
        </h1>
        <p className="animate-fade-up-delay-1 mx-auto mt-4 max-w-2xl text-accent-foreground/70 leading-relaxed text-pretty">
          The refund policy that governs payments made to Quilon Educational Consultancy Private
          Limited for its services.
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
    <Section title="Contact Us">
      <p>
        If you have any questions or concerns regarding this Refund Policy, please contact us at:
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

export default function RefundPolicyPage() {
  return (
    <PageWrapper>
      <PageBanner />
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mt-0 flex flex-col gap-12">
            <Section title="Scope of Refunds">
              <p>
                This Refund Policy applies to all payments made to Quilon Educational Consultancy
                Private Limited (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) for our
                educational consultancy services, including career counseling, university
                shortlisting, application assistance, documentation support, scholarship guidance,
                visa assistance, and pre-departure orientation.
              </p>
              <p>
                Please read this Refund Policy carefully before making any payment. By making a
                payment, you acknowledge that you have read, understood, and agreed to the terms of
                this Refund Policy.
              </p>
            </Section>

            <Section title="Eligibility for Refunds">
              <p>
                You are eligible to request a refund under the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  The service for which you have paid was not delivered by us within the timeframe
                  communicated to you.
                </li>
                <li>
                  The service was delivered but did not conform to the scope of services agreed upon
                  at the time of payment.
                </li>
                <li>
                  You cancel the service before the commencement of the work, provided the request is
                  made within 30 days of making the payment.
                </li>
              </ul>
              <p>
                All refund requests must be submitted in writing to the contact details provided
                below.
              </p>
            </Section>

            <Section title="Refund Process">
              <p>
                To request a refund, please contact us within 30 days of making the payment with your
                payment details and the reason for the refund request. We will review your request
                and respond within a reasonable period of time.
              </p>
              <p>
                Once approved, the refund will be processed within 30 to 45 business days from the
                date of approval.
              </p>
            </Section>

            <Section title="Refund Method">
              <p>
                Refunds will be issued using the same method of payment used for the original
                transaction, unless otherwise agreed upon by both parties. For payments made via bank
                transfer, the refund will be credited to the original bank account from which the
                payment was made.
              </p>
            </Section>

            <Section title="Non-Refundable Services">
              <p>
                The following are non-refundable:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Fees paid to universities, embassies, or other third parties on your behalf, such
                  as application fees, visa fees, or test registration fees.
                </li>
                <li>
                  Processing or administrative charges incurred by us on your behalf.
                </li>
                <li>
                  Services that have already been completed or substantially delivered at the time of
                  the refund request.
                </li>
              </ul>
            </Section>

            <Section title="Changes to the Refund Policy">
              <p>
                We may update this Refund Policy from time to time. Any changes will be posted on
                this page with an updated &quot;last updated&quot; date. Your continued use of our
                services after changes are posted constitutes your acceptance of the revised Refund
                Policy.
              </p>
            </Section>

            <ContactUs />
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
