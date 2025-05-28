import React from "react";

const ProcesarPua = () => {
  return (
    <div className="min-h-screen w-screen h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b flex items-center justify-between px-6 py-2">
        <div className="flex items-center gap-2">
          <img src="../src/imagenes/imagen_salida1.png" alt="UAC Logo" className="w-12 h-12 object-contain" />
          <div className="ml-2">
            <div className="text-xs text-gray-700 leading-tight">Programas de Unidad<br />de Aprendizaje</div>
          </div>
        </div>
        <nav className="flex-1 flex items-center ml-8">
          {/* Dropdown Pua */}
          <div className="mr-6 relative group" tabIndex={0}>
            <button
              className="bg-white text-gray-700 font-semibold flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 focus:outline-none border border-gray-200"
              onClick={e => {
                e.preventDefault();
                const el = e.currentTarget.nextSibling;
                if (el) el.classList.toggle('hidden');
              }}
              type="button"
            >
              Pua <span className="ml-1">▼</span>
            </button>
            <div className="hidden absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
              <a href="#" className="block px-4 py-2 text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-colors">Crear PUA</a>
              <a href="#" className="block px-4 py-2 text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-colors">Consultar PUA</a>
            </div>
          </div>
          {/* Dropdown Estadísticas */}
          <div className="mr-6 relative group" tabIndex={0}>
            <button
              className="bg-white text-gray-700 font-semibold flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 focus:outline-none border border-gray-200"
              onClick={e => {
                e.preventDefault();
                const el = e.currentTarget.nextSibling;
                if (el) el.classList.toggle('hidden');
              }}
              type="button"
            >
              Estadísticas <span className="ml-1">▼</span>
            </button>
            <div className="hidden absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
              <a href="#" className="block px-4 py-2 text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-colors">Genéricas</a>
              <a href="#" className="block px-4 py-2 text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-colors">Específicas</a>
            </div>
          </div>
          {/* Dropdown Administración PUA */}
          <div className="mr-6 relative group" tabIndex={0}>
            <button
              className="bg-white text-gray-700 font-semibold flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 focus:outline-none border border-gray-200"
              onClick={e => {
                e.preventDefault();
                const el = e.currentTarget.nextSibling;
                if (el) el.classList.toggle('hidden');
              }}
              type="button"
            >
              <i className="fa fa-user mr-1" /> Administración PUA <span className="ml-1">▼</span>
            </button>
            <div className="hidden absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
              <a href="#" className="block px-4 py-2 text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-colors">Docente</a>
              <a href="#" className="block px-4 py-2 text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-colors">Director facultad</a>
            </div>
          </div>
        </nav>
        {/* Dropdown Mi Cuenta */}
        <div className="flex items-center gap-2 relative" tabIndex={0}>
          <button
            className="bg-white text-gray-700 font-semibold flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 focus:outline-none border border-gray-200"
            onClick={e => {
              e.preventDefault();
              const el = e.currentTarget.nextSibling;
              if (el) el.classList.toggle('hidden');
            }}
            type="button"
          >
            <i className="fa fa-user mr-1" />Mi Cuenta <span className="ml-1">▼</span>
          </button>
          <div className="fixed top-16 right-8 w-56 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
            <a href="#" className="flex items-center gap-2 px-4 py-2 text-blue-900 hover:bg-blue-200 hover:text-blue-900 transition-colors">
              <span className="fa fa-home" /> Inicio
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 text-blue-900 hover:bg-blue-200 hover:text-blue-900 transition-colors">
              <span className="fa fa-user-circle" /> Perfil
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 text-blue-900 hover:bg-blue-200 hover:text-blue-900 transition-colors">
              <span className="fa fa-key" /> Contraseña
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 text-blue-900 hover:bg-blue-200 hover:text-blue-900 transition-colors">
              <span className="fa fa-cog" /> Configuración
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 text-red-700 hover:bg-red-200 hover:text-red-900 transition-colors">
              <span className="fa fa-sign-out" /> Cerrar sesión
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-8 overflow-auto">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center text-lg font-semibold text-gray-700 mb-4">
            Bienvenido M. en C. Guadalupe Manuel Estrada Segovia
          </div>
          <div className="bg-white border rounded-xl shadow p-6">
            <div className="text-center text-base font-bold text-gray-700 mb-4">Programa de aprendizaje</div>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-700 font-semibold mb-1">Facultad:</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Enfermería</option>
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-700 font-semibold mb-1">Carrera:</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Seleccione una carrera...</option>
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-700 font-semibold mb-1">Materia:</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Seleccione una materia...</option>
                </select>
              </div>
            </div>
          </div>
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
  );
};

export default ProcesarPua;
