import nodemailer from "nodemailer";
import { contactSchema } from "../shared/contactSchema.js";

const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];

const getMissingEnvVars = () => requiredEnvVars.filter((name) => !process.env[name]);

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin;
  const allowedOrigins = new Set([process.env.APP_ORIGIN].filter(Boolean));

  if (origin && allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

export default async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const missingEnvVars = getMissingEnvVars();

  if (missingEnvVars.length > 0) {
    return res.status(500).json({
      error: `Mail server is not configured. Missing: ${missingEnvVars.join(", ")}`,
    });
  }

  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Please correct the highlighted fields and try again.",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  const { name, company, email, phone, interest, subject, message, website } = parsed.data;

  if (website) {
    return res.status(200).json({ ok: true });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_TO || "rashid.ak@cornercart.co.in",
      replyTo: email,
      subject: `[Website Enquiry] ${subject}`,
      text: [
        "New website enquiry",
        "",
        `Name: ${name}`,
        `Company / Facility: ${company || "-"}`,
        `Email: ${email}`,
        `Phone: ${phone || "-"}`,
        `Product Category: ${interest || "-"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>New website enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Company / Facility:</strong> ${escapeHtml(company || "-")}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "-")}</p>
        <p><strong>Product Category:</strong> ${escapeHtml(interest || "-")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return res.status(500).json({
      error: "Unable to send your enquiry right now. Please try again shortly.",
    });
  }
}
