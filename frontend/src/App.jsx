import { Routes, Route } from 'react-router-dom';
import PanelAcceso from './PanelAcceso';
import Docentes from './Docentes';
import ProcesarPua from "./ProcesarPua";
import PuaVersion from './PuaVersion';
import Login from './Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/panelacceso" element={<PanelAcceso />} />
      <Route path="/docentes" element={<Docentes />} />
      <Route path="/procesarpua" element={<ProcesarPua />} />
      <Route path="/puaversion" element={<PuaVersion />} />
    </Routes>
  );
}

export default App;