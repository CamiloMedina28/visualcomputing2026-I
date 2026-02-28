import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function RobotArm() {
  const [j1, setJ1] = useState(0)
  const [j2, setJ2] = useState(0)
  const [j3, setJ3] = useState(0)
  const [j4, setJ4] = useState(0)

  // Longitudes de los eslabones
  const L1 = 2
  const L2 = 1.5
  const L3 = 1
  const L4 = 0.5

  return (
    <group>
      {/* Base */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[1, 1, 1, 16]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      {/* Eslabón 1 */}
      <group rotation={[0, 0, THREE.MathUtils.degToRad(j1)]}>
        <mesh position={[L1/2, 0, 0]}>
          <boxGeometry args={[L1, 0.2, 0.2]} />
          <meshStandardMaterial color="#4ecdc4" />
        </mesh>
        
        {/* Eslabón 2 */}
        <group position={[L1, 0, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(j2)]}>
          <mesh position={[L2/2, 0, 0]}>
            <boxGeometry args={[L2, 0.15, 0.15]} />
            <meshStandardMaterial color="#ff6b6b" />
          </mesh>
          
          {/* Eslabón 3 */}
          <group position={[L2, 0, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(j3)]}>
            <mesh position={[L3/2, 0, 0]}>
              <boxGeometry args={[L3, 0.1, 0.1]} />
              <meshStandardMaterial color="#ffe66d" />
            </mesh>
            
            {/* Eslabón 4 */}
            <group position={[L3, 0, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(j4)]}>
              <mesh position={[L4/2, 0, 0]}>
                <boxGeometry args={[L4, 0.08, 0.08]} />
                <meshStandardMaterial color="#a8e6cf" />
              </mesh>
              
              {/* Efector final */}
              <mesh position={[L4, 0, 0]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#ff8b94" />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* Articulaciones (visuales) */}
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      <group rotation={[0, 0, THREE.MathUtils.degToRad(j1)]}>
        <mesh position={[L1, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        
        <group position={[L1, 0, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(j2)]}>
          <mesh position={[L2, 0, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          
          <group position={[L2, 0, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(j3)]}>
            <mesh position={[L3, 0, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial color="#333" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}
