import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";

interface BitsImageTileProps {
  src: string;
  alt: string;
  authorName?: string;
  size?: "sm" | "md";
  onClick?: () => void;
  layoutId?: string;
}

export const BitsImageTile: React.FC<BitsImageTileProps> = ({
  src,
  alt,
  authorName,
  size = "md",
  onClick,
  layoutId,
}) => {
  const { tokens } = useTheme();

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-lg overflow-hidden relative cursor-pointer flex-shrink-0 group`}
      onClick={onClick}
      layoutId={layoutId}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
      aria-label={`Author: ${authorName || alt}`}
    >
      {/* Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Inset glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 16px ${tokens.primary}30`,
        }}
      />

      {/* Border */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none border"
        style={{
          borderColor: tokens.accent,
          opacity: 0.4,
        }}
      />

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: `${tokens.primary}20`,
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Author name tooltip */}
      {authorName && (
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            backgroundColor: tokens.surface,
            color: tokens.text_primary,
            border: `1px solid ${tokens.border}`,
          }}
        >
          {authorName}
        </motion.div>
      )}
    </motion.div>
  );
};
