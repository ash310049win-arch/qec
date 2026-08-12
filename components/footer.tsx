import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  explore: [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Our Services" },
    { href: "/destinations", label: "Destinations" },
    { href: "/career-matcher", label: "Course Finder" },
    { href: "/success-stories", label: "Success Stories" },
  ],
  resources: [
    { href: "/resources", label: "Blog & Guides" },
    { href: "/contact", label: "Contact Us" },
    { href: "/resources", label: "Visa Checklist" },
    { href: "/resources", label: "Scholarship Tips" },
  ],
}

export function Footer() {
  return (
    <footer className="footer-pattern bg-[#1A1A1A] text-white">
      {/* Floating decorative shapes */}
      <div className="pointer-events-none absolute top-12 left-10 h-2 w-2 rounded-full bg-primary/20 animate-float-gentle" aria-hidden="true" />
      <div className="pointer-events-none absolute top-24 right-16 h-1.5 w-8 rounded-full bg-primary/10 animate-drift-x" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-20 left-1/4 h-3 w-3 rotate-45 bg-white/5 animate-float-slow" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-1.5">
              <Image
                src="/images/qec-logo.png"
                alt="Quilon Educational Consultancy"
                width={288}
                height={98}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Guiding students toward their global education dreams with personalized counseling,
              visa support, and expert guidance.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/40">
              Explore
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/40">
              Resources
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/40">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-white/60">
                  +91 94977 71392
                  <br />
                  +91 92077 74401
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-white/60">info@quilonconsultancy.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-white/60">
                  Opp. Swayamvara Silks, Pulamon Junction,
                  <br />
                  Kottarakara, Kollam, Kerala - 691531
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Quilon Educational Consultancy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-xs text-white/40 hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-xs text-white/40 hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
