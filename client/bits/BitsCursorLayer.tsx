import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";

interface CursorParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

/**
 * BitsCursorLayer - Interactive cursor effects with particles and glow
 * Features:
 * - Follows cursor with smooth animation
 * - Generates trailing particles
 * - Glow effect responds to speed
 * - Parallax depth layers
 */
export const BitsCursorLayer: React.FC = () => {
  const { tokens } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorXMotion = useMotionValue(0);
  const cursorYMotion = useMotionValue(0);
  const [speed, setSpeed] = useState(0);
  const [particles, setParticles] = useState<CursorParticle[]>([]);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const particleIdRef = useRef(0);

  // Transform cursor position to parallax X
  const parallaxX = useTransform(cursorXMotion, (x) => {
    if (typeof window !== "undefined") {
      return (x - window.innerWidth / 2) * 0.02;
    }
    return 0;
  });

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      cursorXMotion.set(x);
      cursorYMotion.set(y);

      // Calculate speed
      const dx = x - lastPositionRef.current.x;
      const dy = y - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      setSpeed(Math.min(distance, 30)); // Cap at 30

      // Create particles on high-speed movement
      if (distance > 5) {
        const newParticle: CursorParticle = {
          id: particleIdRef.current++,
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1,
          maxLife: 1,
          size: Math.random() * 6 + 2,
        };
        setParticles((prev) => [...prev.slice(-20), newParticle]); // Keep only last 20
      }

      lastPositionRef.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorXMotion, cursorYMotion]);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.2, // gravity
            life: p.life - 0.02,
          }))
          .filter((p) => p.life > 0)
      );
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        ref={containerRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none mix-blend-screen"
        style={{
          x: cursorXMotion,
          y: cursorYMotion,
          marginLeft: "-16px",
          marginTop: "-16px",
        }}
      >
        <motion.div
          className="w-full h-full rounded-full"
          animate={{
            boxShadow: `0 0 ${20 + speed * 2}px 0 rgba(99, 102, 241, ${0.3 + speed * 0.02})`,
          }}
          transition={{ type: "tween", duration: 0.1 }}
        />
      </motion.div>

      {/* Speed indicator ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none"
        style={{
          x: cursorXMotion,
          y: cursorYMotion,
          marginLeft: "-16px",
          marginTop: "-16px",
          width: "32px",
          height: "32px",
          borderColor: tokens.primary,
        }}
        animate={{
          opacity: speed > 5 ? 0.5 : 0,
          width: `${32 + speed * 2}px`,
          height: `${32 + speed * 2}px`,
          marginLeft: `${-16 - speed}px`,
          marginTop: `${-16 - speed}px`,
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />

      {/* Particle system canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 pointer-events-none"
        width={typeof window !== "undefined" ? window.innerWidth : 0}
        height={typeof window !== "undefined" ? window.innerHeight : 0}
      />

      {/* Particle DOM elements for better performance */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: tokens.primary,
            opacity: particle.life * 0.6,
            marginLeft: `-${particle.size / 2}px`,
            marginTop: `-${particle.size / 2}px`,
          }}
          animate={{
            x: particle.vx * 10,
            y: particle.vy * 10,
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </>
  );
};
