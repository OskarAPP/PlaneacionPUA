import React, { useState, useRef, useEffect } from "react";

const PanelAcceso = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [estadisticasOpen, setEstadisticasOpen] = useState(false);
  const [cuentaOpen, setCuentaOpen] = useState(false);
  const dropdownRef = useRef(null);
  const estadisticasRef = useRef(null);
  const cuentaRef = useRef(null);

  // Cerrar los dropdowns si se hace click fuera
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

  return (
    <div className="min-h-screen w-screen h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b flex items-center justify-between px-6 py-2 shadow-glass z-50 relative">
        <div className="flex items-center gap-2">
          <img src="../src/imagenes/imagen_salida1.png" alt="UAC Logo" className="w-12 h-12 object-contain" />
          <div className="ml-2">
            <div className="text-xs text-gray-800 font-bold leading-tight">Programas de Unidad<br />de Aprendizaje</div>
          </div>
        </div>
        <nav className="flex-1 flex items-center ml-8 relative">
          {/* Dropdown PUA */}
          <div className="mr-6 relative group" ref={dropdownRef}>
            <button
              className="text-blue-900 font-bold flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 focus:outline-none"
              onClick={() => setDropdownOpen((open) => !open)}
              type="button"
            >
              Pua <span className="ml-1">▼</span>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
                <a
                  href="/procesarpua"
                  className="block px-4 py-2 text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Crear PUA
                </a>
                <a
                  href="/puaversion"
                  className="block px-4 py-2 text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Consultar PUA
                </a>
              </div>
            )}
          </div>
          {/* Dropdown Estadísticas */}
          <div className="mr-6 relative group" ref={estadisticasRef}>
            <button
              className="text-blue-900 font-bold flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 focus:outline-none"
              onClick={() => setEstadisticasOpen((open) => !open)}
              type="button"
            >
              Estadísticas <span className="ml-1">▼</span>
            </button>
            {estadisticasOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
                <a
                  href="#"
                  className="block px-4 py-2 text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Genéricas
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Específicas
                </a>
              </div>
            )}
          </div>
        </nav>
        {/* Dropdown Mi Cuenta */}
        <div className="flex items-center gap-2 relative" ref={cuentaRef}>
          <button
            className="text-blue-900 text-sm font-bold flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 focus:outline-none"
            onClick={() => setCuentaOpen((open) => !open)}
            type="button"
          >
            <span className="fa fa-user mr-1" />Mi Cuenta <span className="ml-1">▼</span>
          </button>
          {cuentaOpen && (
            <div className="fixed top-16 right-8 w-56 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                <span className="fa fa-home" /> Inicio
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                <span className="fa fa-user-circle" /> Perfil
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                <span className="fa fa-key" /> Contraseña
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                <span className="fa fa-cog" /> Configuración
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-red-700 hover:bg-red-100 hover:text-red-900 transition-colors">
                <span className="fa fa-sign-out" /> Cerrar sesión
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-8 overflow-auto">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-glass p-6 sm:p-10">
          {/* Datos Personales */}
          <div className="mb-6">
            <div className="bg-blue-700 text-white px-2 py-1 font-semibold rounded-t">Datos Personales</div>
            <div className="pl-4 pt-2">
              <div className="flex flex-col sm:flex-row mb-1"><div className="w-48 font-semibold text-blue-900">Título:</div><div className="text-gray-900">M. en C.</div></div>
              <div className="flex flex-col sm:flex-row mb-1"><div className="w-48 font-semibold text-blue-900">Nombre:</div><div className="text-gray-900">Guadalupe Manuel</div></div>
              <div className="flex flex-col sm:flex-row mb-1"><div className="w-48 font-semibold text-blue-900">Apellido paterno:</div><div className="text-gray-900">Estrada</div></div>
              <div className="flex flex-col sm:flex-row mb-1"><div className="w-48 font-semibold text-blue-900">Apellido materno:</div><div className="text-gray-900">Segovia</div></div>
              <div className="flex flex-col sm:flex-row mb-1"><div className="w-48 font-semibold text-blue-900">email:</div><div className="text-gray-900">gmestrad@uacam.mx</div></div>
            </div>
          </div>
          {/* Datos Académicos */}
          <div className="mb-6">
            <div className="bg-blue-700 text-white px-2 py-1 font-semibold rounded-t">Datos Académicos</div>
            <div className="pl-4 pt-2">
              <div className="flex flex-col sm:flex-row mb-1"><div className="w-48 font-semibold text-blue-900">Unidad Académica:</div><a href="#" className="text-blue-700 underline">Derecho</a></div>
              <div className="flex flex-col sm:flex-row mb-1"><div className="w-48 font-semibold text-blue-900">Cargo:</div><div className="text-gray-900">Docente</div></div>
              <div className="flex flex-col sm:flex-row mb-1"><div className="w-48 font-semibold text-blue-900">Unidad Académica:</div><a href="#" className="text-blue-700 underline">Enfermería</a></div>
              <div className="flex flex-col sm:flex-row mb-1"><div className="w-48 font-semibold text-blue-900">Cargo:</div><div className="text-gray-900">Docente</div></div>
              <div className="flex flex-col sm:flex-row mb-1"><div className="w-48 font-semibold text-blue-900">Unidad Académica:</div><a href="#" className="text-blue-700 underline">Ingeniería</a></div>
              <div className="flex flex-col sm:flex-row mb-1"><div className="w-48 font-semibold text-blue-900">Cargo:</div><div className="text-gray-900">Director de facultad</div></div>
              <div className="flex flex-col sm:flex-row mb-1"><div className="w-48 font-semibold text-blue-900">Accesos:</div>
                <div className="flex flex-col">
                  <a href="#" className="text-blue-700 underline">docente</a>
                  <a href="#" className="text-blue-700 underline">administrador</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-600/90 text-white py-1 flex flex-col items-center mt-auto shadow-glass">
        <img src="../src/imagenes/imagen_salida1.png" alt="Facultad de Ingeniería" className="w-16 h-16 mb-2" />
        <div className="text-center text-sm">
          Facultad de Ingeniería<br />
          Laboratorio de Diseño de Aplicaciones Móviles
        </div>
      </footer>
    </div>
  );
};

export default PanelAcceso;
