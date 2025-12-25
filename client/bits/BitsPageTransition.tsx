import React from "react";
import { motion } from "framer-motion";

interface BitsPageTransitionProps {
  children: React.ReactNode;
  type?: "fade" | "slide" | "scale";
  delay?: number;
}

const variants = {
  fade: {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    hidden: { opacity: 0, x: 50 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    enter: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};

/**
 * BitsPageTransition - Wrapper for smooth page transitions
 * Provides fade, slide, or scale animations
 */
export const BitsPageTransition: React.FC<BitsPageTransitionProps> = ({
  children,
  type = "fade",
  delay = 0,
}) => {
  const selectedVariant = variants[type];

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={selectedVariant}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};
