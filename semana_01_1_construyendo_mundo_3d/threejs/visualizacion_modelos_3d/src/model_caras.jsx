import { useLoader } from "@react-three/fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import modelo from "@media/FinalBaseMesh.obj"

export default function ModelCaras() {

  const obj = useLoader(OBJLoader, modelo)

  return (
    <group position={[0, -11, 0]}>
      {obj.children.map((child) => {
        if (child.isMesh) {
          return (
            <mesh key={child.uuid} geometry={child.geometry}>
              <meshStandardMaterial
                color="#4a90e2"
                wireframe={true}
              />
            </mesh>
          )
        }
        return null
      })}
    </group>
  )
}
