import { motion } from "framer-motion";
import { Monitor, Server, Brain, Database, ArrowRight } from "lucide-react";

const layers = [
  {
    icon: Monitor,
    title: "Frontend Layer",
    color: "text-primary",
    items: ["Responsive Web UI", "Image Upload / Camera Capture", "Result Visualization", "Mobile-First Design"],
  },
  {
    icon: Server,
    title: "Backend Layer",
    color: "text-primary",
    items: ["REST API (Flask/FastAPI)", "Image Preprocessing Pipeline", "Request Validation", "JSON Response Handling"],
  },
  {
    icon: Brain,
    title: "AI / ML Layer",
    color: "text-primary",
    items: ["CNN Binary Classifier", "TensorFlow / Keras Model", "Feature Extraction Engine", "Confidence Scoring"],
  },
  {
    icon: Database,
    title: "Data Layer",
    color: "text-primary",
    items: ["Training Dataset (6 denominations)", "Augmented Image Store", "Model Weights (.h5)", "Performance Logs"],
  },
];

const ArchitectureSection = () => (
  <section id="architecture" className="py-24 px-4">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          System <span className="text-gradient-gold">Architecture</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          A layered architecture designed for modularity, scalability, and academic rigor.
        </p>
      </motion.div>

      <div className="space-y-4">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.title}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-card border border-border p-6 hover:border-primary/30 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 sm:w-56 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center text-primary-foreground">
                  <layer.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground">{layer.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-xs rounded-lg bg-secondary text-secondary-foreground font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Data Flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 rounded-2xl bg-card border border-border p-6"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Data Flow</h3>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {["User Image", "REST API", "OpenCV Preprocessing", "CNN Model", "Prediction", "JSON Response", "UI Display"].map(
            (step, i, arr) => (
              <span key={step} className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground font-mono text-xs">
                  {step}
                </span>
                {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-primary/50" />}
              </span>
            )
          )}
        </div>
      </motion.div>
    </div>
  </section>
);

export default ArchitectureSection;
