import React from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";

interface SkillCategory {
  category: string;
  items: string[];
  color?: string;
}

interface BitsSkillCloudProps {
  skills: SkillCategory[];
  layout?: "grid" | "cloud";
}

/**
 * BitsSkillCloud - Animated skill visualization with pills
 * Features: staggered reveal, hover interactions, responsive layout
 */
export const BitsSkillCloud: React.FC<BitsSkillCloudProps> = ({
  skills,
  layout = "grid",
}) => {
  const { tokens } = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const categoryVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const pillVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 150,
      },
    },
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      { light: tokens.primary, dark: tokens.primary_light },
      { light: tokens.secondary, dark: tokens.secondary_light },
      { light: tokens.accent, dark: tokens.accent_light },
      { light: "#10b981", dark: "#34d399" },
    ];
    return colors[index % colors.length];
  };

  if (layout === "cloud") {
    // Cloud layout - all skills in one flowing container
    return (
      <motion.div
        ref={ref}
        className="flex flex-wrap gap-3 justify-center"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {skills.flatMap((category) =>
          category.items.map((skill, idx) => {
            const colorSet = getCategoryColor(skills.indexOf(category));
            return (
              <motion.span
                key={`${category.category}-${idx}`}
                className="px-4 py-2 rounded-full text-sm font-medium border cursor-pointer"
                style={{
                  backgroundColor: `${colorSet.light}15`,
                  borderColor: colorSet.light,
                  color: colorSet.light,
                }}
                variants={pillVariant}
                whileHover={{
                  scale: 1.08,
                  boxShadow: `0 0 20px ${colorSet.light}40`,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.span>
            );
          })
        )}
      </motion.div>
    );
  }

  // Grid layout - categorized
  return (
    <motion.div
      ref={ref}
      className="grid md:grid-cols-2 gap-6"
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {skills.map((skillGroup, index) => {
        const colorSet = getCategoryColor(index);
        
        return (
          <motion.div
            key={skillGroup.category}
            className="p-6 rounded-lg border"
            style={{
              borderColor: tokens.border,
              backgroundColor: `rgba(99, 102, 241, 0.02)`,
            }}
            variants={categoryVariant}
            whileHover={{
              borderColor: colorSet.light,
              backgroundColor: `${colorSet.light}08`,
            }}
          >
            {/* Category header */}
            <motion.div
              className="mb-4 flex items-center gap-3"
              whileHover={{ x: 5 }}
            >
              <motion.div
                className="w-2 h-8 rounded-full"
                style={{ backgroundColor: colorSet.light }}
                animate={{
                  scaleY: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              />
              <h3
                className="text-lg font-semibold"
                style={{ color: colorSet.light }}
              >
                {skillGroup.category}
              </h3>
            </motion.div>

            {/* Skills pills */}
            <motion.div 
              className="flex flex-wrap gap-2"
              variants={container}
            >
              {skillGroup.items.map((skill, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-2 rounded-full text-sm font-medium border"
                  style={{
                    backgroundColor: `${colorSet.light}10`,
                    borderColor: `${colorSet.light}40`,
                    color: colorSet.light,
                  }}
                  variants={pillVariant}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 15px ${colorSet.light}30`,
                    backgroundColor: `${colorSet.light}20`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* Skill count indicator */}
            <motion.div
              className="mt-4 text-xs"
              style={{ color: tokens.text_tertiary }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
            >
              {skillGroup.items.length} skills
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
