import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";
import { BitsPageTransition } from "@/bits/BitsPageTransition";
import { RESUME_DATA } from "@/data/resumeData";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

// Portrait image path
const PORTRAIT_IMAGE = "/WhatsApp Image 2025-12-12 at 02.29.40_7efb6972.jpg";

const Contact = () => {
  const { tokens } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Open mailto link as fallback
        if (data.mailtoLink) {
          window.location.href = data.mailtoLink;
        }
        
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Left - Text Content */}
              <div className="md:col-span-2 text-center md:text-left">
                <h1
                  className="text-5xl md:text-6xl font-bold mb-4"
                  style={{ color: tokens.text_primary }}
                >
                  Get in Touch
                </h1>
                <p
                  className="text-xl"
                  style={{ color: tokens.text_secondary }}
                >
                  Let's collaborate and create something amazing
                </p>
              </div>

              {/* Right - Portrait */}
              <motion.div
                className="hidden md:flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-32 h-44 rounded-xl overflow-hidden shadow-lg border border-white/20">
                  <img
                    src={PORTRAIT_IMAGE}
                    alt="Muthu Manoj L"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2
                className="text-2xl font-bold"
                style={{ color: tokens.text_primary }}
              >
                Contact Information
              </h2>

              {/* Email */}
              <motion.a
                href={`mailto:${RESUME_DATA.personal.email}`}
                className="flex items-start gap-4 p-4 rounded-lg border hover:border-current transition-all"
                style={{
                  borderColor: tokens.border,
                }}
                whileHover={{
                  backgroundColor: `rgba(99, 102, 241, 0.1)`,
                }}
              >
                <Mail
                  size={24}
                  style={{ color: tokens.primary, flexShrink: 0, marginTop: 2 }}
                />
                <div>
                  <h3 style={{ color: tokens.text_primary }} className="font-semibold">
                    Email
                  </h3>
                  <p style={{ color: tokens.text_secondary }}>
                    {RESUME_DATA.personal.email}
                  </p>
                </div>
              </motion.a>

              {/* Phone */}
              <motion.a
                href={`tel:${RESUME_DATA.personal.phone}`}
                className="flex items-start gap-4 p-4 rounded-lg border hover:border-current transition-all"
                style={{
                  borderColor: tokens.border,
                }}
                whileHover={{
                  backgroundColor: `rgba(99, 102, 241, 0.1)`,
                }}
              >
                <Phone
                  size={24}
                  style={{ color: tokens.primary, flexShrink: 0, marginTop: 2 }}
                />
                <div>
                  <h3 style={{ color: tokens.text_primary }} className="font-semibold">
                    Phone
                  </h3>
                  <p style={{ color: tokens.text_secondary }}>
                    {RESUME_DATA.personal.phone}
                  </p>
                </div>
              </motion.a>

              {/* Location */}
              <motion.a
                href="https://www.google.com/maps/search/?api=1&query=Vadavalli,+Coimbatore,+641046"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-lg border hover:border-current transition-all cursor-pointer"
                style={{
                  borderColor: tokens.border,
                }}
                whileHover={{
                  backgroundColor: `rgba(99, 102, 241, 0.1)`,
                }}
              >
                <MapPin
                  size={24}
                  style={{ color: tokens.primary, flexShrink: 0, marginTop: 2 }}
                />
                <div>
                  <h3 style={{ color: tokens.text_primary }} className="font-semibold">
                    Location
                  </h3>
                  <p style={{ color: tokens.text_secondary }}>
                    {RESUME_DATA.personal.location}
                  </p>
                </div>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href={RESUME_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-lg border hover:border-current transition-all"
                style={{
                  borderColor: tokens.border,
                }}
                whileHover={{
                  backgroundColor: `rgba(99, 102, 241, 0.1)`,
                }}
              >
                <Linkedin
                  size={24}
                  style={{ color: tokens.primary, flexShrink: 0, marginTop: 2 }}
                />
                <div>
                  <h3 style={{ color: tokens.text_primary }} className="font-semibold">
                    LinkedIn
                  </h3>
                  <p style={{ color: tokens.text_secondary }}>
                    Connect with me
                  </p>
                </div>
              </motion.a>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label
                  style={{ color: tokens.text_primary }}
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: tokens.border,
                    backgroundColor: `rgba(99, 102, 241, 0.02)`,
                    color: tokens.text_primary,
                    "--tw-ring-color": tokens.primary,
                  } as React.CSSProperties}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  style={{ color: tokens.text_primary }}
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: tokens.border,
                    backgroundColor: `rgba(99, 102, 241, 0.02)`,
                    color: tokens.text_primary,
                    "--tw-ring-color": tokens.primary,
                  } as React.CSSProperties}
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  style={{ color: tokens.text_primary }}
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: tokens.border,
                    backgroundColor: `rgba(99, 102, 241, 0.02)`,
                    color: tokens.text_primary,
                    "--tw-ring-color": tokens.primary,
                  } as React.CSSProperties}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  style={{ color: tokens.text_primary }}
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{
                    borderColor: tokens.border,
                    backgroundColor: `rgba(99, 102, 241, 0.02)`,
                    color: tokens.text_primary,
                    "--tw-ring-color": tokens.primary,
                  } as React.CSSProperties}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-lg font-semibold border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  borderColor: tokens.primary,
                  color: tokens.primary,
                  backgroundColor: `rgba(99, 102, 241, 0.1)`,
                }}
                whileHover={!isSubmitting ? {
                  backgroundColor: `rgba(99, 102, 241, 0.2)`,
                } : {}}
                whileTap={!isSubmitting ? {
                  scale: 0.95,
                } : {}}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-lg text-center text-sm"
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    color: "#ef4444",
                  }}
                >
                  {error}
                </motion.div>
              )}

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-lg text-center"
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    color: "#10b981",
                  }}
                >
                  ✓ Message sent! Your email client will open shortly.
                </motion.div>
              )}
            </motion.form>
          </div>
        </motion.div>
      </div>
    </BitsPageTransition>
  );
};

export default Contact;
