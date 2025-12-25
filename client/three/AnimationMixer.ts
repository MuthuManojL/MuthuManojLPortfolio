import * as THREE from "three";
import { RobotParts, resetRobotPose } from "./RobotGeometry";

export type AnimationState =
  | "idle"
  | "blink"
  | "smile"
  | "wave"
  | "surprised"
  | "shy"
  | "look-at";

interface AnimationConfig {
  duration: number;
  priority: number;
  timeout?: number; // Auto-cancel after this duration
  loop?: boolean;
}

interface QueuedAnimation {
  state: AnimationState;
  config: AnimationConfig;
  startTime: number;
  timeoutId?: NodeJS.Timeout;
}

const ANIMATION_CONFIGS: Record<AnimationState, AnimationConfig> = {
  idle: { duration: 4000, priority: 0, loop: true },
  blink: { duration: 300, priority: 1, timeout: 300 },
  smile: { duration: 600, priority: 2, timeout: 2000 },
  wave: { duration: 1200, priority: 3, timeout: 1200 },
  surprised: { duration: 1500, priority: 4, timeout: 2000 },
  shy: { duration: 1500, priority: 4, timeout: 2000 },
  "look-at": { duration: 200, priority: 1 },
};

export class RobotAnimationMixer {
  private robot: RobotParts;
  private currentState: AnimationState = "idle";
  private animationQueue: Map<AnimationState, QueuedAnimation> = new Map();
  private idleIdleTimer?: NodeJS.Timeout;
  private blinkTimer?: NodeJS.Timeout;
  private respectsReducedMotion: boolean;

  constructor(robot: RobotParts, respectsReducedMotion: boolean = false) {
    this.robot = robot;
    this.respectsReducedMotion = respectsReducedMotion;
    this.initializeIdleAnimations();
  }

  private initializeIdleAnimations() {
    // Start breathing and blinking on idle
    if (!this.respectsReducedMotion) {
      this.scheduleBlinking();
    }
  }

  private scheduleBlinking() {
    if (this.blinkTimer) clearTimeout(this.blinkTimer);

    const blinkInterval = Math.random() * 3000 + 3000; // 3-6 seconds
    this.blinkTimer = setTimeout(() => {
      if (this.currentState === "idle") {
        this.playState("blink");
      }
      this.scheduleBlinking();
    }, blinkInterval);
  }

  public playState(state: AnimationState, skipQueue: boolean = false) {
    if (this.respectsReducedMotion && state !== "idle") {
      return; // Skip animations if reduced motion is preferred
    }

    const config = ANIMATION_CONFIGS[state];
    if (!config) {
      console.warn(`Unknown animation state: ${state}`);
      return;
    }

    // Check if new animation has higher priority than current
    const currentConfig = ANIMATION_CONFIGS[this.currentState];
    if (
      !skipQueue &&
      currentConfig &&
      config.priority < currentConfig.priority
    ) {
      // Queue for later
      this.queueAnimation(state, config);
      return;
    }

    // Cancel previous animation's timeout
    const previous = this.animationQueue.get(this.currentState);
    if (previous?.timeoutId) {
      clearTimeout(previous.timeoutId);
    }

    this.currentState = state;
    this.animateState(state);

    // Auto-cancel after timeout
    if (config.timeout && !config.loop) {
      const timeoutId = setTimeout(() => {
        this.returnToIdle();
      }, config.timeout);

      this.animationQueue.set(state, {
        state,
        config,
        startTime: Date.now(),
        timeoutId,
      });
    }
  }

  private queueAnimation(state: AnimationState, config: AnimationConfig) {
    this.animationQueue.set(state, {
      state,
      config,
      startTime: Date.now(),
    });
  }

  private animateState(state: AnimationState) {
    switch (state) {
      case "idle":
        this.animateIdle();
        break;
      case "blink":
        this.animateBlink();
        break;
      case "smile":
        this.animateSmile();
        break;
      case "wave":
        this.animateWave();
        break;
      case "surprised":
        this.animateSurprised();
        break;
      case "shy":
        this.animateShy();
        break;
      case "look-at":
        // Handled by external code
        break;
    }
  }

  private animateIdle() {
    resetRobotPose(this.robot);

    if (!this.respectsReducedMotion) {
      // Subtle breathing animation
      const breatheAnimation = () => {
        const time = Date.now() * 0.001;
        const breathScale = 1 + Math.sin(time * 1.5) * 0.03;
        this.robot.body.scale.y = breathScale;
      };

      // Store animation loop
      const animationId = setInterval(breatheAnimation, 1000 / 60);
      this.robot.root.userData.breatheAnimation = animationId;
    }
  }

  private animateBlink() {
    // Animate eyes closing and opening
    const eyeCloseAnimation = (progress: number) => {
      const scaleY = 1 - Math.min(progress * 2, 1, (1 - progress) * 2);
      this.robot.leftEye.scale.y = scaleY;
      this.robot.rightEye.scale.y = scaleY;
    };

    this.animateProgress(eyeCloseAnimation, 300);
  }

  private animateSmile() {
    // Animate mouth (rotate and scale)
    const mouthAnimation = (progress: number) => {
      const ease = Math.sin(progress * Math.PI);
      this.robot.mouth.scale.x = 1 + ease * 0.3;
      this.robot.mouth.position.y = -0.1 + ease * 0.05;
    };

    this.animateProgress(mouthAnimation, 600);
  }

  private animateWave() {
    // Animate right arm waving
    const startRotation = this.robot.rightArm.rotation.z;
    const waveAnimation = (progress: number) => {
      const wave = Math.sin(progress * Math.PI * 4) * 0.8;
      this.robot.rightArm.rotation.z = startRotation + wave;
    };

    this.animateProgress(waveAnimation, 1200);
  }

  private animateSurprised() {
    // Head tilt and eye scale
    const surprisedAnimation = (progress: number) => {
      const ease = Math.sin(progress * Math.PI) * 0.5 + 0.5;
      this.robot.head.rotation.z = ease * 0.2;
      this.robot.leftEye.scale.y = 1 + ease * 0.4;
      this.robot.rightEye.scale.y = 1 + ease * 0.4;
      this.robot.head.position.y = 0.8 + ease * 0.1;
    };

    this.animateProgress(surprisedAnimation, 1500);
  }

  private animateShy() {
    // Turn away and retreat
    const shyAnimation = (progress: number) => {
      const ease = Math.sin(progress * Math.PI);
      this.robot.root.rotation.y = ease * 0.5;
      this.robot.root.position.x = ease * -0.2;
      this.robot.head.rotation.y = ease * 0.3;
    };

    this.animateProgress(shyAnimation, 1500);
  }

  private animateProgress(
    callback: (progress: number) => void,
    duration: number
  ) {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      callback(progress);

      if (progress < 1 && this.currentState !== "idle") {
        requestAnimationFrame(animate);
      } else {
        resetRobotPose(this.robot);
      }
    };

    animate();
  }

  public lookAtPoint(point: THREE.Vector3) {
    // Smoothly rotate head to look at a point
    const headWorldPosition = this.robot.head.getWorldPosition(
      new THREE.Vector3()
    );
    const direction = point
      .clone()
      .sub(headWorldPosition)
      .normalize();

    const targetQuaternion = new THREE.Quaternion();
    const lookAtMatrix = new THREE.Matrix4().lookAt(
      headWorldPosition,
      point,
      new THREE.Vector3(0, 1, 0)
    );
    targetQuaternion.setFromRotationMatrix(lookAtMatrix);

    // Smooth slerp to target rotation
    const startQuaternion = this.robot.head.quaternion.clone();
    const startTime = Date.now();
    const duration = 200;

    const slerpAnimate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      startQuaternion.slerpQuaternions(startQuaternion, targetQuaternion, progress);
      this.robot.head.quaternion.copy(startQuaternion);

      if (progress < 1) {
        requestAnimationFrame(slerpAnimate);
      }
    };

    slerpAnimate();
  }

  private returnToIdle() {
    resetRobotPose(this.robot);
    this.currentState = "idle";
    this.animateIdle();

    // Process queued animations
    let nextAnimation: QueuedAnimation | undefined;
    for (const [_, anim] of this.animationQueue) {
      if (!nextAnimation || anim.config.priority > nextAnimation.config.priority) {
        nextAnimation = anim;
      }
    }

    if (nextAnimation) {
      this.animationQueue.delete(nextAnimation.state);
      this.playState(nextAnimation.state, true);
    }
  }

  public getCurrentState(): AnimationState {
    return this.currentState;
  }

  public dispose() {
    if (this.idleIdleTimer) clearTimeout(this.idleIdleTimer);
    if (this.blinkTimer) clearTimeout(this.blinkTimer);

    for (const [_, anim] of this.animationQueue) {
      if (anim.timeoutId) clearTimeout(anim.timeoutId);
    }

    this.animationQueue.clear();

    if (this.robot.root.userData.breatheAnimation) {
      clearInterval(this.robot.root.userData.breatheAnimation);
    }
  }
}
