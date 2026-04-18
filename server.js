import "dotenv/config";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import { contactSchema } from "./shared/contactSchema.js";

const app = express();
const port = Number(process.env.PORT || 3001);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const assetsDir = path.join(distDir, "assets");

app.disable("x-powered-by");
app.set("trust proxy", 1);

const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = new Set(
  [
    process.env.APP_ORIGIN,
    "http://127.0.0.1:8080",
    "http://localhost:8080",
    "http://127.0.0.1:4173",
    "http://localhost:4173",
  ].filter(Boolean),
);

const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];

const getMissingEnvVars = () => requiredEnvVars.filter((name) => !process.env[name]);

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const resolveCorsOrigin = (origin, callback) => {
  if (!origin || allowedOrigins.has(origin)) {
    callback(null, true);
    return;
  }

  callback(new Error("CORS origin not allowed."));
};

const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many enquiries from this connection. Please wait a few minutes and try again.",
  },
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const contentSecurityPolicyDirectives = {
  defaultSrc: ["'self'"],
  baseUri: ["'self'"],
  connectSrc: ["'self'"],
  fontSrc: ["'self'", "data:"],
  frameAncestors: ["'none'"],
  frameSrc: ["'self'", "https://www.google.com"],
  imgSrc: ["'self'", "data:", "https:"],
  objectSrc: ["'none'"],
  scriptSrc: ["'self'", "'unsafe-inline'"],
  styleSrc: ["'self'", "'unsafe-inline'"],
};

if (isProduction) {
  contentSecurityPolicyDirectives.upgradeInsecureRequests = [];
}

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: contentSecurityPolicyDirectives,
    },
    referrerPolicy: {
      policy: "strict-origin-when-cross-origin",
    },
  }),
);

app.use("/api", cors({ origin: resolveCorsOrigin, methods: ["POST", "OPTIONS"] }));
app.use("/api", express.json({ limit: "10kb" }));

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.post("/api/contact", contactRateLimit, async (req, res) => {
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
});

app.use(
  "/assets",
  express.static(assetsDir, {
    immutable: true,
    index: false,
    maxAge: "1y",
  }),
);

app.use(
  express.static(distDir, {
    index: false,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      }
    },
  }),
);

app.get(/^(?!\/api\/).*/, (_req, res) => {
  return res.sendFile(path.join(distDir, "index.html"));
});

app.use((error, _req, res, _next) => {
  console.error("Unhandled server error", error);
  res.status(500).json({ error: "Unexpected server error." });
});

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);

  if (getMissingEnvVars().length === 0) {
    try {
      await transporter.verify();
      console.log("SMTP connection verified.");
    } catch (error) {
      console.error("SMTP verification failed.", error);
    }
  }
});
