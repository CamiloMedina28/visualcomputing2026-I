import { useLoader } from "@react-three/fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import modelo from "@media/FinalBaseMesh.obj"

export default function ModelVertices() {

  const obj = useLoader(OBJLoader, modelo)

  return (
    <group position={[0, -11, 0]}>
      {obj.children.map((child) => {
        if (child.isMesh) {
          return (
            <points key={child.uuid} geometry={child.geometry}>
              <pointsMaterial
                color="red"
                size={0.1}
                sizeAttenuation
              />
            </points>
          )
        }
        return null
      })}
    </group>
  )
}