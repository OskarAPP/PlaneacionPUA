import { Routes, Route } from 'react-router-dom';
import PanelAcceso from './PanelAcceso';
import Docentes from './Docentes/Docentes';
import ProcesarPua from "./ProcesarPua";
import PuaVersion from './PuaVersion';
import Login from './Login';
import RegistroDocentes from './Docentes/RegistroDocentes';
import Carreras from './Carreras/Carreras';
import RegistroCarreras from './Carreras/RegistroCarreras';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/panelacceso" element={<PanelAcceso />} />
      <Route path="/docentes" element={<Docentes />} />
      <Route path="/procesarpua" element={<ProcesarPua />} />
      <Route path="/puaversion" element={<PuaVersion />} />
      <Route path="/registrodocentes" element={<RegistroDocentes />} />
      <Route path="/carreras" element={<Carreras />} />
      <Route path="/registrocarreras" element={<RegistroCarreras />} />
    </Routes>
  );
}

export default App;