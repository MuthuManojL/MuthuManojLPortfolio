import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";
import { BitsPageTransition } from "@/bits/BitsPageTransition";
import { BitsTimeline } from "@/bits/BitsTimeline";
// Removed image tile/gallery imports per request
import { BitsTiltCard } from "@/bits/BitsTiltCard";
import { BitsAccolade } from "@/bits/BitsAccolade";
import { RESUME_DATA } from "@/data/resumeData";
import { Download, MapPin, Calendar, Briefcase, Award } from "lucide-react";

// Portrait image removed from Internship page

/**
 * Internship Page - Showcase internship experience at DeepSpectrum Analytics
 * Features: Timeline, achievements, skills gained, project highlights
 */
export const Internship: React.FC = () => {
  const { tokens } = useTheme();
  // Gallery state removed as portrait tile is no longer shown

  // Primary internship data (DeepSpectrum Analytics from official offer letter dated 28.10.2025)
  const deepSpectrumInternship = {
    company: "DeepSpectrum Analytics Pvt. Ltd.",
    role: "Research & Development Intern",
    location: "IIT Madras Research Park, Chennai",
    duration: "12th August 2025 - 20th July 2026",
    stipend: "₹5,000/month",
    reportingManager: "Dr. Kamalesh Chaudhari, Director",
    workingHours: "Monday to Saturday - 9:00 AM - 7:30 PM",
    description:
      "Research and Development internship program providing practical experience in industrial R&D. The program includes sensor and instrumentation development with IoT integration, spectroscopy data processing and monitoring systems, and data analytics with visualization and predictive insights.",
    responsibilities: [
      "Sensor and instrumentation development with IoT integration",
      "Spectroscopy data processing and monitoring systems",
      "Data analytics, visualization, and predictive insights",
      "Embedded systems and hardware-software integration",
      "Research documentation and technical reporting",
    ],
    skills: [
      "IoT Integration & Sensor Networks",
      "Spectroscopy Data Processing",
      "Data Analytics & Visualization",
      "Embedded Systems Development",
      "Hardware-Software Integration",
      "Research & Technical Documentation",
      "3D Designing",
    ],
    achievements: [
      {
        id: 1,
        title: "R&D Program Internship",
        issuer: "DeepSpectrum Analytics",
        date: "2025-2026",
        icon: "🔬",
        description: "Enrolled in industrial R&D program focusing on sensor development and data analytics",
        color: "#6C5CE7",
      },
      {
        id: 2,
        title: "IoT & Sensor Development",
        issuer: "Research & Development",
        date: "2025",
        icon: "📡",
        description: "Hands-on experience with sensor instrumentation and IoT integration systems",
        color: "#00C2D1",
      },
      {
        id: 3,
        title: "Spectroscopy Processing Systems",
        issuer: "Industrial Internship",
        date: "2025-2026",
        icon: "⚡",
        description: "Development of spectroscopy data processing and monitoring systems",
        color: "#9B59B6",
      },
    ],
  };

  // Timeline data combining DeepSpectrum with other experiences from resume
  const timelineItems = [
    {
      id: 1,
      title: "DeepSpectrum Analytics R&D Internship",
      date: "September 2025 - July 2026",
      description:
        "Research & Development internship at IIT Madras Research Park focusing on IoT sensor development, real-time processing, and data analytics",
      icon: "🚀",
      status: "ongoing" as const,
    },
    {
      id: 2,
      title: "IoT Internship - Krish Tec",
      date: "July 2024",
      description: "15-day hands-on training in IoT systems and implementations",
      icon: "📡",
      status: "completed" as const,
    },
    {
      id: 3,
      title: "Hospital Training - Sri Ramakrishna Hospital",
      date: "March 2025",
      description: "15-day clinical exposure and medical device operations",
      icon: "🏥",
      status: "completed" as const,
    },
    {
      id: 4,
      title: "MATLAB Training - Prashan Medical Technology",
      date: "September 2024",
      description: "7-day intensive training in MATLAB and medical instrumentation",
      icon: "💻",
      status: "completed" as const,
    },
  ];

  return (
    <BitsPageTransition>
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section with Portrait */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-20 items-start"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="md:col-span-2">
              <h1
                className="text-5xl md:text-6xl font-bold mb-4"
                style={{
                  background: `linear-gradient(135deg, ${tokens.primary}, ${tokens.secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Internship Experience
              </h1>
              <p className="text-xl" style={{ color: tokens.text_secondary }}>
                Professional journey in IoT-enabled healthcare innovation
              </p>
            </div>

            {/* Profile image tile removed */}
          </motion.div>

          {/* Primary Internship Card - DeepSpectrum */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <BitsTiltCard>
              <div className="p-8 rounded-2xl border" style={{ borderColor: tokens.border }}>
                {/* Company Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2" style={{ color: tokens.text_primary }}>
                      {deepSpectrumInternship.company}
                    </h2>
                    <p className="text-xl mb-4" style={{ color: tokens.primary }}>
                      {deepSpectrumInternship.role}
                    </p>
                  </div>
                  <motion.div
                    className="text-6xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🏢
                  </motion.div>
                </div>

                {/* Meta Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} style={{ color: tokens.primary }} />
                    <span className="text-sm" style={{ color: tokens.text_secondary }}>
                      {deepSpectrumInternship.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} style={{ color: tokens.primary }} />
                    <span className="text-sm" style={{ color: tokens.text_secondary }}>
                      {deepSpectrumInternship.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={18} style={{ color: tokens.primary }} />
                    <span className="text-sm font-semibold" style={{ color: tokens.primary }}>
                      {deepSpectrumInternship.stipend}
                    </span>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 rounded-lg" style={{ backgroundColor: `${tokens.primary}08` }}>
                  <div>
                    <p className="text-xs font-semibold mb-1" style={{ color: tokens.text_tertiary }}>Reporting Manager</p>
                    <p className="text-sm" style={{ color: tokens.text_secondary }}>{deepSpectrumInternship.reportingManager}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-1" style={{ color: tokens.text_tertiary }}>Working Hours</p>
                    <p className="text-sm" style={{ color: tokens.text_secondary }}>{deepSpectrumInternship.workingHours}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base leading-relaxed mb-6" style={{ color: tokens.text_secondary }}>
                  {deepSpectrumInternship.description}
                </p>

                {/* Responsibilities */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: tokens.text_primary }}>
                    <Award size={20} style={{ color: tokens.primary }} />
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-2">
                    {deepSpectrumInternship.responsibilities.map((resp, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                      >
                        <span style={{ color: tokens.primary }}>▸</span>
                        <span style={{ color: tokens.text_secondary }}>{resp}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Skills Gained */}
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: tokens.text_primary }}>
                    Skills Acquired
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {deepSpectrumInternship.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 rounded-full text-sm font-medium border"
                        style={{
                          backgroundColor: `${tokens.primary}15`,
                          borderColor: tokens.primary,
                          color: tokens.primary,
                        }}
                        whileHover={{ scale: 1.05, boxShadow: `0 0 10px ${tokens.primary}40` }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + idx * 0.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </BitsTiltCard>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: tokens.text_primary }}>
              Key Achievements
            </h2>
            <BitsAccolade accolades={deepSpectrumInternship.achievements} layout="grid" />
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: tokens.text_primary }}>
              Professional Timeline
            </h2>
            <BitsTimeline items={timelineItems} orientation="vertical" />
          </motion.div>

          {/* Additional Experiences from Resume */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: tokens.text_primary }}>
              Other Professional Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RESUME_DATA.experience
                .filter((exp) => exp.type !== "internship")
                .filter((exp) => exp.company !== "Sri Ramakrishna Hospital, CBE")
                .filter((exp) => !(exp.title.includes("Hands-On Practice") && exp.company !== "Prashan Medical Technology"))
                .map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + idx * 0.1 }}
                  >
                    <BitsTiltCard>
                      <div
                        className="p-6 rounded-xl border"
                        style={{
                          borderColor: tokens.border,
                          backgroundColor: `${tokens.primary}05`,
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-bold" style={{ color: tokens.text_primary }}>
                            {exp.title.includes("Hands-On Practice") && exp.company === "Prashan Medical Technology"
                              ? "Hands-On Practice [Medical Instrumentation]"
                              : exp.title}
                          </h3>
                          <span className="text-2xl">
                            {exp.type === "hospital" ? "🏥" : "💻"}
                          </span>
                        </div>
                        <p className="text-sm mb-2" style={{ color: tokens.primary }}>
                          {exp.company}
                        </p>
                        <p className="text-xs mb-2" style={{ color: tokens.text_tertiary }}>
                          {exp.duration} {exp.days && `• ${exp.days} days`}
                        </p>
                        {exp.description && (
                          <p className="text-sm" style={{ color: tokens.text_secondary }}>
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </BitsTiltCard>
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Download certificate CTA removed */}
        </div>
      </div>
    </BitsPageTransition>
  );
};

export default Internship;
