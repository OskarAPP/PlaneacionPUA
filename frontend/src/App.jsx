import { Routes, Route } from 'react-router-dom';
import PanelAcceso from './PanelAcceso';
import Administrador from './Administrador';
import ProcesarPua from "./ProcesarPua";
import PuaVersion from './PuaVersion';
import Login from './Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/panelacceso" element={<PanelAcceso />} />
      <Route path="/administrador" element={<Administrador />} />
      <Route path="/procesarpua" element={<ProcesarPua />} />
      <Route path="/puaversion" element={<PuaVersion />} />
    </Routes>
  );
}

export default App;