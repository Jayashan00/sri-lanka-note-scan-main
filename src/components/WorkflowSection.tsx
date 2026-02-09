import { motion } from "framer-motion";
import { Camera, Cpu, BarChart3, ShieldCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Image Capture",
    desc: "User captures or uploads a smartphone image of a Sri Lankan banknote.",
  },
  {
    icon: Cpu,
    title: "Preprocessing",
    desc: "Image is resized, denoised, contrast-enhanced, and normalized using OpenCV.",
  },
  {
    icon: BarChart3,
    title: "CNN Inference",
    desc: "Deep learning model extracts features — watermarks, threads, micro-text — and classifies.",
  },
  {
    icon: ShieldCheck,
    title: "Result",
    desc: "System displays Genuine or Counterfeit verdict with confidence score and feature breakdown.",
  },
];

const WorkflowSection = () => (
  <section id="workflow" className="py-24 px-4 bg-card/50">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          How It <span className="text-gradient-gold">Works</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          A four-stage pipeline from image capture to authenticity verdict.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative group"
          >
            <div className="rounded-2xl bg-card border border-border p-6 hover:border-primary/40 transition-colors h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center text-primary-foreground shrink-0">
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">STEP {i + 1}</span>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="w-5 h-5 text-primary/40" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WorkflowSection;
