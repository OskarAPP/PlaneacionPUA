import React, { useState, useEffect } from "react";

const Carreras = () => {
  // ...

  // ...

  // ...

  // Estado para carreras
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("az");

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/carreras");
        if (!res.ok) throw new Error("Error al obtener carreras");
        const data = await res.json();
        setCarreras(data);
      } catch (err) {
        setError("No se pudieron cargar las carreras");
      } finally {
        setLoading(false);
      }
    };
    fetchCarreras();
  }, []);

  const filteredCarreras = carreras
    .filter(c => (c.nombre || "").toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "az") {
        return (a.nombre || "").localeCompare(b.nombre || "");
      } else {
        return (b.nombre || "").localeCompare(a.nombre || "");
      }
    });

  return (
    <div className="min-h-screen w-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-3 py-1 shadow-sm min-h-0 h-12">
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-800 dark:text-gray-100 font-semibold leading-tight text-right">
              Programas de Unidad<br />de Aprendizaje
            </span>
            <img src="../src/imagenes/imagen_salida1.png" alt="UAC Logo" className="w-8 h-8 object-contain" />
          </div>
        </header>
        {/* Main Body */}
        <main className="flex-1 flex flex-col items-center py-8 overflow-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className="w-full max-w-5xl">
            {/* Barra de búsqueda */}
            <div className="bg-blue-700 dark:bg-blue-900 text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2">Buscar</div>
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-b-md p-4 flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Carrera:</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4-4m0 0A7 7 0 104 4a7 7 0 0013 13z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                    placeholder="Nombre de la Carrera"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Ordenar alfabéticamente por:</label>
                <select className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                  <option value="az">A a Z</option>
                  <option value="za">Z a A</option>
                </select>
              </div>
            </div>
            {/* Lista de carreras */}
            <div className="bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 text-center font-semibold rounded-t-md py-2 mb-0.5">Lista de Carreras</div>
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-b-md shadow">
              <table className="min-w-full text-sm text-left text-blue-900 dark:text-blue-200">
                <thead>
                  <tr className="border-b bg-blue-50 dark:bg-gray-900">
                    <th className="px-3 py-2 font-bold">#</th>
                    <th className="px-3 py-2 font-bold">Carrera</th>
                    <th className="px-3 py-2 font-bold">Facultad</th>
                    <th className="px-3 py-2 font-bold">Plan de Estudios</th>
                  </tr>
                </thead>
                <tbody className="text-blue-900 dark:text-blue-200">
                  {loading ? (
                    <tr><td colSpan="4" className="text-center py-4 text-blue-700 dark:text-blue-300">Cargando...</td></tr>
                  ) : error ? (
                    <tr><td colSpan="4" className="text-center py-4 text-red-600 dark:text-red-400">{error}</td></tr>
                  ) : filteredCarreras.length === 0 ? (
                    <tr><td colSpan="4" className="text-center py-4">No hay carreras registradas.</td></tr>
                  ) : (
                    filteredCarreras.map((carrera, idx) => (
                      <tr key={carrera.carrera_id} className="border-b hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-900">
                        <td className="px-3 py-2">{idx + 1}</td>
                        <td className="px-3 py-2">{carrera.nombre}</td>
                        <td className="px-3 py-2">{carrera.facultad ? carrera.facultad.nombre : '-'}</td>
                        <td className="px-3 py-2">{carrera.plan_estudio ? carrera.plan_estudio.descripcion : '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer className="bg-gray-600/90 dark:bg-gray-900 text-white py-4 flex flex-col items-center mt-auto shadow-glass">
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

export default Carreras;
