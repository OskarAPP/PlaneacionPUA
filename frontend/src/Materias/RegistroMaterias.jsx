import React, { useState, useRef, useEffect } from "react";
import { API_BASE_URL } from "../utils/api";
import Sidebar from "../Components/Sidebar";

const RegistroMaterias = () => {
  // Opciones dinámicas
  const [facultades, setFacultades] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [areas, setAreas] = useState([]);
  const [nucleos, setNucleos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [academias, setAcademias] = useState([]);

  // Cargar opciones desde la API
  useEffect(() => {
    fetch(`${API_BASE_URL}/facultades`).then(r=>r.json()).then(setFacultades);
    fetch(`${API_BASE_URL}/carreras`).then(r=>r.json()).then(setCarreras);
    fetch(`${API_BASE_URL}/areas`).then(r=>r.json()).then(setAreas);
    fetch(`${API_BASE_URL}/nucleos`).then(r=>r.json()).then(setNucleos);
    fetch(`${API_BASE_URL}/tipomaterias`).then(r=>r.json()).then(setTipos);
    fetch(`${API_BASE_URL}/academias`).then(r=>r.json()).then(setAcademias);
  }, []);
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

  // ...

  // ...

  // Form state
  const [form, setForm] = useState({
    materia: '',
    facultad: '',
    carrera: '',
    area: '',
    nucleo: '',
    tipo: '',
    creditos: '',
    horasTotales: '',
    horasTeoricas: '',
    horasPracticas: '',
    art57: 'Si',
    academia: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Mapeo de campos del frontend a los nombres esperados por la API
    const payload = {
      materia: form.materia,
      facultad: form.facultad,
      carrera: form.carrera,
      area: form.area,
      nucleo: form.nucleo,
      tipo: form.tipo,
      art57: form.art57,
      academia: form.academia,
      horas_practicas: Number(form.horasPracticas),
      horas_teoricas: Number(form.horasTeoricas),
      horas_totales: Number(form.horasTotales),
      creditos_totales: Number(form.creditos)
    };
    try {
      const res = await fetch(`${API_BASE_URL}/materias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        alert('Materia registrada exitosamente');
        setForm({
          materia: '', facultad: '', carrera: '', area: '', nucleo: '', tipo: '', creditos: '', horasTotales: '', horasTeoricas: '', horasPracticas: '', art57: 'Si', academia: ''
        });
      } else {
        alert('Error al registrar materia: ' + (data.message || 'Verifica los datos.'));
      }
    } catch (err) {
      alert('Error de conexión con el servidor.');
    }
  };

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
        refs={refs}
        activeSection="materias"
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
            <div className="bg-[#3578b3] text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2">Materia</div>
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-b-md p-6 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Materia:</label>
                  <input type="text" name="materia" value={form.materia} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Facultad:</label>
                  <select name="facultad" value={form.facultad} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900">
                    <option value="">Seleccione facultad...</option>
                    {facultades.map(f => (
                      <option key={f.facultad_id} value={f.facultad_id}>{f.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Carrera:</label>
                  <select name="carrera" value={form.carrera} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900">
                    <option value="">Seleccione una carrera...</option>
                    {carreras.map(c => (
                      <option key={c.carrera_id} value={c.carrera_id}>{c.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Área:</label>
                  <select name="area" value={form.area} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900">
                    <option value="">Seleccione área...</option>
                    {areas.map(a => (
                      <option key={a.area_id} value={a.area_id}>{a.nombre || a.descripcion}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Núcleo:</label>
                  <select name="nucleo" value={form.nucleo} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900">
                    <option value="">Seleccione núcleo...</option>
                    {nucleos.map(n => (
                      <option key={n.nucleo_id} value={n.nucleo_id}>{n.descripcion || n.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Tipo:</label>
                  <select name="tipo" value={form.tipo} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900">
                    <option value="">Seleccione tipo...</option>
                    {tipos.map(t => (
                      <option key={t.tipo_materia_id} value={t.tipo_materia_id}>{t.descripcion || t.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Créditos totales:</label>
                  <input type="number" name="creditos" value={form.creditos} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Horas totales:</label>
                  <input type="number" name="horasTotales" value={form.horasTotales} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Horas teóricas:</label>
                  <input type="number" name="horasTeoricas" value={form.horasTeoricas} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Horas prácticas:</label>
                  <input type="number" name="horasPracticas" value={form.horasPracticas} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Art 57:</label>
                  <select name="art57" value={form.art57} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900">
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Academia:</label>
                  <select name="academia" value={form.academia} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900">
                    <option value="">Seleccione academia...</option>
                    {academias.map(a => (
                      <option key={a.academia_id} value={a.academia_id}>{a.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button type="submit" className="bg-[#3578b3] text-white font-semibold px-12 py-2 rounded hover:bg-[#285a87] transition-colors">Registrar</button>
              </div>
            </form>
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
}

export default RegistroMaterias;
