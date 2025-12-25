import { useRef, useCallback } from "react";
import { RobotAnimationMixer, AnimationState } from "@/three/AnimationMixer";
import { RobotParts } from "@/three/RobotGeometry";

interface UseRobotAnimationsReturn {
  mixer: RobotAnimationMixer | null;
  initializeMixer: (robot: RobotParts, respectsReducedMotion?: boolean) => void;
  triggerIdle: () => void;
  triggerBlink: () => void;
  triggerSmile: () => void;
  triggerWave: () => void;
  triggerSurprised: () => void;
  triggerShy: () => void;
  lookAtPoint: (x: number, y: number, z: number) => void;
  getCurrentState: () => AnimationState;
}

export function useRobotAnimations(): UseRobotAnimationsReturn {
  const mixerRef = useRef<RobotAnimationMixer | null>(null);

  const initializeMixer = useCallback(
    (robot: RobotParts, respectsReducedMotion: boolean = false) => {
      if (mixerRef.current) {
        mixerRef.current.dispose();
      }
      mixerRef.current = new RobotAnimationMixer(robot, respectsReducedMotion);
    },
    []
  );

  const playAnimation = useCallback((state: AnimationState) => {
    if (mixerRef.current) {
      mixerRef.current.playState(state);
    }
  }, []);

  const triggerIdle = useCallback(() => {
    playAnimation("idle");
  }, [playAnimation]);

  const triggerBlink = useCallback(() => {
    playAnimation("blink");
  }, [playAnimation]);

  const triggerSmile = useCallback(() => {
    playAnimation("smile");
  }, [playAnimation]);

  const triggerWave = useCallback(() => {
    playAnimation("wave");
  }, [playAnimation]);

  const triggerSurprised = useCallback(() => {
    playAnimation("surprised");
  }, [playAnimation]);

  const triggerShy = useCallback(() => {
    playAnimation("shy");
  }, [playAnimation]);

  const lookAtPoint = useCallback((x: number, y: number, z: number) => {
    if (mixerRef.current) {
      import("three").then((THREE) => {
        const point = new THREE.Vector3(x, y, z);
        mixerRef.current?.lookAtPoint(point);
      });
    }
  }, []);

  const getCurrentState = useCallback((): AnimationState => {
    return mixerRef.current?.getCurrentState() ?? "idle";
  }, []);

  return {
    mixer: mixerRef.current,
    initializeMixer,
    triggerIdle,
    triggerBlink,
    triggerSmile,
    triggerWave,
    triggerSurprised,
    triggerShy,
    lookAtPoint,
    getCurrentState,
  };
}
