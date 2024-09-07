import { useEffect, useState, useCallback } from 'react';
import { RigidBody } from '@react-three/rapier';
import { Box, Sphere, Cone } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const FallingShapes = ({ onGameOver , setScore}) => {
  const [shapes, setShapes] = useState([]);
  const fallingSpeed = 0.05; // Adjust this value to control falling speed

  // Function to add new shapes
  const addShape = useCallback(() => {
    const shapeType = Math.floor(Math.random() * 3); // 0: Box, 1: Sphere, 2: Cone
    const xPosition = (Math.random() - 0.5) * 10;
    const yPosition = 10; // Start high in the sky
    const newShape = {
      id: Date.now() + Math.random(), // Unique ID for each shape
      type: shapeType,
      position: [xPosition, yPosition, 0],
    };
    setShapes((prev) => [...prev, newShape]);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(addShape, 3000); // Add a new shape every 3 seconds
    
    return () => clearInterval(interval);
  }, [addShape]);
  
  useFrame(() => {
    setShapes((prevShapes) => {
      return prevShapes.map((shape) => {
        const newY = shape.position[1] - fallingSpeed;
        if (newY < -3) {
            // onGameOver(); // Trigger game over if shape falls below a certain point
            setScore((prev)=> prev + 1);
            return null;
          }
        return { ...shape, position: [shape.position[0], newY, shape.position[2]] };
      }).filter(Boolean); // Remove shapes that have fallen below the threshold
    });
  });

  return (
    <>
      {shapes.map((shape) => (
        <RigidBody
          key={shape.id}
          position={shape.position}
          onCollisionEnter={() => onGameOver()} // Trigger game over
        >
          {shape.type === 0 && <Box args={[1, 1, 1]} />}
          {shape.type === 1 && <Sphere args={[0.5]} />}
          {shape.type === 2 && <Cone args={[0.5, 1]} />}
        </RigidBody>
      ))}
    </>
  );
};

export default FallingShapes;
