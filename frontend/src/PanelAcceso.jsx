import React, { useState, useRef, useEffect } from "react";

const PanelAcceso = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [estadisticasOpen, setEstadisticasOpen] = useState(false);
  const [cuentaOpen, setCuentaOpen] = useState(false);
  const [docente, setDocente] = useState(null);
  const [greeting, setGreeting] = useState("");
  const dropdownRef = useRef(null);
  const estadisticasRef = useRef(null);
  const cuentaRef = useRef(null);

  // Asegura fondo claro en body y html
  useEffect(() => {
    const prevBodyBg = document.body.style.backgroundColor;
    const prevHtmlBg = document.documentElement.style.backgroundColor;
    document.body.style.backgroundColor = '#f9fafb'; // Tailwind bg-gray-50
    document.documentElement.style.backgroundColor = '#f9fafb';
    document.body.style.minHeight = '100vh';
    document.documentElement.style.minHeight = '100vh';
    return () => {
      document.body.style.backgroundColor = prevBodyBg;
      document.documentElement.style.backgroundColor = prevHtmlBg;
      document.body.style.minHeight = '';
      document.documentElement.style.minHeight = '';
    };
  }, []);

  // Saludo dinámico
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Buenos días");
    else if (hour < 18) setGreeting("Buenas tardes");
    else setGreeting("Buenas noches");
  }, []);

  // Cerrar menús si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (estadisticasRef.current && !estadisticasRef.current.contains(event.target)) {
        setEstadisticasOpen(false);
      }
      if (cuentaRef.current && !cuentaRef.current.contains(event.target)) {
        setCuentaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cerrar sidebar si se hace clic fuera
  useEffect(() => {
    function handleSidebarClickOutside(event) {
      const sidebar = document.querySelector('aside');
      if (sidebarOpen && sidebar && !sidebar.contains(event.target)) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleSidebarClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleSidebarClickOutside);
    };
  }, [sidebarOpen]);

  // Cargar datos del docente
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id_docente) {
      fetch(`http://localhost:8000/api/docente/${user.id_docente}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setDocente(data.docente);
        });
    }
  }, []);

  // Función para determinar gradientes según tipo
  const getGradientClass = (type) => {
    switch(type) {
      case 'pua':
        return 'from-blue-500 to-blue-700';
      case 'estadisticas':
        return 'from-purple-500 to-purple-700';
      case 'cuenta':
        return 'from-green-500 to-green-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  // Fecha actual en formato largo español
  const fechaActual = new Date().toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Ajuste: envuelve todo el contenido en un div que cubre toda la pantalla y aplica fondo claro
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-white border-b border-gray-200 z-30">
        <div className="w-full px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <a href="../Dashboard" className="flex ms-2 md:me-24">
                <img
                  src="../src/imagenes/60aniversario.png"
                  className="h-8 me-3"
                  alt="FDI"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap">
                  Programas de Unidad<br />de Aprendizaje
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="relative group">
                <div className="flex items-center ms-3">
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 
                               focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
                      alt="user photo"
                    />
                  </button>
                </div>
                {/* Dropdown de usuario */}
                <div
                  className="absolute right-0 top-10 z-50 w-40 text-base list-none bg-white 
                             divide-gray-100 rounded-lg shadow-lg hidden group-hover:block"
                >
                  <ul className="py-2" role="none">
                    <li>
                      <a
                        href="/perfil"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                        Perfil
                      </a>
                    </li>
                    <li>
                      <a
                        href="/logout"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11M4 8l3 3m-3-3l3-3m-7 7h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H3"/>
                        </svg>
                        Cerrar sesión
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* SIDEBAR */}
      <aside 
        className={`fixed left-0 top-[78px] z-20 w-16 hover:w-64 h-[calc(100vh-78px)] transition-all duration-300 bg-white border-r border-gray-200 shadow-lg overflow-hidden${sidebarOpen ? ' w-64' : ''}`}
        aria-label="Sidebar"
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
            <li>
              <a 
                href="/puaversion" 
                className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 transition-colors group"
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
              <button
                onClick={() => setEstadisticasOpen(!estadisticasOpen)}
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
            
            {/* Menú Mi Cuenta */}
            <li className="relative">
              <button
                onClick={() => setCuentaOpen(!cuentaOpen)}
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

      {/* CONTENEDOR PRINCIPAL */}
      <div className="p-4 sm:ml-16 sm:mt-[78px]">
        <div className="p-4 border-2 border-gray-200 rounded-lg min-h-screen relative">
          {/* Fecha actual en la esquina superior derecha, en tarjeta blanca */}
          <div className="absolute right-6 top-6">
            <div className="bg-white rounded-lg shadow px-4 py-2 text-sm text-gray-700 font-semibold select-none border border-gray-200">
              {fechaActual.charAt(0).toUpperCase() + fechaActual.slice(1)}
            </div>
          </div>
          {/* Contenido original de PanelAcceso */}
          <div className="space-y-6">
            {/* Tarjeta de Bienvenida */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg overflow-hidden text-white mb-2">
              <div className="p-6">
                <h2 className="text-3xl font-extrabold mb-2">Bienvenido</h2>
                <p className="text-2xl font-bold mb-6">{greeting}, <span className="text-2xl font-extrabold">{docente?.nombre || "Usuario"}</span></p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <h3 className="font-extrabold text-2xl text-white mb-3">Datos Personales</h3>
                    <div className="space-y-2">
                      <Row label="Nombre" value={<span className="text-lg font-bold text-gray-300">{docente?.nombre || "N/A"}</span>} white/>
                      <Row label="Correo" value={<span className="text-lg font-bold text-gray-300">{docente?.correo || "N/A"}</span>} white/>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <h3 className="font-semibold text-white mb-3">Accesos Rápidos</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <a href="/procesarpua" className="bg-white/10 backdrop-blur-sm p-3 rounded hover:bg-white/20 transition-all duration-200">
                        <div className="flex flex-col items-center">
                          <svg className="w-6 h-6 mb-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          <span className="text-sm text-white">Crear PUA</span>
                        </div>
                      </a>
                      <a href="/puaversion" className="bg-white/10 backdrop-blur-sm p-3 rounded hover:bg-white/20 transition-all duration-200">
                        <div className="flex flex-col items-center">
                          <svg className="w-6 h-6 mb-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <span className="text-sm text-white">Consultar PUA</span>
                        </div>
                      </a>
                      <a href="#" className="bg-white/10 backdrop-blur-sm p-3 rounded hover:bg-white/20 transition-all duration-200">
                        <div className="flex flex-col items-center">
                          <svg className="w-6 h-6 mb-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-sm text-white">Perfil</span>
                        </div>
                      </a>
                      <a href="#" className="bg-white/10 backdrop-blur-sm p-3 rounded hover:bg-white/20 transition-all duration-200">
                        <div className="flex flex-col items-center">
                          <svg className="w-6 h-6 mb-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-white">Configuración</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjetas Principales con Animación */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-full">
              {/* Tarjeta PUA */}
              <div 
                className={`bg-gradient-to-br ${getGradientClass('pua')} rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer w-full`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white mb-2">PUA</h3>
                    <div className="bg-white/20 p-3 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm">Gestión de Programas de Unidad de Aprendizaje</p>
                </div>
                <div className="bg-white/10 h-1 w-full"></div>
              </div>

              {/* Tarjeta Estadísticas */}
              <div 
                className={`bg-gradient-to-br ${getGradientClass('estadisticas')} rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer w-full`}
                onClick={() => setEstadisticasOpen(!estadisticasOpen)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white mb-2">Estadísticas</h3>
                    <div className="bg-white/20 p-3 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm">Visualización de datos académicos y operativos</p>
                </div>
                <div className="bg-white/10 h-1 w-full"></div>
              </div>

              {/* Tarjeta Mi Cuenta */}
              <div 
                className={`bg-gradient-to-br ${getGradientClass('cuenta')} rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer w-full`}
                onClick={() => setCuentaOpen(!cuentaOpen)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white mb-2">Mi Cuenta</h3>
                    <div className="bg-white/20 p-3 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm">Configuración y preferencias personales</p>
                </div>
                <div className="bg-white/10 h-1 w-full"></div>
              </div>
            </div>

            {/* Sección de Datos Personales y Académicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Datos Personales */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800">
                  <h2 className="text-lg font-semibold text-white">Datos Personales</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <Row label="Título" value={docente?.prefijo || "N/A"} />
                    <Row label="Nombre" value={docente?.nombre || "N/A"} />
                    <Row label="Apellido Paterno" value={docente?.apellido_paterno || "N/A"} />
                    <Row label="Apellido Materno" value={docente?.apellido_materno || "N/A"} />
                    <Row label="Email" value={docente?.correo || "N/A"} />
                  </div>
                </div>
              </div>

              {/* Datos Académicos */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800">
                  <h2 className="text-lg font-semibold text-white">Datos Académicos</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <Row label="Unidad Académica" value={<Link href="#">Derecho</Link>} />
                    <Row label="Cargo" value="Docente" />
                    <Row label="Unidad Académica" value={<Link href="#">Enfermería</Link>} />
                    <Row label="Cargo" value="Docente" />
                    <Row label="Unidad Académica" value={<Link href="#">Ingeniería</Link>} />
                    <Row label="Cargo" value="Director de facultad" />
                    <Row label="Accesos" value={
                      <>
                        <Link href="#">Docente</Link><br />
                        <Link href="#">Docentes</Link>
                      </>
                    } />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-white rounded-xl shadow p-4 text-center mt-8">
            <div className="flex items-center justify-center gap-4 mb-2">
              <img src="../src/imagenes/60aniversario.png" alt="Logo UAC" className="w-10 h-10 object-contain" />
              <img src="../src/imagenes/imagen_salida1.png" alt="Facultad de Ingeniería" className="w-10 h-10 object-contain" />
            </div>
            <p className="text-xs text-gray-600">
              Facultad de Ingeniería | Laboratorio de Diseño de Aplicaciones Móviles
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

// Componentes auxiliares
const Row = ({ label, value, white }) => (
  <div className="flex items-center gap-4 mb-3">
    <span className={`w-32 font-medium ${white ? 'text-white' : 'text-gray-600'}`}>{label}:</span>
    <span className={`text-gray-800 ${white ? 'text-white' : ''}`}>{value}</span>
  </div>
);

const Link = ({ href, children }) => (
  <a href={href} className="text-blue-600 hover:underline hover:text-blue-800 transition-colors">
    {children}
  </a>
);

export default PanelAcceso;