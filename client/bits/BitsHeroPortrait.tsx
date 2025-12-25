import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";

interface BitsHeroPortraitProps {
  src: string;
  alt: string;
  variant?: "compact" | "large";
}

export const BitsHeroPortrait: React.FC<BitsHeroPortraitProps> = ({
  src,
  alt,
  variant = "large",
}) => {
  const { tokens, theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !isHovered) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x: x * 8, y: y * 8 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered]);

  if (variant === "compact") {
    return (
      <motion.div
        className="w-full max-w-xs mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="rounded-2xl overflow-hidden aspect-square relative"
          style={{
            boxShadow: `0 12px 48px ${tokens.primary}20`,
          }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, transparent 0%, ${tokens.primary}15 100%)`,
            }}
          />
        </div>
      </motion.div>
    );
  }

  // Large variant with parallax
  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-96 md:h-[500px] rounded-3xl overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        boxShadow: `0 20px 60px ${tokens.primary}25`,
      }}
    >
      {/* Parallax image */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 20%, ${tokens.primary}20 100%)`,
        }}
      />

      {/* Duotone overlay (light mode) */}
      {theme === "light" && (
        <div
          className="absolute inset-0 mix-blend-multiply pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${tokens.gradient_warm} 0%, ${tokens.gradient_accent} 100%)`,
            opacity: 0.08,
          }}
        />
      )}

      {/* Rim glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          border: `2px solid ${tokens.primary}15`,
          borderRadius: "1.5rem",
        }}
      />
    </motion.div>
  );
};
