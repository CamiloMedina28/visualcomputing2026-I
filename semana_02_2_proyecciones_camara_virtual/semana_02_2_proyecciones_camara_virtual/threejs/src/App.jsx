import { useState } from 'react'
import ModelViewer from './components/ModelViewer'
import Controls from './components/Controls'
import './App.css'

function App() {
  const [cameraType, setCameraType] = useState('perspective')
  const [cameraInfo, setCameraInfo] = useState(null)

  return (
    <div className="app-container">
      <Controls
        cameraType={cameraType}
        setCameraType={setCameraType}
        cameraInfo={cameraInfo}
      />
      
      <div className="viewer-container">
        <ModelViewer
          cameraType={cameraType}
          onCameraInfo={setCameraInfo}
        />
      </div>
    </div>
  )
}

export default App
