import React from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";

interface Accolade {
  id: number;
  title: string;
  issuer: string;
  date: string;
  icon?: string;
  description?: string;
  color?: string;
}

interface BitsAccoladeProps {
  accolades: Accolade[];
  layout?: "grid" | "carousel";
}

/**
 * BitsAccolade - Animated achievement and award cards
 * Features: glow effects, icon animations, staggered entry, hover interactions
 */
export const BitsAccolade: React.FC<BitsAccoladeProps> = ({
  accolades,
  layout = "grid",
}) => {
  const { tokens } = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    show: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const getAccoladeColor = (accolade: Accolade) => {
    if (accolade.color) return accolade.color;
    
    // Auto-assign colors based on index
    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];
    return colors[accolade.id % colors.length];
  };

  return (
    <motion.div
      ref={ref}
      className={`w-full ${layout === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex gap-6 overflow-x-auto pb-4"}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {accolades.map((accolade) => {
        const accoladeColor = getAccoladeColor(accolade);
        
        return (
          <motion.div
            key={accolade.id}
            className={`relative ${layout === "carousel" ? "min-w-[300px]" : ""}`}
            variants={cardVariant}
          >
            {/* Card container */}
            <motion.div
              className="relative p-6 rounded-xl border overflow-hidden"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.border,
              }}
              whileHover={{
                borderColor: accoladeColor,
                boxShadow: `0 10px 40px ${accoladeColor}30`,
                y: -8,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Background glow gradient */}
              <motion.div
                className="absolute top-0 left-0 w-full h-32 opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${accoladeColor}80, transparent)`,
                }}
                whileHover={{ opacity: 0.3 }}
              />

              {/* Icon container */}
              <motion.div
                className="relative w-16 h-16 mb-4 rounded-full flex items-center justify-center border-2"
                style={{
                  borderColor: accoladeColor,
                  backgroundColor: `${accoladeColor}15`,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -10, 10, 0],
                }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-3xl">{accolade.icon || "🏆"}</span>
                
                {/* Icon glow */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-lg"
                  style={{ backgroundColor: accoladeColor }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.div>

              {/* Title */}
              <h3
                className="text-lg font-bold mb-2 leading-tight"
                style={{ color: tokens.text_primary }}
              >
                {accolade.title}
              </h3>

              {/* Issuer */}
              <p
                className="text-sm font-medium mb-1"
                style={{ color: accoladeColor }}
              >
                {accolade.issuer}
              </p>

              {/* Date */}
              <p
                className="text-xs mb-3"
                style={{ color: tokens.text_tertiary }}
              >
                {accolade.date}
              </p>

              {/* Description */}
              {accolade.description && (
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: tokens.text_secondary }}
                >
                  {accolade.description}
                </p>
              )}

              {/* Decorative corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10"
                style={{ backgroundColor: accoladeColor }}
                whileHover={{ scale: 1.2, opacity: 0.15 }}
              />

              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                style={{ transform: "translateX(-100%)" }}
                whileHover={{
                  opacity: [0, 0.2, 0],
                  x: ["0%", "200%"],
                }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>

            {/* Floating particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full pointer-events-none"
                style={{
                  backgroundColor: accoladeColor,
                  left: `${20 + i * 30}%`,
                  top: "10%",
                }}
                animate={{
                  y: [-10, -30, -10],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
