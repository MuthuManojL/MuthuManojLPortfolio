import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";
import { X } from "lucide-react";

interface BitsHeaderAvatarProps {
  src: string;
  alt: string;
  name: string;
  role: string;
  size?: "sm" | "md";
}

export const BitsHeaderAvatar: React.FC<BitsHeaderAvatarProps> = ({
  src,
  alt,
  name,
  role,
  size = "md",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { tokens, theme } = useTheme();

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
  };

  return (
    <>
      <motion.button
        className={`${sizeClasses[size]} rounded-full relative flex-shrink-0 overflow-hidden focus:outline-none`}
        style={{
          outline: `2px solid ${tokens.primary}`,
          outlineOffset: '2px',
        } as any}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open profile menu"
      >
        {/* Avatar ring glow */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: `2px solid ${tokens.primary}40`,
            boxShadow: `0 0 16px ${tokens.primary}20`,
          }}
        />

        {/* Image */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.button>

      {/* Profile Popover Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 pointer-events-auto"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="relative pointer-events-auto rounded-2xl border backdrop-blur-sm p-6 max-w-xs"
              style={{
                backgroundColor: `${tokens.surface}95`,
                borderColor: tokens.border,
                boxShadow: `0 20px 60px ${tokens.primary}25`,
              }}
              initial={{ opacity: 0, scale: 0.85, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -20 }}
            >
              {/* Close button */}
              <motion.button
                className="absolute top-3 right-3 p-1 rounded-lg focus:outline-none"
                style={{ outline: `2px solid ${tokens.primary}`, outlineOffset: '2px' } as any}
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close profile"
              >
                <X
                  size={20}
                  style={{ color: tokens.text_secondary }}
                />
              </motion.button>

              {/* Avatar in modal */}
              <div className="w-20 h-20 rounded-xl overflow-hidden mx-auto mb-4">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name and role */}
              <h3
                className="text-lg font-bold text-center mb-1"
                style={{ color: tokens.text_primary }}
              >
                {name}
              </h3>
              <p
                className="text-sm text-center mb-4"
                style={{ color: tokens.text_secondary }}
              >
                {role}
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.a
                  href="#resume"
                  className="flex-1 text-center py-2 px-3 rounded-lg font-medium text-sm transition-colors"
                  style={{
                    backgroundColor: tokens.primary,
                    color: "#ffffff",
                  }}
                  whileHover={{ opacity: 0.9 }}
                  onClick={() => setIsOpen(false)}
                >
                  Resume
                </motion.a>
                <motion.a
                  href="#contact"
                  className="flex-1 text-center py-2 px-3 rounded-lg font-medium text-sm border"
                  style={{
                    borderColor: tokens.border,
                    color: tokens.text_primary,
                  }}
                  whileHover={{ backgroundColor: `${tokens.primary}10` }}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
