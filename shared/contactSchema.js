import { z } from "zod";

const cleanString = (value) => (typeof value === "string" ? value.trim() : "");

export const contactSchema = z.object({
  name: z.preprocess(
    cleanString,
    z.string().min(2, "Please enter your full name.").max(100, "Name must be 100 characters or fewer."),
  ),
  company: z.preprocess(cleanString, z.string().max(120, "Company name must be 120 characters or fewer.")),
  email: z.preprocess(
    cleanString,
    z.string().email("Please enter a valid email address.").max(200, "Email must be 200 characters or fewer."),
  ),
  phone: z.preprocess(
    cleanString,
    z
      .string()
      .max(40, "Phone number must be 40 characters or fewer.")
      .refine((value) => value === "" || /^[0-9+()\-\s.]*$/.test(value), {
        message: "Phone number can only include digits, spaces, and +()-.",
      }),
  ),
  interest: z.preprocess(cleanString, z.string().max(100, "Category must be 100 characters or fewer.")),
  subject: z.preprocess(
    cleanString,
    z.string().min(3, "Please add a subject.").max(150, "Subject must be 150 characters or fewer."),
  ),
  message: z.preprocess(
    cleanString,
    z.string().min(10, "Please share a little more detail.").max(3000, "Message must be 3000 characters or fewer."),
  ),
  website: z.preprocess(cleanString, z.string().max(0, "Spam check failed.")),
});

export const contactFieldOrder = ["name", "company", "email", "phone", "interest", "subject", "message"];
