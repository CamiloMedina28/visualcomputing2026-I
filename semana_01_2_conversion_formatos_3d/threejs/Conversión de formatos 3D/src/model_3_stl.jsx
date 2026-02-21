import { useLoader } from "@react-three/fiber"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"
import modelo from "@media/model_from_gltf_to_stl.stl"

export default function Model3STL() {

  const geometry = useLoader(STLLoader, modelo)

  return (
    <mesh geometry={geometry} position={[0, -11, 0]} scale={[1, 1, 1]}>
      <meshStandardMaterial color="lightgray" />
    </mesh>
  )
}