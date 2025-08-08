import React, { useState } from "react";

// Sidebar estilo PanelAcceso
function SidebarProcesarPua({estadisticasOpen, setEstadisticasOpen, cuentaOpen, setCuentaOpen, handleSidebarMouseLeave}) {
  return (
    <aside 
      className={`fixed left-0 top-[78px] z-20 w-16 hover:w-64 h-[calc(100vh-78px)] transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden`}
      aria-label="Sidebar"
      onMouseLeave={handleSidebarMouseLeave}
    >
      <div className="h-full px-2 py-4 flex flex-col">
        <ul className="space-y-1 font-medium">
          {/* Menú PUA */}
          <li>
            <a 
              href="/procesarpua" 
              className="flex items-center p-2 text-gray-700 dark:text-gray-100 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors group"
            >
              <span className="min-w-[20px] flex justify-center items-center">
                <svg className="w-5 h-5 text-blue-500 transition duration-75 group-hover:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0C4.612 0 0 5.336 0 7v3c0 1.664 4.612 7 10 7s10-5.336 10-7V7c0-1.664-4.612-7-10-7zm0 16c-3.796 0-7-1.794-7-3v-2.394C4.394 12.12 7.2 13 10 13s5.606-.88 7-2.394V13c0 1.206-3.204 3-7 3z"/>
                  <path d="M10 10c2.796 0 5-1.196 5-2s-2.204-2-5-2-5 1.196-5 2 2.204 2 5 2z"/>
                </svg>
              </span>
              <span className="ms-3 whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 text-base">Crear PUA</span>
            </a>
          </li>
          <li>
            <a 
              href="/puaversion" 
              className="flex items-center p-2 text-gray-700 dark:text-gray-100 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors group"
            >
              <span className="min-w-[20px] flex justify-center items-center">
                <svg className="w-5 h-5 text-blue-500 transition duration-75 group-hover:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0C4.612 0 0 5.336 0 7v3c0 1.664 4.612 7 10 7s10-5.336 10-7V7c0-1.664-4.612-7-10-7zm0 16c-3.796 0-7-1.794-7-3v-2.394C4.394 12.12 7.2 13 10 13s5.606-.88 7-2.394V13c0 1.206-3.204 3-7 3z"/>
                  <path d="M10 10c2.796 0 5-1.196 5-2s-2.204-2-5-2-5 1.196-5 2 2.204 2 5 2z"/>
                </svg>
              </span>
              <span className="ms-3 whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 text-base">Consultar PUA</span>
            </a>
          </li>
          {/* Menú Estadísticas */}
          <li className="relative">
            <button type="button"
              onClick={() => setEstadisticasOpen(!estadisticasOpen)}
              className="flex items-center w-full p-2 text-gray-700 dark:text-gray-100 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors group focus:outline-none bg-transparent"
              style={{ backgroundColor: 'transparent' }}
            >
              <span className="min-w-[20px] flex justify-center items-center">
                <svg className="w-5 h-5 text-blue-500 transition duration-75 group-hover:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                </svg>
              </span>
              <span className="ms-3 whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 text-base">Estadísticas</span>
              <svg className="ms-auto w-4 h-4 text-blue-400 transition-transform duration-300 group-hover:text-blue-700" fill="currentColor" viewBox="0 0 20 20" 
                style={{ transform: estadisticasOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {estadisticasOpen && (
              <ul className="mt-1 space-y-1 pl-6 border-l border-blue-200 ml-3">
                <li>
                  <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md">Genéricas</a>
                </li>
                <li>
                  <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md">Específicas</a>
                </li>
              </ul>
            )}
          </li>
          {/* Menú Mi Cuenta */}
          <li className="relative">
            <button type="button"
              onClick={() => setCuentaOpen(!cuentaOpen)}
              className="flex items-center w-full p-2 text-gray-700 dark:text-gray-100 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors group focus:outline-none bg-transparent"
              style={{ backgroundColor: 'transparent' }}
            >
              <span className="min-w-[20px] flex justify-center items-center">
                <svg className="w-5 h-5 text-blue-500 transition duration-75 group-hover:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </span>
              <span className="ms-3 whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 text-base">Mi Cuenta</span>
              <svg className="ms-auto w-4 h-4 text-blue-400 transition-transform duration-300 group-hover:text-blue-700" fill="currentColor" viewBox="0 0 20 20" 
                style={{ transform: cuentaOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {cuentaOpen && (
              <ul className="mt-1 space-y-1 pl-6 border-l border-blue-200 ml-3">
                <li>
                  <a href="/PanelAcceso" className="block p-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md">Inicio</a>
                </li>
                <li>
                  <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md">Perfil</a>
                </li>
                <li>
                  <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md">Contraseña</a>
                </li>
                <li>
                  <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md">Configuración</a>
                </li>
                <li>
                  <a href="#" className="block p-2 text-sm text-red-600 hover:bg-red-50 rounded-md">Cerrar sesión</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
}

const DatosPuaForm = () => (
  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Unidad de aprendizaje:</label>
      <input type="text" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="Investigación de operaciones I" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Creditos:</label>
      <input type="number" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="3" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Horas totales:</label>
      <input type="number" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="3" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Horas teoricas:</label>
      <input type="number" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="2" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Horas practicas:</label>
      <input type="number" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="1" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Area:</label>
      <input type="text" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="Ciencias de la Ingeniería" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Núcleo:</label>
      <input type="text" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="Sustantivo" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Tipo:</label>
      <input type="text" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="Obligatorio" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Art. 57 RGA:</label>
      <input type="text" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="NO" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Plan de Estudio:</label>
      <input type="text" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="2009" />
    </div>
  </form>
);

const CompetenciasPerfilEgresoTabs = () => {
  const [tab, setTab] = useState(0);
  // Genéricas
  const genericas = [
    "Conocimiento de la lengua extranjera",
    "La utilización de las TIC’s en el ámbito profesional",
    "Habilidades de investigación",
    "Habilidades cognitivas",
    "Capacidad individual",
    "Capacidades metodológicas",
    "Capacidad de organización",
    "Sensibilidad para temas medioambientales",
    "Destrezas sociales"
  ];
  const [selectedGenericas, setSelectedGenericas] = useState([0, 1, 2]);

  // Específicas
  const especificas = [
    "Diseñar, implantar y operar soluciones tecnológicas controladas mediante sistemas computacionales.",
    "Diseñar, y construir sistemas y componentes de software aplicando las técnicas de los sistemas inteligentes en cualquier ámbito de aplicación.",
    "Esto es solo una prueba"
  ];
  const [selectedEspecificas, setSelectedEspecificas] = useState([0, 1, 2]);

  // Genéricas handlers
  const handleCheck = idx => {
    setSelectedGenericas(selectedGenericas.includes(idx)
      ? selectedGenericas.filter(i => i !== idx)
      : [...selectedGenericas, idx]);
  };
  const handleRemove = idx => {
    setSelectedGenericas(selectedGenericas.filter(i => i !== idx));
  };

  // Específicas handlers
  const handleCheckEsp = idx => {
    setSelectedEspecificas(selectedEspecificas.includes(idx)
      ? selectedEspecificas.filter(i => i !== idx)
      : [...selectedEspecificas, idx]);
  };
  const handleRemoveEsp = idx => {
    setSelectedEspecificas(selectedEspecificas.filter(i => i !== idx));
  };

  return (
    <div>
      <div className="flex border-b mb-4">
        <button type="button" onClick={() => setTab(0)} className={`px-4 py-2 -mb-px border-b-2 ${tab === 0 ? 'border-blue-500 text-blue-700 font-bold bg-white' : 'border-transparent text-gray-500'} focus:outline-none`}>Genéricas</button>
        <button type="button" onClick={() => setTab(1)} className={`px-4 py-2 -mb-px border-b-2 ${tab === 1 ? 'border-blue-500 text-blue-700 font-bold bg-white' : 'border-transparent text-gray-500'} focus:outline-none`}>Específicas</button>
        <button type="button" onClick={() => setTab(2)} className={`px-4 py-2 -mb-px border-b-2 ${tab === 2 ? 'border-blue-500 text-blue-700 font-bold bg-white' : 'border-transparent text-gray-500'} focus:outline-none`}>Competencias de Formación y Unidad</button>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Genéricas */}
        {tab === 0 && (
          <>
            <div className="flex-1">
              <div className="bg-white border rounded p-2">
                {genericas.map((g, idx) => (
                  <label key={g} className="flex items-center gap-2 px-2 py-1 border-b last:border-b-0 cursor-pointer">
                    <input type="checkbox" checked={selectedGenericas.includes(idx)} onChange={() => handleCheck(idx)} />
                    <span className="text-gray-800">{g}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <button type="button" className="border border-blue-700 text-blue-700 bg-white rounded px-3 py-2 mt-6 md:mt-0 flex items-center justify-center h-10 w-10 shadow hover:bg-blue-50 hover:border-blue-800">
                <span className="fa fa-arrow-right" />
              </button>
            </div>
            <div className="flex-1">
              <div className="bg-white border rounded p-2 min-h-[120px]">
                {selectedGenericas.map(idx => (
                  <div key={genericas[idx]} className="flex items-center justify-between px-2 py-1 border-b last:border-b-0">
                    <span className="text-gray-800">{genericas[idx]}</span>
                    <button type="button" className="text-gray-400 hover:text-red-600 ml-2" onClick={() => handleRemove(idx)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {/* Específicas */}
        {tab === 1 && (
          <>
            <div className="flex-1">
              <div className="bg-white border rounded p-2">
                {especificas.map((e, idx) => (
                  <label key={e} className="flex items-center gap-2 px-2 py-1 border-b last:border-b-0 cursor-pointer">
                    <input type="checkbox" checked={selectedEspecificas.includes(idx)} onChange={() => handleCheckEsp(idx)} />
                    <span className="text-gray-800">{e}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <button type="button" className="border border-blue-700 text-blue-700 bg-white rounded px-3 py-2 mt-6 md:mt-0 flex items-center justify-center h-10 w-10 shadow hover:bg-blue-50 hover:border-blue-800">
                <span className="fa fa-arrow-right" />
              </button>
            </div>
            <div className="flex-1">
              <div className="bg-white border rounded p-2 min-h-[120px]">
                {selectedEspecificas.map(idx => (
                  <div key={especificas[idx]} className="flex items-center justify-between px-2 py-1 border-b last:border-b-0">
                    <span className="text-gray-800">{especificas[idx]}</span>
                    <button type="button" className="text-gray-400 hover:text-red-600 ml-2" onClick={() => handleRemoveEsp(idx)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {/* Competencias de Formación y Unidad */}
        {tab === 2 && (
          <form className="w-full flex flex-col gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Competencias del área de formación</label>
              <textarea className="w-full border rounded px-2 py-2 min-h-[60px]" placeholder="" />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Competencia de Unidad de Aprendizaje</label>
              <textarea className="w-full border rounded px-2 py-2 min-h-[60px]" placeholder="" />
            </div>
            <div>
              <button type="submit" className="border border-blue-700 text-blue-700 bg-white rounded px-4 py-2 mt-2 flex items-center gap-2 shadow hover:bg-blue-50 hover:border-blue-800">
                <span className="fa fa-check" />
              </button>
            </div>
          </form>
        )}
      </div>
      {/* Eliminados los botones de la pestaña de Competencias del perfil de Egreso */}
    </div>
  );
};

const BibliografiaSugerida = () => {
  const librosDisponibles = [
    {
      titulo: "BIG JAVA Early Objects",
      autores: "Cay Horstmann",
      editorial: "Wiley"
    },
    {
      titulo: "Cálculo",
      autores: "Ron Larson, Bruce H. Edwards",
      editorial: "McGraw Hill"
    }
  ];
  const [libroSeleccionado, setLibroSeleccionado] = useState(librosDisponibles[0].titulo);
  const [tipo, setTipo] = useState("Básica");
  const [agregados, setAgregados] = useState([
    { ...librosDisponibles[0], tipo: "Básica" },
    { ...librosDisponibles[0], tipo: "Básica" },
    { ...librosDisponibles[1], tipo: "Básica" }
  ]);

  const handleAgregar = e => {
    e.preventDefault();
    const libro = librosDisponibles.find(l => l.titulo === libroSeleccionado);
    if (!libro) return;
    setAgregados([...agregados, { ...libro, tipo }]);
  };
  const handleEliminar = idx => {
    setAgregados(agregados.filter((_, i) => i !== idx));
  };

  return (
    <div className="border rounded bg-gray-50 p-4">
      <form className="flex flex-col md:flex-row gap-4 items-start" onSubmit={handleAgregar}>
        <div className="flex flex-col gap-2 min-w-[200px]">
          <select
            className="border rounded px-2 py-1"
            value={libroSeleccionado}
            onChange={e => setLibroSeleccionado(e.target.value)}
          >
            {librosDisponibles.map(l => (
              <option key={l.titulo} value={l.titulo}>{l.titulo}</option>
            ))}
          </select>
          <div className="flex flex-col gap-1 mt-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="tipo" value="Básica" checked={tipo === "Básica"} onChange={() => setTipo("Básica")}/>
              Básica
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="tipo" value="Complementaria" checked={tipo === "Complementaria"} onChange={() => setTipo("Complementaria")}/>
              Complementaria
            </label>
          </div>
        </div>
        <button type="submit" className="border border-blue-700 text-blue-700 bg-white px-4 py-2 rounded hover:bg-blue-50 hover:border-blue-800">
          <span className="fa fa-arrow-right" />
        </button>
        <div className="flex-1 w-full">
          <div className="bg-white border rounded p-2 min-h-[120px]">
            {agregados.map((l, idx) => (
              <div key={idx} className="flex items-center justify-between px-2 py-1 border-b last:border-b-0 gap-2">
                <div>
                  <div className="font-semibold text-gray-800 leading-tight">{l.titulo}</div>
                  <div className="text-sm text-gray-600 italic">{l.autores}{l.editorial ? `, ${l.editorial}` : ''}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full bg-gray-400 text-white font-semibold`}>{l.tipo}</span>
                  <button type="button" className="text-gray-400 hover:text-red-600 ml-2" onClick={() => handleEliminar(idx)}>
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

const ComiteCurricular = () => {
  // Obtener la fecha actual en formato d/m/yyyy
  const today = new Date();
  const fechaActual = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  return (
    <div className="border rounded bg-gray-50 p-4">
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <tbody>
            <tr className="align-top">
              <td className="border px-2 py-2 w-1/2 font-medium">Nombre y firma de los docentes que participaron en su elaboración</td>
              <td className="border px-2 py-2">
                <select className="w-full border rounded px-2 py-1 mb-2">
                  <option>Seleccione...</option>
                </select>
                <button type="button" className="border rounded bg-gray-200 px-3 py-1 text-sm">Guardar</button>
              </td>
            </tr>
            <tr className="align-top">
              <td className="border px-2 py-2 font-medium">Nombre y firma del Presidente y/o Secretario de la Academia; o en su caso, del responsable del comité Curricular</td>
              <td className="border px-2 py-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Presidente:</span>
                    <input className="border rounded px-2 py-1 flex-1 bg-gray-100" value="Mtro. Enrique Perera Abreu" disabled />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Secretario:</span>
                    <input className="border rounded px-2 py-1 flex-1 bg-gray-100" value="Mtra Diana Concepción Mex Alvarez" disabled />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-2 font-medium">Nombre y firma del coordinador de carrera</td>
              <td className="border px-2 py-2">
                <input className="border rounded px-2 py-1 w-full bg-gray-100" value="Mtra Nancy Geogina Ortiz Cuevas" disabled />
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-2 font-medium">Nombre y firma del Secretario Académico</td>
              <td className="border px-2 py-2">
                <input className="border rounded px-2 py-1 w-full bg-gray-100" value="M. en C Carlos Alfonso Chavez Arias" disabled />
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-2 font-medium">Nombre y firma del Director de la Facultad o Escuela</td>
              <td className="border px-2 py-2">
                <input className="border rounded px-2 py-1 w-full bg-gray-100" value="M. en C. Guadalupe Manuel Estrada Segovia" disabled />
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-2 font-medium">Fecha de elaboración o modificación</td>
              <td className="border px-2 py-2">
                <input className="border rounded px-2 py-1 w-full bg-gray-100" value={fechaActual} disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PerfilAcademicoModal = ({ open, onClose, onAdd, titulo }) => {
  const [perfil, setPerfil] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded shadow-lg w-full max-w-md relative animate-fade-in">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="font-semibold">{titulo}</span>
          <button type="button" className="text-gray-400 hover:text-red-600 text-xl" onClick={onClose}>×</button>
        </div>
        <div className="p-4">
          <label className="block font-semibold mb-1">Perfil:</label>
          <textarea className="w-full border rounded px-2 py-2 min-h-[60px]" value={perfil} onChange={e => setPerfil(e.target.value)} />
        </div>
        <div className="flex justify-end gap-2 border-t px-4 py-2">
          <button type="button" className="border rounded px-4 py-1 bg-white" onClick={onClose}>Cerrar</button>
          <button type="button" className="border border-blue-700 text-blue-700 bg-white rounded px-4 py-1 hover:bg-blue-50 hover:border-blue-800" onClick={() => { onAdd(perfil); setPerfil(""); onClose(); }}>Agregar</button>
        </div>
      </div>
    </div>
  );
};

const PerfilDocenteTabs = () => {
  const [tab, setTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(0); // 0: Académicos, 1: Profesionales, 2: Docentes
  const [perfilesAcademicos, setPerfilesAcademicos] = useState([]);
  const [perfilesProfesionales, setPerfilesProfesionales] = useState([]);
  const [perfilesDocentes, setPerfilesDocentes] = useState([]);

  const handleAddPerfil = (perfil) => {
    if (!perfil.trim()) return;
    if (modalType === 0) setPerfilesAcademicos([...perfilesAcademicos, perfil]);
    else if (modalType === 1) setPerfilesProfesionales([...perfilesProfesionales, perfil]);
    else if (modalType === 2) setPerfilesDocentes([...perfilesDocentes, perfil]);
  };

  return (
    <div>
      <PerfilAcademicoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddPerfil}
        titulo={modalType === 0 ? 'Perfil Académico...' : modalType === 1 ? 'Perfil Profesional...' : 'Perfil Docente...'}
      />
      <div className="flex border-b mb-4">
        <button type="button" onClick={() => setTab(0)} className={`px-8 py-2 -mb-px border-b-2 ${tab === 0 ? 'border-gray-400 text-black bg-white font-semibold' : 'border-transparent text-blue-700'} focus:outline-none`}>Académicos</button>
        <button type="button" onClick={() => setTab(1)} className={`px-8 py-2 -mb-px border-b-2 ${tab === 1 ? 'border-gray-400 text-black bg-white font-semibold' : 'border-transparent text-blue-700'} focus:outline-none`}>Profesionales</button>
        <button type="button" onClick={() => setTab(2)} className={`px-8 py-2 -mb-px border-b-2 ${tab === 2 ? 'border-gray-400 text-black bg-white font-semibold' : 'border-transparent text-blue-700'} focus:outline-none`}>Docentes</button>
      </div>
      <div className="mt-4">
        {tab === 0 && (
          <>
            <button type="button" className="border border-blue-700 text-blue-700 bg-white px-2 py-1 rounded text-xs mb-4 hover:bg-blue-50 hover:border-blue-800" onClick={() => { setModalType(0); setModalOpen(true); }}>Nuevo perfil...</button>
            <div className="space-y-2">
              {perfilesAcademicos.map((perfil, idx) => (
                <div key={idx} className="border rounded p-2 bg-white text-gray-800 text-sm flex items-center justify-between">
                  <span>{perfil}</span>
                  <button type="button"
                    className="text-gray-400 hover:text-red-600 ml-2 text-lg font-bold px-2 py-0.5"
                    onClick={() => setPerfilesAcademicos(perfilesAcademicos.filter((_, i) => i !== idx))}
                    title="Eliminar"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === 1 && (
          <>
            <button type="button" className="border border-blue-700 text-blue-700 bg-white px-2 py-1 rounded text-xs mb-4 hover:bg-blue-50 hover:border-blue-800" onClick={() => { setModalType(1); setModalOpen(true); }}>Nuevo perfil...</button>
            <div className="space-y-2">
              {perfilesProfesionales.map((perfil, idx) => (
                <div key={idx} className="border rounded p-2 bg-white text-gray-800 text-sm flex items-center justify-between">
                  <span>{perfil}</span>
                  <button type="button"
                    className="text-gray-400 hover:text-red-600 ml-2 text-lg font-bold px-2 py-0.5"
                    onClick={() => setPerfilesProfesionales(perfilesProfesionales.filter((_, i) => i !== idx))}
                    title="Eliminar"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === 2 && (
          <>
            <button type="button" className="border border-blue-700 text-blue-700 bg-white px-2 py-1 rounded text-xs mb-4 hover:bg-blue-50 hover:border-blue-800" onClick={() => { setModalType(2); setModalOpen(true); }}>Nuevo perfil...</button>
            <div className="space-y-2">
              {perfilesDocentes.map((perfil, idx) => (
                <div key={idx} className="border rounded p-2 bg-white text-gray-800 text-sm flex items-center justify-between">
                  <span>{perfil}</span>
                  <button type="button"
                    className="text-gray-400 hover:text-red-600 ml-2 text-lg font-bold px-2 py-0.5"
                    onClick={() => setPerfilesDocentes(perfilesDocentes.filter((_, i) => i !== idx))}
                    title="Eliminar"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const EvaluacionFinal = () => {
  const [instrumentos, setInstrumentos] = useState([
    { nombre: '', porcentaje: '' },
    { nombre: '', porcentaje: '' },
    { nombre: '', porcentaje: '' },
    { nombre: '', porcentaje: '' },
  ]);

  const handleChange = (idx, field, value) => {
    setInstrumentos(instrumentos.map((ins, i) => i === idx ? { ...ins, [field]: value } : ins));
  };

  const handleGuardar = e => {
    e.preventDefault();
    // Aquí podrías manejar el guardado
  };

  return (
    <form className="space-y-3" onSubmit={handleGuardar}>
      {instrumentos.map((ins, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <input
            type="text"
            className="flex-1 border rounded px-3 py-2 text-sm"
            placeholder="Instrumentos de evaluacion final"
            value={ins.nombre}
            onChange={e => handleChange(idx, 'nombre', e.target.value)}
          />
          <div className="flex items-center border rounded overflow-hidden w-32">
            <input
              type="number"
              className="w-full px-2 py-2 text-sm border-0 focus:ring-0 focus:outline-none"
              placeholder=""
              value={ins.porcentaje}
              onChange={e => handleChange(idx, 'porcentaje', e.target.value)}
              min="0"
              max="100"
            />
            <span className="bg-gray-100 px-2 py-2 text-gray-600 text-xs border-l">%</span>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button type="submit" className="border border-blue-700 text-blue-700 bg-white px-4 py-2 rounded hover:bg-blue-50 hover:border-blue-800">Guardar</button>
      </div>
    </form>
  );
};

const EvaluacionPorCompetencias = () => {
  const [instrumentos, setInstrumentos] = useState([
    { nombre: 'Exades', porcentaje: '40' },
    { nombre: '', porcentaje: '' },
    { nombre: '', porcentaje: '' },
    { nombre: '', porcentaje: '' },
  ]);

  const handleChange = (idx, field, value) => {
    setInstrumentos(instrumentos.map((ins, i) => i === idx ? { ...ins, [field]: value } : ins));
  };

  const handleGuardar = e => {
    e.preventDefault();
    // Aquí podrías manejar el guardado
  };

  return (
    <form className="space-y-3" onSubmit={handleGuardar}>
      {instrumentos.map((ins, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <input
            type="text"
            className={`flex-1 border rounded px-3 py-2 text-sm${idx === 0 ? ' font-semibold' : ''}`}
            placeholder="Instrumentos de evaluacion por Competencias"
            value={ins.nombre}
            onChange={e => handleChange(idx, 'nombre', e.target.value)}
          />
          <div className="flex items-center border rounded overflow-hidden w-32">
            <input
              type="number"
              className="w-full px-2 py-2 text-sm border-0 focus:ring-0 focus:outline-none"
              placeholder=""
              value={ins.porcentaje}
              onChange={e => handleChange(idx, 'porcentaje', e.target.value)}
              min="0"
              max="100"
            />
            <span className="bg-gray-100 px-2 py-2 text-gray-600 text-xs border-l">%</span>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button type="submit" className="border border-blue-700 text-blue-700 bg-white px-4 py-2 rounded hover:bg-blue-50 hover:border-blue-800">Guardar</button>
      </div>
    </form>
  );
};

const accordionData = [
  { title: "Datos del pua", content: <DatosPuaForm /> },
  { title: "Competencias del Perfil de Egreso", content: <CompetenciasPerfilEgresoTabs /> },
  { title: "Bibliografía sugerida", content: <BibliografiaSugerida /> },
  { title: "Comité Curricular", content: <ComiteCurricular /> },
  { title: "Perfil del docente", content: <PerfilDocenteTabs /> },
  { title: "Evaluación Final", content: <EvaluacionFinal /> },
  { title: "Evaluación Por Competencias", content: <EvaluacionPorCompetencias /> },
];

function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="space-y-2">
      {accordionData.map((item, idx) => (
        <div key={item.title}>
          <button
            type="button"
            className={`w-full text-left px-4 py-2 border rounded bg-gray-50 hover:bg-gray-100 focus:outline-none font-medium text-gray-800 ${openIndex === idx ? 'border-blue-400 bg-blue-50 text-blue-900' : ''}`}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            {item.title}
          </button>
          {openIndex === idx && (
            <div className="p-4 border border-t-0 rounded-b bg-white animate-fade-in text-gray-800">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Modal para nuevo tema
const NuevoTemaModal = ({ open, onClose, onAdd, numero }) => {
  const [tema, setTema] = useState("");
  const [num, setNum] = useState(numero || 1);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded shadow-lg w-full max-w-md relative animate-fade-in text-black">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="font-semibold">Nuevo tema...</span>
          <button type="button" className="text-gray-400 hover:text-red-600 text-xl" onClick={onClose}>×</button>
        </div>
        <div className="p-4">
          <div className="flex gap-4 items-center">
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Número</label>
              <input type="number" className="border rounded px-2 py-1 w-16 text-black" value={num} min={1} onChange={e => setNum(e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-black">Tema</label>
              <input type="text" className="border rounded px-2 py-1 w-full text-black" value={tema} onChange={e => setTema(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t px-4 py-2">
          <button type="button" className="border rounded px-4 py-1 bg-white" onClick={onClose}>Cerrar</button>
          <button type="button" className="border border-blue-700 text-blue-700 bg-white rounded px-4 py-1 hover:bg-blue-50 hover:border-blue-800" onClick={() => { onAdd({ num, tema }); setTema(""); setNum(numero || 1); onClose(); }}>Agregar</button>
        </div>
      </div>
    </div>
  );
};

// Modal para nuevo subtema
const NuevoSubtemaModal = ({ open, onClose, onAdd, numero }) => {
  const [subtema, setSubtema] = useState("");
  const [num, setNum] = useState(numero || 1);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded shadow-lg w-full max-w-md relative animate-fade-in text-black">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="font-semibold">Nuevo subtema...</span>
          <button type="button" className="text-gray-400 hover:text-red-600 text-xl" onClick={onClose}>×</button>
        </div>
        <div className="p-4">
          <div className="flex gap-4 items-center">
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Número</label>
              <input type="number" className="border rounded px-2 py-1 w-16 text-black" value={num} min={1} onChange={e => setNum(e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-black">Subtema</label>
              <input type="text" className="border rounded px-2 py-1 w-full text-black" value={subtema} onChange={e => setSubtema(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t px-4 py-2">
          <button type="button" className="border rounded px-4 py-1 bg-white" onClick={onClose}>Cerrar</button>
          <button type="button" className="border border-blue-700 text-blue-700 bg-white rounded px-4 py-1 hover:bg-blue-50 hover:border-blue-800" onClick={() => { onAdd({ num, subtema }); setSubtema(""); setNum(numero || 1); onClose(); }}>Agregar</button>
        </div>
      </div>
    </div>
  );
};

// Panel de Subcompetencia como componente separado
const SubcompetenciaPanel = ({ nombre, idx, onRemove }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  // Estado para modal y lista de temas
  const [modalTemaOpen, setModalTemaOpen] = useState(false);
  const [modalSubtemaOpen, setModalSubtemaOpen] = useState(false);
  const [temas, setTemas] = useState([]);
  const [subtemasByTema, setSubtemasByTema] = useState({});
  const [mostrarSubtemas, setMostrarSubtemas] = useState(null);
  const [modalActividadOpen, setModalActividadOpen] = useState(false);
  const [actividades, setActividades] = useState([]);
  // Bibliografía
  const [modalBiblioOpen, setModalBiblioOpen] = useState(false);
  const [biblios, setBiblios] = useState([]);
  const bibliosEjemplo = [
    "Fundamentos de programación - Luis Joyanes Aguilar",
    "Cálculo - Ron Larson, Bruce H. Edwards",
    "BIG JAVA Early Objects - Cay Horstmann",
    "Matemáticas avanzadas para ingeniería - Dennis G. Zill",
    "Física universitaria - Sears, Zemansky",
    "Introducción a la estadística - Walpole, Myers"
  ];

  const handleAgregarSubtema = (temaIdx, subtema) => {
    setSubtemasByTema(prev => ({
      ...prev,
      [temaIdx]: prev[temaIdx] ? [...prev[temaIdx], subtema] : [subtema]
    }));
  };

  const handleEliminarSubtema = (temaIdx, subtemaIdx) => {
    setSubtemasByTema(prev => ({
      ...prev,
      [temaIdx]: prev[temaIdx].filter((_, i) => i !== subtemaIdx)
    }));
  };

  return (
    <div className="border rounded bg-white shadow">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="font-semibold text-gray-700">{nombre}</span>
        <button
          type="button"
          className="text-gray-400 hover:text-red-600 ml-4 text-lg font-bold px-2 py-0.5"
          onClick={onRemove}
          title="Eliminar"
        >
          ×
        </button>
      </div>
      {/* Tabs */}
      <div className="border-b flex text-sm bg-white pl-8">
        <button type="button"
          className={`px-6 py-2 border-b-2 bg-white ${activeTab === 0 ? 'border-blue-500 font-semibold text-blue-900' : 'border-transparent text-blue-800 hover:border-blue-400 hover:text-blue-900'}`}
          style={{ backgroundColor: 'white' }}
          onClick={() => setActiveTab(0)}
        >
          Información
        </button>
        <button type="button"
          className={`px-6 py-2 border-b-2 bg-white ${activeTab === 1 ? 'border-blue-500 font-semibold text-blue-900' : 'border-transparent text-blue-800 hover:border-blue-400 hover:text-blue-900'}`}
          style={{ backgroundColor: 'white' }}
          onClick={() => setActiveTab(1)}
        >
          Temas, Actividades y Bibliografía
        </button>
        <button type="button"
          className={`px-6 py-2 border-b-2 bg-white ${activeTab === 2 ? 'border-blue-500 font-semibold text-blue-900' : 'border-transparent text-blue-800 hover:border-blue-400 hover:text-blue-900'}`}
          style={{ backgroundColor: 'white' }}
          onClick={() => setActiveTab(2)}
        >
          Evaluación, Ambientes y Materiales
        </button>
      </div>
      {/* Tab Content */}
      {activeTab === 0 && (
        <div className="p-4">
          <label className="block font-semibold mb-1 text-blue-900">Descripción de la Subcompetencia:</label>
          <textarea className="w-full border rounded px-2 py-2 min-h-[60px] mb-4 text-gray-800 bg-white" placeholder="" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-1 text-blue-900">Sesiones:</label>
              <input type="number" className="w-full border rounded px-2 py-1 text-gray-800 bg-white" defaultValue={0} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-blue-900">Ponderacion:</label>
              <input type="number" className="w-full border rounded px-2 py-1 text-gray-800 bg-white" defaultValue={0} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-blue-900">Número de Subcompetencia:</label>
              <input type="text" className="w-full border rounded px-2 py-1 bg-gray-100 text-gray-800" value={idx+1} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-blue-900">Parcial:</label>
              <select className="w-full border rounded px-2 py-1 text-gray-800 bg-white">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button type="button" className="text-green-600 text-2xl"><span className="fa fa-check" /></button>
          </div>
        </div>
      )}
      {activeTab === 1 && (
        <div className="p-4 flex">
          {/* Subtabs verticales */}
          <div className="flex flex-col border rounded mr-4 min-w-[160px] bg-white pl-4">
            <button type="button"
              className={`px-4 py-2 text-left border-b bg-white ${activeSubTab === 0 ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}
              style={{ backgroundColor: activeSubTab === 0 ? '#EFF6FF' : 'white' }}
              onClick={() => setActiveSubTab(0)}
            >
              Temas
            </button>
            <button type="button"
              className={`px-4 py-2 text-left border-b bg-white ${activeSubTab === 1 ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}
              style={{ backgroundColor: activeSubTab === 1 ? '#EFF6FF' : 'white' }}
              onClick={() => setActiveSubTab(1)}
            >
              Actividades
            </button>
            <button type="button"
              className={`px-4 py-2 text-left bg-white ${activeSubTab === 2 ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}
              style={{ backgroundColor: activeSubTab === 2 ? '#EFF6FF' : 'white' }}
              onClick={() => setActiveSubTab(2)}
            >
              Bibliografía
            </button>
          </div>
          <div className="flex-1">
            <NuevoTemaModal
              open={modalTemaOpen}
              onClose={() => setModalTemaOpen(false)}
              onAdd={nuevo => setTemas([...temas, nuevo])}
              numero={temas.length + 1}
            />
            <NuevoSubtemaModal
              open={modalSubtemaOpen !== false && modalSubtemaOpen !== null}
              onClose={() => setModalSubtemaOpen(false)}
              onAdd={nuevo => { handleAgregarSubtema(modalSubtemaOpen, nuevo); setModalSubtemaOpen(false); }}
              numero={subtemasByTema[modalSubtemaOpen]?.length + 1 || 1}
            />
            <NuevaBibliografiaModal
              open={modalBiblioOpen}
              onClose={() => setModalBiblioOpen(false)}
              onAdd={b => setBiblios([...biblios, b])}
              ejemplos={bibliosEjemplo}
            />
            <div className="flex justify-between items-center mb-2">
              {activeSubTab === 0 && <button type="button" className="border border-blue-700 text-blue-700 bg-white px-2 py-1 rounded text-xs mb-2 hover:bg-blue-50 hover:border-blue-800" onClick={() => setModalTemaOpen(true)}>Nuevo tema...</button>}
              {activeSubTab === 2 && <button type="button" className="border border-blue-700 text-blue-700 bg-white px-2 py-1 rounded text-xs mb-2 hover:bg-blue-50 hover:border-blue-800" onClick={() => setModalBiblioOpen(true)}>Nueva bibliografía...</button>}
            </div>
            {/* Placeholder de contenido */}
            {activeSubTab === 0 && temas.length === 0 && (
              <div className="border rounded bg-gray-50 p-4 text-gray-500 text-sm">
                Seleccione una opción del menú lateral.
              </div>
            )}
            {activeSubTab === 0 && temas.length > 0 && (
              <table className="w-full border text-black text-sm bg-white">
                <tbody>
                  {temas.map((t, i) => (
                    <React.Fragment key={i}>
                      <tr className="border-b last:border-b-0">
                        <td className="border px-2 py-1 w-10 text-center align-middle text-black">{t.num}</td>
                        <td className="border px-2 py-1 align-middle text-black">{t.tema}</td>
                        <td className="border px-2 py-1 align-middle w-1 whitespace-nowrap">
                          <button type="button" className="text-gray-400 hover:text-red-600 text-base px-2" title="Eliminar" onClick={() => setTemas(temas.filter((_, idx) => idx !== i))}>×</button>
                        </td>
                        <td className="border px-2 py-1 align-middle w-1 whitespace-nowrap">
                          <button type="button" className="border border-blue-700 text-blue-700 bg-white px-2 py-1 rounded text-xs mr-1 hover:bg-blue-50 hover:border-blue-800" onClick={() => setModalSubtemaOpen(i)}>Agregar Subtema</button>
                          <button type="button" className="border border-blue-700 text-blue-700 bg-white px-2 py-1 rounded text-xs hover:bg-blue-50 hover:border-blue-800" onClick={() => setMostrarSubtemas(mostrarSubtemas === i ? null : i)}>Mostrar subtemas</button>
                        </td>
                      </tr>
                      {mostrarSubtemas === i && subtemasByTema[i] && (
                        <tr>
                          <td colSpan={4} className="p-2 bg-gray-50">
                            <div className="flex items-center border rounded p-2 bg-white">
                              <ul className="flex-1">
                                {subtemasByTema[i].map((s, j) => (
                                  <li key={j} className="flex items-center justify-between text-black">
                                    <span>{s.num}. {s.subtema}</span>
                                    <button type="button" className="text-gray-400 hover:text-red-600 ml-2" onClick={() => handleEliminarSubtema(i, j)}>×</button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
            {activeSubTab === 1 && (
              <div>
                <button type="button" className="border border-blue-700 text-blue-700 bg-white px-2 py-1 rounded text-xs mb-2 hover:bg-blue-50 hover:border-blue-800" onClick={() => setModalActividadOpen(true)}>Nueva actividad...</button>
                <table className="w-full border text-black text-sm bg-white">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1 font-semibold text-center">Alumno</th>
                      <th className="border px-2 py-1 font-semibold text-center">Docente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Aquí se mostrarán las actividades capturadas */}
                    {actividades.length === 0 && (
                      <tr>
                        <td className="border px-2 py-4 text-center" colSpan={2}></td>
                      </tr>
                    )}
                    {actividades.map((a, idx) => (
                      <tr key={idx}>
                        <td className="border px-2 py-1">{a.alumno}</td>
                        <td className="border px-2 py-1">{a.docente}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <NuevoActividadModal
                  open={modalActividadOpen}
                  onClose={() => setModalActividadOpen(false)}
                  onAdd={act => setActividades([...actividades, act])}
                />
              </div>
            )}
            {activeSubTab === 2 && (
              <div>
                {biblios.length === 0 ? (
                  <div className="border rounded bg-gray-50 p-4 text-gray-500 text-sm">No hay bibliografía agregada.</div>
                ) : (
                  <ul className="divide-y divide-gray-200 bg-white rounded border">
                    {biblios.map((b, i) => (
                      <li key={i} className="flex items-center justify-between px-3 py-2 text-black">
                        <span>{b}</span>
                        <button type="button" className="text-gray-400 hover:text-red-600 ml-2" onClick={() => setBiblios(biblios.filter((_, idx) => idx !== i))}>×</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {activeTab === 2 && (
        <div className="p-4 flex">
          {/* Subtabs verticales para Evaluación, Ambientes y Materiales */}
          <div className="flex flex-col border rounded mr-4 min-w-[220px] bg-white pl-4">
            <button type="button"
              className={`px-4 py-2 text-left border-b bg-white ${activeSubTab === 0 ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}
              style={{ backgroundColor: activeSubTab === 0 ? '#EFF6FF' : 'white' }}
              onClick={() => setActiveSubTab(0)}
            >
              Criterios
            </button>
            <button type="button"
              className={`px-4 py-2 text-left border-b bg-white ${activeSubTab === 1 ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}
              style={{ backgroundColor: activeSubTab === 1 ? '#EFF6FF' : 'white' }}
              onClick={() => setActiveSubTab(1)}
            >
              Evidencias
            </button>
            <button type="button"
              className={`px-4 py-2 text-left border-b bg-white ${activeSubTab === 2 ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}
              style={{ backgroundColor: activeSubTab === 2 ? '#EFF6FF' : 'white' }}
              onClick={() => setActiveSubTab(2)}
            >
              Ambiente de trabajo o aprendizaje
            </button>
            <button type="button"
              className={`px-4 py-2 text-left bg-white ${activeSubTab === 3 ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}
              style={{ backgroundColor: activeSubTab === 3 ? '#EFF6FF' : 'white' }}
              onClick={() => setActiveSubTab(3)}
            >
              Materiales y recursos didácticos
            </button>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              {activeSubTab === 0 && <button type="button" className="border border-blue-700 text-blue-700 bg-white px-2 py-1 rounded text-xs hover:bg-blue-50 hover:border-blue-800">Nuevo criterio</button>}
              {activeSubTab === 1 && <button type="button" className="border border-blue-700 text-blue-700 bg-white px-2 py-1 rounded text-xs hover:bg-blue-50 hover:border-blue-800">Nueva evidencia</button>}
              {activeSubTab === 2 && <button type="button" className="border border-blue-700 text-blue-700 bg-white px-2 py-1 rounded text-xs hover:bg-blue-50 hover:border-blue-800">Nuevo ambiente</button>}
              {activeSubTab === 3 && <button type="button" className="border border-blue-700 text-blue-700 bg-white px-2 py-1 rounded text-xs hover:bg-blue-50 hover:border-blue-800">Nuevo material</button>}
            </div>
            {/* Placeholder de contenido */}
            <div className="border rounded bg-gray-50 p-4 text-gray-500 text-sm">Seleccione una opción del menú lateral.</div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProcesarPua = () => {
  const [subcompetencias, setSubcompetencias] = useState([]);
  const [estadisticasOpen, setEstadisticasOpen] = useState(false);
  const [cuentaOpen, setCuentaOpen] = useState(false);
  const handleAgregarSubcompetencia = () => {
    setSubcompetencias([...subcompetencias, `Subcompetencia ${subcompetencias.length + 1}`]);
  };
  const handleSidebarMouseLeave = () => {
    setEstadisticasOpen(false);
    setCuentaOpen(false);
  };

  return (
    <div className="min-h-screen w-screen h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header + Sidebar pegados */}
        <div className="flex w-full">
          <div className="flex flex-col">
            <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center px-6 py-2 h-[78px] w-full fixed left-0 top-0 z-30 transition-all duration-300 text-gray-700 dark:text-gray-100">
          <div className="flex items-center gap-2">
          <a href="/PanelAcceso">
            <img src="../src/imagenes/imagen_salida1.png" alt="UAC Logo" className="w-12 h-12 object-contain cursor-pointer" />
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
        {/* Main Content, scrollable only here */}
        <main className="flex-1 flex flex-col items-center justify-start pt-28 pb-8 overflow-y-auto ml-16 md:ml-20 transition-all duration-300 h-[calc(100vh)] scrollbar-thin scrollbar-thumb-gray-300 w-full">
          <div className="w-full max-w-4xl mx-auto">
            <div className="text-center text-lg font-semibold text-gray-700 dark:text-gray-100 mb-4">
              {/* Bienvenida dinámica con datos de la API */}
              {(() => {
                const [docente, setDocente] = React.useState(null);
                React.useEffect(() => {
                  const user = JSON.parse(localStorage.getItem("user"));
                  if (user && user.id_docente) {
                    fetch(`http://localhost:8000/api/docente/${user.id_docente}`)
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.success) setDocente(data.docente);
                      });
                  }
                }, []);
                if (!docente) return "Bienvenido";
                const titulo = docente.titulo ? docente.titulo : '';
                const nombre = docente.nombre ? docente.nombre : '';
                const apellidoP = docente.apellido_paterno ? docente.apellido_paterno : '';
                const apellidoM = docente.apellido_materno ? docente.apellido_materno : '';
                return `Bienvenido${titulo ? ' ' + titulo : ''}${nombre ? ' ' + nombre : ''}${apellidoP ? ' ' + apellidoP : ''}${apellidoM ? ' ' + apellidoM : ''}`.trim();
              })()}
            </div>
            <div className="bg-white border rounded-xl shadow p-6 mb-8">
              <div className="text-center text-base font-bold text-gray-700 mb-4">Programa de aprendizaje</div>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-gray-700 font-semibold mb-1">Facultad:</label>
                  <select className="w-full border dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 dark:text-gray-100">
                    <option>Enfermería</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                   <label className="block text-gray-700 font-semibold mb-1">Carrera:</label>
                  <select className="w-full border dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 dark:text-gray-100">
                    <option>Seleccione una carrera...</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-gray-700 font-semibold mb-1">Materia:</label>
                  <select className="w-full border dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 dark:text-gray-100">
                    <option>Seleccione una materia...</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Pestañas desplegables tipo acordeón */}
            <div className="bg-white border rounded-xl shadow p-4">
              <Accordion />
            </div>
            {/* Renderizar pestañas de subcompetencias */}
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
      {/* Footer eliminado */}
    </div>
  );
};

// Modal para nueva bibliografía
const NuevaBibliografiaModal = ({ open, onClose, onAdd, ejemplos }) => {
  const [selected, setSelected] = React.useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded shadow-lg w-full max-w-md relative animate-fade-in text-black">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="font-semibold">Nueva bibliografía...</span>
          <button type="button" className="text-gray-400 hover:text-red-600 text-xl" onClick={onClose}>×</button>
        </div>
        <div className="p-4">
          <div className="flex gap-2 items-center">
            <select className="border rounded px-2 py-1 w-full text-black" value={selected} onChange={e => setSelected(e.target.value)}>
              <option value="">Seleccione libro...</option>
              {ejemplos.map((ej, i) => (
                <option key={i} value={ej}>{ej}</option>
              ))}
            </select>
            <button type="button" className="border border-blue-700 text-blue-700 bg-white rounded px-3 py-1 hover:bg-blue-50 hover:border-blue-800" onClick={() => { if(selected) { onAdd(selected); setSelected(""); onClose(); } }}>➤</button>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t px-4 py-2">
          <button type="button" className="border rounded px-4 py-1 bg-white text-black" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

// Modal para nueva actividad
const NuevoActividadModal = ({ open, onClose, onAdd }) => {
  const [alumno, setAlumno] = React.useState("");
  const [docente, setDocente] = React.useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded shadow-lg w-full max-w-md relative animate-fade-in text-black">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="font-semibold">Nueva actividad...</span>
          <button type="button" className="text-gray-400 hover:text-red-600 text-xl" onClick={onClose}>×</button>
        </div>
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Alumno</label>
              <input type="text" className="border rounded px-2 py-1 w-full text-black" value={alumno} onChange={e => setAlumno(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Docente</label>
              <input type="text" className="border rounded px-2 py-1 w-full text-black" value={docente} onChange={e => setDocente(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t px-4 py-2">
          <button type="button" className="border rounded px-4 py-1 bg-white text-black" onClick={onClose}>Cerrar</button>
          <button type="button" className="border border-blue-700 text-blue-700 bg-white rounded px-4 py-1 hover:bg-blue-50 hover:border-blue-800" onClick={() => { onAdd({ alumno, docente }); setAlumno(""); setDocente(""); onClose(); }}>Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default ProcesarPua;
