import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";

export default function WelcomeMessage() {
  const [show, setShow] = useState(false);
  const { tokens } = useTheme();

  useEffect(() => {
    // Check if user has seen the welcome message
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");
    
    if (!hasSeenWelcome) {
      setShow(true);
      sessionStorage.setItem("hasSeenWelcome", "true");
      
      // Hide after 3 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative max-w-lg w-full"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="px-6 sm:px-8 py-5 sm:py-6 rounded-2xl backdrop-blur-xl border shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${tokens.primary}15, ${tokens.accent}10)`,
                borderColor: tokens.primary,
                boxShadow: `0 0 60px ${tokens.primary}30`,
              }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center"
                style={{
                  background: `linear-gradient(135deg, ${tokens.primary}, ${tokens.accent})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  ease: "linear",
                }}
              >
                Welcome
              </motion.h1>
              <motion.p
                className="text-center mt-2 text-sm sm:text-base font-medium"
                style={{ color: tokens.text_secondary }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                to Muthu Manoj's Portfolio
              </motion.p>
            </motion.div>
            
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `radial-gradient(circle, ${tokens.primary}20 0%, transparent 70%)`,
                filter: "blur(20px)",
                zIndex: -1,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
