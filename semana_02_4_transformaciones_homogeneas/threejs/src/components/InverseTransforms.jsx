import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function InverseTransforms() {
  const [tx, setTx] = useState(2)
  const [ty, setTy] = useState(1)
  const [rotation, setRotation] = useState(45)

  // Matriz de transformación original
  const originalMatrix = useMemo(() => {
    const matrix = new THREE.Matrix4()
    matrix.makeTranslation(tx, ty, 0)
    matrix.multiply(new THREE.Matrix4().makeRotationZ(THREE.MathUtils.degToRad(rotation)))
    return matrix
  }, [tx, ty, rotation])

  // Matriz inversa
  const inverseMatrix = useMemo(() => {
    const inv = new THREE.Matrix4().copy(originalMatrix)
    inv.invert()
    return inv
  }, [originalMatrix])

  // Aplicar transformación inversa
  const inversePosition = useMemo(() => {
    const position = new THREE.Vector3(0, 0, 0)
    position.applyMatrix4(inverseMatrix)
    return position
  }, [inverseMatrix])

  const inverseRotation = useMemo(() => {
    const euler = new THREE.Euler()
    euler.setFromRotationMatrix(inverseMatrix)
    return euler
  }, [inverseMatrix])

  const inverseScale = useMemo(() => {
    const scale = new THREE.Vector3()
    scale.setFromMatrixScale(inverseMatrix)
    return scale
  }, [inverseMatrix])

  return (
    <group>
      {/* Cubo original */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>

      {/* Cubo transformado */}
      <mesh position={[tx, ty, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(rotation)]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {/* Cubo con transformación inversa */}
      <mesh 
        position={inversePosition} 
        rotation={inverseRotation}
        scale={inverseScale}
      >
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#ffe66d" opacity={0.8} transparent />
      </mesh>
    </group>
  )
}
