import React, { useState, useRef } from "react";
import { API_BASE_URL } from "../utils/api";
import Sidebar from "../Components/Sidebar";

const RegistroCompeG = () => {






  // Estado y refs para Sidebar modular
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [cuentaOpen, setCuentaOpen] = useState(false);
  const docentesRef = useRef(null);
  const carrerasRef = useRef(null);
  const materiasRef = useRef(null);
  const academiasRef = useRef(null);
  const facultadRef = useRef(null);
  const compeGenRef = useRef(null);
  const compeEspecRef = useRef(null);
  const bibliotecaRef = useRef(null);
  const cuentaRef = useRef(null);

  return (
    <div className="min-h-screen w-screen flex bg-gray-100 text-gray-900">
      {/* Sidebar modular */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        cuentaOpen={cuentaOpen}
        setCuentaOpen={setCuentaOpen}
        refs={{
          docentesRef,
          carrerasRef,
          materiasRef,
          academiasRef,
          facultadRef,
          compeGenRef,
          compeEspecRef,
          bibliotecaRef,
          cuentaRef
        }}
      />
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 flex items-center justify-between px-3 py-1 shadow-sm min-h-0 h-12">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 rounded bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 hover:border-blue-800 focus:outline-none transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-800 font-semibold leading-tight text-right">
              Programas de Unidad<br />de Aprendizaje
            </span>
            <img src="/imagenes/imagen_salida1.png" alt="UAC Logo" className="w-8 h-8 object-contain" />
          </div>
        </header>
        {/* Main Body */}
        <main className="flex-1 flex flex-col items-center py-8 overflow-auto">
          <div className="w-full max-w-5xl">
            <div className="bg-[#3578b3] text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2">Competencia Genérica</div>
            <div className="bg-white border border-gray-200 rounded-b-md p-6 flex flex-col gap-6">
              <form className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-center" onSubmit={async (e) => {
                e.preventDefault();
                const nombre = e.target.elements['nombre'].value.trim();
                if (!nombre) {
                  alert('El nombre de la competencia es obligatorio.');
                  return;
                }
                try {
                  const res = await fetch(`${API_BASE_URL}/competenciasgenericas`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre })
                  });
                  if (res.ok) {
                    alert('Competencia registrada correctamente.');
                    e.target.reset();
                  } else {
                    alert('Error al registrar la competencia.');
                  }
                } catch {
                  alert('Error de conexión con el servidor.');
                }
              }}>
                <div className="md:col-span-2">
                  <label className="block text-gray-800 font-bold mb-1">Competencia Genérica:</label>
                  <input name="nombre" type="text" className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900" />
                </div>
                <div className="flex items-end h-full">
                  <button type="submit" className="w-full bg-[#3578b3] hover:bg-[#285a8c] text-white font-semibold rounded px-4 py-2 transition-colors">Registrar</button>
                </div>
              </form>
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer className="bg-gray-100 text-gray-600 py-4 flex flex-col items-center mt-auto border-t border-gray-200">
          <img src="/imagenes/imagen_salida1.png" alt="Facultad de Ingeniería" className="w-16 h-16 mb-2" />
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

export default RegistroCompeG;
