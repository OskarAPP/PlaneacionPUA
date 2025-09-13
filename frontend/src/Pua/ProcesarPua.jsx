import React, { useState, useEffect } from "react";

// Importaciones de los componentes modulares
import SidebarProcesarPua from "./components/SidebarProcesarPua";
import DatosPuaForm from "./components/DatosPuaForm";
import CompetenciasPerfilEgresoTabs from "./components/CompetenciasPerfilEgresoTabs";
import BibliografiaSugerida from "./components/BibliografiaSugerida";
import ComiteCurricular from "./components/ComiteCurricular";
import PerfilDocenteTabs from "./components/PerfilDocenteTabs";
import EvaluacionFinal from "./components/EvaluacionFinal";
import EvaluacionPorCompetencias from "./components/EvaluacionPorCompetencias";
import Accordion from "./components/Accordion";
import SubcompetenciaPanel from "./components/SubcompetenciaPanel";

// Importación del hook personalizado
import useDocente from "./hooks/useDocente";

const ProcesarPua = () => {
  // Estado para manejar las subcompetencias y el sidebar
  const [subcompetencias, setSubcompetencias] = useState([]);
  const [estadisticasOpen, setEstadisticasOpen] = useState(false);
  const [cuentaOpen, setCuentaOpen] = useState(false);
  
  // Estado para selects
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("");
  const [materiasCarrera, setMateriasCarrera] = useState([]);
  const [materiaIdSeleccionada, setMateriaIdSeleccionada] = useState("");
  const [materiaData, setMateriaData] = useState(null);
  // Estado para el plan de estudio
  const [planEstudio, setPlanEstudio] = useState(null);

  // Uso del hook para obtener los datos del docente y el mensaje de bienvenida
  const { docente, bienvenida } = useDocente();

  // Efecto para cargar materias según la carrera seleccionada
  useEffect(() => {
    if (!carreraSeleccionada) {
      setMateriasCarrera([]);
      return;
    }
    fetch(`http://localhost:8000/api/materias/carrera/${carreraSeleccionada}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMateriasCarrera(data);
        } else {
          setMateriasCarrera([]);
        }
      })
      .catch(() => {
        setMateriasCarrera([]);
      });
  }, [carreraSeleccionada]);

  // useEffect para cargar los datos de la materia seleccionada
  useEffect(() => {
    if (!materiaIdSeleccionada) {
      setMateriaData(null);
      return;
    }
    fetch(`http://localhost:8000/api/materias/${materiaIdSeleccionada}`)
      .then(res => res.json())
      .then(data => {
        setMateriaData(data.materia || data); 
      })
      .catch(() => setMateriaData(null));
  }, [materiaIdSeleccionada]);

  // useEffect para cargar el plan de estudio según la carrera seleccionada
  useEffect(() => {
    if (!carreraSeleccionada) {
      setPlanEstudio(null);
      return;
    }
    fetch(`http://localhost:8000/api/carreras/${carreraSeleccionada}/planestudio`)
      .then(res => res.json())
      .then(data => {
        setPlanEstudio(data.plan_estudio || null);
      })
      .catch(() => setPlanEstudio(null));
  }, [carreraSeleccionada]);

  // Funciones para manejar eventos
  const handleAgregarSubcompetencia = () => {
    setSubcompetencias([...subcompetencias, `Subcompetencia ${subcompetencias.length + 1}`]);
  };

  const handleSidebarMouseLeave = () => {
    setEstadisticasOpen(false);
    setCuentaOpen(false);
  };

  // Definir accordionData DENTRO del componente y pasar materiaData y planEstudio
  const accordionData = [
    { title: "Datos del pua", content: <DatosPuaForm materiaSeleccionada={materiaData} planEstudio={planEstudio} /> },
    { title: "Competencias del Perfil de Egreso", content: <CompetenciasPerfilEgresoTabs /> },
    { title: "Bibliografía sugerida", content: <BibliografiaSugerida /> },
    { title: "Comité Curricular", content: <ComiteCurricular /> },
    { title: "Perfil del docente", content: <PerfilDocenteTabs /> },
    { title: "Evaluación Final", content: <EvaluacionFinal /> },
    { title: "Evaluación Por Competencias", content: <EvaluacionPorCompetencias /> },
  ];

  return (
    <div className="min-h-screen w-screen h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex w-full">
        <div className="flex flex-col">
          <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center px-6 py-2 h-[78px] w-full fixed left-0 top-0 z-30 transition-all duration-300 text-gray-700 dark:text-gray-100">
            <div className="flex items-center gap-2">
              <a href="/PanelAcceso">
                <img src="/src/imagenes/imagen_salida1.png" alt="UAC Logo" className="w-12 h-12 object-contain cursor-pointer" />
              </a>
              <div className="ml-2">
                <div className="text-xs text-gray-700 dark:text-gray-200 leading-tight"></div>
                <div className="text-xs text-gray-700 dark:text-gray-200 leading-tight">
                  Programas de Unidad<br />de Aprendizaje
                </div>
              </div>
            </div>
          </header>

          <SidebarProcesarPua
            estadisticasOpen={estadisticasOpen}
            setEstadisticasOpen={setEstadisticasOpen}
            cuentaOpen={cuentaOpen}
            setCuentaOpen={setCuentaOpen}
            handleSidebarMouseLeave={handleSidebarMouseLeave}
          />
        </div>

        <main className="flex-1 flex flex-col items-center justify-start pt-28 pb-8 overflow-y-auto ml-16 md:ml-20 transition-all duration-300 h-[calc(100vh)] scrollbar-thin scrollbar-thumb-gray-300 w-full">
          <div className="w-full max-w-4xl mx-auto">
            <div className="text-center text-lg font-semibold text-gray-700 dark:text-gray-100 mb-4">
              {bienvenida}
            </div>

            <div className="bg-white border rounded-xl shadow p-6 mb-8">
              <div className="text-center text-base font-bold text-gray-700 mb-4">Programa de aprendizaje</div>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-gray-700 font-semibold mb-1">Facultad:</label>
                  <select className="w-full border dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 dark:text-gray-100">
                    {docente && docente.facultades && docente.facultades.length > 0 ? (
                      docente.facultades.map((facultad, idx) => (
                        <option key={facultad.facultad_id || idx} value={facultad.facultad_id}>{facultad.nombre}</option>
                      ))
                    ) : (
                      <option>Sin facultades registradas</option>
                    )}
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-gray-700 font-semibold mb-1">Carrera:</label>
                  <select
                    className="w-full border dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 dark:text-gray-100"
                    value={carreraSeleccionada}
                    onChange={e => setCarreraSeleccionada(e.target.value)}
                  >
                    <option value="">Seleccione una carrera...</option>
                    {docente && docente.carreras_full && docente.carreras_full.length > 0 ? (
                      docente.carreras_full.map((carrera) => (
                          <option key={carrera.carrera_id} value={carrera.carrera_id}>
                              {carrera.nombre}
                          </option>
                      ))
                    ) : (
                      <option>Sin carreras registradas</option>
                    )}
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-gray-700 font-semibold mb-1">Materia:</label>
                  <select
                    className="w-full border dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 dark:text-gray-100"
                    value={materiaIdSeleccionada}
                    onChange={e => setMateriaIdSeleccionada(e.target.value)}
                  >
                    <option value="">Seleccione una materia...</option>
                    {materiasCarrera.length > 0 ? (
                      materiasCarrera.map((materia) => (
                        <option key={materia.materia_id} value={materia.materia_id}>{materia.nombre}</option>
                      ))
                    ) : (
                      <option disabled>Seleccione una carrera primero</option>
                    )}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl shadow p-4">
              <Accordion accordionData={accordionData} />
            </div>

            {(subcompetencias.length > 0) && (
              <div className="flex flex-col gap-4 mt-6 w-full items-center">
                {subcompetencias.map((nombre, idx) => (
                  <SubcompetenciaPanel
                    key={idx}
                    nombre={nombre}
                    idx={idx}
                    onRemove={() => setSubcompetencias(subcompetencias.filter((_, i) => i !== idx))}
                  />
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2 mt-8 w-full">
              <button
                type="button"
                className="border border-blue-700 text-blue-700 dark:border-blue-400 dark:text-blue-300 bg-white dark:bg-gray-800 px-3 py-2 rounded hover:bg-blue-50 hover:border-blue-800 dark:hover:bg-blue-950 dark:hover:border-blue-500"
                onClick={handleAgregarSubcompetencia}
              >
                Generar subcompetencia...
              </button>
              <button type="button" className="border border-blue-700 text-blue-700 dark:border-blue-400 dark:text-blue-300 bg-white dark:bg-gray-800 px-3 py-2 rounded flex items-center gap-2 hover:bg-blue-50 hover:border-blue-800 dark:hover:bg-blue-950 dark:hover:border-blue-500">
                <span className="fa fa-print" /> Imprimir
              </button>
              <button type="button" className="border border-blue-700 text-blue-700 dark:border-blue-400 dark:text-blue-300 bg-white dark:bg-gray-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-50 hover:border-blue-800 dark:hover:bg-blue-950 dark:hover:border-blue-500">
                <span className="fa fa-check" /> Finalizar
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProcesarPua;