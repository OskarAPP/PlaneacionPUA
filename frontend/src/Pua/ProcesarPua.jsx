import React, { useState, useEffect, useMemo } from "react";

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
  const [planEstudio, setPlanEstudio] = useState(null);
  const [facultadSeleccionada, setFacultadSeleccionada] = useState(""); // Nuevo estado para facultad seleccionada
  // Cache local de nombres de plan por carrera
  const [planesPorCarrera, setPlanesPorCarrera] = useState({}); // { [carrera_id]: nombrePlan }
  const [carrerasDisponibles, setCarrerasDisponibles] = useState([]);
  const [carrerasLoading, setCarrerasLoading] = useState(false);
  const [carrerasError, setCarrerasError] = useState('');

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

  // Prefetch: cargar nombres de planes para las carreras visibles en el combo
  useEffect(() => {
    const baseCarreras = facultadSeleccionada
      ? (carrerasDisponibles || [])
      : (docente?.carreras_full || []);

    const visibles = baseCarreras.filter(
      c => !facultadSeleccionada || String(c.facultad_id) === String(facultadSeleccionada)
    );
    const faltantes = visibles.filter(c => !planesPorCarrera[String(c.carrera_id)]);
    if (faltantes.length === 0) return;
    let cancelado = false;
    Promise.all(
      faltantes.map(c =>
        fetch(`http://localhost:8000/api/carreras/${c.carrera_id}/planestudio`)
          .then(r => (r.ok ? r.json() : null))
          .then(d => ({ id: String(c.carrera_id), nombre: d?.plan_estudio?.nombre || "" }))
          .catch(() => ({ id: String(c.carrera_id), nombre: "" }))
      )
    ).then(resultados => {
      if (cancelado) return;
      setPlanesPorCarrera(prev => {
        const next = { ...prev };
        resultados.forEach(({ id, nombre }) => {
          if (nombre && !next[id]) next[id] = nombre;
        });
        return next;
      });
    });
    return () => { cancelado = true; };
  }, [docente?.carreras_full, facultadSeleccionada, carrerasDisponibles]);

  // Sincroniza carrera y materia cuando cambia la facultad
  useEffect(() => {
    if (!facultadSeleccionada) return;
    const carreraActual = docente?.carreras_full?.find(c => String(c.carrera_id) === String(carreraSeleccionada));
    if (carreraActual && String(carreraActual.facultad_id) !== String(facultadSeleccionada)) {
      setCarreraSeleccionada("");
      setMateriaIdSeleccionada("");
      setMateriasCarrera([]);
      setPlanEstudio(null);
    }
  }, [facultadSeleccionada]);

  // Actualiza el listado de carreras según la facultad seleccionada
  useEffect(() => {
    if (!facultadSeleccionada) {
      setCarrerasDisponibles(docente?.carreras_full || []);
      setCarrerasLoading(false);
      setCarrerasError('');
      return;
    }

    let cancelado = false;
    setCarrerasLoading(true);
    setCarrerasError('');
    setCarrerasDisponibles([]);

    fetch(`http://localhost:8000/api/carreras/facultad/${facultadSeleccionada}`)
      .then(res => {
        if (!res.ok) throw new Error('No se pudieron cargar las carreras de la facultad');
        return res.json();
      })
      .then(data => {
        if (cancelado) return;
        const lista = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
        setCarrerasDisponibles(lista);
        setCarrerasLoading(false);
      })
      .catch(err => {
        if (cancelado) return;
        setCarrerasError(err.message || 'Error al cargar carreras');
        setCarrerasLoading(false);
      });

    return () => { cancelado = true; };
  }, [facultadSeleccionada, docente?.carreras_full]);

  // Funciones para manejar eventos
  const handleAgregarSubcompetencia = () => {
    setSubcompetencias([...subcompetencias, `Subcompetencia ${subcompetencias.length + 1}`]);
  };

  const handleSidebarMouseLeave = () => {
    setEstadisticasOpen(false);
    setCuentaOpen(false);
  };

  // Definir accordionData DENTRO del componente y pasar materiaData y planEstudio
  const accordionData = useMemo(() => [
    { title: "Datos del pua", content: <DatosPuaForm materiaSeleccionada={materiaData} planEstudio={planEstudio} /> },
    { title: "Competencias del Perfil de Egreso", content: (
        <CompetenciasPerfilEgresoTabs
          carreraId={carreraSeleccionada}
          facultadId={facultadSeleccionada}
        />
      ) },
    { title: "Bibliografía sugerida", content: <BibliografiaSugerida materiaId={materiaIdSeleccionada} /> },
    { title: "Comité Curricular", content: <ComiteCurricular /> },
    { title: "Perfil del docente", content: <PerfilDocenteTabs /> },
    { title: "Evaluación Final", content: <EvaluacionFinal /> },
    { title: "Evaluación Por Competencias", content: <EvaluacionPorCompetencias /> },
  ], [materiaData, planEstudio, carreraSeleccionada, facultadSeleccionada, materiaIdSeleccionada]);

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
                  <select className="w-full border dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 dark:text-gray-100"
                    value={facultadSeleccionada}
                    onChange={e => {
                      setFacultadSeleccionada(e.target.value);
                      // Al cambiar de facultad, limpiar selección dependiente
                      setCarreraSeleccionada("");
                      setMateriaIdSeleccionada("");
                      setMateriasCarrera([]);
                      setPlanEstudio(null);
                    }}>
                    <option value="">Seleccione una facultad...</option>
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
                    onChange={e => {
                      const carreraId = e.target.value;
                      setCarreraSeleccionada(carreraId);
                      const fuente = [...(carrerasDisponibles || []), ...(docente?.carreras_full || [])];
                      const carreraObj = fuente.find(c => String(c.carrera_id) === String(carreraId));
                      if (carreraObj && carreraObj.facultad_id) {
                        setFacultadSeleccionada(String(carreraObj.facultad_id));
                      }
                    }}
                  >
                    <option value="">Seleccione una carrera...</option>
                    {carrerasLoading && <option disabled>Cargando carreras...</option>}
                    {carrerasError && <option disabled>{carrerasError}</option>}
                    {!carrerasLoading && !carrerasError && (carrerasDisponibles?.length || 0) === 0 && (
                      <option disabled>No hay carreras para esta facultad</option>
                    )}
                    {!carrerasLoading && !carrerasError && (carrerasDisponibles || []).map((carrera) => (
                      <option key={carrera.carrera_id} value={String(carrera.carrera_id)}>
                        {carrera.nombre}{planesPorCarrera[String(carrera.carrera_id)] ? ` — ${planesPorCarrera[String(carrera.carrera_id)]}` : ""}
                      </option>
                    ))}
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