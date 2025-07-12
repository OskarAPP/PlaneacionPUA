import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Components/Sidebar";

const Academias = () => {



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
  const [academias, setAcademias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/api/academias')
      .then(res => res.ok ? res.json() : Promise.reject('Error al cargar academias'))
      .then(data => {
        setAcademias(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setError('No se pudieron cargar las academias');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen w-screen flex bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Sidebar modular */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        cuentaOpen={cuentaOpen}
        setCuentaOpen={setCuentaOpen}
        refs={refs}
        activeSection="academias"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 flex items-center justify-between px-3 py-1 shadow-sm min-h-0 h-12 dark:bg-gray-800 dark:border-gray-700">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 rounded bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 focus:outline-none transition-colors dark:bg-gray-800 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-700 dark:hover:border-blue-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-800 font-semibold leading-tight text-right dark:text-gray-100">
              Programas de Unidad<br />de Aprendizaje
            </span>
            <img src="../src/imagenes/imagen_salida1.png" alt="UAC Logo" className="w-8 h-8 object-contain" />
          </div>
        </header>
        {/* Main Body */}
        <main className="flex-1 flex flex-col items-center py-8 overflow-auto">
          <div className="w-full max-w-5xl">
            {/* Buscador y ordenamiento */}
            <div className="bg-[#3578b3] text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2 dark:bg-blue-900">Buscar</div>
            <div className="bg-white border rounded-b-md p-4 flex flex-col md:flex-row md:items-end gap-4 mb-4 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Academia:</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-4-4m0 0A7 7 0 105 5a7 7 0 0012 12z' /></svg>
                  </span>
                  <input type="text" placeholder="Nombre de la Academia" className="pl-10 pr-3 py-2 border rounded w-full focus:outline-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                </div>
              </div>
              <div className="flex-1 md:max-w-xs">
                <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Ordenar alfabéticamente por:</label>
                <select className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
                  <option>A a Z</option>
                  <option>Z a A</option>
                </select>
              </div>
            </div>
            {/* Tabla de academias */}
            <div className="bg-[#d6edf9] text-[#1a3c5a] text-base font-semibold rounded-t-md px-4 py-2 text-center border border-[#b5d6ea] dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900">Lista de Academias</div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-4 text-center">Cargando academias...</div>
              ) : error ? (
                <div className="p-4 text-center text-red-600">{error}</div>
              ) : (
                <table className="min-w-full border border-[#b5d6ea] dark:border-blue-900">
                  <thead>
                    <tr className="bg-white dark:bg-gray-900">
                      <th className="border border-[#b5d6ea] px-3 py-2 text-left w-12 dark:border-blue-900"></th>
                      <th className="border border-[#b5d6ea] px-3 py-2 text-left dark:border-blue-900">#</th>
                      <th className="border border-[#b5d6ea] px-3 py-2 text-left dark:border-blue-900">Academia</th>
                      <th className="border border-[#b5d6ea] px-3 py-2 text-left dark:border-blue-900">Facultad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {academias.length === 0 ? (
                      <tr><td colSpan="4" className="text-center py-4">No hay academias registradas.</td></tr>
                    ) : (
                      academias.map((row, idx) => (
                        <tr key={row.academia_id} className="dark:hover:bg-gray-700">
                          <td className="border border-[#b5d6ea] px-2 py-2 text-center dark:border-blue-900">
                            {/* Botón de eliminar (opcional, implementar funcionalidad si se requiere) */}
                          </td>
                          <td className="border border-[#b5d6ea] px-3 py-2 dark:border-blue-900">{idx + 1}</td>
                          <td className="border border-[#b5d6ea] px-3 py-2 dark:border-blue-900">{row.nombre}</td>
                          <td className="border border-[#b5d6ea] px-3 py-2 dark:border-blue-900">{row.facultad_nombre || '-'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer className="bg-gray-600/90 text-white py-4 flex flex-col items-center mt-auto shadow-glass dark:bg-gray-900/90 dark:text-gray-200">
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
        @media (prefers-color-scheme: dark) {
          .custom-scrollbar::-webkit-scrollbar {
            background: #1a202c;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #2563eb;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #1a202c;
          }
        }
      `}</style>
    </div>
  );
};

export default Academias;
