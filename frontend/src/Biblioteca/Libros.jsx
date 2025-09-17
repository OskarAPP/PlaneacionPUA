import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Components/Sidebar";

const Libros = () => {
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
  const bibliotecaRef = useRef(null);

  // Estado para los libros
  const [bibliografia, setBibliografia] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("az");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Generador de ficha bibliográfica
  const construirFicha = (item) => {
    if (!item) return "";
    const autor = item.autor || "Autor desconocido";
    const anio = item.anio_publicacion || "s.f.";
    const titulo = item.titulo || item.nombre || "Título";
    const editorial = item.editorial || "Editorial";
    const lugar = item.lugar_publicacion ? `${item.lugar_publicacion}.` : "";
    const isbn = item.isbn ? `ISBN: ${item.isbn}.` : "";
    return `${autor} (${anio}). ${titulo}. ${editorial}. ${lugar} ${isbn}`.replace(/\s+/g,' ').trim();
  };

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/api/bibliografia')
      .then(res => res.ok ? res.json() : Promise.reject('Error al cargar bibliografía'))
      .then(data => {
        const arr = Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
        setBibliografia(arr);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo cargar la bibliografía');
        setLoading(false);
      });
  }, []);

  // Filtrado y ordenamiento
  const filteredItems = bibliografia
    .filter(i => (i.titulo || "").toLowerCase().includes(searchTerm.toLowerCase()) || (i.autor||"").toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a,b) => {
      const ta = (a.titulo||"").toLowerCase();
      const tb = (b.titulo||"").toLowerCase();
      return sortOrder === 'az' ? ta.localeCompare(tb) : tb.localeCompare(ta);
    });

  useEffect(() => {
    function handleClickOutside(event) {
      [cuentaRef, docentesRef, carrerasRef, materiasRef, academiasRef, facultadRef, compeGenRef, compeEspecRef, bibliotecaRef].forEach(ref => {
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
    <div className="min-h-screen w-screen flex bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 relative">
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar modular */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        cuentaOpen={cuentaOpen}
        setCuentaOpen={setCuentaOpen}
        refs={{
          cuentaRef,
          docentesRef,
          carrerasRef,
          materiasRef,
          academiasRef,
          facultadRef,
          compeGenRef,
          compeEspecRef,
          bibliotecaRef
        }}
        activeSection="libros"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen z-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 flex items-center justify-between px-3 py-1 shadow-sm min-h-0 h-12 dark:bg-gray-800 dark:border-gray-700">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 rounded bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 focus:outline-none transition-colors dark:bg-gray-800 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-700 dark:hover:border-blue-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
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
            {/* Barra de búsqueda y orden */}
            <div className="bg-[#3578b3] text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2 dark:bg-blue-900">Buscar</div>
            <div className="bg-white border rounded-b-md p-4 flex flex-col md:flex-row md:items-end gap-4 mb-4 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Libro:</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-4-4m0 0A7 7 0 105 5a7 7 0 0012 12z' /></svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Nombre del libro"
                    className="pl-10 pr-3 py-2 border rounded w-full focus:outline-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 md:max-w-xs">
                <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Ordenar alfabéticamente por:</label>
                <select className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                  <option value="az">A a Z</option>
                  <option value="za">Z a A</option>
                </select>
              </div>
            </div>
            {/* Lista de libros */}
            <div className="bg-[#d6edf9] text-[#1a3c5a] text-base font-semibold rounded-t-md px-4 py-2 text-center border border-[#b5d6ea] dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900">Bibliografía</div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-4 text-center">Cargando bibliografía...</div>
              ) : error ? (
                <div className="p-4 text-center text-red-600">{error}</div>
              ) : (
                <table className="min-w-full border border-[#b5d6ea] dark:border-blue-900 text-sm">
                  <thead>
                    <tr className="bg-white dark:bg-gray-900">
                      <th className="border px-2 py-2 dark:border-blue-900">#</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Autor</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Año</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Título</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Editorial</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Lugar</th>
                      <th className="border px-2 py-2 dark:border-blue-900">ISBN</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Materia</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Carrera</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Ficha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length === 0 ? (
                      <tr><td colSpan="10" className="text-center py-4">No hay registros.</td></tr>
                    ) : (
                      filteredItems.map((item, idx) => {
                        const carreraNombre = item.materia?.carrera?.nombre || '—';
                        const materiaNombre = item.materia?.nombre || '—';
                        return (
                          <tr key={item.id} className="hover:bg-blue-50 dark:hover:bg-gray-700">
                            <td className="border px-2 py-1 dark:border-blue-900">{idx + 1}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{item.autor}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{item.anio_publicacion}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{item.titulo}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{item.editorial}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{item.lugar_publicacion || '—'}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{item.isbn || '—'}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{materiaNombre}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{carreraNombre}</td>
                            <td className="border px-2 py-1 dark:border-blue-900 max-w-[260px] whitespace-pre-line">{construirFicha(item)}</td>
                          </tr>
                        );
                      })
                    )}
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
}

export default Libros;