import React, { useRef, useState, useEffect } from "react";

const PuaVersion = () => {
  // Estado para cada menú
  const [openPua, setOpenPua] = useState(false);
  const [openEstad, setOpenEstad] = useState(false);
  const [openCuenta, setOpenCuenta] = useState(false);
  // Referencias para los menús
  const puaRef = useRef(null);
  const estadRef = useRef(null);
  const cuentaRef = useRef(null);

  // Cerrar menús al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (puaRef.current && !puaRef.current.contains(event.target)) setOpenPua(false);
      if (estadRef.current && !estadRef.current.contains(event.target)) setOpenEstad(false);
      if (cuentaRef.current && !cuentaRef.current.contains(event.target)) setOpenCuenta(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen w-screen h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 py-2 transition-colors">
        <div className="flex items-center gap-2">
          <img src="../src/imagenes/imagen_salida1.png" alt="UAC Logo" className="w-12 h-12 object-contain" />
          <div className="ml-2">
            <div className="text-xs text-gray-700 dark:text-gray-200 leading-tight">Programas de Unidad<br />de Aprendizaje</div>
          </div>
        </div>
        <nav className="flex-1 flex items-center ml-8">
          {/* Dropdown PUA */}
          <div className="mr-6 relative group" tabIndex={0} ref={puaRef}>
            <button
              className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 font-semibold flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none border border-gray-200 dark:border-gray-600"
              onClick={e => {
                e.preventDefault();
                setOpenPua(v => !v);
              }}
              type="button"
            >
              Pua <span className="ml-1">▼</span>
            </button>
            {openPua && (
              <div
                className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-50 animate-fade-in"
                onMouseLeave={() => setOpenPua(false)}
              >
                <a href="/procesarpua" className="block px-4 py-2 text-blue-900 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-100 transition-colors">Crear PUA</a>
                <a href="/puaversion" className="block px-4 py-2 text-blue-900 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-100 transition-colors">Consultar PUA</a>
              </div>
            )}
          </div>
          {/* Dropdown Estadísticas */}
          <div className="mr-6 relative group" tabIndex={0} ref={estadRef}>
            <button
              className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 font-semibold flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none border border-gray-200 dark:border-gray-600"
              onClick={e => {
                e.preventDefault();
                setOpenEstad(v => !v);
              }}
              type="button"
            >
              Estadísticas <span className="ml-1">▼</span>
            </button>
            {openEstad && (
              <div
                className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-50 animate-fade-in"
                onMouseLeave={() => setOpenEstad(false)}
              >
                <a href="#" className="block px-4 py-2 text-blue-900 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-100 transition-colors">Genéricas</a>
                <a href="#" className="block px-4 py-2 text-blue-900 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-100 transition-colors">Específicas</a>
              </div>
            )}
          </div>
        </nav>
        {/* Dropdown Mi Cuenta */}
        <div className="flex items-center gap-2 relative" tabIndex={0} ref={cuentaRef}>
          <button
            className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 font-semibold flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none border border-gray-200 dark:border-gray-600"
            onClick={e => {
              e.preventDefault();
              setOpenCuenta(v => !v);
            }}
            type="button"
          >
            <i className="fa fa-user mr-1" />Mi Cuenta <span className="ml-1">▼</span>
          </button>
          {openCuenta && (
            <div
              className="fixed top-16 right-8 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-50 animate-fade-in"
              onMouseLeave={() => setOpenCuenta(false)}
            >
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900 hover:text-blue-900 dark:hover:text-blue-100 transition-colors" onClick={() => window.location.href = '/panelacceso'}>
                <span className="fa fa-home" /> Inicio
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900 hover:text-blue-900 dark:hover:text-blue-100 transition-colors">
                <span className="fa fa-user-circle" /> Perfil
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900 hover:text-blue-900 dark:hover:text-blue-100 transition-colors">
                <span className="fa fa-key" /> Contraseña
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900 hover:text-blue-900 dark:hover:text-blue-100 transition-colors" onClick={() => window.location.href = '/docentes'}>
                <span className="fa fa-cog" /> Configuración
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900 hover:text-red-900 dark:hover:text-white transition-colors">
                <span className="fa fa-sign-out" /> Cerrar sesión
              </a>
            </div>
          )}
        </div>
      </header>

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
