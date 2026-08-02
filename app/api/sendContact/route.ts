import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body?.name || "";
    const phone = body?.phone || "";
    const email = body?.email || "";
    const message = body?.message || "";
    const city = body?.city || "";
    const token = body?.token || "";
    const company = body?.company || "";
    const startedAt = body?.startedAt || "";

    if (!name.trim() || !phone.trim()) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (company) {
      return NextResponse.json(
        { error: "Bot detected" },
        { status: 400 }
      );
    }

    if (!startedAt) {
      return NextResponse.json(
        { error: "Missing time token" },
        { status: 400 }
      );
    }

    const timeSpent = Math.abs(Date.now() - Number(startedAt));
    console.log("Время заполнения формы (мс):", timeSpent);

    if (timeSpent === 0) {
      return NextResponse.json(
        { error: "Too fast / Bot action detected" },
        { status: 400 }
      );
    }

    if (!token) {
      return NextResponse.json(
        { error: "Captcha required" },
        { status: 400 }
      );
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET || process.env.NEXT_PUBLIC_TURNSTILE_SECRET;

    const verify = await fetch(
      "https://cloudflare.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${turnstileSecret}&response=${token}`,
      }
    );

    const captcha = await verify.json();

    if (!captcha.success) {
      console.error("КРИТИЧЕСКАЯ ОШИБКА КАПЧИ НА СЕРВЕРЕ (Проверьте ключи в Vercel Settings):", captcha);
      return NextResponse.json(
        { error: "Captcha failed" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "://gmail.com",
      port: 587,
      secure: false, 
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false 
      }
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
  } catch (error: any) {
    console.error("SEND FORM ERROR:", error);
    
    return NextResponse.json(
      { error: "Server error", details: error?.message || String(error) }, 
      { status: 500 }
    );
  }
}
