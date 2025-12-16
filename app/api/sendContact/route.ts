import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, phone, email, message, city } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const isPromo = Boolean(city); 

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.TO_EMAIL,
      subject: isPromo
        ? "🎁 Промо-заявка с сайта"
        : "📩 Сообщение с формы контактов",
      html: isPromo
        ? `
          <h2>Новая ПРОМО-заявка</h2>
          <p><strong>Город:</strong> ${city}</p>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
        `
        : `
          <h2>Новое сообщение с сайта</h2>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Сообщение:</strong> ${message || "Нет сообщения"}</p>
        `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("SEND FORM ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
