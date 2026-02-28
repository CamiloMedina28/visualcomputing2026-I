import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export default function CoordinateBases() {
  const [frameAAngle, setFrameAAngle] = useState(30)
  const [frameBAngle, setFrameBAngle] = useState(-20)

  // Matriz de transformación del Frame A respecto al mundo
  const frameAMatrix = useMemo(() => {
    const matrix = new THREE.Matrix4()
    matrix.makeRotationZ(THREE.MathUtils.degToRad(frameAAngle))
    matrix.setPosition(new THREE.Vector3(2, 0, 0))
    return matrix
  }, [frameAAngle])

  // Matriz de transformación del Frame B respecto al Frame A
  const frameBMatrix = useMemo(() => {
    const matrix = new THREE.Matrix4()
    matrix.makeRotationZ(THREE.MathUtils.degToRad(frameBAngle))
    matrix.setPosition(new THREE.Vector3(1, 0, 0))
    return matrix
  }, [frameBAngle])

  // Matriz de transformación del Frame B respecto al mundo
  const frameBToWorldMatrix = useMemo(() => {
    const result = new THREE.Matrix4()
    result.copy(frameAMatrix).multiply(frameBMatrix)
    return result
  }, [frameAMatrix, frameBMatrix])

  return (
    <group>
      {/* Sistema de coordenadas mundial (origen) */}
      <axesHelper args={[3]} />
      
      {/* Frame A */}
      <group position={[2, 0, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(frameAAngle)]}>
        <axesHelper args={[2]} />
        <Text position={[0, 0.5, 0]} fontSize={0.3} color="white">
          Frame A
        </Text>
      </group>

      {/* Frame B */}
      <group position={[3, 0, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(frameAAngle + frameBAngle)]}>
        <axesHelper args={[1.5]} />
        <Text position={[0, 0.5, 0]} fontSize={0.3} color="white">
          Frame B
        </Text>
      </group>

      {/* Punto en Frame B transformado al mundo */}
      <mesh position={[3, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
    </group>
  )
}
