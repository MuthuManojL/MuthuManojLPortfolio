import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";
import { BitsPageTransition } from "@/bits/BitsPageTransition";
import { BitsSkillCloud } from "@/bits/BitsSkillCloud";
import { RESUME_DATA } from "@/data/resumeData";
import { BitsTiltCard } from "@/bits/BitsTiltCard";

const About = () => {
  const { tokens } = useTheme();

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
          className="max-w-4xl mx-auto"
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
              About Me
            </h1>
            <p
              className="text-lg leading-relaxed"
              style={{ color: tokens.text_secondary }}
            >
              {RESUME_DATA.professional.summary}
            </p>
          </motion.div>

          {/* Career Objective */}
          <motion.div
            variants={itemVariants}
            className="mb-16 p-6 rounded-lg border"
            style={{
              borderColor: tokens.border,
              backgroundColor: `rgba(99, 102, 241, 0.05)`,
            }}
          >
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: tokens.primary }}
            >
              Career Objective
            </h2>
            <p className="text-base leading-relaxed" style={{ color: tokens.text_secondary }}>
              {RESUME_DATA.professional.objective}
            </p>
          </motion.div>

          {/* Education Timeline */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2
              className="text-3xl font-bold mb-8"
              style={{ color: tokens.text_primary }}
            >
              Education
            </h2>
            <div className="space-y-6">
              {RESUME_DATA.education.map((edu, idx) => (
                <BitsTiltCard key={idx} className="h-full">
                  <div className="p-6">
                    <h3
                      className="text-xl font-semibold mb-2 leading-tight"
                      style={{ color: tokens.primary }}
                    >
                      {edu.degree}
                    </h3>
                    <p
                      className="mb-2"
                      style={{ color: tokens.text_secondary }}
                    >
                      {edu.institution}
                    </p>
                    <div
                      className="flex justify-between items-center text-sm"
                      style={{ color: tokens.text_tertiary }}
                    >
                      <span>{edu.duration}</span>
                      <span className="font-semibold" style={{ color: tokens.accent }}>
                        CGPA: {edu.cgpa}
                      </span>
                    </div>
                    {edu.details && (
                      <ul className="mt-3 space-y-1">
                        {edu.details.map((detail, i) => (
                          <li
                            key={i}
                            style={{ color: tokens.text_secondary }}
                            className="text-sm ml-4"
                          >
                            • {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </BitsTiltCard>
              ))}
            </div>
          </motion.div>

          {/* Skills Matrix */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2
              className="text-3xl font-bold mb-8"
              style={{ color: tokens.text_primary }}
            >
              Technical Skills
            </h2>
            <BitsSkillCloud 
              skills={RESUME_DATA.skills} 
              layout="grid"
            />
          </motion.div>

          {/* Leadership & Interests */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Leadership */}
            <div>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: tokens.text_primary }}
              >
                Leadership
              </h2>
              <div className="space-y-4">
                {RESUME_DATA.leadership.map((lead, idx) => (
                  <BitsTiltCard key={idx}>
                    <div className="p-4">
                      <h3
                        className="font-semibold leading-tight"
                        style={{ color: tokens.secondary }}
                      >
                        {lead.role}
                      </h3>
                      <p style={{ color: tokens.text_secondary }}>
                        {lead.organization}
                      </p>
                      <p
                        style={{ color: tokens.text_tertiary }}
                        className="text-sm"
                      >
                        {lead.year}
                      </p>
                    </div>
                  </BitsTiltCard>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: tokens.text_primary }}
              >
                Areas of Interest
              </h2>
              <div className="space-y-2">
                {RESUME_DATA.interests.map((interest, idx) => (
                  <motion.div
                    key={idx}
                    className="p-3 rounded-lg border"
                    style={{
                      borderColor: tokens.border,
                      backgroundColor: `rgba(139, 92, 246, 0.05)`,
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <p style={{ color: tokens.secondary }}>• {interest}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </BitsPageTransition>
  );
};

export default About;
