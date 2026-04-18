import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: { label: string; to?: string }[];
}

export const PageHeader = ({ eyebrow, title, description, crumbs }: Props) => (
  <section className="relative overflow-hidden bg-gradient-brand text-primary-foreground">
    <div className="absolute inset-0 opacity-20">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />
      <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-primary-glow/40 blur-3xl" />
    </div>
    <div className="relative container mx-auto container-px py-20 lg:py-28">
      {eyebrow && (
        <div className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
          {eyebrow}
        </div>
      )}
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl">{title}</h1>
      {description && (
        <p className="mt-5 text-lg text-primary-foreground/80 max-w-2xl">{description}</p>
      )}
      {crumbs && (
        <nav aria-label="Breadcrumb" className="mt-8 flex items-center gap-1.5 text-sm text-primary-foreground/70">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {c.to ? (
                <Link to={c.to} className="hover:text-accent transition">{c.label}</Link>
              ) : (
                <span className="text-accent">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
            </span>
          ))}
        </nav>
      )}
    </div>
  </section>
);
