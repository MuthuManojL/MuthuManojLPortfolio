import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";

interface BitsTiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoveredEffect?: boolean;
}

/**
 * BitsTiltCard - Card component with 3D tilt effect
 * Responds to mouse position for parallax depth
 */
export const BitsTiltCard: React.FC<BitsTiltCardProps> = ({
  children,
  className = "",
  onClick,
  hoveredEffect = true,
}) => {
  const { tokens } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hoveredEffect || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      style={{
        perspective: "1000px",
      }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <motion.div
        className="relative w-full h-full rounded-lg border backdrop-blur-md"
        animate={{
          borderColor: isHovered ? tokens.primary : tokens.border,
          boxShadow: isHovered
            ? `0 0 20px rgba(99, 102, 241, 0.3), inset 0 0 20px rgba(99, 102, 241, 0.05)`
            : `0 4px 6px rgba(0, 0, 0, 0.1)`,
        }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: `rgba(255, 255, 255, ${isHovered ? 0.05 : 0.02})`,
          overflow: "visible",
        }}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 0.5 : 0,
          }}
          style={{
            background: `radial-gradient(circle at ${tilt.y * 10 + 50}% ${tilt.x * 10 + 50}%, 
              rgba(99, 102, 241, 0.2) 0%, transparent 70%)`,
          }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 w-full h-full"
          animate={{
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
