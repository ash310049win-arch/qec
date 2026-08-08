import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const stringOf = (value: unknown) => (typeof value === "string" ? value.trim() : "")

  const name = stringOf(body.name)
  const email = stringOf(body.email)
  const phone = stringOf(body.phone)
  const message = stringOf(body.message)
  const educationLevel = stringOf(body.educationLevel)
  const country = stringOf(body.country)
  const intake = stringOf(body.intake)

  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      { error: "Name, email, phone, and message are required." },
      { status: 400 }
    )
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const recipient = process.env.CONTACT_EMAIL || smtpUser

  if (!smtpUser || !smtpPass) {
    console.error("Contact API: SMTP_USER or SMTP_PASS is not configured.")
    return NextResponse.json(
      { error: "The email service is not configured yet. Please contact us directly." },
      { status: 500 }
    )
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const subject = `New Consultation Inquiry from ${name}`

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone / WhatsApp: ${phone}`,
    educationLevel ? `Current Education Level: ${educationLevel}` : "",
    country ? `Desired Country: ${country}` : "",
    intake ? `Target Intake: ${intake}` : "",
    "",
    "Message:",
    message,
  ]
    .filter((line) => line !== "")
    .join("\n")

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
      <h2 style="margin: 0 0 16px; color: #1a1a1a;">New Consultation Inquiry</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; color: #1a1a1a; width: 40%; border-bottom: 1px solid #f3f4f6;">Name</td>
          <td style="padding: 8px 12px; color: #4b5563; border-bottom: 1px solid #f3f4f6;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; color: #1a1a1a; border-bottom: 1px solid #f3f4f6;">Email</td>
          <td style="padding: 8px 12px; color: #4b5563; border-bottom: 1px solid #f3f4f6;">${escapeHtml(email)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; color: #1a1a1a; border-bottom: 1px solid #f3f4f6;">Phone / WhatsApp</td>
          <td style="padding: 8px 12px; color: #4b5563; border-bottom: 1px solid #f3f4f6;">${escapeHtml(phone)}</td>
        </tr>
        ${educationLevel ? `<tr><td style="padding: 8px 12px; font-weight: bold; color: #1a1a1a; border-bottom: 1px solid #f3f4f6;">Education Level</td><td style="padding: 8px 12px; color: #4b5563; border-bottom: 1px solid #f3f4f6;">${escapeHtml(educationLevel)}</td></tr>` : ""}
        ${country ? `<tr><td style="padding: 8px 12px; font-weight: bold; color: #1a1a1a; border-bottom: 1px solid #f3f4f6;">Desired Country</td><td style="padding: 8px 12px; color: #4b5563; border-bottom: 1px solid #f3f4f6;">${escapeHtml(country)}</td></tr>` : ""}
        ${intake ? `<tr><td style="padding: 8px 12px; font-weight: bold; color: #1a1a1a; border-bottom: 1px solid #f3f4f6;">Target Intake</td><td style="padding: 8px 12px; color: #4b5563; border-bottom: 1px solid #f3f4f6;">${escapeHtml(intake)}</td></tr>` : ""}
      </table>
      <div style="margin-top: 16px; font-size: 14px; color: #4b5563; line-height: 1.6;">
        <strong style="color: #1a1a1a;">Message:</strong>
        <p style="margin: 8px 0 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"Quilon Educational Consultancy" <${smtpUser}>`,
      to: recipient,
      replyTo: email,
      subject,
      text,
      html,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact API: failed to send email.", error)
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again later." },
      { status: 500 }
    )
  }
}
