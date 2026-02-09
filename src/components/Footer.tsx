import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10 px-4">
    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-gradient-gold flex items-center justify-center">
          <Shield className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="text-sm font-semibold text-foreground">CurrencyGuard.ai</span>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        EC6301 — AI Mini Project · Dept. of Electrical & Information Engineering · University of Ruhuna · 2025
      </p>
    </div>
  </footer>
);

export default Footer;
