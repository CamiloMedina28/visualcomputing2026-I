import { useLoader } from "@react-three/fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import modelo from "@media/model_from_gltf_to_obj.obj"

export default function Model3OBJ() {

  const obj = useLoader(OBJLoader, modelo)

  return (
    <group position={[0, -11, 0]} scale={[1, 1, 1]}>
      <primitive object={obj} />
    </group>
  )
}
