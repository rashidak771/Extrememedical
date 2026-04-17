import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Truck, GraduationCap, ClipboardList, Headphones, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { services } from "@/data/site";

const icons = [ClipboardList, Wrench, Headphones, GraduationCap, Building2, Truck];

const Services = () => (
  <>
    <PageHeader
      eyebrow="Our Services"
      title="End-to-end support — from procurement to long-term care."
      description="A complete service ecosystem so your laboratory runs smoothly long after the equipment is delivered."
      crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
    />

    <section className="py-20">
      <div className="container mx-auto container-px grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {services.map((s, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={s.title} className="group rounded-2xl border bg-card p-8 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div className="h-14 w-14 rounded-xl bg-gradient-brand flex items-center justify-center shadow-soft">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xs font-mono text-accent">0{i + 1}</span>
              </div>
              <h3 className="font-display font-semibold text-xl text-primary">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          );
        })}
      </div>
    </section>

    <section className="py-20 bg-gradient-soft">
      <div className="container mx-auto container-px">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">How we work</div>
          <h2 className="font-display text-4xl font-bold text-primary">A simple, transparent process</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Consult", text: "We listen to your needs and constraints." },
            { step: "02", title: "Propose", text: "Tailored quotation with options and timelines." },
            { step: "03", title: "Deliver", text: "Logistics, installation and commissioning." },
            { step: "04", title: "Support", text: "Training, maintenance and ongoing care." },
          ].map((p) => (
            <div key={p.step} className="relative rounded-2xl bg-card border p-7 shadow-soft">
              <div className="text-5xl font-display font-bold text-accent/30">{p.step}</div>
              <h3 className="mt-2 font-display font-semibold text-lg text-primary">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto container-px">
        <div className="rounded-3xl bg-gradient-brand text-primary-foreground p-12 text-center shadow-elegant">
          <h2 className="font-display text-3xl lg:text-4xl font-bold">Let's discuss your project</h2>
          <p className="mt-3 text-primary-foreground/80">From a single instrument to a full lab build-out — we're ready.</p>
          <Button asChild variant="coral" size="lg" className="mt-8 h-12 px-8">
            <Link to="/contact">Start a conversation <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  </>
);

export default Services;
