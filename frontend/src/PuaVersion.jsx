import React, { useState, useRef, useEffect } from "react";

const PuaVersion = () => {
  // Solo dos estados para los submenús del sidebar
  const [estadisticasOpen, setEstadisticasOpen] = useState(false);
  const [cuentaOpen, setCuentaOpen] = useState(false);

  // Cierra los submenús cuando el puntero sale del sidebar
  const handleSidebarMouseLeave = () => {
    setEstadisticasOpen(false);
    setCuentaOpen(false);
  };

  return (
    <div className="min-h-screen w-screen h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 py-2 transition-colors z-30">
        <div className="flex items-center gap-2">
          <a href="/PanelAcceso">
            <img src="../src/imagenes/imagen_salida1.png" alt="UAC Logo" className="w-12 h-12 object-contain cursor-pointer" />
          </a>
          <div className="ml-2">
            <div className="text-xs text-gray-700 dark:text-gray-200 leading-tight"></div>
          </div>
        </div>
        <nav className="flex-1 flex items-center ml-8">
        </nav>
      </header>

      {/* SIDEBAR */}
      <aside
        className="fixed left-0 top-[78px] z-20 w-16 hover:w-64 h-[calc(100vh-78px)] transition-all duration-300 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden"
        aria-label="Sidebar"
        onMouseLeave={handleSidebarMouseLeave}
      >
        <div className="h-full px-2 py-4 flex flex-col">
          <ul className="space-y-1 font-medium">
            {/* Menú PUA */}
            <li>
              <a
                href="/procesarpua"
                className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 transition-colors group"
              >
                <span className="min-w-[20px] flex justify-center items-center">
                  {/* Icono de documento */}
                  <svg className="w-5 h-5 text-blue-500 transition duration-75 group-hover:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 3a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7.828a2 2 0 00-.586-1.414l-4.828-4.828A2 2 0 0013.172 1H7zm0 0v2a2 2 0 002 2h6a2 2 0 002-2V3m-8 8h8m-8 4h8" />
                  </svg>
                </span>
                <span className="ms-3 whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 text-base">Crear PUA</span>
              </a>
            </li>
            {/* Menú estadísticas (con submenú) */}
            <li className="relative">
              <button
                onClick={() => setEstadisticasOpen((v) => !v)}
                className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-blue-100 transition-colors group focus:outline-none bg-transparent"
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
            {/* Menú Mi Cuenta (con submenú) */}
            <li className="relative">
              <button
                onClick={() => setCuentaOpen((v) => !v)}
                className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-blue-100 transition-colors group focus:outline-none bg-transparent"
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
                    <a href="/perfilusuario" className="block p-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md">Perfil</a>
                  </li>
                  <li>
                    <a href="/perfilusuario" className="block p-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md">Contraseña</a>
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-8 overflow-auto">
        <div className="w-full max-w-5xl">
          {/* Barra de búsqueda */}
          <div className="bg-blue-700 dark:bg-blue-900 text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2">Buscar</div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-md p-4 flex flex-col gap-4 mb-6">
            <div className="font-bold text-gray-700 dark:text-gray-200 mb-2">PUA por Materia:</div>
            <div className="flex items-center w-full max-w-xl mx-auto">
              <span className="absolute pl-3 text-gray-400 dark:text-gray-500"><i className="fa fa-search" /></span>
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700"
                placeholder="Nombre de la Materia"
              />
            </div>
          </div>

          {/* Lista de PUAs */}
          <div className="bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-100 text-center font-semibold rounded-t-md py-2 mb-0.5">Lista de PUA´S</div>
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-b-md shadow">
            <table className="min-w-full text-sm text-left text-blue-900 dark:text-blue-100">
              <thead>
                <tr className="border-b bg-blue-50 dark:bg-blue-900">
                  <th className="px-3 py-2 font-bold">#</th>
                  <th className="px-3 py-2 font-bold">Materia</th>
                  <th className="px-3 py-2 font-bold">Plan de Estudio</th>
                  <th className="px-3 py-2 font-bold">Versión</th>
                </tr>
              </thead>
              <tbody className="text-blue-900 dark:text-blue-100">
                {/* Aquí irían los datos de las PUAs */}
              </tbody>
            </table>
          </div>
        </div>
      </main>

    {/* Footer */}
          <footer className="bg-gray-600/90 dark:bg-gray-900 text-white py-4 flex flex-col items-center mt-auto shadow-glass">
            <img src="../src/imagenes/imagen_salida1.png" alt="Facultad de Ingeniería" className="w-16 h-16 mb-2" />
            <div className="text-center text-sm text-white dark:text-gray-300">
              Facultad de Ingeniería<br />
              Laboratorio de Diseño de Aplicaciones Móviles
            </div>
          </footer>
        </div>
      );
    };

    export default PuaVersion;