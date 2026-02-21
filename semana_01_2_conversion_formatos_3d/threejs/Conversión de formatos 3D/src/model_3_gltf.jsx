import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import modelo from "@media/old_chair.gltf"

export default function Model3GLTF() {

  const gltf = useLoader(GLTFLoader, modelo)

  return (
    <primitive
      object={gltf.scene}
      position={[0, -11, 0]}
      scale={[1, 1, 1]}
    />
  )
}