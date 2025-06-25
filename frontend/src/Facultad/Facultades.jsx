import React, { useState, useRef, useEffect } from "react";

const FacultadesRegistradas = () => {
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

  // Estado para las facultades
  const [facultades, setFacultades] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("az");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFacultades = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/facultades");
        if (!res.ok) throw new Error("Error al obtener facultades");
        const data = await res.json();
        setFacultades(data);
      } catch (err) {
        setError("No se pudieron cargar las facultades");
      } finally {
        setLoading(false);
      }
    };
    fetchFacultades();
  }, []);

  // Filtrado y ordenamiento
  const filteredFacultades = facultades
    .filter(f => f.facultad.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "az") {
        return a.facultad.localeCompare(b.facultad);
      } else {
        return b.facultad.localeCompare(a.facultad);
      }
    });

  // Sidebar y menús (idéntico a Docentes)
  useEffect(() => {
    function handleClickOutside(event) {
      [cuentaRef, docentesRef, carrerasRef, materiasRef, academiasRef, facultadRef, compeGenRef, compeEspecRef].forEach(ref => {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdownOpen(prev => ({ ...prev, [ref.current.dataset.key]: false }));
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
    <div className="min-h-screen w-screen flex bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50 overflow-y-auto max-h-screen custom-scrollbar dark:bg-gray-800 dark:shadow-2xl dark:border-r dark:border-gray-700`}
        style={{ scrollbarColor: '#2563eb #fff', scrollbarWidth: 'thin' }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-400">Menú</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-blue-700 bg-white border border-blue-700 rounded-md p-2 hover:bg-blue-50 hover:border-blue-800 transition-colors dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {/* Dropdowns */}
          <div ref={docentesRef} data-key="docentes">
            <button onClick={() => toggleDropdown('docentes')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700 dark:hover:border-blue-300">
              <span>Docentes</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['docentes'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="/docentes" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900">Docentes registrados</a>
                <a href="/registrodocentes" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={carrerasRef} data-key="carreras">
            <button onClick={() => toggleDropdown('carreras')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700 dark:hover:border-blue-300">
              <span>Carreras</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['carreras'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="/carreras" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900">Carreras registradas</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={materiasRef} data-key="materias">
            <button onClick={() => toggleDropdown('materias')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700 dark:hover:border-blue-300">
              <span>Materias</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['materias'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="/materias" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900">Materias registradas</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={academiasRef} data-key="academias">
            <button onClick={() => toggleDropdown('academias')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700 dark:hover:border-blue-300">
              <span>Academias</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['academias'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900">Academias registradas</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={facultadRef} data-key="facultad">
            <button onClick={() => toggleDropdown('facultad')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700 dark:hover:border-blue-300">
              <span>Facultad</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['facultad'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="/facultades" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900">Facultades registradas</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={compeGenRef} data-key="compeGen">
            <button onClick={() => toggleDropdown('compeGen')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700 dark:hover:border-blue-300">
              <span>Compe. Genéricas</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['compeGen'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900">Competencias registradas</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={compeEspecRef} data-key="compeEspec">
            <button onClick={() => toggleDropdown('compeEspec')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700 dark:hover:border-blue-300">
              <span>Compe. Específicas</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['compeEspec'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900">Competencias registradas</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900">Formulario de registro</a>
              </div>
            )}
          </div>
          {/* Mi Cuenta */}
          <div ref={cuentaRef}>
            <button
              onClick={() => setCuentaOpen(!cuentaOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700 dark:hover:border-blue-300"
            >
              <span>Mi Cuenta</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {cuentaOpen && (
              <div className="absolute left-0 mt-2 w-full bg-white border border-blue-200 rounded shadow-lg z-50 animate-fade-in dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900" onClick={() => window.location.href = '/panelacceso'}>Inicio</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900">Perfil</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900" onClick={() => window.location.href = '/docentes'}>Contraseña</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md dark:text-blue-300 dark:hover:bg-blue-900" onClick={() => window.location.href = '/docentes'}>Configuración</a>
                <a href="#" className="block p-2 text-sm text-red-600 hover:bg-red-50 rounded-md dark:text-red-400 dark:hover:bg-red-900" onClick={e => { e.preventDefault(); localStorage.removeItem('user'); window.location.href = '/login'; }}>Cerrar sesión</a>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 flex items-center justify-between px-3 py-1 shadow-sm min-h-0 h-12 dark:bg-gray-800 dark:border-gray-700">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 rounded bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 focus:outline-none transition-colors dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700 dark:hover:border-blue-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-800 font-semibold leading-tight text-right dark:text-gray-200">
              Programas de Unidad<br />de Aprendizaje
            </span>
            <img src="../src/imagenes/imagen_salida1.png" alt="UAC Logo" className="w-8 h-8 object-contain" />
          </div>
        </header>
        {/* Main Body */}
        <main className="flex-1 flex flex-col items-center py-8 overflow-auto">
          <div className="w-full max-w-5xl">
            {/* Barra de búsqueda y orden */}
            <div className="bg-blue-700 text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2 dark:bg-blue-900 dark:text-blue-200">Buscar</div>
            <div className="bg-white border rounded-b-md p-4 flex flex-col sm:flex-row sm:items-center gap-4 mb-6 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Facultad:</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"><i className="fa fa-search" /></span>
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:focus:ring-blue-800"
                    placeholder="Nombre de la Facultad"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Ordenar alfabéticamente por:</label>
                <select className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                  <option value="az">A a Z</option>
                  <option value="za">Z a A</option>
                </select>
              </div>
            </div>
            {/* Lista de facultades */}
            <div className="bg-blue-100 text-blue-900 text-center font-semibold rounded-t-md py-2 mb-0.5 dark:bg-blue-950 dark:text-blue-200">Lista de facultades</div>
            <div className="overflow-x-auto bg-white rounded-b-md shadow dark:bg-gray-800 dark:shadow-2xl">
              {loading ? (
                <div className="text-center text-blue-700 py-4 dark:text-blue-300">Cargando...</div>
              ) : error ? (
                <div className="text-center text-red-600 py-4 dark:text-red-400">{error}</div>
              ) : (
                <table className="min-w-full text-sm text-left text-blue-900 dark:text-blue-200">
                  <thead>
                    <tr className="border-b bg-blue-50 dark:bg-gray-900 dark:border-gray-700">
                      <th className="px-3 py-2 font-bold">#</th>
                      <th className="px-3 py-2 font-bold">ID Facultad</th>
                      <th className="px-3 py-2 font-bold">Facultad</th>
                    </tr>
                  </thead>
                  <tbody className="text-blue-900 dark:text-blue-200">
                    {filteredFacultades.map((facultad, idx) => (
                      <tr key={facultad.id_facultad} className="border-b hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-900">
                        <td className="px-3 py-2">{idx + 1}</td>
                        <td className="px-3 py-2">{facultad.id_facultad}</td>
                        <td className="px-3 py-2">{facultad.facultad}</td>
                      </tr>
                    ))}
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

export default FacultadesRegistradas;
