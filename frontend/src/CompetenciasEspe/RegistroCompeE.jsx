import React from "react";

const RegistroCompeE = () => {
  // ...existing code...

  // ...existing code...

  // ...existing code...

  return (
    <div className="min-h-screen w-screen flex bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 flex items-center justify-between px-3 py-1 shadow-sm min-h-0 h-12 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-800 font-semibold leading-tight text-right dark:text-gray-100">
              Programas de Unidad<br />de Aprendizaje
            </span>
            <img src="../src/imagenes/imagen_salida1.png" alt="UAC Logo" className="w-8 h-8 object-contain" />
          </div>
        </header>
        {/* Main Body */}
        <main className="flex-1 flex flex-col items-center py-8 overflow-auto">
          <div className="w-full max-w-5xl">
            <div className="bg-[#3578b3] text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2 dark:bg-blue-900">Registro de Competencia Específica</div>
            <div className="bg-white border rounded-b-md p-6 flex flex-col gap-6 dark:bg-gray-800 dark:border-gray-700">
              <form className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-gray-800 font-bold mb-1 dark:text-gray-200">Competencia Específica:</label>
                  <input type="text" className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-1 dark:text-gray-200">Facultad:</label>
                  <select className="w-full border rounded px-3 py-2 text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
                    <option value="">Seleccione facultad...</option>
                    <option value="fac1">Facultad de Ingeniería</option>
                    <option value="fac2">Facultad de Ciencias</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-1 dark:text-gray-200">Carrera:</label>
                  <select className="w-full border rounded px-3 py-2 text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
                    <option value="">Seleccione una carrera...</option>
                    <option value="carr1">Ingeniería en Sistemas Computacionales</option>
                    <option value="carr2">Licenciatura en Administración y Finanzas</option>
                  </select>
                </div>
                <div className="md:col-span-3 flex justify-center mt-2">
                  <button type="submit" className="w-1/2 bg-[#3578b3] hover:bg-[#285a8c] text-white font-semibold rounded px-4 py-2 transition-colors dark:bg-blue-900 dark:hover:bg-blue-800">Registrar</button>
                </div>
              </form>
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
      {/* ...existing code... */}
    </div>
  );
};

export default RegistroCompeE;
