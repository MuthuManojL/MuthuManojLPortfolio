import { Mail, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";
import { useState, useEffect } from "react";

// Robot personality messages - randomly shown
const robotMessages = [
  "Hi, I'm Muthu's robot buddy! 🤖",
  "IoT is my passion, innovation is my mission!",
  "Let's build something amazing together! ✨",
  "Biomedical engineering ftw! 💚",
  "Smart glasses? More like smart thinking!",
  "Heart monitoring robots are my jam 💓",
  "Always learning, always growing 📚",
  "Tech + Healthcare = Magic ✨",
  "Wanna see what I can do? Click around! 🎮",
  "I breathe code and dream of circuits 💭",
];

export default function Footer() {
  const { tokens } = useTheme();
  const [message, setMessage] = useState("");
  const [analyticsOptIn, setAnalyticsOptIn] = useState(
    localStorage.getItem("analytics-opt-in") === "true"
  );

  useEffect(() => {
    // Set random robot message on mount
    const randomMessage =
      robotMessages[Math.floor(Math.random() * robotMessages.length)];
    setMessage(randomMessage);
  }, []);

  const toggleAnalytics = () => {
    const newValue = !analyticsOptIn;
    setAnalyticsOptIn(newValue);
    localStorage.setItem("analytics-opt-in", String(newValue));
  };

  return (
    <motion.footer
      className="border-t"
      style={{
        borderColor: tokens.border,
        backgroundColor: tokens.surface_dim,
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Robot Personality Log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3
              className="text-sm font-semibold mb-3"
              style={{ color: tokens.text_secondary }}
            >
              🤖 Robot Says
            </h3>
            <p
              className="text-sm italic min-h-12"
              style={{ color: tokens.text_primary }}
            >
              {message}
            </p>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3
              className="text-sm font-semibold mb-3"
              style={{ color: tokens.text_secondary }}
            >
              Get in Touch
            </h3>
            <div className="flex flex-col gap-2">
              <motion.a
                href="mailto:muthumanoj100@gmail.com"
                className="text-sm transition-colors flex items-center gap-2 group"
                style={{ color: tokens.text_primary }}
                whileHover={{ x: 5, color: tokens.primary }}
              >
                <Mail className="w-4 h-4" />
                Email
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/muthu-manoj-l-90a6b5252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors flex items-center gap-2"
                style={{ color: tokens.text_primary }}
                whileHover={{ x: 5, color: tokens.primary }}
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors flex items-center gap-2"
                style={{ color: tokens.text_primary }}
                whileHover={{ x: 5, color: tokens.primary }}
              >
                <Github className="w-4 h-4" />
                GitHub
              </motion.a>
            </div>
          </motion.div>

          {/* Privacy & Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3
              className="text-sm font-semibold mb-3"
              style={{ color: tokens.text_secondary }}
            >
              Privacy
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsOptIn}
                  onChange={toggleAnalytics}
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <span className="text-sm" style={{ color: tokens.text_primary }}>
                  Anonymous analytics (opt-in)
                </span>
              </label>
              <p className="text-xs" style={{ color: tokens.text_tertiary }}>
                This site respects your privacy. No tracking cookies.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px w-full"
          style={{ backgroundColor: tokens.border }}
        />

        {/* Bottom Info */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm" style={{ color: tokens.text_secondary }}>
            © 2025 Muthu Manoj L. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: tokens.text_tertiary }}>
            Built with{" "}
            <span style={{ color: tokens.primary }}>React</span> +{" "}
            <span style={{ color: tokens.secondary }}>Three.js</span> +{" "}
            <span style={{ color: tokens.accent }}>TailwindCSS</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
