import { motion } from "framer-motion";
import { Shield, Menu, X, LogIn } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Detect", href: "#detect" },
  { label: "How It Works", href: "#workflow" },
  { label: "Architecture", href: "#architecture" },
  { label: "Documentation", href: "#docs" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              CurrencyGuard<span className="text-primary">.ai</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-md"
              >
                {item.label}
              </a>
            ))}
            <a
              href={user ? "/dashboard" : "/auth"}
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-gold text-primary-foreground text-sm font-semibold hover:shadow-glow transition-all"
            >
              <LogIn className="w-4 h-4" />
              {user ? "Dashboard" : "Sign In"}
            </a>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass border-t border-border"
        >
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href={user ? "/dashboard" : "/auth"}
              className="block px-3 py-2 text-sm text-primary font-medium"
            >
              {user ? "Dashboard" : "Sign In"}
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
