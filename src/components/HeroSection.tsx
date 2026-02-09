import { motion } from "framer-motion";
import { ArrowDown, Scan, ShieldCheck } from "lucide-react";
import heroBg from "@/assets/hero-currency.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(43 80% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(43 80% 55%) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered Currency Verification</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            <span className="text-foreground">Detect </span>
            <span className="text-gradient-gold">Counterfeit</span>
            <br />
            <span className="text-foreground">Sri Lankan Currency</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload a photo of any Sri Lankan banknote and our CNN-powered AI will instantly verify its authenticity with high confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#detect"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-gold text-primary-foreground font-semibold text-base shadow-gold hover:shadow-glow transition-all duration-300 hover:scale-[1.02]"
            >
              <Scan className="w-5 h-5" />
              Scan Currency Now
            </a>
            <a
              href="#workflow"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-base hover:border-primary/50 hover:bg-secondary transition-all duration-300"
            >
              How It Works
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-xl mx-auto"
        >
          {[
            { value: "95%+", label: "Accuracy" },
            { value: "< 2s", label: "Detection" },
            { value: "6", label: "Denominations" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient-gold">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground mx-auto animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
