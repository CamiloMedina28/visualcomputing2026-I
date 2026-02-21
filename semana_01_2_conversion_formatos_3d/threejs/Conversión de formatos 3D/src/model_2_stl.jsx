import { useLoader } from "@react-three/fiber"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"
import modelo from "@media/Screw.stl"

export default function Model2STL() {

  const geometry = useLoader(STLLoader, modelo)

  return (
    <mesh geometry={geometry} position={[0, -11, 0]} scale={[1, 1, 1]}>
      <meshStandardMaterial color="lightgray" />
    </mesh>
  )
}