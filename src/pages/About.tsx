import { Link } from "react-router-dom";
import { Target, Eye, Heart, Award, Users, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { company, stats } from "@/data/site";
import dohaImg from "@/assets/doha.jpg";
import labImg from "@/assets/cat-lab.jpg";

const values = [
  { Icon: Award, title: "Quality First", text: "Only internationally certified products from trusted manufacturers." },
  { Icon: Users, title: "Customer Focus", text: "Tailored solutions that match each client's exact workflow needs." },
  { Icon: Heart, title: "Healthcare Impact", text: "Every product we supply contributes to better patient outcomes." },
  { Icon: Globe, title: "Global Sourcing", text: "Worldwide supplier network with strong local presence in Doha." },
];

const About = () => (
  <>
    <PageHeader
      eyebrow="About Extreme Medical"
      title="A trusted name in Qatar's medical & laboratory supply since 2015."
      description="We support healthcare facilities, research institutions and diagnostic laboratories with reliable, efficient and innovative equipment solutions."
      crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
    />

    <section className="py-24">
      <div className="container mx-auto container-px grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Our story</div>
          <h2 className="font-display text-4xl font-bold text-primary leading-tight">Built on reliability, driven by precision.</h2>
          <div className="mt-6 space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>
              Founded in {company.founded}, Extreme Medical Solution emerged from a simple
              conviction: Qatar's healthcare professionals deserve a supplier that understands their
              workflow, respects their time and stands behind every product.
            </p>
            <p>
              Today we work with hospitals, polyclinics, university and research labs, food &
              water testing authorities and veterinary practices — bringing the same standard of
              care and precision to every order.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-5 shadow-soft">
                <div className="text-3xl font-display font-bold text-accent">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img src={labImg} alt="Laboratory equipment" loading="lazy" width={1024} height={768} className="rounded-2xl shadow-elegant w-full" />
          <div className="absolute -bottom-6 -right-6 bg-gradient-brand text-primary-foreground p-6 rounded-xl shadow-elegant max-w-[240px]">
            <Heart className="h-6 w-6 text-accent mb-2" />
            <p className="text-sm">Supporting Qatar's vision for world-class healthcare delivery.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-gradient-soft">
      <div className="container mx-auto container-px grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl bg-card border p-10 shadow-soft">
          <Target className="h-10 w-10 text-accent" />
          <h3 className="mt-5 font-display text-2xl font-bold text-primary">Our Mission</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            To provide top-of-the-range medical and laboratory equipment that enhances healthcare
            delivery, research accuracy, and laboratory efficiency.
          </p>
        </div>
        <div className="rounded-2xl bg-gradient-brand text-primary-foreground p-10 shadow-elegant">
          <Eye className="h-10 w-10 text-accent" />
          <h3 className="mt-5 font-display text-2xl font-bold">Our Vision</h3>
          <p className="mt-3 text-primary-foreground/85 leading-relaxed">
            To become a leading medical and laboratory equipment supplier recognized for quality,
            reliability, and customer satisfaction.
          </p>
        </div>
      </div>
    </section>

    <section className="py-24">
      <div className="container mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Our Values</div>
          <h2 className="font-display text-4xl font-bold text-primary">What we stand for</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ Icon, title, text }) => (
            <div key={title} className="rounded-xl border bg-card p-7 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-accent-soft flex items-center justify-center mb-5">
                <Icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-lg text-primary">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto container-px">
        <div className="rounded-3xl bg-primary text-primary-foreground p-12 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold">Partner with us</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            Discover how we can support your laboratory or healthcare facility.
          </p>
          <Button asChild variant="coral" size="lg" className="mt-8 h-12 px-8">
            <Link to="/contact">Contact our team <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  </>
);

export default About;
