import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

export const Logo = ({ variant = "default" }: { variant?: "default" | "light" }) => (
  <Link to="/" className="flex items-center gap-3 group" aria-label="Extreme Medical Solution - Home">
    <img
      src={logo}
      alt="Extreme Medical Solution logo"
      className="h-12 sm:h-14 w-auto max-w-[180px] object-contain rounded-md bg-white/95 p-1 ring-1 ring-primary/10 shadow-sm group-hover:ring-accent/40 transition-all"
      width={180}
      height={56}
    />
    <div className="leading-tight">
      <div className={`font-display font-bold text-base ${variant === "light" ? "text-primary-foreground" : "text-primary"}`}>
        EXTREME
      </div>
      <div className={`text-[10px] font-semibold tracking-widest ${variant === "light" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        MEDICAL | QATAR
      </div>
    </div>
  </Link>
);
