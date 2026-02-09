import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Shield, LogOut, Scan, History, ShieldCheck, ShieldAlert,
  TrendingUp, Upload, X, Loader2, ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ScanRecord = {
  _id: string;
  result: string;
  confidence: number;
  denomination: string | null;
  features: any;
  createdAt: string;
};

type AnalysisResult = {
  status: "genuine" | "counterfeit";
  confidence: number;
  denomination: string;
  features: { name: string; score: number }[];
};

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<"scan" | "history">("scan");
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/history', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setScans(data);
      }
    } catch (err) {
      console.error('Failed to fetch scans:', err);
      toast({ title: "Error", description: "Failed to load scan history", variant: "destructive" });
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Error", description: "Please select an image file", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    if (!image) return;
    setAnalyzing(true);
    try {
      const formData = new FormData();
      const blob = await fetch(image).then(r => r.blob());
      formData.append('image', blob, 'note.jpg');

      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/scan', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Analysis failed');
      }

      const result = await res.json();
      setResult(result);
      toast({ title: "Success", description: `Currency detected: ${result.status}` });
      await fetchScans();
    } catch (err) {
      console.error('Analysis error:', err);
      toast({ title: "Error", description: "Failed to analyze image", variant: "destructive" });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const totalScans = scans.length;
  const genuineCount = scans.filter((s) => s.result === "genuine").length;
  const counterfeitCount = scans.filter((s) => s.result === "counterfeit").length;
  const avgConfidence = totalScans > 0
    ? (scans.reduce((a, b) => a + Number(b.confidence), 0) / totalScans).toFixed(1)
    : "0.0";

  const stats = [
    { icon: Scan, label: "Total Scans", value: totalScans, color: "text-primary" },
    { icon: ShieldCheck, label: "Genuine", value: genuineCount, color: "text-success" },
    { icon: ShieldAlert, label: "Counterfeit", value: counterfeitCount, color: "text-destructive" },
    { icon: TrendingUp, label: "Avg Confidence", value: `${avgConfidence}%`, color: "text-primary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-base font-bold text-foreground">
              CurrencyGuard<span className="text-primary">.ai</span>
            </span>
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, <span className="text-gradient-gold">{user?.fullName || "User"}</span>
          </h1>
          <p className="text-muted-foreground mt-1">Scan currency notes and track your detection history.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-card border border-border p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl bg-secondary inline-flex">
          {[
            { key: "scan" as const, icon: Scan, label: "New Scan" },
            { key: "history" as const, icon: History, label: "History" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "scan" && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }}
                className="rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-card transition-colors overflow-hidden"
                style={{ minHeight: 340 }}
              >
                {image ? (
                  <div className="relative" style={{ minHeight: 340 }}>
                    <img src={image} alt="Currency" className="w-full h-full object-contain p-4" style={{ minHeight: 340 }} />
                    {analyzing && (
                      <div className="absolute inset-0 bg-background/60 flex flex-col items-center justify-center">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        <p className="text-sm text-primary mt-3 font-medium">Analyzing…</p>
                      </div>
                    )}
                    {!analyzing && (
                      <button onClick={() => { setImage(null); setResult(null); }} className="absolute top-3 right-3 p-2 rounded-lg bg-card/80 hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer p-10" style={{ minHeight: 340 }}>
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-foreground font-medium mb-1">Drop currency image here</p>
                    <p className="text-sm text-muted-foreground">or click to browse</p>
                    <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                  </label>
                )}
              </div>
              {image && !analyzing && !result && (
                <button onClick={analyze} className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:shadow-glow transition-all">
                  <Scan className="w-5 h-5" />
                  Analyze Note
                </button>
              )}
            </motion.div>

            {/* Result */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {result ? (
                <div className="rounded-2xl bg-card border border-border p-6 space-y-5">
                  <div className={`flex items-center gap-3 p-4 rounded-xl ${
                    result.status === "genuine" ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"
                  }`}>
                    {result.status === "genuine" ? <ShieldCheck className="w-8 h-8 text-success" /> : <ShieldAlert className="w-8 h-8 text-destructive" />}
                    <div>
                      <p className={`text-lg font-bold ${result.status === "genuine" ? "text-success" : "text-destructive"}`}>
                        {result.status === "genuine" ? "GENUINE" : "COUNTERFEIT"}
                      </p>
                      <p className="text-sm text-muted-foreground">{result.denomination} • {result.confidence.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="font-mono font-semibold text-foreground">{result.confidence.toFixed(1)}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-secondary overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${result.confidence}%` }} transition={{ duration: 1 }}
                        className={`h-full rounded-full ${result.status === "genuine" ? "bg-success" : "bg-destructive"}`} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {result.features.map((f, i) => (
                      <div key={f.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">{f.name}</span>
                          <span className="font-mono text-foreground">{f.score.toFixed(0)}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${f.score}%` }} transition={{ duration: 0.8, delay: 0.1 * i }}
                            className={`h-full rounded-full ${f.score > 70 ? "bg-success" : f.score > 40 ? "bg-primary" : "bg-destructive"}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { setImage(null); setResult(null); }} className="w-full py-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                    Scan Another
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl bg-card border border-border p-8 flex flex-col items-center justify-center text-center" style={{ minHeight: 340 }}>
                  <ShieldCheck className="w-12 h-12 text-muted-foreground/30 mb-4" />
                  <h3 className="text-base font-semibold text-foreground mb-1">Results Here</h3>
                  <p className="text-sm text-muted-foreground">Upload & analyze to see the report.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {tab === "history" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {scans.length === 0 ? (
              <div className="rounded-2xl bg-card border border-border p-12 text-center">
                <History className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No scans yet. Start by analyzing a currency note.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {scans.map((scan) => (
                  <div key={scan._id} className="rounded-xl bg-card border border-border p-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      scan.result === "genuine" ? "bg-success/10" : "bg-destructive/10"
                    }`}>
                      {scan.result === "genuine" ? (
                        <ShieldCheck className="w-5 h-5 text-success" />
                      ) : (
                        <ShieldAlert className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${scan.result === "genuine" ? "text-success" : "text-destructive"}`}>
                        {scan.result.toUpperCase()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {scan.denomination} • {Number(scan.confidence).toFixed(1)}% • {new Date(scan.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
