import React, { useState, useRef, useEffect } from "react";

const CompetenciasE = () => {
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

  useEffect(() => {
    function handleClickOutside(event) {
      [cuentaRef, docentesRef, carrerasRef, materiasRef, academiasRef, facultadRef, compeGenRef, compeEspecRef].forEach(ref => {
        if (
          ref.current &&
          ref.current.dataset &&
          !ref.current.contains(event.target)
        ) {
          const key = ref.current.dataset.key;
          if (key) {
            setDropdownOpen(prev => ({ ...prev, [key]: false }));
          }
        }
      });
      if (cuentaRef.current && !cuentaRef.current.contains(event.target)) {
        setCuentaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const toggleDropdown = (key) => {
    setDropdownOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen w-screen flex bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50 overflow-y-auto max-h-screen custom-scrollbar`}
        style={{ scrollbarColor: '#2563eb #fff', scrollbarWidth: 'thin' }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-blue-700">Menú</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-blue-700 bg-white border border-blue-700 rounded-md p-2 hover:bg-blue-50 hover:border-blue-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {/* Dropdowns */}
          <div ref={docentesRef} data-key="docentes">
            <button onClick={() => toggleDropdown('docentes')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors">
              <span>Docentes</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['docentes'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="/docentes" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Docentes registrados</a>
                <a href="/registrodocentes" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={carrerasRef} data-key="carreras">
            <button onClick={() => toggleDropdown('carreras')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors">
              <span>Carreras</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['carreras'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="/carreras" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Carreras registradas</a>
                <a href="/registrocarreras" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={materiasRef} data-key="materias">
            <button onClick={() => toggleDropdown('materias')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors">
              <span>Materias</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['materias'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="/materias" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Materias registradas</a>
                <a href="/registromaterias" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={academiasRef} data-key="academias">
            <button onClick={() => toggleDropdown('academias')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors">
              <span>Academias</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['academias'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="/academias" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Academias registradas</a>
                <a href="/registroacademias" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={facultadRef} data-key="facultad">
            <button onClick={() => toggleDropdown('facultad')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors">
              <span>Facultad</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['facultad'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="/registrofacultad" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={compeGenRef} data-key="compeGen">
            <button onClick={() => toggleDropdown('compeGen')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors">
              <span>Compe. Genéricas</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['compeGen'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="/competenciasg" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Competencias registradas</a>
                <a href="/registrocompeg" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={compeEspecRef} data-key="compeEspec">
            <button onClick={() => toggleDropdown('compeEspec')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors">
              <span>Compe. Específicas</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['compeEspec'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="/competenciase" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Competencias registradas</a>
                <a href="/registrocompee" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Formulario de registro</a>
              </div>
            )}
          </div>
          {/* Mi Cuenta */}
          <div ref={cuentaRef}>
            <button
              onClick={() => setCuentaOpen(!cuentaOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors"
            >
              <span>Mi Cuenta</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {cuentaOpen && (
              <div className="absolute left-0 mt-2 w-full bg-white border border-blue-200 rounded shadow-lg z-50 animate-fade-in">
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md" onClick={() => window.location.href = '/panelacceso'}>Inicio</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Perfil</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md" onClick={() => window.location.href = '/docentes'}>Contraseña</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md" onClick={() => window.location.href = '/docentes'}>Configuración</a>
                <a href="#" className="block p-2 text-sm text-red-600 hover:bg-red-50 rounded-md" onClick={e => { e.preventDefault(); localStorage.removeItem('user'); window.location.href = '/login'; }}>Cerrar sesión</a>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 flex items-center justify-between px-3 py-1 shadow-sm min-h-0 h-12">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 rounded bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 focus:outline-none transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-800 font-semibold leading-tight text-right">
              Programas de Unidad<br />de Aprendizaje
            </span>
            <img src="../src/imagenes/imagen_salida1.png" alt="UAC Logo" className="w-8 h-8 object-contain" />
          </div>
        </header>
        {/* Main Body */}
        <main className="flex-1 flex flex-col items-center py-8 overflow-auto">
          <div className="w-full max-w-5xl">
            {/* Buscador y filtros */}
            <div className="bg-[#3578b3] text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2">Buscar</div>
            <div className="bg-white border rounded-b-md p-6 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-2">
                <div>
                  <label className="block text-gray-800 font-bold mb-1">Academia:</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4-4m0 0A7 7 0 104 4a7 7 0 0013 13z" /></svg>
                    </span>
                    <input type="text" placeholder="Nombre de la Competencias Específicas" className="w-full border rounded pl-10 pr-3 py-2" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-1">Ordenar alfabéticamente por:</label>
                  <select className="w-full border rounded px-3 py-2 text-gray-700">
                    <option value="az">A a Z</option>
                    <option value="za">Z a A</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Tabla de Competencias Específicas */}
            <div className="bg-[#d4ecfa] text-[#3578b3] text-base font-semibold rounded-t-md px-4 py-2 text-center border-b border-[#b5d6ea]">Lista de Competencias Específicas</div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-[#b5d6ea]">
                <thead>
                  <tr className="bg-white">
                    <th className="border border-[#b5d6ea] px-4 py-2 text-center font-bold w-24">Eliminar</th>
                    <th className="border border-[#b5d6ea] px-4 py-2 text-center font-bold w-8">#</th>
                    <th className="border border-[#b5d6ea] px-4 py-2 text-center font-bold">Competencia Específica</th>
                    <th className="border border-[#b5d6ea] px-4 py-2 text-center font-bold">Carrera</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#b5d6ea] px-2 py-2 text-center align-middle font-semibold w-20">
                      <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded text-xs">Eliminar</button>
                    </td>
                    <td className="border border-[#b5d6ea] px-4 py-2 text-center align-middle font-semibold">1</td>
                    <td className="border border-[#b5d6ea] px-4 py-2">Diseñar, implantar y operar soluciones tecnológicas controladas mediante sistemas computacionales.</td>
                    <td className="border border-[#b5d6ea] px-4 py-2">
                      <select className="w-full border rounded px-2 py-1 text-gray-700">
                        <option>Licenciatura en Administración y Finanzas</option>
                        <option>Ingeniería en Sistemas Computacionales</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#b5d6ea] px-2 py-2 text-center align-middle font-semibold w-20">
                      <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded text-xs">Eliminar</button>
                    </td>
                    <td className="border border-[#b5d6ea] px-4 py-2 text-center align-middle font-semibold">2</td>
                    <td className="border border-[#b5d6ea] px-4 py-2">Diseñar, y construir sistemas y componentes de software aplicando las técnicas de los sistemas inteligentes en cualquier ámbito de aplicación.</td>
                    <td className="border border-[#b5d6ea] px-4 py-2">
                      <select className="w-full border rounded px-2 py-1 text-gray-700">
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
        <footer className="bg-gray-600/90 text-white py-4 flex flex-col items-center mt-auto shadow-glass">
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

export default CompetenciasE;
