import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  distance: number; // Distance from center
}

interface UseMouseTrackerOptions {
  proximityRadius?: number;
  enabled?: boolean;
}

export function useMouseTracker(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options: UseMouseTrackerOptions = {}
) {
  const { proximityRadius = 400, enabled = true } = options;
  const [mousePos, setMousePos] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    distance: Infinity,
  });

  const throttleTimerRef = useRef<NodeJS.Timeout>();
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    if (!enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const throttleDelay = 16; // ~60fps

    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();

      // Throttle updates
      if (now - lastUpdateRef.current < throttleDelay) {
        if (throttleTimerRef.current) clearTimeout(throttleTimerRef.current);
        throttleTimerRef.current = setTimeout(() => {
          handleMouseMove(event);
        }, throttleDelay);
        return;
      }

      lastUpdateRef.current = now;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Normalize to -1 to 1 range (center is 0,0)
      const normalizedX = (x / rect.width) * 2 - 1;
      const normalizedY = -(y / rect.height) * 2 + 1;

      // Calculate distance from center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distance = Math.hypot(x - centerX, y - centerY);

      setMousePos({
        x,
        y,
        normalizedX,
        normalizedY,
        distance,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (throttleTimerRef.current) clearTimeout(throttleTimerRef.current);
    };
  }, [canvasRef, enabled]);

  // Helper function to get world position from screen coordinates
  const getWorldPosition = (
    camera: THREE.PerspectiveCamera,
    distanceFromCamera: number = 2
  ): THREE.Vector3 => {
    const vector = new THREE.Vector3(mousePos.normalizedX, mousePos.normalizedY, 0);
    vector.unproject(camera);
    vector.sub(camera.position);
    vector.normalize();
    vector.multiplyScalar(distanceFromCamera);
    vector.add(camera.position);
    return vector;
  };

  // Check if mouse is within proximity radius
  const isWithinProximity = (): boolean => {
    return mousePos.distance < proximityRadius;
  };

  return {
    mousePos,
    isWithinProximity,
    getWorldPosition,
    proximityRadius,
  };
}
