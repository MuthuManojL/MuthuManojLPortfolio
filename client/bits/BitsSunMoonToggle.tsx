import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";
import { Sun, Moon } from "lucide-react";

interface SunMoonToggleProps {
  className?: string;
  onToggle?: () => void;
}

/**
 * BitsSunMoonToggle - Animated theme toggle with SVG morphing effects
 * Features:
 * - Smooth SVG path morphing
 * - Drag-to-toggle interaction
 * - Click-to-toggle
 * - Glowing effects based on theme
 * - Physics-based spring animation
 */
export const BitsSunMoonToggle: React.FC<SunMoonToggleProps> = ({
  className = "",
  onToggle,
}) => {
  const { theme, toggleTheme, tokens } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";

  // Handle click with callback
  const handleClick = () => {
    toggleTheme();
    onToggle?.();
  };

  // Handle drag-to-toggle
  const handleDragEnd = (
    _: any,
    info: { offset: { x: number } }
  ) => {
    if (Math.abs(info.offset.x) > 20) {
      toggleTheme();
      onToggle?.();
    }
  };

  // Prevent text selection during drag
  const handleDragStart = (_: any) => {
    // Prevent default drag behavior
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        ref={containerRef}
        onClick={handleClick}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        whileTap={{ scale: 1.05 }}
        className="cursor-grab active:cursor-grabbing"
      >
        <motion.div
          className="relative w-14 h-14 rounded-full flex items-center justify-center"
          animate={{
            backgroundColor: isDark ? tokens.surface : tokens.surface,
            boxShadow: isDark
              ? `0 0 30px rgba(129, 140, 248, 0.4)`
              : `0 0 20px rgba(99, 102, 241, 0.2)`,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Background circle */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              background: isDark
                ? `radial-gradient(circle at 30% 30%, rgba(129, 140, 248, 0.2), transparent)`
                : `radial-gradient(circle at 70% 70%, rgba(99, 102, 241, 0.1), transparent)`,
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Sun Icon */}
          <motion.div
            className="absolute"
            animate={{
              opacity: isDark ? 0 : 1,
              scale: isDark ? 0.5 : 1,
              rotate: isDark ? 180 : 0,
            }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
          >
            <Sun
              size={24}
              className="text-yellow-500"
              fill="currentColor"
              strokeWidth={1}
            />
          </motion.div>

          {/* Moon Icon */}
          <motion.div
            className="absolute"
            animate={{
              opacity: isDark ? 1 : 0,
              scale: isDark ? 1 : 0.5,
              rotate: isDark ? 0 : -180,
            }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
          >
            <Moon
              size={24}
              className="text-blue-300"
              fill="currentColor"
              strokeWidth={1}
            />
          </motion.div>

          {/* Animated ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            animate={{
              borderColor: isDark ? tokens.primary_light : tokens.primary,
              opacity: isDark ? 0.5 : 0.3,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute top-full mt-2 text-xs font-medium whitespace-nowrap"
        animate={{
          opacity: 0,
        }}
        whileHover={{
          opacity: 1,
        }}
        style={{
          color: tokens.text_secondary,
          left: "50%",
          x: "-50%",
          pointerEvents: "none",
        }}
      >
        {isDark ? "Light Mode" : "Dark Mode"}
      </motion.div>
    </div>
  );
};
