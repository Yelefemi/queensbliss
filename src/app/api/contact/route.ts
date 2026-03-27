import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: "Queen Bliss <onboarding@resend.dev>",
      to: ["support@queenblisshair.com"], // change later
      subject: "New Contact Message – Queen Bliss",
      replyTo: email,
      html: `
        <h2>New Message from Queen Bliss Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 500 }
    );
  }
}
