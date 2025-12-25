import * as THREE from "three";
import { createRobot, RobotParts } from "./RobotGeometry";

export interface RobotScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  robot: RobotParts;
  raycaster: THREE.Raycaster;
  light: THREE.DirectionalLight;
  ambientLight: THREE.Light;
  dispose: () => void;
}

export function createScene(canvas: HTMLCanvasElement): RobotScene {
  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f0f1e); // Dark background

  // Camera
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 0, 2.5);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1.2);
  directionalLight.position.set(5, 8, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.left = -5;
  directionalLight.shadow.camera.right = 5;
  directionalLight.shadow.camera.top = 5;
  directionalLight.shadow.camera.bottom = -5;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  // Add secondary light for depth
  const secondaryLight = new THREE.DirectionalLight(0x7c3aed, 0.6);
  secondaryLight.position.set(-5, 4, -5);
  scene.add(secondaryLight);

  // Create robot
  const robot = createRobot();
  scene.add(robot.root);

  // Add ground plane for shadow reference
  const groundGeometry = new THREE.PlaneGeometry(10, 10);
  const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1;
  ground.receiveShadow = true;
  scene.add(ground);

  // Raycaster for mouse tracking
  const raycaster = new THREE.Raycaster();

  // Handle window resize
  const handleResize = () => {
    const newWidth = canvas.clientWidth;
    const newHeight = canvas.clientHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
  };

  window.addEventListener("resize", handleResize);

  // Cleanup function
  const dispose = () => {
    window.removeEventListener("resize", handleResize);
    renderer.dispose();
  };

  return {
    scene,
    camera,
    renderer,
    robot,
    raycaster,
    light: directionalLight,
    ambientLight,
    dispose,
  };
}

// Helper function to update light direction based on mouse position
export function updateLightDirection(
  light: THREE.DirectionalLight,
  normalizedX: number,
  normalizedY: number
) {
  const x = normalizedX * 10;
  const y = Math.max(3, -normalizedY * 5 + 8); // Keep light above robot

  light.position.set(x, y, 5);
}
