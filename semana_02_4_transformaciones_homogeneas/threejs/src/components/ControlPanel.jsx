export default function ControlPanel({ currentScene, showGrid, setShowGrid, showAxes, setShowAxes }) {
  return (
    <div className="control-panel">
      <div className="control-section">
        <h3>Visualización</h3>
        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
            />
            Mostrar Cuadrícula
          </label>
        </div>
        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={showAxes}
              onChange={(e) => setShowAxes(e.target.checked)}
            />
            Mostrar Ejes
          </label>
        </div>
      </div>

      <div className="control-section">
        <h3>Escena Actual</h3>
        <div className="control-group">
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
            {currentScene.replace(/_/g, ' ').toUpperCase()}
          </p>
        </div>
      </div>

      <div className="control-section">
        <h3>Controles</h3>
        <div className="control-group">
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem' }}>
            Usa el mouse para rotar la cámara:<br/>
            • Click izquierdo + arrastrar: Rotar<br/>
            • Click derecho + arrastrar: Mover<br/>
            • Rueda del mouse: Zoom
          </p>
        </div>
      </div>
    </div>
  )
}
