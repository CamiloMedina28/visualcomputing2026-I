import { useRef, useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Objects distributed at different distances
function SceneObjects() {
  return (
    <>
      {/* Near objects */}
      <mesh position={[2, 0.5, 2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4a9eff" />
      </mesh>
      <mesh position={[-2, 0.5, 1]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#667eea" />
      </mesh>

      {/* Mid-distance objects */}
      <mesh position={[0, 0.75, -4]}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      <mesh position={[5, 0.5, -3]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffd93d" />
      </mesh>

      {/* Far objects */}
      <mesh position={[-6, 1, -8]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#6bcb77" />
      </mesh>
      <mesh position={[4, 0.5, -10]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff9f43" />
      </mesh>
      <mesh position={[0, 1.5, -14]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#a55eea" />
      </mesh>
    </>
  )
}

// Camera controller: switches between perspective and orthographic
function CameraController({ cameraType, onCameraInfo }) {
  const { camera, gl, set, size } = useThree()
  const perspRef = useRef()
  const orthoRef = useRef()

  // Create cameras once
  useEffect(() => {
    const aspect = size.width / size.height
    perspRef.current = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000)
    perspRef.current.position.set(8, 6, 8)

    const frustum = 8
    orthoRef.current = new THREE.OrthographicCamera(
      -frustum * aspect, frustum * aspect,
      frustum, -frustum,
      0.1, 1000
    )
    orthoRef.current.position.set(8, 6, 8)
  }, [])

  // Switch active camera
  useEffect(() => {
    if (!perspRef.current || !orthoRef.current) return
    const aspect = size.width / size.height
    const active = cameraType === 'perspective' ? perspRef.current : orthoRef.current

    // Copy current camera transform to new camera
    active.position.copy(camera.position)
    active.quaternion.copy(camera.quaternion)

    if (cameraType === 'perspective') {
      active.aspect = aspect
      active.updateProjectionMatrix()
    } else {
      const frustum = 8
      active.left = -frustum * aspect
      active.right = frustum * aspect
      active.top = frustum
      active.bottom = -frustum
      active.updateProjectionMatrix()
    }

    set({ camera: active })
  }, [cameraType, size])

  // Update info every frame
  useFrame(({ camera, size }) => {
    if (cameraType === 'perspective') {
      onCameraInfo({
        fov: camera.fov,
        aspect: camera.aspect.toFixed(2),
        near: camera.near,
        far: camera.far
      })
    } else {
      onCameraInfo({
        left: camera.left.toFixed(1),
        right: camera.right.toFixed(1),
        top: camera.top.toFixed(1),
        bottom: camera.bottom.toFixed(1)
      })
    }

  })

  return null
}

export default function ModelViewer({ cameraType, onCameraInfo }) {
  return (
    <Canvas
      camera={{ position: [8, 6, 8], fov: 50 }}
      style={{ background: '#1a1a1a' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      <SceneObjects />

      <CameraController
        cameraType={cameraType}
        onCameraInfo={onCameraInfo}
      />

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
      />

      <gridHelper args={[30, 30]} />
      <axesHelper args={[5]} />
    </Canvas>
  )
}
