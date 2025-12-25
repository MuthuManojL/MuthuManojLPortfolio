import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";

interface BitsRealisticModelProps {
  className?: string;
}

/**
 * BitsRealisticModel - Cursor-reactive biomedical/IoT avatar
 * Replaces old robot with modern, interactive character
 * Features: cursor tracking, breathing, blinking, theme-aware lighting
 */
export const BitsRealisticModel: React.FC<BitsRealisticModelProps> = ({
  className = "",
}) => {
  const { tokens, theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);

  // Cursor tracking with smooth spring physics
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const eyeX = useSpring(cursorX, springConfig);
  const eyeY = useSpring(cursorY, springConfig);

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;

      cursorX.set(deltaX * 20);
      cursorY.set(deltaY * 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const isDark = theme === "dark";

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Main character container */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow aura */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(129, 140, 248, 0.2) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* Character body - biomedical themed */}
        <svg
          viewBox="0 0 200 280"
          className="w-full h-full max-w-sm"
          style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))" }}
        >
          {/* Body */}
          <motion.g
            animate={{
              y: [0, 2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Torso */}
            <rect
              x="60"
              y="100"
              width="80"
              height="100"
              rx="10"
              fill={isDark ? "#818cf8" : "#6366f1"}
              opacity="0.9"
            />
            
            {/* Heart monitor line decoration */}
            <motion.path
              d="M 70 150 L 80 150 L 85 140 L 90 160 L 95 150 L 130 150"
              stroke={isDark ? "#22d3ee" : "#06b6d4"}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* IoT sensor badge */}
            <circle
              cx="100"
              cy="130"
              r="8"
              fill={isDark ? "#c4b5fd" : "#8b5cf6"}
            />
            <motion.circle
              cx="100"
              cy="130"
              r="8"
              fill="none"
              stroke={isDark ? "#c4b5fd" : "#8b5cf6"}
              strokeWidth="1"
              animate={{
                r: [8, 12, 8],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.g>

          {/* Head with cursor tracking */}
          <motion.g style={{ x: eyeX, y: eyeY }}>
            {/* Head */}
            <ellipse
              cx="100"
              cy="70"
              rx="40"
              ry="45"
              fill={isDark ? "#a5b4fc" : "#818cf8"}
              opacity="0.95"
            />

            {/* Eyes */}
            <motion.g
              animate={{
                scaleY: isBlinking ? 0.1 : 1,
              }}
              transition={{ duration: 0.1 }}
            >
              <ellipse
                cx="85"
                cy="65"
                rx="6"
                ry="8"
                fill={isDark ? "#0a0e27" : "#ffffff"}
              />
              <ellipse
                cx="115"
                cy="65"
                rx="6"
                ry="8"
                fill={isDark ? "#0a0e27" : "#ffffff"}
              />
            </motion.g>

            {/* Pupils that follow cursor */}
            <motion.ellipse
              cx="85"
              cy="65"
              rx="3"
              ry="4"
              fill={isDark ? "#22d3ee" : "#06b6d4"}
              style={{ x: eyeX, y: eyeY }}
            />
            <motion.ellipse
              cx="115"
              cy="65"
              rx="3"
              ry="4"
              fill={isDark ? "#22d3ee" : "#06b6d4"}
              style={{ x: eyeX, y: eyeY }}
            />

            {/* Smile */}
            <motion.path
              d="M 85 80 Q 100 88 115 80"
              stroke={isDark ? "#0a0e27" : "#ffffff"}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Arms */}
          <motion.g
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            style={{ originX: "60px", originY: "120px" }}
          >
            <rect
              x="40"
              y="110"
              width="20"
              height="60"
              rx="8"
              fill={isDark ? "#818cf8" : "#6366f1"}
              opacity="0.8"
            />
          </motion.g>

          <motion.g
            animate={{
              rotate: [0, -5, 0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 0.2,
            }}
            style={{ originX: "140px", originY: "120px" }}
          >
            <rect
              x="140"
              y="110"
              width="20"
              height="60"
              rx="8"
              fill={isDark ? "#818cf8" : "#6366f1"}
              opacity="0.8"
            />
          </motion.g>

          {/* Data particles floating around */}
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={i}
              cx={50 + i * 20}
              cy={200}
              r="2"
              fill={isDark ? "#22d3ee" : "#06b6d4"}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Interactive hint */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs opacity-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 1,
        }}
        style={{ color: tokens.text_tertiary }}
      >
        Move your cursor around
      </motion.div>
    </div>
  );
};
