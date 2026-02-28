import './Controls.css'

export default function Controls({
  cameraType,
  setCameraType,
  cameraInfo
}) {
  return (
    <div className="controls-container">
      <div className="controls-panel">
        <h2>Virtual Camera</h2>
        
        {/* Camera Switch */}
        <div className="control-section">
          <h3>Camera Type</h3>
          <div className="button-group">
            <button
              className={cameraType === 'perspective' ? 'active' : ''}
              onClick={() => setCameraType('perspective')}
            >
              Perspective
            </button>
            <button
              className={cameraType === 'orthographic' ? 'active' : ''}
              onClick={() => setCameraType('orthographic')}
            >
              Orthographic
            </button>
          </div>
        </div>

        {/* Camera Info */}
        {cameraInfo && (
          <div className="control-section info-section">
            <h3>Camera Parameters</h3>
            <div className="info-grid">
              {cameraType === 'perspective' ? (
                <>
                  <div className="info-item">
                    <span className="info-label">Type:</span>
                    <span className="info-value">Perspective</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">FOV:</span>
                    <span className="info-value">{cameraInfo.fov}°</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Aspect:</span>
                    <span className="info-value">{cameraInfo.aspect}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Near:</span>
                    <span className="info-value">{cameraInfo.near}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Far:</span>
                    <span className="info-value">{cameraInfo.far}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="info-item">
                    <span className="info-label">Type:</span>
                    <span className="info-value">Orthographic</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Left:</span>
                    <span className="info-value">{cameraInfo.left}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Right:</span>
                    <span className="info-value">{cameraInfo.right}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Top:</span>
                    <span className="info-value">{cameraInfo.top}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Bottom:</span>
                    <span className="info-value">{cameraInfo.bottom}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
