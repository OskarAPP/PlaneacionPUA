import { Routes, Route } from 'react-router-dom';
import PanelAcceso from './PanelAcceso';
import Docentes from './Docentes/Docentes';
import ProcesarPua from "./ProcesarPua";
import PuaVersion from './PuaVersion';
import Login from './Login';
import RegistroDocentes from './Docentes/RegistroDocentes';
import Carreras from './Carreras/Carreras';
import RegistroCarreras from './Carreras/RegistroCarreras';
import Materias from './Materias/Materias';
import RegistroMaterias from './Materias/RegistroMaterias';
import Academias from './Academias/Academias';
import RegistroAcademias from './Academias/RegistroAcademias';
import RegistroFacultad from './Facultad/RegistroFacultad';
import CompetenciasG from './CompetenciasGen/CompetenciasG';
import RegistroCompeG from './CompetenciasGen/RegistroCompeG';

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
      <Route path="/materias" element={<Materias />} />
      <Route path="/registromaterias" element={<RegistroMaterias />} />
      <Route path="/academias" element={<Academias />} />
      <Route path="/registroacademias" element={<RegistroAcademias />} />
      <Route path="/registrofacultad" element={<RegistroFacultad />} />
      <Route path="/competenciasg" element={<CompetenciasG />} />
      <Route path="/registrocompeg" element={<RegistroCompeG />} />
    </Routes>
  );
}

export default App;