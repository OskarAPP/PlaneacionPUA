import React from "react";

const Administrador = () => {
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
          {/* Dropdown Docentes */}
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
              Docentes <span className="ml-1">▼</span>
            </button>
            <div className="hidden absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Docentes registrados</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Formulario de registro</a>
            </div>
          </div>
          {/* Dropdown Carreras */}
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
              Carreras <span className="ml-1">▼</span>
            </button>
            <div className="hidden absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Carreras registradas</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Formulario de registro</a>
            </div>
          </div>
          {/* Dropdown Materias */}
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
              Materias <span className="ml-1">▼</span>
            </button>
            <div className="hidden absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Materias registradas</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Formulario de registro</a>
            </div>
          </div>
          {/* Dropdown Academias */}
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
              Academias <span className="ml-1">▼</span>
            </button>
            <div className="hidden absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Academias registradas</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Formulario de registro</a>
            </div>
          </div>
          {/* Dropdown Facultad */}
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
              Facultad <span className="ml-1">▼</span>
            </button>
            <div className="hidden absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Formulario de registro</a>
            </div>
          </div>
          {/* Dropdown Compe. Genéricas */}
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
              Compe. Genéricas <span className="ml-1">▼</span>
            </button>
            <div className="hidden absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Competencias registradas</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Formulario de registro</a>
            </div>
          </div>
          {/* Dropdown Compe. Específicas */}
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
              Compe. Específicas <span className="ml-1">▼</span>
            </button>
            <div className="hidden absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Competencias registradas</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Formulario de registro</a>
            </div>
          </div>
        </nav>
        {/* Dropdown Mi Cuenta */}
        <div className="flex items-center gap-2 relative" tabIndex={0}>
          <button
            className="text-blue-900 text-sm font-bold flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-200 focus:outline-none"
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
        <div className="w-full max-w-5xl">
          {/* Barra de búsqueda */}
          <div className="bg-blue-700 text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2">Buscar</div>
          <div className="bg-white border rounded-b-md p-4 flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Docente:</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><i className="fa fa-search" /></span>
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Nombre del Docente o Apellidos"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Ordenar alfabéticamente por:</label>
              <select className="w-full border rounded px-3 py-2">
                <option>A a Z</option>
                <option>Z a A</option>
              </select>
            </div>
          </div>

          {/* Lista de docentes */}
          <div className="bg-blue-100 text-blue-900 text-center font-semibold rounded-t-md py-2 mb-0.5">Lista de docentes</div>
          <div className="overflow-x-auto bg-white rounded-b-md shadow">
            <table className="min-w-full text-sm text-left text-blue-900">
              <thead>
                <tr className="border-b bg-blue-50">
                  <th className="px-3 py-2 font-bold">#</th>
                  <th className="px-3 py-2 font-bold">Prefijo</th>
                  <th className="px-3 py-2 font-bold">Nombre(s)</th>
                  <th className="px-3 py-2 font-bold">Apellido Paterno</th>
                  <th className="px-3 py-2 font-bold">Apellido Materno</th>
                  <th className="px-3 py-2 font-bold">Correo</th>
                  <th className="px-3 py-2 font-bold">Facultad</th>
                </tr>
              </thead>
              <tbody className="text-blue-900">
                {/* Aquí irían los datos de los docentes */}
              </tbody>
            </table>
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

export default Administrador;
