import React from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";
import { BitsTiltCard } from "./BitsTiltCard";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  date: string;
  status: "completed" | "ongoing" | "research";
}

interface BitsProjectGridProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

/**
 * BitsProjectGrid - Advanced project grid with scroll reveals and tilt
 * Features: staggered entry, shared-element prep, hover glows
 */
export const BitsProjectGrid: React.FC<BitsProjectGridProps> = ({
  projects,
  onProjectClick,
}) => {
  const { tokens } = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return { bg: "rgba(16, 185, 129, 0.15)", text: "#10b981" };
      case "ongoing":
        return { bg: "rgba(245, 158, 11, 0.15)", text: "#f59e0b" };
      case "research":
        return { bg: "rgba(99, 102, 241, 0.15)", text: tokens.primary };
      default:
        return { bg: "rgba(99, 102, 241, 0.15)", text: tokens.primary };
    }
  };

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {projects.map((project) => {
        const statusColors = getStatusColor(project.status);
        
        return (
          <motion.div
            key={project.id}
            variants={item}
            layout
            layoutId={`project-${project.id}`}
          >
            <BitsTiltCard
              className="h-full cursor-pointer group"
              onClick={() => onProjectClick?.(project)}
            >
              <div className="p-6 h-full flex flex-col">
                {/* Status Badge */}
                <motion.div
                  className="mb-4 inline-block self-start"
                  whileHover={{ scale: 1.05 }}
                >
                  <span
                    className="text-xs font-semibold px-3 py-1.5 rounded-full capitalize"
                    style={{
                      backgroundColor: statusColors.bg,
                      color: statusColors.text,
                    }}
                  >
                    {project.status}
                  </span>
                </motion.div>

                {/* Category Icon */}
                <motion.div
                  className="mb-3 w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `rgba(99, 102, 241, 0.1)`,
                  }}
                  whileHover={{
                    backgroundColor: `rgba(99, 102, 241, 0.2)`,
                    scale: 1.1,
                  }}
                >
                  <span
                    className="text-2xl"
                    style={{ color: tokens.primary }}
                  >
                    {project.category === "iot" ? "⚡" :
                     project.category === "healthcare" ? "❤️" :
                     project.category === "embedded" ? "🔧" :
                     "🔬"}
                  </span>
                </motion.div>

                {/* Title */}
                <h3
                  className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r"
                  style={{
                    color: tokens.text_primary,
                    backgroundImage: `linear-gradient(135deg, ${tokens.primary}, ${tokens.secondary})`,
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  className="mb-4 flex-grow line-clamp-3"
                  style={{ color: tokens.text_secondary }}
                >
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <motion.span
                      key={idx}
                      className="text-xs px-2 py-1 rounded border"
                      style={{
                        borderColor: tokens.primary,
                        color: tokens.primary,
                        backgroundColor: `rgba(99, 102, 241, 0.08)`,
                      }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: `rgba(99, 102, 241, 0.15)`,
                        boxShadow: `0 0 10px ${tokens.primary}30`,
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span
                      className="text-xs px-2 py-1"
                      style={{ color: tokens.text_tertiary }}
                    >
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm"
                    style={{ color: tokens.text_tertiary }}
                  >
                    {project.date}
                  </span>
                  
                  {/* Hover indicator */}
                  <motion.div
                    className="opacity-0 group-hover:opacity-100"
                    style={{ color: tokens.primary }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 3L11 8L6 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Animated border glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    boxShadow: `0 0 20px ${tokens.primary}40, inset 0 0 20px ${tokens.primary}10`,
                  }}
                />
              </div>
            </BitsTiltCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
