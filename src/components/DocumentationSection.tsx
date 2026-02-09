import { motion } from "framer-motion";
import { FileText, BookOpen, FlaskConical, BarChart3, Lightbulb, Users } from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "Abstract",
    content:
      "This project presents a web-based system for identifying counterfeit Sri Lankan currency notes using smartphone-captured images and Convolutional Neural Networks (CNNs). The system preprocesses banknote images using OpenCV, extracts security features via a trained CNN model, and classifies notes as genuine or counterfeit with high accuracy. The solution is accessible via a responsive web interface, making it practical for everyday use by the general public, merchants, and financial institutions.",
  },
  {
    icon: BookOpen,
    title: "Problem Statement",
    content:
      "Counterfeit currency poses a significant threat to Sri Lanka's economy. Traditional detection methods — UV lamps, manual inspection — are inaccessible to ordinary citizens and small businesses. Existing image-processing approaches rely on handcrafted features with limited accuracy. This project addresses the gap by leveraging deep learning (CNN) to automatically learn discriminative features from smartphone images, enabling real-time, accessible counterfeit detection.",
  },
  {
    icon: FlaskConical,
    title: "Methodology",
    content:
      "The methodology follows a structured pipeline: (1) Dataset collection of genuine and counterfeit notes across 6 denominations under varied conditions; (2) Image preprocessing including resizing, noise reduction, contrast enhancement via CLAHE, and ROI extraction; (3) CNN model design with multiple convolutional blocks, batch normalization, dropout, and sigmoid output; (4) Training with Adam optimizer, binary cross-entropy loss, data augmentation, and early stopping; (5) Deployment via Flask/FastAPI REST API integrated with a responsive web frontend.",
  },
  {
    icon: BarChart3,
    title: "Expected Outcomes",
    content:
      "The system targets >95% classification accuracy with robust performance across denominations and lighting conditions. Evaluation metrics include accuracy, precision, recall, F1-score, and confusion matrix analysis. Training/validation curves will demonstrate convergence without overfitting. The web interface will provide sub-2-second inference with clear visual feedback including confidence scores and per-feature analysis.",
  },
  {
    icon: Lightbulb,
    title: "Future Work",
    content:
      "Future enhancements include: (1) Transfer learning using pre-trained models (VGG16, ResNet50) for improved accuracy; (2) Multi-class classification to identify specific denominations; (3) Mobile app deployment using TensorFlow Lite; (4) Integration with CBSL (Central Bank of Sri Lanka) databases; (5) Explainable AI (Grad-CAM) for visual feature attribution; (6) Edge deployment for offline usage.",
  },
  {
    icon: Users,
    title: "Team & AI Involvement",
    content:
      "Department of Electrical and Information Engineering, University of Ruhuna. Team: Harshamal W.P.R (EG/2022/5059), Keerthirathna D.G.D.L (EG/2022/5139), Madhumali W.B (EG/2022/5175), Nawarathne D.H.G.J.V (EG/2022/5208). AI involvement in this project exceeds 85%, encompassing image preprocessing, feature extraction, classification, and inference — all powered by CNN-based deep learning.",
  },
];

const DocumentationSection = () => (
  <section id="docs" className="py-24 px-4 bg-card/50">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Project <span className="text-gradient-gold">Documentation</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Academic documentation covering all aspects of the system — ready for submission and viva presentation.
        </p>
      </motion.div>

      <div className="space-y-4">
        {sections.map((s, i) => (
          <motion.details
            key={s.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group rounded-2xl bg-card border border-border overflow-hidden"
          >
            <summary className="flex items-center gap-3 p-5 cursor-pointer hover:bg-secondary/50 transition-colors list-none [&::-webkit-details-marker]:hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center text-primary-foreground shrink-0">
                <s.icon className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-foreground flex-1">{s.title}</h3>
              <span className="text-muted-foreground text-xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="px-5 pb-5 pl-[4.25rem]">
              <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          </motion.details>
        ))}
      </div>
    </div>
  </section>
);

export default DocumentationSection;
