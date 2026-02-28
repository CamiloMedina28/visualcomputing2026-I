export default function Navigation({ currentScene, setCurrentScene, scenes, sceneInfo }) {
  return (
    <nav className="nav">
      {Object.entries(scenes).map(([key, value]) => (
        <button
          key={key}
          className={`nav-btn ${currentScene === value ? 'active' : ''}`}
          onClick={() => setCurrentScene(value)}
        >
          {sceneInfo[value].title.split(' ')[0]}
        </button>
      ))}
    </nav>
  )
}
