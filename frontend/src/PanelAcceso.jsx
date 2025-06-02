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

  return (
    <div className="min-h-screen w-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
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
          {/* Dropdown PUA */}
          <div ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors"
            >
              <span>PUA</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="/procesarpua" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Crear PUA</a>
                <a href="/puaversion" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Consultar PUA</a>
              </div>
            )}
          </div>

          {/* Dropdown Estadísticas */}
          <div ref={estadisticasRef}>
            <button
              onClick={() => setEstadisticasOpen(!estadisticasOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 font-medium transition-colors"
            >
              <span>Estadísticas</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {estadisticasOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Genéricas</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Específicas</a>
              </div>
            )}
          </div>

          {/* Dropdown Mi Cuenta */}
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
              <div className="ml-4 mt-2 space-y-2">
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Inicio</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Perfil</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Contraseña</a>
                <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md">Configuración</a>
                <a href="#" className="block p-2 text-sm text-red-600 hover:bg-red-50 rounded-md">Cerrar sesión</a>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 focus:outline-none transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-800 font-semibold leading-tight text-right">
              Programas de Unidad<br />de Aprendizaje
            </span>
            <img src="../src/imagenes/60aniversario.png" alt="UAC Logo" className="w-12 h-12 object-contain" />
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 flex flex-col items-center py-10 px-4 overflow-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            {greeting}, {docente ? docente.nombre : "Usuario"}
          </h1>
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Datos Personales */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 rounded-t-lg -mt-6 -mx-6">
                Datos Personales
              </h2>
              <div className="mt-6 space-y-4">
                <Row label="Título" value={docente?.prefijo || "N/A"} />
                <Row label="Nombre" value={docente?.nombre || "N/A"} />
                <Row label="Apellido Paterno" value={docente?.apellido_paterno || "N/A"} />
                <Row label="Apellido Materno" value={docente?.apellido_materno || "N/A"} />
                <Row label="Email" value={docente?.correo || "N/A"} />
              </div>
            </div>

            {/* Datos Académicos */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 rounded-t-lg -mt-6 -mx-6">
                Datos Académicos
              </h2>
              <div className="mt-6 space-y-4">
                <Row label="Unidad Académica" value={<Link href="#">Derecho</Link>} />
                <Row label="Cargo" value="Docente" />
                <Row label="Unidad Académica" value={<Link href="#">Enfermería</Link>} />
                <Row label="Cargo" value="Docente" />
                <Row label="Unidad Académica" value={<Link href="#">Ingeniería</Link>} />
                <Row label="Cargo" value="Director de facultad" />
                <Row label="Accesos" value={
                  <>
                    <Link href="#">Docente</Link><br />
                    <Link href="#">Administrador</Link>
                  </>
                } />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-600 text-white py-4 flex flex-col items-center shadow-inner">
          <img src="../src/imagenes/60aniversario.png" alt="Facultad de Ingeniería" className="w-12 h-12 mb-2" />
          <div className="text-center text-xs">
            Facultad de Ingeniería<br />
            Laboratorio de Diseño de Aplicaciones Móviles
          </div>
        </footer>
      </div>
    </div>
  );
};

// Componentes auxiliares
const Row = ({ label, value }) => (
  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
    <span className="w-32 font-medium text-blue-900">{label}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

const Link = ({ href, children }) => (
  <a href={href} className="text-blue-600 hover:underline hover:text-blue-800 transition-colors">
    {children}
  </a>
);

export default PanelAcceso;