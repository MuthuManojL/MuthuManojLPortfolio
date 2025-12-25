import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";
import { BitsPageTransition } from "@/bits/BitsPageTransition";
import { BitsProjectGrid } from "@/bits/BitsProjectGrid";
import { BitsTiltCard } from "@/bits/BitsTiltCard";
import { PROJECTS, Project } from "@/data/projects";

const Portfolio = () => {
  const { tokens } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(PROJECTS.map((p) => p.category)));

  const filteredProjects = selectedCategory
    ? PROJECTS.filter((p) => p.category === selectedCategory)
    : PROJECTS;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <BitsPageTransition>
      <div className="min-h-screen py-20 px-4 md:px-8">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <h1
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{ color: tokens.text_primary }}
            >
              Portfolio
            </h1>
            <p
              className="text-xl"
              style={{ color: tokens.text_secondary }}
            >
              Innovative IoT & Healthcare Solutions
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="mb-12 flex gap-4 flex-wrap">
            <motion.button
              onClick={() => setSelectedCategory(null)}
              className="px-6 py-2 rounded-full font-medium border transition-all"
              style={{
                borderColor: !selectedCategory ? tokens.primary : tokens.border,
                color: !selectedCategory ? tokens.primary : tokens.text_secondary,
                backgroundColor:
                  !selectedCategory ? `rgba(99, 102, 241, 0.1)` : "transparent",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Projects
            </motion.button>

            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-6 py-2 rounded-full font-medium border transition-all capitalize"
                style={{
                  borderColor:
                    selectedCategory === category ? tokens.secondary : tokens.border,
                  color:
                    selectedCategory === category
                      ? tokens.secondary
                      : tokens.text_secondary,
                  backgroundColor:
                    selectedCategory === category
                      ? `rgba(139, 92, 246, 0.1)`
                      : "transparent",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <BitsProjectGrid projects={filteredProjects} />

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p style={{ color: tokens.text_secondary }}>
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </BitsPageTransition>
  );
};

export default Portfolio;
