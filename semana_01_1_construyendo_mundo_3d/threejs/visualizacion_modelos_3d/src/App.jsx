import { useState } from 'react'
import './App.css'
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import ModelGeneral from "./model_general"
import ModelVertices from './model_vertex'
import ModelCaras from './model_caras'
import ModelAristas from './model_aristas'

function App() {
	const [modo, setModo] = useState("general")

	const cambiarModo = (visualizacion) => {
		setModo(visualizacion)
	}

	return (
		<>
			<div className="general-container-mini">
				<h1>Visualización de modelo .OBJ con vite y react</h1>

				<div className="opciones">
					<button onClick={() => cambiarModo("general")}>General</button>
					<button onClick={() => cambiarModo("vertices")}>Vertices</button>
					<button onClick={() => cambiarModo("aristas")}>Aristas</button>
					<button onClick={() => cambiarModo("caras")}>Caras</button>
				</div>

				<h3>Visualización de: {modo}</h3>

			</div>

			<div className="general-container">

				<Canvas camera={{
					position: [0, 0, 40],  // aleja la cámara
					fov: 30,
					near: 0.1,
					far: 1000
				}}>
					<ambientLight intensity={1} />
					<directionalLight position={[0, 0, 0]} />
						{modo === "general" && <ModelGeneral />}
						{modo === "vertices" && <ModelVertices />}
						{modo === "aristas" && <ModelAristas />}
						{modo === "caras" && <ModelCaras />}
					<OrbitControls />
				</Canvas>
			</div>
		</>
	)
}

export default App
