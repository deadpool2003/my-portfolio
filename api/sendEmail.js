import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields required");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Message from ${name}`,
      text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    res.status(200).send("Email sent");
  } catch (error) {
    res.status(500).send("Error sending email");
  }
}