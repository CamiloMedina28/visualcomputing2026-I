import { useState } from 'react'
import './App.css'
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Model1OBJ from './model_1_obj'
import Model2OBJ from './model_2_obj'
import Model3OBJ from './model_3_obj'
import Model1STL from './model_1_stl'
import Model2STL from './model_2_stl'
import Model3STL from './model_3_stl'
import Model1GLTF from './model_1_gltf'
import Model2GLTF from './model_2_gltf'
import Model3GLTF from './model_3_gltf'

function App() {

  const [model, setModel] = useState("model-1")
  const[format, setFormat] = useState("obj")

  const cambiarModel = (modelo) => {
    setModel(modelo)
  }

  const cambiarFormat = (formato) => {
    setFormat(formato)
  }

  return (
    <>
    <div>
      <div className="general-container-mini">
        <h1>Visualización de archivos en diferente formato</h1>
        <p>Las conversiones de cada uno de los archivos se desarrollaron haciendo uso de la libreria trimesh del lenguaje de programación Python</p>
        <p>Visualización de: {model} en formato {format}</p>

        <div className="button-container">
          <button onClick={() => cambiarModel("model-1")}>Modelo 1</button>
          <button onClick={() => cambiarModel("model-2")}>Modelo 2</button>
          <button onClick={() => cambiarModel("model-3")}>Modelo 3</button>
        </div>
        <br />
        <div className="button-container">
          <button onClick={() => cambiarFormat("obj")}>.OBJ</button>
          <button onClick={() => cambiarFormat("stl")}>.STL</button>
          <button onClick={() => cambiarFormat("gltf")}>.GLTF</button>
        </div>
      </div>
      
      <div className="general-container">
        <Canvas style={{ width: "100%", height: "100%" }} camera={{
              position: [0, 0, 50],  // aleja la cámara
              fov: 30,
              near: 0.1,
              far: 1000
            }}>
          <ambientLight intensity={1} />
          <directionalLight position={[0, 0, 0]} />
            {model === "model-1" && format === "obj" && <Model1OBJ/>}
            {model === "model-2" && format === "obj" && <Model2OBJ/>}
            {model === "model-3" && format === "obj" && <Model3OBJ/>}
            {model === "model-1" && format === "stl" && <Model1STL/>}
            {model === "model-2" && format === "stl" && <Model2STL/>}
            {model === "model-3" && format === "stl" && <Model3STL/>}
            {model === "model-1" && format === "gltf" && <Model1GLTF/>}
            {model === "model-2" && format === "gltf" && <Model2GLTF/>}
            {model === "model-3" && format === "gltf" && <Model3GLTF/>}

            

          <OrbitControls />
        </Canvas>
      </div>

    </div>

    </>
  )
}

export default App
