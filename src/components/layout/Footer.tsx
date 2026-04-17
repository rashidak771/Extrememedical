import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Printer } from "lucide-react";
import { Logo } from "./Logo";
import { categories, company, nav } from "@/data/site";

export const Footer = () => (
  <footer className="bg-primary text-primary-foreground mt-24">
    <div className="container mx-auto container-px py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <div className="bg-background/95 inline-block rounded-lg p-3 mb-5">
          <Logo />
        </div>
        <p className="text-sm text-primary-foreground/75 leading-relaxed">
          A trusted Qatari supplier of medical, laboratory and diagnostic equipment since {company.founded}.
        </p>
      </div>

      <div>
        <h4 className="font-display font-semibold mb-4 text-sm tracking-widest uppercase text-accent">Navigate</h4>
        <ul className="space-y-2.5 text-sm">
          {nav.map((n) => (
            <li key={n.to}>
              <Link to={n.to} className="text-primary-foreground/80 hover:text-accent transition">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-display font-semibold mb-4 text-sm tracking-widest uppercase text-accent">Categories</h4>
        <ul className="space-y-2.5 text-sm">
          {categories.slice(0, 5).map((c) => (
            <li key={c.slug}>
              <Link to={`/products/${c.slug}`} className="text-primary-foreground/80 hover:text-accent transition">
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-display font-semibold mb-4 text-sm tracking-widest uppercase text-accent">Get in Touch</h4>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3 text-primary-foreground/85">
            <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
            {company.location}
          </li>
          <li className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-accent shrink-0" />
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="text-primary-foreground/85 hover:text-accent transition">
              {company.phone}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Printer className="h-4 w-4 text-accent shrink-0" />
            <span className="text-primary-foreground/85">{company.fax}</span>
          </li>
          <li className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-accent shrink-0" />
            <a href={`mailto:${company.email}`} className="text-primary-foreground/85 hover:text-accent transition break-all">
              {company.email}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10">
      <div className="container mx-auto container-px py-5 flex flex-col md:flex-row gap-2 items-center justify-between text-xs text-primary-foreground/60">
        <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
        <p>Designed for healthcare excellence in Qatar.</p>
      </div>
    </div>
  </footer>
);
