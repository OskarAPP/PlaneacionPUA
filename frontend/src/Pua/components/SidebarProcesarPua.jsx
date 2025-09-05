import React from "react";


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

export default SidebarProcesarPua;
