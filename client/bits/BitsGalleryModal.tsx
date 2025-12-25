import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";
import { X, Download, Linkedin } from "lucide-react";

interface BitsGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  cvUrl?: string;
  linkedinUrl?: string;
}

export const BitsGalleryModal: React.FC<BitsGalleryModalProps> = ({
  isOpen,
  onClose,
  src,
  alt,
  title,
  description,
  cvUrl,
  linkedinUrl,
}) => {
  const { tokens } = useTheme();

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 cursor-pointer"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(4px)",
            }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative rounded-2xl border overflow-hidden max-w-lg w-full mx-4"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.border,
              boxShadow: `0 25px 80px rgba(0, 0, 0, 0.3)`,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-title"
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 z-10 p-2 rounded-lg focus:outline-none transition-colors"
              style={{
                backgroundColor: `${tokens.primary}20`,
                color: tokens.primary,
                outline: `2px solid ${tokens.primary}`,
                outlineOffset: '2px',
              } as any}
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close gallery"
            >
              <X size={24} />
            </motion.button>

            {/* Portrait Image */}
            <div className="w-full aspect-[3/4] overflow-hidden bg-gradient-to-b from-gray-100 to-gray-50">
              <motion.img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              />
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Title */}
              {title && (
                <motion.h2
                  id="gallery-title"
                  className="text-2xl font-bold mb-2"
                  style={{ color: tokens.text_primary }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {title}
                </motion.h2>
              )}

              {/* Description */}
              {description && (
                <motion.p
                  className="text-sm mb-6"
                  style={{ color: tokens.text_secondary }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {description}
                </motion.p>
              )}

              {/* Action Buttons */}
              <motion.div
                className="flex gap-3 flex-wrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                {cvUrl && (
                  <motion.a
                    href={cvUrl}
                    download
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                    style={{
                      backgroundColor: tokens.primary,
                      color: "#ffffff",
                    }}
                    whileHover={{ opacity: 0.9 }}
                  >
                    <Download size={16} />
                    Download CV
                  </motion.a>
                )}

                {linkedinUrl && (
                  <motion.a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm border transition-colors"
                    style={{
                      borderColor: tokens.border,
                      color: tokens.text_primary,
                    }}
                    whileHover={{ backgroundColor: `${tokens.primary}10` }}
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
