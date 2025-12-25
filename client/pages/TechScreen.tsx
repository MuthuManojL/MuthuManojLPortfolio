import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";
import { BitsPageTransition } from "@/bits/BitsPageTransition";
import { BitsTechCanvas } from "@/bits/BitsTechCanvas";

const TechScreen = () => {
  const { tokens, theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouching, setIsTouching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Handle touch
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePos({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        });
        setIsTouching(true);
      }
    };

    const handleTouchEnd = () => {
      setIsTouching(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = theme === "dark" ? "#0a0e27" : "#f8f7ff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = theme === "dark" ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 50;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw cursor effect
      const size = isTouching ? 60 : 40;
      const gradient = ctx.createRadialGradient(
        mousePos.x,
        mousePos.y,
        0,
        mousePos.x,
        mousePos.y,
        size
      );
      gradient.addColorStop(0, theme === "dark" ? "rgba(129, 140, 248, 0.4)" : "rgba(99, 102, 241, 0.3)");
      gradient.addColorStop(1, "rgba(99, 102, 241, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(
        mousePos.x - size,
        mousePos.y - size,
        size * 2,
        size * 2
      );

      // Draw surrounding particles
      const particles = 8;
      for (let i = 0; i < particles; i++) {
        const angle = (i / particles) * Math.PI * 2;
        const radius = 30 + Math.sin(Date.now() / 500 + i) * 10;
        const x = mousePos.x + Math.cos(angle) * radius;
        const y = mousePos.y + Math.sin(angle) * radius;

        ctx.fillStyle = theme === "dark" ? "rgba(129, 140, 248, 0.3)" : "rgba(99, 102, 241, 0.2)";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <BitsPageTransition>
      <div className="relative w-full min-h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Content Overlay - Fixed z-index and padding */}
        <div className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center pointer-events-none pt-20 pb-20 px-4">
          <motion.div
            className="text-center px-6 md:px-8 py-10 rounded-3xl backdrop-blur-md border"
            style={{
              backgroundColor: `${tokens.surface}98`,
              borderColor: tokens.border,
              boxShadow: `0 12px 48px ${tokens.primary}25`,
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-5xl md:text-7xl font-black mb-4 leading-tight"
              style={{ 
                color: tokens.text_primary,
                textShadow: `0 4px 12px ${tokens.primary}30`,
              }}
              id="techscreen-title"
            >
              TechScreen
            </h1>
            <p
              className="text-lg md:text-2xl font-semibold"
              style={{ color: tokens.primary }}
            >
              Interactive Tech Ecosystem
            </p>
            <p
              className="text-sm md:text-base mt-4"
              style={{ color: tokens.text_secondary }}
            >
              Computer Science × Biomedical Engineering × IoT
            </p>
          </motion.div>

          {/* Tech Ecosystem Canvas */}
          <motion.div
            className="pointer-events-auto mt-12 md:mt-16 w-full flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <BitsTechCanvas width={Math.min(window.innerWidth * 0.8, 900)} height={600} />
          </motion.div>
        </div>

        {/* Holographic overlay panels */}
        <motion.div
          className="absolute top-10 left-10 p-6 rounded-lg border backdrop-blur-md pointer-events-none"
          style={{
            borderColor: tokens.border,
            backgroundColor: `rgba(99, 102, 241, 0.05)`,
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <h2 style={{ color: tokens.primary }} className="font-mono text-sm">
            STATUS: ONLINE
          </h2>
          <p style={{ color: tokens.text_tertiary }} className="font-mono text-xs mt-2">
            SYSTEM ACTIVE
          </p>
        </motion.div>

        {/* Right panel */}
        <motion.div
          className="absolute bottom-10 right-10 p-6 rounded-lg border backdrop-blur-md pointer-events-none"
          style={{
            borderColor: tokens.border,
            backgroundColor: `rgba(139, 92, 246, 0.05)`,
          }}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.5,
          }}
        >
          <h2 style={{ color: tokens.secondary }} className="font-mono text-sm">
            INTERFACE MODE
          </h2>
          <p style={{ color: tokens.text_tertiary }} className="font-mono text-xs mt-2">
            {theme === "dark" ? "DARK" : "LIGHT"} MODE
          </p>
        </motion.div>

        {/* Center stats */}
        <motion.div
          className="absolute bottom-10 left-1/2 p-6 rounded-lg border backdrop-blur-md pointer-events-none -translate-x-1/2"
          style={{
            borderColor: tokens.border,
            backgroundColor: `rgba(6, 182, 212, 0.05)`,
          }}
        >
          <div className="font-mono text-xs" style={{ color: tokens.accent }}>
            <div>X: {Math.round(mousePos.x)}</div>
            <div>Y: {Math.round(mousePos.y)}</div>
            <div>{isTouching ? "TOUCH DETECTED" : "CURSOR MODE"}</div>
          </div>
        </motion.div>
      </div>
    </BitsPageTransition>
  );
};

export default TechScreen;
