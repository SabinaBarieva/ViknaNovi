import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, phone } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "badalova.s@gmail.com", // временно
      subject: "Новая заявка на замер",
      html: `
        <h3>Новая заявка:</h3>
        <p><b>Имя:</b> ${name}</p>
        <p><b>Телефон:</b> ${phone}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("MAIL ERROR:", error);
    return NextResponse.json({ error: "Email error" }, { status: 500 });
  }
}
