import { forwardRef } from "react";
import { Sphere, Cylinder, Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const Vehicle = forwardRef((props, ref) => {
  return (
    <group ref={ref}>
      {/* <RigidBody type="kinematicPosition" colliders="cuboid"> */}
        {/* Front Wheels */}
        <Sphere args={[0.3]} position={[0, 0.2, 0.8]}>
          <meshStandardMaterial color="blue" />
        </Sphere>
        {/* Back Wheels */}
        <Cylinder
          args={[0.2, 0.2, 0.1, 32]}
          position={[-0.4, 0.2, -0.8]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="black" />
        </Cylinder>
        <Cylinder
          args={[0.2, 0.2, 0.1, 32]}
          position={[0.4, 0.2, -0.8]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="black" />
        </Cylinder>
        {/* Vehicle Body */}
        <Box args={[0.8, 0.4, 1.2]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="red" />
        </Box>
      {/* </RigidBody> */}
    </group>
  );
});

export default Vehicle;
