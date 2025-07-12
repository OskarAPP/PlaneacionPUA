import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Components/Sidebar";

const FacultadesRegistradas = () => {


  // Estado y referencias para Sidebar modular
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
  const refs = { cuentaRef, docentesRef, carrerasRef, materiasRef, academiasRef, facultadRef, compeGenRef, compeEspecRef };
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
    .filter(f => (f.nombre || "").toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "az") {
        return (a.nombre || "").localeCompare(b.nombre || "");
      } else {
        return (b.nombre || "").localeCompare(a.nombre || "");
      }
    });



  return (
    <div className="min-h-screen w-screen flex bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Sidebar modular */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        cuentaOpen={cuentaOpen}
        setCuentaOpen={setCuentaOpen}
        refs={refs}
        activeSection="facultad"
      />

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
                      <tr key={facultad.facultad_id} className="border-b hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-900">
                        <td className="px-3 py-2">{idx + 1}</td>
                        <td className="px-3 py-2">{facultad.facultad_id}</td>
                        <td className="px-3 py-2">{facultad.nombre}</td>
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
