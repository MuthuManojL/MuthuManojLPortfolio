import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ResumeViewer from "@/components/Resume/ResumeViewer";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { downloadResumePDF, printResume } from "@/utils/pdfGenerator";
import { cn } from "@/lib/utils";

// Portrait image path
const PORTRAIT_IMAGE = "/WhatsApp Image 2025-12-12 at 02.29.40_7efb6972.jpg";

export default function Resume() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeEnabled = document.documentElement.classList.contains("dark");
    setIsDarkMode(darkModeEnabled);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("min-h-screen", isDarkMode ? "bg-tech-darker" : "bg-slate-50")}>
      {/* Header Section */}
      <div className={cn("border-b", isDarkMode ? "border-white/10" : "border-border")}>
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 items-start">
            {/* Left - Text Content */}
            <div className="md:col-span-3 space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold">Resume</h1>
              <p className="text-foreground/60 max-w-2xl">
                Complete professional resume and qualifications
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button
                  onClick={downloadResumePDF}
                  className="gap-2"
                  size="lg"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button
                  onClick={printResume}
                  variant="outline"
                  className="gap-2"
                  size="lg"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </Button>
              </div>
            </div>

            {/* Right - Portrait */}
            <motion.div
              className="hidden md:flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-32 h-44 rounded-xl overflow-hidden shadow-lg border border-white/20">
                <img
                  src={PORTRAIT_IMAGE}
                  alt="Muthu Manoj L"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="container mx-auto px-4 py-12">
        <ResumeViewer isDarkMode={isDarkMode} />
      </div>

      {/* Footer Action Buttons */}
      <div
        className={cn(
          "border-t sticky bottom-0",
          isDarkMode ? "border-white/10 bg-tech-darker/95" : "border-border bg-white/95"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex justify-center gap-3">
          <Button onClick={downloadResumePDF} className="gap-2">
            <Download className="w-4 h-4" />
            Download as PDF
          </Button>
          <Button onClick={printResume} variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}
