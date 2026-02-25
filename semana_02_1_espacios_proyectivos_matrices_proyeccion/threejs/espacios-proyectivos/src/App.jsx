import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, OrthographicCamera } from "@react-three/drei"
import { useState } from "react"
import './App.css'


function Scene({ isPerspective }) {
  return (
    <>
      {/* Cámaras */}
      {isPerspective ? (
        <PerspectiveCamera
          makeDefault
          position={[5, 5, 10]}
          fov={60}
        />
      ) : (
        <OrthographicCamera
          makeDefault
          position={[5, 5, 10]}
          zoom={50}
        />
      )}

      <OrbitControls />

      {/* Luces */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Objeto cercano */}
      <mesh position={[-3, 0, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Objeto intermedio */}
      <mesh position={[0, 0, -5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Objeto lejano */}
      <mesh position={[3, 0, -10]}>
        <coneGeometry args={[1, 2, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </>
  )
}

export default function App() {
  const [isPerspective, setIsPerspective] = useState(true)

  return (
    <>
      <button
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1,
          padding: "10px"
        }}
        onClick={() => setIsPerspective(!isPerspective)}
      >
        Cambiar a {isPerspective ? "Ortográfica" : "Perspectiva"}
      </button>
      
      <div className="canvas">
        <Canvas>
        <Scene isPerspective={isPerspective} />
      </Canvas>

      </div>
      
    </>
  )
}