import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, Award, HeartPulse, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-lab.jpg";
import dohaImg from "@/assets/doha.jpg";
import { categories, stats, services, company } from "@/data/site";

const Home = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Modern medical laboratory"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="relative container mx-auto container-px py-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 reveal">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-accent border border-primary-foreground/10 mb-6">
              <Sparkles className="h-3 w-3" />
              Trusted in Qatar since {company.founded}
            </div>
            <h1 className="font-display font-bold text-primary-foreground text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05]">
              Precision Equipment for{" "}
              <span className="text-accent">Modern Healthcare</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed">
              Extreme Medical Solution supplies hospitals, research institutes and diagnostic
              laboratories across Qatar with reliable, internationally-certified medical and
              laboratory equipment.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild variant="coral" size="lg" className="h-12 px-8 text-base">
                <Link to="/products">Explore Products <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outlineLight" size="lg" className="h-12 px-8 text-base">
                <Link to="/contact">Request a Quote</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-primary-foreground/75">
              {["ISO-aligned suppliers", "In-country support", "Fast delivery"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" /> {t}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full" />
              <div className="relative bg-background/95 backdrop-blur rounded-2xl p-8 shadow-elegant border border-primary-foreground/10">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-4xl font-display font-bold text-primary">{s.value}</div>
                      <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="heartbeat-divider my-6" />
                <div className="flex items-center gap-3 text-sm">
                  <HeartPulse className="h-5 w-5 text-accent" />
                  <span className="text-foreground">Supporting Qatar's healthcare ecosystem.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto container-px grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { Icon: ShieldCheck, label: "Quality Guaranteed" },
            { Icon: Award, label: "Certified Partners" },
            { Icon: Truck, label: "Fast Delivery" },
            { Icon: HeartPulse, label: "Healthcare Focus" },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-3">
              <Icon className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-24">
        <div className="container mx-auto container-px grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
              About us
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary leading-tight">
              A decade of supplying excellence to Qatar's healthcare community.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Since 2015, Extreme Medical Solution has been a trusted partner for healthcare facilities,
              research institutions and diagnostic laboratories — delivering products that meet
              international standards for accuracy, safety and performance.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              <div className="rounded-xl border bg-card p-5 shadow-soft">
                <div className="text-xs font-semibold text-accent tracking-widest uppercase mb-2">Our Mission</div>
                <p className="text-sm text-foreground/80">
                  Provide top-of-the-range equipment that enhances healthcare delivery and laboratory efficiency.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5 shadow-soft">
                <div className="text-xs font-semibold text-accent tracking-widest uppercase mb-2">Our Vision</div>
                <p className="text-sm text-foreground/80">
                  To be a leading regional supplier recognized for quality, reliability and customer satisfaction.
                </p>
              </div>
            </div>
            <Button asChild variant="default" size="lg" className="mt-8">
              <Link to="/about">More about us <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-coral opacity-10 blur-3xl rounded-3xl" />
            <img
              src={dohaImg}
              alt="Doha, Qatar skyline"
              loading="lazy"
              width={1600}
              height={900}
              className="relative rounded-2xl shadow-elegant w-full h-auto object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-5 shadow-elegant max-w-[220px] border">
              <div className="text-3xl font-display font-bold text-accent">10+</div>
              <div className="text-sm text-muted-foreground">Years serving healthcare in Qatar</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 bg-gradient-soft">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl mb-14">
            <div className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
              Our Catalog
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary leading-tight">
              Products & Services for every laboratory.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">
              From benchtop instruments to daily-use consumables — sourced from internationally
              certified manufacturers and supported locally.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/products/${c.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-card border shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-primary group-hover:text-accent transition">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.short}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Explore <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24">
        <div className="container mx-auto container-px">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
                What we do
              </div>
              <h2 className="font-display text-4xl font-bold text-primary leading-tight">
                Beyond supply — we partner with you.
              </h2>
              <p className="mt-5 text-muted-foreground">
                We don't just deliver equipment. We help plan, install, train and maintain — so your team can focus on what matters.
              </p>
              <Button asChild variant="default" size="lg" className="mt-7">
                <Link to="/services">All services <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
              {services.slice(0, 4).map((s, i) => (
                <div key={s.title} className="group rounded-xl border bg-card p-6 hover:border-accent/50 hover:shadow-soft transition-all">
                  <div className="text-xs font-mono text-accent mb-3">0{i + 1}</div>
                  <h3 className="font-display font-semibold text-lg text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto container-px">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-10 lg:p-16 shadow-elegant">
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-60 w-60 rounded-full bg-primary-glow/40 blur-3xl" />
            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground leading-tight">
                  Need a quote or product recommendation?
                </h2>
                <p className="mt-4 text-primary-foreground/80 text-lg">
                  Tell us what your lab needs — we'll respond within one business day.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Button asChild variant="coral" size="lg" className="h-12 px-8 text-base">
                  <Link to="/contact">Get in Touch <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outlineLight" size="lg" className="h-12 px-8 text-base">
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`}>Call {company.phone}</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
