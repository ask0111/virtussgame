import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import Vehicle from "./Vehicle";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
let s = -3;

const Game = () => {
  const vehicleRef = useRef(); // Reference for the vehicle
  const vehicleaRef = useRef(); // Reference for the vehicle
  const [gameOver, setGameOver] = useState(false); // State to track game over
  const speed = 0.1; // Movement speed

  const direction = new THREE.Vector3();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!vehicleRef.current || gameOver) return; // Ensure vehicleRef is defined and game is not over

      // Get vehicle's current quaternion rotation
      const rotation = vehicleRef.current.rotation();

      // Create a direction vector based on the vehicle's rotation (forward direction)
      const forwardDirection = new THREE.Vector3(0, 0, -1); // Z axis is usually forward in 3D
      forwardDirection.applyQuaternion(rotation); // Rotate the forward vector by the vehicle's current rotation

      // Move forward or backward based on key press (W for forward, S for backward)
      if (e.key.toLowerCase() === "s") {
        // Move forward (multiply forwardDirection by positive scalar)
        vehicleRef.current.setTranslation(
          {
            x: vehicleRef.current.translation().x + forwardDirection.x * 0.1,
            y: vehicleRef.current.translation().y + forwardDirection.y * 0.1,
            z: vehicleRef.current.translation().z + forwardDirection.z * 0.1,
          },
          true
        );
      } else if (e.key.toLowerCase() === "w") {
        // Move backward (multiply forwardDirection by negative scalar)
        vehicleRef.current.setTranslation(
          {
            x: vehicleRef.current.translation().x - forwardDirection.x * 0.1,
            y: vehicleRef.current.translation().y - forwardDirection.y * 0.1,
            z: vehicleRef.current.translation().z - forwardDirection.z * 0.1,
          },
          true
        );
      }
    };

    // Add keydown event listener for movement
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameOver]);

  // Update vehicle rotation based on cursor movement (only on x-axis)
  useFrame((state) => {
    if (!vehicleRef.current || gameOver) return;

    const { mouse } = state;
    const { width } = state.gl.domElement;

    // Convert the mouse's x position to a normalized device coordinate
    const mouseX = (mouse.x * width) / 2;

    // Rotate vehicle to face left or right based on cursor's horizontal position
    const angleToMouse = Math.atan2(0, mouseX);

    // Set the rotation of the vehicle around the Y-axis to face the cursor
    // vehicleRef.current.setTranslation({ x: s, y: angleToMouse + Math.PI / 2, z: 0 }, true);
    const quaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, angleToMouse + Math.PI / 2, 0)
    );
    vehicleRef.current.setRotation(quaternion, true);

    vehicleaRef.current.rotation.y = 0;
  });

  return (
    <RigidBody ref={vehicleRef} type="kinematicPosition" position={[-3, -3, 0]}>
      <Vehicle ref={vehicleaRef} />
      {gameOver && <div className="game-over">Game Over</div>}
    </RigidBody>
  );
};

export default Game;
