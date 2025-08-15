import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: true, // Gmail uses SSL for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    // Mail to you
    await transporter.sendMail({
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO,
      subject: `New Contact Form Submission - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p>${message.replace(/\n/g, "<br>")}</p>`,
    });

    // Mail to client
    await transporter.sendMail({
      from: process.env.CONTACT_FROM,
      to: email,
      subject: "Thanks for contacting me",
      text: `Hi ${name},\n\nThanks for your message! I'll get back to you soon.\n\n– Parth`,
      html: `<p>Hi ${name},</p><p>Thanks for your message! I'll get back to you soon.</p><p>– Parth</p>`,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("Contact API Error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
