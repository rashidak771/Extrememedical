import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

export const Logo = ({ variant = "default" }: { variant?: "default" | "light" }) => (
  <Link to="/" className="flex items-center gap-3 group" aria-label="Extreme Medical Solution — Home">
    <img
      src={logo}
      alt="Extreme Medical Solution logo"
      className="h-11 w-11 rounded-full object-cover ring-2 ring-accent/20 group-hover:ring-accent/50 transition-all"
      width={44}
      height={44}
    />
    <div className="leading-tight">
      <div className={`font-display font-bold text-base ${variant === "light" ? "text-primary-foreground" : "text-primary"}`}>
        EXTREME
      </div>
      <div className={`text-[10px] font-semibold tracking-widest ${variant === "light" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        MEDICAL · QATAR
      </div>
    </div>
  </Link>
);
