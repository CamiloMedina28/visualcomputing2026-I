import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Funciones de transformación 2D en coordenadas homogéneas
function translation2D(tx, ty) {
  return new THREE.Matrix3().set(
    1, 0, tx,
    0, 1, ty,
    0, 0, 1
  )
}

function rotation2D(angle) {
  const rad = THREE.MathUtils.degToRad(angle)
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  return new THREE.Matrix3().set(
    cos, -sin, 0,
    sin, cos, 0,
    0, 0, 1
  )
}

function scale2D(sx, sy) {
  return new THREE.Matrix3().set(
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1
  )
}

function reflection2D(axis) {
  if (axis === 'x') {
    return new THREE.Matrix3().set(
      1, 0, 0,
      0, -1, 0,
      0, 0, 1
    )
  } else {
    return new THREE.Matrix3().set(
      -1, 0, 0,
      0, 1, 0,
      0, 0, 1
    )
  }
}

function transformPoint2D(matrix, x, y) {
  const vec = new THREE.Vector3(x, y, 1)
  vec.applyMatrix3(matrix)
  return { x: vec.x, y: vec.y }
}

export default function Homogeneous2D() {
  // Puntos originales del cuadrado
  const originalPoints = useMemo(() => [
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 }
  ], [])

  const [transform, setTransform] = useState({
    tx: 0, ty: 0,
    rotation: 0,
    sx: 1, sy: 1,
    reflection: 'none'
  })

  // Calcular matriz compuesta
  const transformMatrix = useMemo(() => {
    let matrix = new THREE.Matrix3().identity()
    
    // Aplicar transformaciones en orden: escala → rotación → traslación
    matrix.multiply(scale2D(transform.sx, transform.sy))
    matrix.multiply(rotation2D(transform.rotation))
    matrix.multiply(translation2D(transform.tx, transform.ty))
    
    if (transform.reflection !== 'none') {
      matrix.multiply(reflection2D(transform.reflection))
    }
    
    return matrix
  }, [transform])

  // Aplicar transformación a los puntos
  const transformedPoints = useMemo(() => {
    return originalPoints.map(point => 
      transformPoint2D(transformMatrix, point.x, point.y)
    )
  }, [originalPoints, transformMatrix])

  // Crear geometría transformada
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    if (transformedPoints.length > 0) {
      shape.moveTo(transformedPoints[0].x, transformedPoints[0].y)
      for (let i = 1; i < transformedPoints.length; i++) {
        shape.lineTo(transformedPoints[i].x, transformedPoints[i].y)
      }
      shape.closePath()
    }
    return new THREE.ShapeGeometry(shape)
  }, [transformedPoints])

  return (
    <group>
      {/* Cuadrado original (semi-transparente) */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial color="#ff6b6b" opacity={0.3} transparent />
      </mesh>
      
      {/* Cuadrado transformado */}
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#4ecdc4" />
      </mesh>
      
      {/* Puntos transformados */}
      {transformedPoints.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, 0.1]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#ffe66d" />
        </mesh>
      ))}
      
      {/* Ejes de coordenadas locales */}
      <axesHelper args={[2]} />
    </group>
  )
}
