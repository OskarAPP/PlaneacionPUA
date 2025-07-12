import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Components/Sidebar";

const RegistroAcademias = () => {


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

  // Facultades dinámicas desde API
  const [facultades, setFacultades] = useState([]);
  const [form, setForm] = useState({ nombre: "", facultad_id: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/facultades")
      .then(res => res.json())
      .then(data => setFacultades(data))
      .catch(() => setFacultades([]));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/api/academias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: form.nombre, facultad_id: form.facultad_id })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess("Academia registrada correctamente.");
        setForm({ nombre: "", facultad_id: "" });
      } else {
        setError(data.message || "Error al registrar la academia.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
    setLoading(false);
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
        refs={refs}
        activeSection="academias"
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
            <div className="bg-[#3578b3] text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2 dark:bg-blue-900">Academia</div>
            <form onSubmit={handleSubmit} className="bg-white border rounded-b-md p-6 flex flex-col gap-6 dark:bg-gray-800 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <label className="block text-gray-800 font-bold mb-1 dark:text-gray-200">Academia:</label>
                  <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" required />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-1 dark:text-gray-200">Facultad:</label>
                  <select
                    name="facultad_id"
                    value={form.facultad_id}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                    required
                  >
                    <option value="">Seleccione facultad...</option>
                    {facultades.map(fac => (
                      <option key={fac.facultad_id} value={fac.facultad_id}>{fac.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col items-center mt-2 gap-2">
                <button type="submit" disabled={loading} className="bg-[#3578b3] text-white font-semibold w-1/2 md:w-1/3 px-12 py-2 rounded hover:bg-[#285a87] transition-colors dark:bg-blue-900 dark:hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? "Registrando..." : "Registrar"}
                </button>
                {success && <div className="text-green-600 font-semibold">{success}</div>}
                {error && <div className="text-red-600 font-semibold">{error}</div>}
              </div>
            </form>
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

export default RegistroAcademias;
