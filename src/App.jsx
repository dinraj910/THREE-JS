import BasicScene from './components/BasicScene';
import CubeObject from './components/CubeObject';
import CameraControls from './components/CameraControls';
import LightingScene from './components/LightingTypes';
import ModelLoaderScene from './components/ModelLoader';
import GLBModelViewer from "./components/GLBModelViewer";

function App() {
  return (
    <div className="w-screen h-screen">
      <GLBModelViewer />
    </div>
  );
}


export default App;

