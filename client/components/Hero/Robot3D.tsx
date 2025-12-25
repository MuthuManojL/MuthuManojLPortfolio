import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { createScene, updateLightDirection, RobotScene } from "@/three/RobotScene";
import { useMouseTracker } from "@/hooks/useMouseTracker";
import { useRobotAnimations } from "@/hooks/useRobotAnimations";
import { cn } from "@/lib/utils";

interface Robot3DProps {
  onAnimationReady?: (animations: ReturnType<typeof useRobotAnimations>) => void;
  className?: string;
  autoplay?: boolean;
}

export default function Robot3D({
  onAnimationReady,
  className,
  autoplay = true,
}: Robot3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<RobotScene | null>(null);
  const animationFrameRef = useRef<number>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { mousePos, isWithinProximity, getWorldPosition } = useMouseTracker(
    canvasRef,
    {
      proximityRadius: 400,
      enabled: isLoaded,
    }
  );

  const animations = useRobotAnimations();

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const scene = createScene(canvasRef.current);
      sceneRef.current = scene;

      // Initialize animations
      animations.initializeMixer(scene.robot, prefersReducedMotion);

      if (onAnimationReady) {
        onAnimationReady(animations);
      }

      setIsLoaded(true);

      // Render loop
      let lastFrameTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const deltaTime = (now - lastFrameTime) / 1000;
        lastFrameTime = now;

        // Update light direction based on mouse
        if (sceneRef.current) {
          updateLightDirection(sceneRef.current.light, mousePos.normalizedX, mousePos.normalizedY);

          // Robot looks at cursor if within proximity
          if (isWithinProximity() && !prefersReducedMotion) {
            const lookAtPoint = getWorldPosition(
              sceneRef.current.camera,
              2.5
            );
            animations.mixer?.lookAtPoint(lookAtPoint);

            // Trigger smile when very close
            if (mousePos.distance < 150) {
              if (animations.getCurrentState() === "idle") {
                animations.triggerSmile();
              }
            }
          }

          // Slight rotation for visual interest
          sceneRef.current.robot.root.rotation.z += deltaTime * 0.1;

          sceneRef.current.renderer.render(
            sceneRef.current.scene,
            sceneRef.current.camera
          );
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animations.mixer?.dispose();
        scene.dispose();
      };
    } catch (error) {
      console.error("Error initializing 3D robot:", error);
      setIsLoaded(false);
    }
  }, []);

  // Start idle animation on load
  useEffect(() => {
    if (isLoaded && autoplay) {
      animations.triggerIdle();
    }
  }, [isLoaded, autoplay, animations]);

  // Update reduced motion preference
  useEffect(() => {
    if (sceneRef.current && animations.mixer) {
      animations.initializeMixer(sceneRef.current.robot, prefersReducedMotion);
    }
  }, [prefersReducedMotion]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
        role="img"
        aria-label="Interactive 3D robot companion that responds to cursor and user interactions"
      />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-tech-dark/50 to-tech-darker/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-foreground/60">Initializing robot...</p>
          </div>
        </div>
      )}
    </div>
  );
}
