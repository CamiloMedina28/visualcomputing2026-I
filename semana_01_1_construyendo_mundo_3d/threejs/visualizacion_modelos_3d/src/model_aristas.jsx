import { useLoader } from "@react-three/fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import * as THREE from "three"
import modelo from "@media/FinalBaseMesh.obj"

export default function ModelAristas() {

  const obj = useLoader(OBJLoader, modelo)

  return (
    <group position={[0, -11, 0]}>
      {obj.children.map((child) => {
        if (child.isMesh) {

          const edges = new THREE.EdgesGeometry(child.geometry)

          return (
            <lineSegments key={child.uuid}>
              <primitive object={edges} attach="geometry" />
              <lineBasicMaterial color="purple" />
            </lineSegments>
          )
        }
        return null
      })}
    </group>
  )
}
