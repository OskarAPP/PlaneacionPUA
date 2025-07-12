import React, { useState, useRef } from "react";
import Sidebar from "../Components/Sidebar";

const CompetenciasE = () => {






  // Estado y refs para Sidebar modular
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [cuentaOpen, setCuentaOpen] = useState(false);
  const docentesRef = useRef(null);
  const carrerasRef = useRef(null);
  const materiasRef = useRef(null);
  const academiasRef = useRef(null);
  const facultadRef = useRef(null);
  const compeGenRef = useRef(null);
  const compeEspecRef = useRef(null);
  const bibliotecaRef = useRef(null);
  const cuentaRef = useRef(null);

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
        refs={{
          docentesRef,
          carrerasRef,
          materiasRef,
          academiasRef,
          facultadRef,
          compeGenRef,
          compeEspecRef,
          bibliotecaRef,
          cuentaRef
        }}
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
            {/* Buscador y filtros */}
            <div className="bg-[#3578b3] text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2 dark:bg-blue-900">Buscar</div>
            <div className="bg-white border rounded-b-md p-6 flex flex-col gap-6 dark:bg-gray-800 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-2">
                <div>
                  <label className="block text-gray-800 font-bold mb-1 dark:text-gray-200">Academia:</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4-4m0 0A7 7 0 104 4a7 7 0 0013 13z" /></svg>
                    </span>
                    <input type="text" placeholder="Nombre de la Competencias Específicas" className="w-full border rounded pl-10 pr-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-1 dark:text-gray-200">Ordenar alfabéticamente por:</label>
                  <select className="w-full border rounded px-3 py-2 text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
                    <option value="az">A a Z</option>
                    <option value="za">Z a A</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Tabla de Competencias Específicas */}
            <div className="bg-[#d4ecfa] text-[#3578b3] text-base font-semibold rounded-t-md px-4 py-2 text-center border-b border-[#b5d6ea] dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900">Lista de Competencias Específicas</div>
            <div className="overflow-x-auto dark:bg-gray-800 dark:shadow-2xl">
              <table className="min-w-full border border-[#b5d6ea] dark:border-gray-700 dark:text-blue-200">
                <thead>
                  <tr className="bg-white dark:bg-gray-900 dark:border-gray-700">
                    <th className="border border-[#b5d6ea] px-4 py-2 text-center font-bold w-24 dark:border-gray-700">Eliminar</th>
                    <th className="border border-[#b5d6ea] px-4 py-2 text-center font-bold w-8 dark:border-gray-700">#</th>
                    <th className="border border-[#b5d6ea] px-4 py-2 text-center font-bold dark:border-gray-700">Competencia Específica</th>
                    <th className="border border-[#b5d6ea] px-4 py-2 text-center font-bold dark:border-gray-700">Carrera</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="dark:bg-gray-900 dark:border-gray-700">
                    <td className="border border-[#b5d6ea] px-2 py-2 text-center align-middle font-semibold w-20 dark:border-gray-700">
                      <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded text-xs dark:bg-red-800 dark:hover:bg-red-900">Eliminar</button>
                    </td>
                    <td className="border border-[#b5d6ea] px-4 py-2 text-center align-middle font-semibold dark:border-gray-700">1</td>
                    <td className="border border-[#b5d6ea] px-4 py-2 dark:border-gray-700">Diseñar, implantar y operar soluciones tecnológicas controladas mediante sistemas computacionales.</td>
                    <td className="border border-[#b5d6ea] px-4 py-2 dark:border-gray-700">
                      <select className="w-full border rounded px-2 py-1 text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
                        <option>Licenciatura en Administración y Finanzas</option>
                        <option>Ingeniería en Sistemas Computacionales</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="dark:bg-gray-900 dark:border-gray-700">
                    <td className="border border-[#b5d6ea] px-2 py-2 text-center align-middle font-semibold w-20 dark:border-gray-700">
                      <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded text-xs dark:bg-red-800 dark:hover:bg-red-900">Eliminar</button>
                    </td>
                    <td className="border border-[#b5d6ea] px-4 py-2 text-center align-middle font-semibold dark:border-gray-700">2</td>
                    <td className="border border-[#b5d6ea] px-4 py-2 dark:border-gray-700">Diseñar, y construir sistemas y componentes de software aplicando las técnicas de los sistemas inteligentes en cualquier ámbito de aplicación.</td>
                    <td className="border border-[#b5d6ea] px-4 py-2 dark:border-gray-700">
                      <select className="w-full border rounded px-2 py-1 text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
                        <option>Ingeniería en Sistemas Computacionales</option>
                        <option>Licenciatura en Administración y Finanzas</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Segunda tabla o sección si es necesario */}
            {/* Puedes agregar aquí otra tabla si la imagen lo requiere */}
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

export default CompetenciasE;
