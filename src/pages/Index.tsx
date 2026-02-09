import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DetectionSection from "@/components/DetectionSection";
import WorkflowSection from "@/components/WorkflowSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import DocumentationSection from "@/components/DocumentationSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <HeroSection />
    <DetectionSection />
    <WorkflowSection />
    <ArchitectureSection />
    <DocumentationSection />
    <Footer />
  </div>
);

export default Index;
