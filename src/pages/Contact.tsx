import { useState } from "react";
import { Mail, Phone, MapPin, Printer, Send, Clock, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { company, categories } from "@/data/site";
import { contactFieldOrder, contactSchema } from "../../shared/contactSchema.js";

const initialErrors = {
  name: "",
  company: "",
  email: "",
  phone: "",
  interest: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const [statusMessage, setStatusMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    const parsed = contactSchema.safeParse(payload);

    setDone(false);
    setStatusMessage("");

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const nextErrors = { ...initialErrors };

      for (const key of contactFieldOrder) {
        nextErrors[key as keyof typeof initialErrors] = fieldErrors[key]?.[0] || "";
      }

      setErrors(nextErrors);
      setStatusMessage("Please correct the highlighted fields and try again.");
      toast.error("Please correct the highlighted fields and try again.");
      return;
    }

    setErrors(initialErrors);
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (result.details && typeof result.details === "object") {
          const nextErrors = { ...initialErrors };

          for (const key of contactFieldOrder) {
            nextErrors[key as keyof typeof initialErrors] = result.details[key]?.[0] || "";
          }

          setErrors(nextErrors);
        }

        throw new Error(typeof result.error === "string" ? result.error : "Unable to send your enquiry.");
      }

      setDone(true);
      setStatusMessage("Thanks. Your enquiry has been sent successfully.");
      toast.success("Thanks! Your enquiry has been sent successfully.");
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send your enquiry.";
      setStatusMessage(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const describeField = (field: keyof typeof initialErrors) => (errors[field] ? `${field}-error` : undefined);

  return (
    <>
      <Seo
        title={`Contact ${company.short} | Medical Enquiries and Quotes`}
        description="Send an enquiry to Extreme Medical Solution for quotes, product recommendations, and healthcare equipment support in Qatar."
        path="/contact"
      />

      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your equipment needs."
        description="Send us a message, call directly, or stop by - our team in Doha is ready to help."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <section className="py-20">
        <div className="container mx-auto container-px grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-card border shadow-soft p-8 lg:p-10">
              <h2 className="font-display text-2xl font-bold text-primary">Send us a message</h2>
              <p className="text-muted-foreground text-sm mt-1">We respond within one business day.</p>
              <p aria-live="polite" className="mt-4 text-sm text-muted-foreground min-h-5">
                {statusMessage}
              </p>

              <form onSubmit={onSubmit} className="mt-6 grid sm:grid-cols-2 gap-5" noValidate>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="space-y-2">
                  <Label htmlFor="name">Full name *</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Dr. Ahmed Al-Sulaiti"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describeField("name")}
                  />
                  {errors.name && <p id="name-error" className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company / Facility</Label>
                  <Input
                    id="company"
                    name="company"
                    maxLength={120}
                    autoComplete="organization"
                    placeholder="Hamad Medical Corporation"
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={describeField("company")}
                  />
                  {errors.company && <p id="company-error" className="text-sm text-destructive">{errors.company}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    placeholder="you@hospital.qa"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describeField("email")}
                  />
                  {errors.email && <p id="email-error" className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength={40}
                    autoComplete="tel"
                    placeholder="+974 ..."
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={describeField("phone")}
                  />
                  {errors.phone && <p id="phone-error" className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="interest">Product Category</Label>
                  <select
                    id="interest"
                    name="interest"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    defaultValue=""
                    aria-invalid={Boolean(errors.interest)}
                    aria-describedby={describeField("interest")}
                  >
                    <option value="">Select a category...</option>
                    {categories.map((category) => (
                      <option key={category.slug} value={category.title}>
                        {category.title}
                      </option>
                    ))}
                    <option value="Other">Other / General enquiry</option>
                  </select>
                  {errors.interest && <p id="interest-error" className="text-sm text-destructive">{errors.interest}</p>}
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    minLength={3}
                    maxLength={150}
                    placeholder="Quote request for centrifuges"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={describeField("subject")}
                  />
                  {errors.subject && <p id="subject-error" className="text-sm text-destructive">{errors.subject}</p>}
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    minLength={10}
                    maxLength={3000}
                    placeholder="Tell us a bit about your requirements..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={describeField("message")}
                  />
                  {errors.message && <p id="message-error" className="text-sm text-destructive">{errors.message}</p>}
                </div>

                <div className="sm:col-span-2 flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-xs text-muted-foreground">
                    By submitting, you agree to our team contacting you regarding this enquiry.
                  </p>
                  <Button type="submit" variant="coral" size="lg" disabled={submitting} aria-busy={submitting}>
                    {done ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" /> Sent
                      </>
                    ) : (
                      <>
                        {submitting ? "Sending..." : "Send Enquiry"} <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl bg-gradient-brand text-primary-foreground p-8 shadow-elegant">
              <h3 className="font-display text-xl font-semibold">Reach us directly</h3>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/60 text-xs uppercase tracking-widest">Office</div>
                    <div className="mt-0.5">{company.location}</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/60 text-xs uppercase tracking-widest">Phone</div>
                    <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="mt-0.5 block hover:text-accent transition">
                      {company.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <Printer className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/60 text-xs uppercase tracking-widest">Fax</div>
                    <div className="mt-0.5">{company.fax}</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/60 text-xs uppercase tracking-widest">Email</div>
                    <a href={`mailto:${company.email}`} className="mt-0.5 block hover:text-accent transition break-all">
                      {company.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/60 text-xs uppercase tracking-widest">Hours</div>
                    <div className="mt-0.5">{company.hours}</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl overflow-hidden border shadow-soft h-72">
              <iframe
                title="Map showing Doha, Qatar"
                src="https://www.google.com/maps?q=Doha%2C%20Qatar&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
