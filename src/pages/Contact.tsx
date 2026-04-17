import { useState } from "react";
import { Mail, Phone, MapPin, Printer, Send, Clock, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { company, categories } from "@/data/site";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data.entries());
    setSubmitting(true);

    // Build a mailto so submissions reach the team without backend.
    const subject = encodeURIComponent(`[Website Enquiry] ${payload.subject || "New enquiry"}`);
    const body = encodeURIComponent(
      `Name: ${payload.name}\nCompany: ${payload.company || "-"}\nEmail: ${payload.email}\nPhone: ${payload.phone || "-"}\nInterest: ${payload.interest || "-"}\n\nMessage:\n${payload.message}`
    );
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      toast.success("Thanks! Your email client has opened with your enquiry.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your equipment needs."
        description="Send us a message, call directly, or stop by — our team in Doha is ready to help."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <section className="py-20">
        <div className="container mx-auto container-px grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-card border shadow-soft p-8 lg:p-10">
              <h2 className="font-display text-2xl font-bold text-primary">Send us a message</h2>
              <p className="text-muted-foreground text-sm mt-1">We respond within one business day.</p>

              <form onSubmit={onSubmit} className="mt-8 grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name *</Label>
                  <Input id="name" name="name" required placeholder="Dr. Ahmed Al-Sulaiti" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company / Facility</Label>
                  <Input id="company" name="company" placeholder="Hamad Medical Corporation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required placeholder="you@hospital.qa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+974 ..." />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="interest">Product Category</Label>
                  <select
                    id="interest"
                    name="interest"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    defaultValue=""
                  >
                    <option value="">Select a category…</option>
                    {categories.map((c) => (
                      <option key={c.slug} value={c.title}>{c.title}</option>
                    ))}
                    <option value="Other">Other / General enquiry</option>
                  </select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" name="subject" required placeholder="Quote request for centrifuges" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" name="message" required rows={6} placeholder="Tell us a bit about your requirements…" />
                </div>
                <div className="sm:col-span-2 flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-xs text-muted-foreground">By submitting, you agree to our team contacting you regarding this enquiry.</p>
                  <Button type="submit" variant="coral" size="lg" disabled={submitting}>
                    {done ? <><CheckCircle2 className="h-4 w-4" /> Sent</> : <>{submitting ? "Sending…" : "Send Enquiry"} <Send className="h-4 w-4" /></>}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Info */}
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
                    <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="mt-0.5 block hover:text-accent transition">{company.phone}</a>
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
                    <a href={`mailto:${company.email}`} className="mt-0.5 block hover:text-accent transition break-all">{company.email}</a>
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
                title="Doha, Qatar"
                src="https://www.google.com/maps?q=Doha%2C%20Qatar&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
