import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Vehicle from '../components/Vehicle';
import FallingShapes from '@/components/FallingShapes';
import Game from '@/components/Game';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#__next');

export default function Home() {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreShow, setScoreShow] = useState(0);

  
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleGameOver = () => {
    if(!modalIsOpen){
      setScoreShow(score)
    }
    setIsOpen(true);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    window.location.reload()
  }


  return (
    <div className="h-screen">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h2 className='text-red-400' >Game Over!</h2>
        <h1 className='font-bold'>Score : <span className='text-green-800'>{scoreShow}</span> </h1>
        <br />
        <button onClick={closeModal} className="bg-red-500 text-white p-2 rounded">Play Again</button>
      </Modal>

      {modalIsOpen ? <div className="game-over-screen">Game Over!</div> : <p>Game Running..<span className='font-bold text-[2rem]'> {score}</span></p>}
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Physics>
          <Game />
          {/* <Vehicle /> */}
          <FallingShapes setScore={setScore} onGameOver={handleGameOver} />
        </Physics>
      </Canvas>
    </div>
  );
}
