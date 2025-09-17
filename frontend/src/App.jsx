import { Routes, Route, Navigate } from 'react-router-dom';
import PanelAcceso from './Inicio/PanelAcceso';
import Docentes from './Docentes/Docentes';
import ProcesarPua from "./Pua/ProcesarPua";
import PuaVersion from './Pua/PuaVersion';
import Login from './Login/Login';
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
import CompetenciasE from './CompetenciasEspe/CompetenciasE';
import RegistroCompeE from './CompetenciasEspe/RegistroCompeE';
import FacultadesRegistradas from './Facultad/Facultades';
import PerfilUsuario from './Perfil/PerfilUsuario';
import Area from './Area/Area';
import RegistroAreas from './Area/RegistroAreas';
import Libros from './Biblioteca/Libros';
import LibrosRegistro from './Biblioteca/LibrosRegistro';
 


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
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
      <Route path="/competenciase" element={<CompetenciasE />} />
      <Route path="/registrocompee" element={<RegistroCompeE />} />
      <Route path="/facultades" element={<FacultadesRegistradas />} />
      <Route path="/perfilusuario" element={<PerfilUsuario />} />
      <Route path="/area" element={<Area />} />
      <Route path="/registroareas" element={<RegistroAreas />} />
      <Route path="/libros" element={<Libros />} />
      <Route path="/librosregistro" element={<LibrosRegistro />} />
    </Routes>
  );
}

export default App;