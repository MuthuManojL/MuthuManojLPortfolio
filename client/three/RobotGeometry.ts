import * as THREE from "three";

export interface RobotParts {
  root: THREE.Group;
  head: THREE.Group;
  leftEye: THREE.Mesh;
  rightEye: THREE.Mesh;
  mouth: THREE.Group;
  body: THREE.Mesh;
  leftArm: THREE.Group;
  rightArm: THREE.Group;
  leftLeg: THREE.Mesh;
  rightLeg: THREE.Mesh;
}

// Create a stylized robot using Three.js primitives
export function createRobot(): RobotParts {
  const root = new THREE.Group();
  root.name = "Robot";

  // Create materials
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x00d4ff,
    metalness: 0.6,
    roughness: 0.4,
    emissive: 0x004466,
  });

  const headMaterial = new THREE.MeshStandardMaterial({
    color: 0x00d4ff,
    metalness: 0.5,
    roughness: 0.3,
    emissive: 0x003344,
  });

  const eyeMaterial = new THREE.MeshStandardMaterial({
    color: 0xff006e,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0xff006e,
  });

  const detailMaterial = new THREE.MeshStandardMaterial({
    color: 0x7c3aed,
    metalness: 0.4,
    roughness: 0.5,
    emissive: 0x3d1a7d,
  });

  // BODY
  const bodyGeometry = new THREE.BoxGeometry(0.6, 1, 0.4);
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = -0.2;
  body.castShadow = true;
  body.receiveShadow = true;
  root.add(body);

  // HEAD
  const headGroup = new THREE.Group();
  headGroup.position.y = 0.8;

  const headGeometry = new THREE.BoxGeometry(0.5, 0.6, 0.45);
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.castShadow = true;
  head.receiveShadow = true;
  headGroup.add(head);

  // Add antenna
  const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8);
  const antenna = new THREE.Mesh(antennaGeometry, detailMaterial);
  antenna.position.set(0.15, 0.35, 0);
  antenna.castShadow = true;
  headGroup.add(antenna);

  // EYES
  const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(-0.12, 0.15, 0.25);
  leftEye.name = "LeftEye";
  leftEye.castShadow = true;
  headGroup.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(0.12, 0.15, 0.25);
  rightEye.name = "RightEye";
  rightEye.castShadow = true;
  headGroup.add(rightEye);

  // MOUTH
  const mouthGroup = new THREE.Group();
  mouthGroup.position.set(0, -0.1, 0.23);

  const mouthLineGeometry = new THREE.BoxGeometry(0.2, 0.03, 0.02);
  const mouthLine = new THREE.Mesh(mouthLineGeometry, eyeMaterial);
  mouthGroup.add(mouthLine);

  headGroup.add(mouthGroup);

  root.add(headGroup);

  // LEFT ARM
  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.35, 0.2, 0);

  const armGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 16);
  const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
  leftArm.position.y = -0.3;
  leftArm.castShadow = true;
  leftArmGroup.add(leftArm);

  // Left hand (cube)
  const handGeometry = new THREE.BoxGeometry(0.12, 0.15, 0.1);
  const leftHand = new THREE.Mesh(handGeometry, detailMaterial);
  leftHand.position.y = -0.65;
  leftHand.castShadow = true;
  leftArmGroup.add(leftHand);

  root.add(leftArmGroup);

  // RIGHT ARM
  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.35, 0.2, 0);

  const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
  rightArm.position.y = -0.3;
  rightArm.castShadow = true;
  rightArmGroup.add(rightArm);

  const rightHand = new THREE.Mesh(handGeometry, detailMaterial);
  rightHand.position.y = -0.65;
  rightHand.castShadow = true;
  rightArmGroup.add(rightHand);

  root.add(rightArmGroup);

  // LEFT LEG
  const legGeometry = new THREE.CylinderGeometry(0.1, 0.08, 0.5, 16);
  const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
  leftLeg.position.set(-0.2, -0.7, 0);
  leftLeg.castShadow = true;
  leftLeg.receiveShadow = true;
  root.add(leftLeg);

  // RIGHT LEG
  const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
  rightLeg.position.set(0.2, -0.7, 0);
  rightLeg.castShadow = true;
  rightLeg.receiveShadow = true;
  root.add(rightLeg);

  // Add a subtle glow effect using a post-process like setup hint
  root.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.userData.originalEmissive = child.material.emissive?.getHex?.();
    }
  });

  return {
    root,
    head: headGroup,
    leftEye,
    rightEye,
    mouth: mouthGroup,
    body,
    leftArm: leftArmGroup,
    rightArm: rightArmGroup,
    leftLeg,
    rightLeg,
  };
}

// Reusable function to reset robot to idle position
export function resetRobotPose(parts: RobotParts) {
  parts.root.rotation.set(0, 0, 0);
  parts.head.rotation.set(0, 0, 0);
  parts.leftArm.rotation.set(0, 0, 0);
  parts.rightArm.rotation.set(0, 0, 0);
  parts.leftEye.scale.set(1, 1, 1);
  parts.rightEye.scale.set(1, 1, 1);
}
