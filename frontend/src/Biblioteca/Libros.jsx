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
  const [libros, setLibros] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("az");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    // fetch('http://localhost:8000/api/libros')
    //   .then(res => res.ok ? res.json() : Promise.reject('Error al cargar libros'))
    //   .then(data => {
    //     setLibros(Array.isArray(data) ? data : []);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setError('No se pudieron cargar los libros');
    //     setLoading(false);
    //   });
    // Simulación de datos
    setTimeout(() => {
      setLibros([
        {
          libro_id: 1,
          nombre: "Cálculo de una variable",
          autor: "James Stewart",
          isbn: "978-607-481-714-3",
          ficha: "Stewart, J. (2012). Cálculo de una variable. Cengage Learning."
        },
        {
          libro_id: 2,
          nombre: "Álgebra Lineal",
          autor: "Stanley Grossman",
          isbn: "978-970-686-646-2",
          ficha: "Grossman, S. (2007). Álgebra Lineal. McGraw-Hill."
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  // Filtrado y ordenamiento
  const filteredLibros = libros
    .filter(l => (l.nombre || "").toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "az") {
        return (a.nombre || "").localeCompare(b.nombre || "");
      } else {
        return (b.nombre || "").localeCompare(a.nombre || "");
      }
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
    <div className="min-h-screen w-screen flex bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
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
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
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
            <div className="bg-[#d6edf9] text-[#1a3c5a] text-base font-semibold rounded-t-md px-4 py-2 text-center border border-[#b5d6ea] dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900">Lista de Libros</div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-4 text-center">Cargando libros...</div>
              ) : error ? (
                <div className="p-4 text-center text-red-600">{error}</div>
              ) : (
                <table className="min-w-full border border-[#b5d6ea] dark:border-blue-900">
                  <thead>
                    <tr className="bg-white dark:bg-gray-900">
                      <th className="border border-[#b5d6ea] px-3 py-2 dark:border-blue-900">#</th>
                      <th className="border border-[#b5d6ea] px-3 py-2 dark:border-blue-900">Nombre</th>
                      <th className="border border-[#b5d6ea] px-3 py-2 dark:border-blue-900">Autor</th>
                      <th className="border border-[#b5d6ea] px-3 py-2 dark:border-blue-900">ISBN</th>
                      <th className="border border-[#b5d6ea] px-3 py-2 dark:border-blue-900">Ficha Bibliográfica</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLibros.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-4">No hay libros registrados.</td></tr>
                    ) : (
                      filteredLibros.map((libro, idx) => (
                        <tr key={libro.libro_id} className="hover:bg-blue-50 dark:hover:bg-gray-700">
                          <td className="border border-[#b5d6ea] px-3 py-2 dark:border-blue-900">{idx + 1}</td>
                          <td className="border border-[#b5d6ea] px-3 py-2 dark:border-blue-900">{libro.nombre}</td>
                          <td className="border border-[#b5d6ea] px-3 py-2 dark:border-blue-900">{libro.autor}</td>
                          <td className="border border-[#b5d6ea] px-3 py-2 dark:border-blue-900">{libro.isbn}</td>
                          <td className="border border-[#b5d6ea] px-3 py-2 dark:border-blue-900">{libro.ficha}</td>
                        </tr>
                      ))
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