import Vehicle from "@/components/Vehicle";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

export default function App() {
    return (<>
    <p>sdgsd</p>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Physics>
          <Vehicle />
        </Physics>
      </Canvas>
    </>
  
    );}