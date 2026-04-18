import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { nav, company } from "@/data/site";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="hidden md:flex bg-primary text-primary-foreground text-xs">
        <div className="container mx-auto container-px flex items-center justify-between py-2">
          <span className="opacity-80">{company.hours}</span>
          <div className="flex items-center gap-5">
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-accent transition">
              <Phone className="h-3 w-3" /> {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="hover:text-accent transition">
              {company.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "bg-background/95 backdrop-blur shadow-soft" : "bg-background"
        )}
      >
        <div className="container mx-auto container-px flex h-20 items-center justify-between">
          <Logo />
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-accent" : "text-foreground hover:text-primary"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 w-6 bg-accent rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Button asChild variant="coral" size="lg">
              <Link to="/contact">Request Quote</Link>
            </Button>
          </div>
          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-controls="mobile-navigation"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div id="mobile-navigation" className="lg:hidden border-t bg-background animate-in fade-in slide-in-from-top-2">
            <nav className="container mx-auto container-px py-4 flex flex-col gap-1">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-3 rounded-md text-base font-medium",
                      isActive ? "bg-accent-soft text-accent" : "text-foreground hover:bg-secondary"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Button asChild variant="coral" className="mt-3" onClick={() => setOpen(false)}>
                <Link to="/contact">Request Quote</Link>
              </Button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
