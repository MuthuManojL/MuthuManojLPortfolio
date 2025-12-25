import React from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  description: string;
  icon?: string;
  status?: "completed" | "ongoing" | "upcoming";
}

interface BitsTimelineProps {
  items: TimelineItem[];
  orientation?: "vertical" | "horizontal";
}

/**
 * BitsTimeline - Animated timeline for experiences and milestones
 * Features: scroll-reveal, animated connectors, status indicators
 */
export const BitsTimeline: React.FC<BitsTimelineProps> = ({
  items,
  orientation = "vertical",
}) => {
  const { tokens } = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: orientation === "vertical" ? -30 : 0, y: orientation === "horizontal" ? 30 : 0 },
    show: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "ongoing":
        return tokens.primary;
      case "upcoming":
        return tokens.text_tertiary;
      default:
        return tokens.primary;
    }
  };

  if (orientation === "horizontal") {
    return (
      <motion.div
        ref={ref}
        className="flex gap-8 overflow-x-auto pb-4"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex flex-col items-center min-w-[250px]"
            variants={itemVariant}
          >
            {/* Node */}
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4 mb-4"
              style={{
                borderColor: getStatusColor(item.status),
                backgroundColor: tokens.surface,
              }}
              whileHover={{ scale: 1.1 }}
            >
              {item.icon || "📍"}
            </motion.div>

            {/* Content */}
            <div className="text-center">
              <h4 className="font-semibold mb-1" style={{ color: tokens.text_primary }}>
                {item.title}
              </h4>
              <p className="text-sm mb-2" style={{ color: tokens.text_tertiary }}>
                {item.date}
              </p>
              <p className="text-sm" style={{ color: tokens.text_secondary }}>
                {item.description}
              </p>
            </div>

            {/* Connector line */}
            {index < items.length - 1 && (
              <motion.div
                className="absolute top-8 h-0.5"
                style={{
                  left: `calc(${index * 100}% + 100px)`,
                  width: "150px",
                  backgroundColor: getStatusColor(item.status),
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Vertical timeline
  return (
    <motion.div
      ref={ref}
      className="relative"
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {/* Vertical line */}
      <motion.div
        className="absolute left-8 top-0 w-0.5 h-full"
        style={{ backgroundColor: tokens.border, transformOrigin: "top" }}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      {items.map((item, index) => {
        const statusColor = getStatusColor(item.status);
        
        return (
          <motion.div
            key={item.id}
            className="relative pl-20 pb-12 last:pb-0"
            variants={itemVariant}
          >
            {/* Node */}
            <motion.div
              className="absolute left-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4"
              style={{
                borderColor: statusColor,
                backgroundColor: tokens.surface,
              }}
              whileHover={{ 
                scale: 1.15,
                boxShadow: `0 0 20px ${statusColor}60`,
              }}
            >
              {item.icon || "📍"}
            </motion.div>

            {/* Content card */}
            <motion.div
              className="p-6 rounded-lg border"
              style={{
                borderColor: tokens.border,
                backgroundColor: `${statusColor}08`,
              }}
              whileHover={{
                borderColor: statusColor,
                backgroundColor: `${statusColor}12`,
                x: 5,
              }}
            >
              {/* Status badge */}
              {item.status && (
                <motion.span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 capitalize"
                  style={{
                    backgroundColor: `${statusColor}20`,
                    color: statusColor,
                  }}
                >
                  {item.status}
                </motion.span>
              )}

              {/* Title */}
              <h4
                className="text-xl font-bold mb-2"
                style={{ color: tokens.text_primary }}
              >
                {item.title}
              </h4>

              {/* Date */}
              <p
                className="text-sm mb-3"
                style={{ color: statusColor }}
              >
                {item.date}
              </p>

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: tokens.text_secondary }}
              >
                {item.description}
              </p>
            </motion.div>

            {/* Animated pulse on ongoing items */}
            {item.status === "ongoing" && (
              <motion.div
                className="absolute left-6 top-6 w-4 h-4 rounded-full"
                style={{ backgroundColor: statusColor }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
