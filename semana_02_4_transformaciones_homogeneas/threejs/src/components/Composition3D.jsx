import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Composition3D() {
  const [order, setOrder] = useState('TRS') // TRS, RTS, STR

  // Matrices de transformación
  const translation = useMemo(() => new THREE.Matrix4().makeTranslation(2, 0, 0), [])
  const rotation = useMemo(() => new THREE.Matrix4().makeRotationY(Math.PI / 4), [])
  const scale = useMemo(() => new THREE.Matrix4().makeScale(1.5, 1.5, 1.5), [])

  // Calcular matriz compuesta según el orden
  const compositeMatrix = useMemo(() => {
    const result = new THREE.Matrix4()
    
    switch (order) {
      case 'TRS':
        result.copy(translation).multiply(rotation).multiply(scale)
        break
      case 'RTS':
        result.copy(rotation).multiply(translation).multiply(scale)
        break
      case 'STR':
        result.copy(scale).multiply(translation).multiply(rotation)
        break
      default:
        result.identity()
    }
    
    return result
  }, [order, translation, rotation, scale])

  // Aplicar transformación al cubo
  const transformedPosition = useMemo(() => {
    const position = new THREE.Vector3(0, 2, 0)
    position.applyMatrix4(compositeMatrix)
    return position
  }, [compositeMatrix])

  const transformedRotation = useMemo(() => {
    // Extraer rotación de la matriz compuesta
    const euler = new THREE.Euler()
    euler.setFromRotationMatrix(compositeMatrix)
    return euler
  }, [compositeMatrix])

  const transformedScale = useMemo(() => {
    // Extraer escala de la matriz compuesta
    const scale = new THREE.Vector3()
    scale.setFromMatrixScale(compositeMatrix)
    return scale
  }, [compositeMatrix])

  return (
    <group>
      {/* Cubo original */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>
      
      {/* Cubo transformado */}
      <mesh 
        position={transformedPosition} 
        rotation={transformedRotation}
        scale={transformedScale}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {/* Cubo de referencia TRS fijo */}
      <mesh position={[2, 2, 2]} rotation={[0, Math.PI/4, 0]} scale={[1.5, 1.5, 1.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffe66d" opacity={0.7} transparent />
      </mesh>
    </group>
  )
}
