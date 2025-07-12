import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Components/Sidebar";

const Materias = () => {
  // Estado y referencias para Sidebar modular
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [cuentaOpen, setCuentaOpen] = useState(false);
  const cuentaRef = useRef(null);
  const docentesRef = useRef(null);
  const carrerasRef = useRef(null);
  const materiasRef = useRef(null);
  const academiasRef = useRef(null);
  const facultadRef = useRef(null);
  const compeGenRef = useRef(null);
  const compeEspecRef = useRef(null);
  const refs = { cuentaRef, docentesRef, carrerasRef, materiasRef, academiasRef, facultadRef, compeGenRef, compeEspecRef };
  const [materias, setMaterias] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("az");

  // ...

  useEffect(() => {
    fetch("http://localhost:8000/api/materias")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.materias)) setMaterias(data.materias);
        else if (Array.isArray(data)) setMaterias(data);
        else setMaterias([]);
      })
      .catch(() => setMaterias([]));
  }, []);

  // ...

  const handleDelete = async (id) => {
    if (!window.confirm("¿Está seguro de eliminar la materia?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/materias/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Refrescar la lista desde el backend para asegurar que la materia se eliminó en la base de datos
        const materiasRes = await fetch("http://localhost:8000/api/materias");
        const materiasData = await materiasRes.json();
        if (Array.isArray(materiasData.materias)) setMaterias(materiasData.materias);
        else if (Array.isArray(materiasData)) setMaterias(materiasData);
        else setMaterias([]);
      } else {
        alert("Error al eliminar la materia.");
      }
    } catch {
      alert("Error de conexión con el servidor.");
    }
  };

  const filteredMaterias = materias.filter((m) =>
    (m.nombre || '').toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    if (!a.nombre || !b.nombre) return 0;
    if (sortOrder === "az") return a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' });
    else return b.nombre.localeCompare(a.nombre, 'es', { sensitivity: 'base' });
  });

  return (
    <div className="min-h-screen w-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar modular */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        cuentaOpen={cuentaOpen}
        setCuentaOpen={setCuentaOpen}
        refs={refs}
        activeSection="materias"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-3 py-1 shadow-sm min-h-0 h-12">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 rounded bg-white dark:bg-gray-800 border border-blue-700 dark:border-blue-400 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-800 dark:hover:border-blue-500 focus:outline-none transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-800 dark:text-gray-100 font-semibold leading-tight text-right">
              Programas de Unidad<br />de Aprendizaje
            </span>
            <img src="../src/imagenes/imagen_salida1.png" alt="UAC Logo" className="w-8 h-8 object-contain" />
          </div>
        </header>
        {/* Main Body */}
        <main className="flex-1 flex flex-col items-center py-8 overflow-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className="w-full max-w-5xl">
            {/* Barra de búsqueda y ordenamiento */}
            <div className="bg-blue-700 dark:bg-blue-900 text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center">Buscar</div>
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-b-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2">
                <label htmlFor="materia-search" className="font-semibold text-gray-800 dark:text-gray-200 mr-2 min-w-fit">Materia:</label>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>
                  </span>
                  <input id="materia-search" type="text" placeholder="Nombre de la Materia" className="pl-10 pr-3 py-2 border border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 min-w-fit">
                <label htmlFor="ordenar" className="font-semibold text-gray-800 dark:text-gray-200 mr-2">Ordenar alfabéticamente por:</label>
                <select id="ordenar" className="border border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                  <option value="az">A a Z</option>
                  <option value="za">Z a A</option>
                </select>
              </div>
            </div>
            {/* Tabla de materias */}
            <div className="mt-6">
              <div className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 text-lg font-medium rounded-t-md px-4 py-2 text-center">Lista de materias</div>
              <div className="overflow-x-auto border dark:border-gray-700 rounded-b-md">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                  <thead className="bg-white dark:bg-gray-900">
                    <tr>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase"></th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">#</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">Materia</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">Facultad</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">Carrera</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">Área</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">Núcleo</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">Tipo</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">Art57</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">Academia</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">Horas Prácticas</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">Horas Teóricas</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">Horas Totales</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">Créditos Totales</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
                    {filteredMaterias.length === 0 ? (
                      <tr><td colSpan={12} className="text-center py-4 text-gray-400 dark:text-gray-500">No hay materias registradas.</td></tr>
                    ) : (
                      filteredMaterias.map((materia, idx) => (
                        <tr key={materia.materia_id || idx} className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200 font-semibold">
                            <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 focus:outline-none" title="Eliminar" onClick={() => handleDelete(materia.materia_id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </td>
                          <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200 font-semibold">{idx + 1}</td>
                          <td className="px-2 py-2 whitespace-nowrap text-sm text-blue-800 dark:text-blue-200 font-bold">{materia.nombre}</td>
                          <td className="px-2 py-2 whitespace-nowrap text-sm">{materia.facultad_nombre || (materia.facultad && materia.facultad.nombre) || '-'}</td>
                          <td className="px-2 py-2 whitespace-nowrap text-sm">{materia.carrera_nombre || (materia.carrera && materia.carrera.nombre) || '-'}</td>
                          <td className="px-2 py-2 whitespace-nowrap text-sm">{materia.area_nombre || '-'}</td>
                          <td className="px-2 py-2 whitespace-nowrap text-sm">{materia.nucleo_nombre || '-'}</td>
                          <td className="px-2 py-2 whitespace-nowrap text-sm">{materia.tipo_materia_nombre || '-'}</td>
                          <td className="px-2 py-2 whitespace-nowrap text-sm">{materia.art57}</td>
                          <td className="px-2 py-2 whitespace-nowrap text-sm">{materia.academia_nombre || '-'}</td>
                          <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200 text-center">{materia.horas_practicas}</td>
                          <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200 text-center">{materia.horas_teoricas}</td>
                          <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200 text-center">{materia.horas_totales}</td>
                          <td className="px-2 py-2 whitespace-nowrap text-sm text-blue-700 dark:text-blue-300 font-bold text-center">{materia.creditos_totales}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer className="bg-gray-600/90 dark:bg-gray-900 text-white py-4 flex flex-col items-center mt-auto shadow-glass">
          <img src="../src/imagenes/imagen_salida1.png" alt="Facultad de Ingeniería" className="w-16 h-16 mb-2" />
          <div className="text-center text-sm">
            Facultad de Ingeniería<br />
            Laboratorio de Diseño de Aplicaciones Móviles
          </div>
        </footer>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: #fff;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2563eb;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default Materias;
