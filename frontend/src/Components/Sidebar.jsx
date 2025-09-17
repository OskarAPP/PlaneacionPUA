import React from "react";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  dropdownOpen,
  setDropdownOpen,
  cuentaOpen,
  setCuentaOpen,
  refs,
  activeSection
}) => {
  const toggleDropdown = (key) => {
    setDropdownOpen((prev) => {
      // Si ya está abierto, ciérralo; si no, abre solo ese y cierra los demás
      const isOpen = !!prev[key];
      const newState = {};
      if (!isOpen) newState[key] = true;
      return newState;
    });
  };

  // Cierra el sidebar cuando el mouse sale del área
  const handleMouseLeave = () => {
    setSidebarOpen(false);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50 overflow-y-auto max-h-screen custom-scrollbar dark:bg-gray-800 dark:shadow-2xl dark:border-r dark:border-gray-700`}
      style={{ scrollbarColor: '#2563eb #fff', scrollbarWidth: 'thin' }}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300">Menú</h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-blue-700 bg-white border border-blue-700 rounded-md p-2 hover:bg-blue-50 hover:border-blue-800 transition-colors dark:bg-gray-800 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-700 dark:hover:border-blue-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="p-4 space-y-2">
        {/* Docentes */}
        <div ref={refs.docentesRef} data-key="docentes">
          <button onClick={() => toggleDropdown('docentes')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-700 dark:hover:border-blue-400">
            <span>Docentes</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
          {dropdownOpen['docentes'] && (
            <div className="ml-4 mt-2 space-y-2">
              <a href="/docentes" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700">Docentes registrados</a>
              <a href="/registrodocentes" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700">Formulario de registro</a>
            </div>
          )}
        </div>
        {/* Carreras */}
        <div ref={refs.carrerasRef} data-key="carreras">
          <button onClick={() => toggleDropdown('carreras')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-700 dark:hover:border-blue-400">
            <span>Carreras</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
          {dropdownOpen['carreras'] && (
            <div className="ml-4 mt-2 space-y-2">
              <a href="/carreras" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700">Carreras registradas</a>
              <a href="/registrocarreras" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700">Formulario de registro</a>
            </div>
          )}
        </div>
        {/* Materias */}
        <div ref={refs.materiasRef} data-key="materias">
          <button onClick={() => toggleDropdown('materias')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-700 dark:hover:border-blue-400">
            <span>Materias</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
          {dropdownOpen['materias'] && (
            <div className="ml-4 mt-2 space-y-2">
              <a href="/materias" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700">Materias registradas</a>
              <a href="/registromaterias" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700">Formulario de registro</a>
            </div>
          )}
        </div>
        {/* Academias */}
        <div ref={refs.academiasRef} data-key="academias">
          <button onClick={() => toggleDropdown('academias')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-700 dark:hover:border-blue-400">
            <span>Academias</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
          {dropdownOpen['academias'] && (
            <div className="ml-4 mt-2 space-y-2">
              <a href="/academias" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700">Academias registradas</a>
              <a href="/registroacademias" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700">Formulario de registro</a>
            </div>
          )}
        </div>
        {/* Facultad */}
        <div ref={refs.facultadRef} data-key="facultad">
          <button onClick={() => toggleDropdown('facultad')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-700 dark:hover:border-blue-400">
            <span>Facultad</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
          {dropdownOpen['facultad'] && (
            <div className="ml-4 mt-2 space-y-2">
              <a href="/facultades" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700">Facultades registradas</a>
              <a href="/registrofacultad" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700">Formulario de registro</a>
            </div>
          )}
        </div>
        {/* Compe. Genéricas */}
        <div ref={refs.compeGenRef} data-key="compeGen">
          <button onClick={() => toggleDropdown('compeGen')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-700 dark:hover:border-blue-400">
            <span>Compe. Genéricas</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
          {dropdownOpen['compeGen'] && (
            <div className="ml-4 mt-2 space-y-2">
              <a href="/competenciasg" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700">Competencias registradas</a>
              <a href="/registrocompeg" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700">Formulario de registro</a>
            </div>
          )}
        </div>
        {/* Compe. Específicas */}
        <div ref={refs.compeEspecRef} data-key="compeEspec">
          <button onClick={() => toggleDropdown('compeEspec')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-700 dark:hover:border-blue-400">
            <span>Compe. Específicas</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
          {dropdownOpen['compeEspec'] && (
            <div className="ml-4 mt-2 space-y-2">
              <a href="/competenciase" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700">Competencias registradas</a>
              <a href="/registrocompee" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700">Formulario de registro</a>
            </div>
          )}
        </div>
        {/* Biblioteca */}
        <div ref={refs.bibliotecaRef} data-key="biblioteca">
          <button onClick={() => toggleDropdown('biblioteca')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-700 dark:hover:border-blue-400">
            <span>Biblioteca</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
          {dropdownOpen['biblioteca'] && (
            <div className="ml-4 mt-2 space-y-2">
              <a
                href="/libros"
                className={`block p-2 text-sm rounded-md transition-colors
                  ${activeSection === 'libros'
                    ? 'bg-blue-700 text-white dark:bg-blue-400 dark:text-gray-900 font-bold shadow'
                    : 'text-blue-700 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-gray-700'}
                `}
              >
                Libros
              </a>
              <a
                href="/librosregistro"
                className={`block p-2 text-sm rounded-md transition-colors
                  ${activeSection === 'librosregistro'
                    ? 'bg-blue-700 text-white dark:bg-blue-400 dark:text-gray-900 font-bold shadow'
                    : 'text-blue-700 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-gray-700'}
                `}
              >
                Registrar bibliografía
              </a>
            </div>
          )}
        </div>
        {/* Mi Cuenta */}
        <div ref={refs.cuentaRef}>
          <button
            onClick={() => setCuentaOpen(!cuentaOpen)}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-700 dark:hover:border-blue-400"
          >
            <span>Mi Cuenta</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {cuentaOpen && (
            <div className="absolute left-0 mt-2 w-full bg-white border border-blue-200 rounded shadow-lg z-50 animate-fade-in dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
              <a href="/panelacceso" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700" onClick={() => window.location.href = '/panelacceso'}>Inicio</a>
              <a href="/perfilusuario" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700">Perfil</a>
              <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-gray-700" onClick={() => window.location.href = '/docentes'}>Contraseña</a>
              <a href="#" className="block p-2 text-sm text-red-600 hover:bg-red-50 rounded-md dark:text-red-400 dark:hover:bg-gray-700" onClick={e => { e.preventDefault(); localStorage.removeItem('user'); window.location.href = '/login'; }}>Cerrar sesión</a>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
