import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import { Suspense } from 'react'
import './App.css'

// Importar escenas
import Homogeneous2D from './components/Homogeneous2D'
import Composition3D from './components/Composition3D'
import CoordinateBases from './components/CoordinateBases'
import InverseTransforms from './components/InverseTransforms'
import RobotArm from './components/RobotArm'

// Importar componentes de UI
import Navigation from './components/Navigation'
import ControlPanel from './components/ControlPanel'

const SCENES = {
  HOMOGENEOUS_2D: 'homogeneous_2d',
  COMPOSITION_3D: 'composition_3d',
  COORDINATE_BASES: 'coordinate_bases',
  INVERSE_TRANSFORMS: 'inverse_transforms',
  ROBOT_ARM: 'robot_arm'
}

const SCENE_INFO = {
  [SCENES.HOMOGENEOUS_2D]: {
    title: 'Coordenadas Homogéneas 2D',
    subtitle: 'Transformaciones básicas en coordenadas homogéneas 2D'
  },
  [SCENES.COMPOSITION_3D]: {
    title: 'Composición de Transformaciones 3D',
    subtitle: 'Demostración de no conmutatividad en la composición'
  },
  [SCENES.COORDINATE_BASES]: {
    title: 'Cambios de Base',
    subtitle: 'Transformaciones entre sistemas de coordenadas'
  },
  [SCENES.INVERSE_TRANSFORMS]: {
    title: 'Transformaciones Inversas',
    subtitle: 'Cálculo y aplicación de transformaciones inversas'
  },
  [SCENES.ROBOT_ARM]: {
    title: 'Aplicación Robótica',
    subtitle: 'Cinemática directa de brazo robótico'
  }
}

export default function App() {
  const [currentScene, setCurrentScene] = useState(SCENES.HOMOGENEOUS_2D)
  const [showGrid, setShowGrid] = useState(true)
  const [showAxes, setShowAxes] = useState(true)

  const renderScene = () => {
    switch (currentScene) {
      case SCENES.HOMOGENEOUS_2D:
        return <Homogeneous2D />
      case SCENES.COMPOSITION_3D:
        return <Composition3D />
      case SCENES.COORDINATE_BASES:
        return <CoordinateBases />
      case SCENES.INVERSE_TRANSFORMS:
        return <InverseTransforms />
      case SCENES.ROBOT_ARM:
        return <RobotArm />
      default:
        return <Homogeneous2D />
    }
  }

  const info = SCENE_INFO[currentScene]

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="title">Taller - Transformaciones Homogéneas</h1>
          <p className="subtitle">Semana 2.4 - Three.js con React Three Fiber</p>
        </div>
        <Navigation 
          currentScene={currentScene} 
          setCurrentScene={setCurrentScene}
          scenes={SCENES}
          sceneInfo={SCENE_INFO}
        />
      </header>

      {/* Main Content */}
      <main className="main">
        {/* 3D Canvas */}
        <div className="canvas-container">
          <div className="scene-info">
            <h2>{info.title}</h2>
            <p>{info.subtitle}</p>
          </div>
          
          <Canvas
            camera={{ position: [5, 5, 5], fov: 60 }}
            shadows
            gl={{ antialias: true }}
          >
            <Suspense fallback={null}>
              {/* Lighting */}
              <ambientLight intensity={0.5} />
              <directionalLight 
                position={[10, 10, 5]} 
                intensity={1}
                castShadow
                shadow-mapSize={[1024, 1024]}
              />
              
              {/* Grid and Axes */}
              {showGrid && <Grid args={[20, 20]} />}
              {showAxes && <axesHelper args={[5]} />}
              
              {/* Scene Content */}
              {renderScene()}
              
              {/* Controls */}
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Control Panel */}
        <aside className="control-panel">
          <ControlPanel 
            currentScene={currentScene}
            showGrid={showGrid}
            setShowGrid={setShowGrid}
            showAxes={showAxes}
            setShowAxes={setShowAxes}
          />
        </aside>
      </main>
    </div>
  )
}
