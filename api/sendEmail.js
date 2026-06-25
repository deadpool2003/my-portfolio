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

  try{
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Portfolio Message</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; color: #1f2937;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);">
                <!-- Header Accent Line -->
                <tr>
                  <td height="6" style="background: linear-gradient(90deg, #f97316 0%, #fb923c 100%);"></td>
                </tr>
                
                <!-- Main Body -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <!-- Badge -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                      <tr>
                        <td style="background-color: rgba(249, 115, 22, 0.1); border: 1px solid rgba(249, 115, 22, 0.2); border-radius: 9999px; padding: 6px 16px; font-size: 12px; font-weight: 600; color: #ea580c; text-transform: uppercase; letter-spacing: 0.05em;">
                          Contact Form Submission
                        </td>
                      </tr>
                    </table>

                    <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #111827; letter-spacing: -0.025em;">
                      New Message Received
                    </h1>
                    <p style="margin: 0 0 32px 0; font-size: 15px; line-height: 1.5; color: #4b5563;">
                      You have received a new inquiry from the contact form on your portfolio website.
                    </p>

                    <!-- Sender Info Card -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb; margin-bottom: 32px; padding: 20px;">
                      <tr>
                        <td style="padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">
                          <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 4px;">From</span>
                          <span style="font-size: 15px; font-weight: 600; color: #111827;">${name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 12px;">
                          <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 4px;">Email Address</span>
                          <a href="mailto:${email}" style="font-size: 15px; font-weight: 500; color: #ea580c; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                    </table>

                    <!-- Message Body -->
                    <div style="margin-bottom: 12px;">
                      <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 8px;">Message Content</span>
                      <div style="background-color: #fff7ed; border-left: 4px solid #f97316; border-radius: 0 12px 12px 0; padding: 20px; font-size: 15px; line-height: 1.6; color: #374151; white-space: pre-wrap; font-style: italic;">"${message}"</div>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; font-size: 12px; color: #6b7280;">
                      This email was automatically generated and sent from your portfolio website.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const clientHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Me</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; color: #1f2937;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);">
                <!-- Header Accent Line -->
                <tr>
                  <td height="6" style="background: linear-gradient(90deg, #f97316 0%, #fb923c 100%);"></td>
                </tr>
                
                <!-- Main Body -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <!-- Badge -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                      <tr>
                        <td style="background-color: rgba(249, 115, 22, 0.1); border: 1px solid rgba(249, 115, 22, 0.2); border-radius: 9999px; padding: 6px 16px; font-size: 12px; font-weight: 600; color: #ea580c; text-transform: uppercase; letter-spacing: 0.05em;">
                          Message Received
                        </td>
                      </tr>
                    </table>

                    <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #111827; letter-spacing: -0.025em;">
                      Hi ${name},
                    </h1>
                    <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #4b5563;">
                      Thank you for reaching out! I have received your message and will get back to you as soon as possible.
                    </p>

                    <!-- Copy of Message -->
                    <div style="margin-bottom: 24px;">
                      <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 8px;">Here is a copy of your message:</span>
                      <div style="background-color: #f9fafb; border-left: 4px solid #e5e7eb; border-radius: 0 12px 12px 0; padding: 20px; font-size: 15px; line-height: 1.6; color: #4b5563; white-space: pre-wrap; font-style: italic;">"${message}"</div>
                    </div>

                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #111827; font-weight: 600;">
                      Best regards,<br>
                      S Navaneethakrishnan
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; font-size: 12px; color: #6b7280;">
                      This is an automated confirmation email. Please do not reply directly to this message.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await Promise.all([
      transporter.sendMail({
        from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `💼 Portfolio Message: ${name}`,
        text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: htmlContent
      }),
      transporter.sendMail({
        from: `"S Navaneethakrishnan" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Thank you for contacting me, ${name}!`,
        text: `Hi ${name},\n\nThank you for reaching out! I have received your message and will get back to you as soon as possible.\n\nHere is a copy of your message:\n\n"${message}"\n\nBest regards,\nS Navaneethakrishnan`,
        html: clientHtmlContent
      })
    ]);

    res.status(200).send("Email sent");
  } catch (error) {
    res.status(500).send("Error sending email");
  }
}