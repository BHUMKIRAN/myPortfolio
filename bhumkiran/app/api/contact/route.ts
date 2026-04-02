import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // ====== Email to your own inbox ======
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #415440;">New Client Inquiry Received</h2>
        <p>Hello,</p>
        <p>You have received a new message from your website contact form. Details are below:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px; font-weight: bold;">Name:</td>
            <td style="padding: 8px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Phone:</td>
            <td style="padding: 8px;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Subject:</td>
            <td style="padding: 8px;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Message:</td>
            <td style="padding: 8px;">${message}</td>
          </tr>
        </table>
        <p style="margin-top: 20px;">Thank you for visiting our website. We will get back to you shortly!</p>
        <p style="color: #b07818; font-weight: bold;">– Your Company Team</p>
      </div>
    `;

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: `New Client Inquiry: ${name}`,
      html: htmlContent,
    });

    // ====== Auto-reply to the client ======
    const clientHtml = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #415440;">Thank you for reaching out, ${name}!</h2>
        <p>I have received your message and appreciate you contacting me.</p>
        <p><strong>Summary of your submission:</strong></p>
        <ul>
          <li><strong>Subject:</strong> ${subject}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>I will review your message and get back to you as soon as possible.</p>
        <p style="margin-top: 20px; color: #b07818; font-weight: bold;">– Bhum Bikram Silwal</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: `Thank you for contacting us, ${name}!`,
      html: clientHtml,
    });

    return NextResponse.json({ message: "Emails sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Error sending email" }, { status: 500 });
  }
}