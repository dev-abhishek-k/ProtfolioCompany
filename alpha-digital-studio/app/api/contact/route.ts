import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(254),
  project: z.string().trim().min(2).max(80),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(200).optional().default(""),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ message: "Please enter a valid message." }, { status: 400 }); }
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Please check the form fields and try again." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ message: "Thanks — your message is on its way." });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return NextResponse.json({ message: "The form is not configured yet. Please use the email link instead." }, { status: 503 });
  }

  const { name, email, project, message } = parsed.data;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Alpha inquiry: ${project}`,
        text: `Name: ${name}\nEmail: ${email}\nProject: ${project}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return NextResponse.json({ message: "The message could not be delivered. Please email us directly." }, { status: 502 });
    return NextResponse.json({ message: "Message sent." });
  } catch {
    return NextResponse.json({ message: "The service is temporarily unavailable. Please email us directly." }, { status: 502 });
  }
}
