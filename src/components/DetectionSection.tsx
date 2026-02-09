import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, X, ShieldCheck, ShieldAlert, Loader2, RotateCcw } from "lucide-react";
import { useState, useRef, useCallback } from "react";

type Result = {
  status: "genuine" | "counterfeit";
  confidence: number;
  denomination: string;
  features: { name: string; score: number }[];
};

const mockAnalyze = (): Promise<Result> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const isGenuine = Math.random() > 0.3;
      resolve({
        status: isGenuine ? "genuine" : "counterfeit",
        confidence: isGenuine ? 92 + Math.random() * 7 : 65 + Math.random() * 20,
        denomination: ["Rs. 100", "Rs. 500", "Rs. 1000", "Rs. 5000"][Math.floor(Math.random() * 4)],
        features: [
          { name: "Watermark", score: isGenuine ? 95 + Math.random() * 5 : 40 + Math.random() * 30 },
          { name: "Security Thread", score: isGenuine ? 90 + Math.random() * 10 : 30 + Math.random() * 40 },
          { name: "Micro-text", score: isGenuine ? 88 + Math.random() * 12 : 20 + Math.random() * 50 },
          { name: "Texture Pattern", score: isGenuine ? 92 + Math.random() * 8 : 45 + Math.random() * 30 },
        ],
      });
    }, 2500);
  });

const DetectionSection = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const analyze = async () => {
    setAnalyzing(true);
    const res = await mockAnalyze();
    setResult(res);
    setAnalyzing(false);
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <section id="detect" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Currency <span className="text-gradient-gold">Detection</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Upload or capture a photo of a Sri Lankan banknote to verify its authenticity instantly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="relative rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-card transition-colors overflow-hidden"
              style={{ minHeight: 360 }}
            >
              {image ? (
                <div className="relative h-full">
                  <img src={image} alt="Currency" className="w-full h-full object-contain p-4" style={{ minHeight: 360 }} />
                  {analyzing && (
                    <div className="absolute inset-0 bg-background/60 flex flex-col items-center justify-center">
                      <div className="relative w-full h-full">
                        <div className="absolute inset-x-4 top-0 h-1 bg-primary/40 rounded-full overflow-hidden">
                          <div className="h-full w-1/3 bg-gradient-gold animate-scan" />
                        </div>
                      </div>
                      <Loader2 className="w-10 h-10 text-primary animate-spin" />
                      <p className="text-sm text-primary mt-3 font-medium">Analyzing security features…</p>
                    </div>
                  )}
                  {!analyzing && (
                    <button
                      onClick={reset}
                      className="absolute top-3 right-3 p-2 rounded-lg bg-card/80 hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-full cursor-pointer p-10" style={{ minHeight: 360 }}>
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                    <Upload className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-foreground font-medium mb-1">Drop your currency image here</p>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                  <div className="flex gap-3">
                    <span className="px-3 py-1.5 text-xs rounded-lg bg-secondary text-secondary-foreground">JPG</span>
                    <span className="px-3 py-1.5 text-xs rounded-lg bg-secondary text-secondary-foreground">PNG</span>
                    <span className="px-3 py-1.5 text-xs rounded-lg bg-secondary text-secondary-foreground">WEBP</span>
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  />
                </label>
              )}
            </div>

            {image && !analyzing && !result && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 mt-4">
                <button
                  onClick={analyze}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:shadow-glow transition-all"
                >
                  <Scan className="w-5 h-5" />
                  Analyze Note
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl bg-card border border-border p-6 space-y-6"
                >
                  {/* Status Badge */}
                  <div className={`flex items-center gap-3 p-4 rounded-xl ${
                    result.status === "genuine"
                      ? "bg-success/10 border border-success/30"
                      : "bg-destructive/10 border border-destructive/30"
                  }`}>
                    {result.status === "genuine" ? (
                      <ShieldCheck className="w-8 h-8 text-success" />
                    ) : (
                      <ShieldAlert className="w-8 h-8 text-destructive" />
                    )}
                    <div>
                      <p className={`text-lg font-bold ${result.status === "genuine" ? "text-success" : "text-destructive"}`}>
                        {result.status === "genuine" ? "GENUINE" : "COUNTERFEIT"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {result.denomination} • {result.confidence.toFixed(1)}% confidence
                      </p>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Overall Confidence</span>
                      <span className="font-mono font-semibold text-foreground">{result.confidence.toFixed(1)}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          result.status === "genuine" ? "bg-gradient-genuine" : "bg-gradient-counterfeit"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Feature Breakdown */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Security Feature Analysis</h4>
                    <div className="space-y-3">
                      {result.features.map((f, i) => (
                        <motion.div
                          key={f.name}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                        >
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">{f.name}</span>
                            <span className="font-mono text-foreground">{f.score.toFixed(0)}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${f.score}%` }}
                              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                              className={`h-full rounded-full ${
                                f.score > 70 ? "bg-success" : f.score > 40 ? "bg-primary" : "bg-destructive"
                              }`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={reset}
                    className="w-full py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors text-sm font-medium"
                  >
                    Scan Another Note
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl bg-card border border-border p-8 flex flex-col items-center justify-center text-center"
                  style={{ minHeight: 360 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                    <ShieldCheck className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Results Will Appear Here</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Upload a currency image and click "Analyze" to see the AI-powered authenticity report.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Need Scan icon import
import { Scan } from "lucide-react";

export default DetectionSection;
