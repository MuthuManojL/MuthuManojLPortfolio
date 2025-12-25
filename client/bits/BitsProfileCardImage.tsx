import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";

interface BitsProfileCardImageProps {
  src: string;
  alt: string;
  caption?: string;
  onOpenModal?: () => void;
}

export const BitsProfileCardImage: React.FC<BitsProfileCardImageProps> = ({
  src,
  alt,
  caption,
  onOpenModal,
}) => {
  const { tokens, theme } = useTheme();

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onOpenModal}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onOpenModal?.();
        }
      }}
      aria-label={`View ${alt}`}
    >
      {/* Image container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl">
        {/* Background gradient frame */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `${tokens.gradient_card}`,
          }}
        />

        {/* Main image */}
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />

        {/* Subtle shadow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 30px ${tokens.primary}20`,
          }}
        />

        {/* Framed border effect */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none border"
          style={{
            borderColor: tokens.accent,
            opacity: 0.3,
          }}
        />
      </div>

      {/* Optional caption */}
      {caption && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: tokens.text_primary }}
          >
            {caption}
          </p>
        </motion.div>
      )}

      {/* Hover overlay hint */}
      <motion.div
        className="absolute inset-0 rounded-2xl flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-white/80 text-sm font-medium">Click to view</p>
      </motion.div>
    </motion.div>
  );
};
