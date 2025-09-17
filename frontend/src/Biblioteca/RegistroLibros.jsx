import React, { useState, useMemo, useRef, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';

// Componente de Registro Local de Bibliografía (sin backend)
// Objetivo: permitir capturar referencias y generar la ficha bibliográfica localmente.
// Futuro backend: POST a /api/bibliografia con los mismos campos.

const anioActual = new Date().getFullYear();

const camposIniciales = {
  materia_id: '', // Seleccionable cuando haya catálogo
  autor: '',
  anio_publicacion: '',
  titulo: '',
  editorial: '',
  lugar_publicacion: '',
  isbn: ''
};

const LibrosRegistro = () => {
  // ---------------- Layout / Sidebar (mismo estilo que RegistroMaterias) ----------------
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
  const refs = { cuentaRef, docentesRef, carrerasRef, materiasRef, academiasRef, facultadRef, compeGenRef, compeEspecRef, bibliotecaRef };

  // ---------------- Lógica de formulario local ----------------
  const [form, setForm] = useState(camposIniciales);
  // Eliminados registros locales porque ya no habrá tabla
  const [errores, setErrores] = useState({});
  const [tocar, setTocar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [orden, setOrden] = useState('reciente');
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null); // { tipo: 'ok'|'error', texto: string }

  // ---------------- Estados para selección jerárquica Facultad -> Carrera -> Materia ----------------
  const [facultades, setFacultades] = useState([]);
  const [carreras, setCarreras] = useState([]); // se llenará tras seleccionar facultad
  const [materias, setMaterias] = useState([]); // se llenará tras seleccionar carrera
  const [selectedFacultad, setSelectedFacultad] = useState('');
  const [selectedCarrera, setSelectedCarrera] = useState('');
  const [loadingFacultades, setLoadingFacultades] = useState(false);
  const [errorFacultades, setErrorFacultades] = useState('');
  const [loadingCarreras, setLoadingCarreras] = useState(false);
  const [errorCarreras, setErrorCarreras] = useState('');
  const [loadingMaterias, setLoadingMaterias] = useState(false);
  const [errorMaterias, setErrorMaterias] = useState('');

  // Cargar facultades al montar
  useEffect(() => {
    setLoadingFacultades(true);
    fetch('http://localhost:8000/api/facultades')
      .then(r => r.ok ? r.json() : Promise.reject('Error al obtener facultades'))
      .then(data => {
        const arr = Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
        setFacultades(arr);
        setLoadingFacultades(false);
      })
      .catch(() => {
        setErrorFacultades('No se pudieron cargar las facultades');
        setLoadingFacultades(false);
      });
  }, []);

  // Efecto: cuando cambia la facultad cargar carreras
  useEffect(() => {
    if (!selectedFacultad) {
      setCarreras([]);
      setSelectedCarrera('');
      setMaterias([]);
      setForm(prev => ({ ...prev, materia_id: '' }));
      return;
    }
    setLoadingCarreras(true);
    setErrorCarreras('');
    fetch(`http://localhost:8000/api/carreras/facultad/${selectedFacultad}`)
      .then(r => r.ok ? r.json() : Promise.reject('Error al obtener carreras'))
      .then(data => {
        const arr = Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
        setCarreras(arr);
        setLoadingCarreras(false);
        // Reset inferiores
        setSelectedCarrera('');
        setMaterias([]);
        setForm(prev => ({ ...prev, materia_id: '' }));
      })
      .catch(() => {
        setErrorCarreras('No se pudieron cargar las carreras');
        setLoadingCarreras(false);
      });
  }, [selectedFacultad]);

  // Efecto: cuando cambia la carrera cargar materias
  useEffect(() => {
    if (!selectedCarrera) {
      setMaterias([]);
      setForm(prev => ({ ...prev, materia_id: '' }));
      return;
    }
    setLoadingMaterias(true);
    setErrorMaterias('');
    fetch(`http://localhost:8000/api/materias/carrera/${selectedCarrera}`)
      .then(r => r.ok ? r.json() : Promise.reject('Error al obtener materias'))
      .then(data => {
        const arr = Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
        setMaterias(arr);
        setLoadingMaterias(false);
        setForm(prev => ({ ...prev, materia_id: '' }));
      })
      .catch(() => {
        setErrorMaterias('No se pudieron cargar las materias');
        setLoadingMaterias(false);
      });
  }, [selectedCarrera]);

  // Validaciones simples
  const validar = (f) => {
    const e = {};
    if (!f.materia_id) e.materia_id = 'Materia requerida';
    if (!f.autor.trim()) e.autor = 'Autor requerido';
    if (!f.titulo.trim()) e.titulo = 'Título requerido';
    if (!f.editorial.trim()) e.editorial = 'Editorial requerida';
    if (!f.anio_publicacion) e.anio_publicacion = 'Año requerido';
    else if (Number(f.anio_publicacion) < 1800 || Number(f.anio_publicacion) > anioActual) e.anio_publicacion = 'Año inválido';
    if (f.isbn && !/^([0-9]-?){10,13}$/.test(f.isbn.replace(/\s+/g,''))) e.isbn = 'ISBN no válido (solo dígitos y guiones)';
    return e;
  };

  const ficha = useMemo(() => {
    if (!form.autor && !form.titulo) return '';
    const autor = form.autor || 'Autor desconocido';
    const anio = form.anio_publicacion || 's.f.';
    const titulo = form.titulo ? `${form.titulo}.` : '';
    const editorial = form.editorial ? `${form.editorial}.` : '';
    const lugar = form.lugar_publicacion ? `${form.lugar_publicacion}.` : '';
    const isbn = form.isbn ? `ISBN: ${form.isbn}.` : '';
    return `${autor} (${anio}). ${titulo} ${editorial} ${lugar} ${isbn}`.replace(/\s+/g,' ').trim();
  }, [form]);

  // Materias filtradas localmente (si la lista fuera grande se podría migrar a búsqueda server-side)
  const materiasFiltradas = useMemo(() => {
    if (!filtro.trim()) return materias;
    return materias.filter(m => (m.nombre || '').toLowerCase().includes(filtro.toLowerCase()));
  }, [filtro, materias]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (tocar[name]) setErrores(validar({ ...form, [name]: value }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTocar(p => ({ ...p, [name]: true }));
    setErrores(validar(form));
  };

  const resetForm = () => {
    setForm(camposIniciales);
    setTocar({});
    setErrores({});
  };

  const onAdd = (e) => {
    e.preventDefault();
    const errs = validar(form);
    setErrores(errs);
    if (Object.keys(errs).length > 0) return;
    setEnviando(true);
    setMensaje(null);
    fetch('http://localhost:8000/api/bibliografia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(r => r.json().then(body => ({ ok: r.ok, body })))
      .then(({ ok, body }) => {
        if (!ok || !body.success) {
          throw new Error(body.message || 'Error al registrar');
        }
        setMensaje({ tipo: 'ok', texto: body.message || 'Registrado correctamente' });
        resetForm();
      })
      .catch(err => {
        setMensaje({ tipo: 'error', texto: err.message || 'Error inesperado' });
      })
      .finally(() => setEnviando(false));
  };

  return (
    <div className="min-h-screen w-screen flex bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 relative">
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        cuentaOpen={cuentaOpen}
        setCuentaOpen={setCuentaOpen}
        refs={refs}
        activeSection="libros"
      />

      {/* Main */}
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

        {/* Body */}
        <main className="flex-1 flex flex-col items-center py-8 overflow-auto">
          <div className="w-full max-w-5xl">
            {/* Bloque Formulario */}
            <div className="bg-[#3578b3] text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2 dark:bg-blue-900">Registro Bibliográfico</div>
            <form onSubmit={onAdd} className="bg-white border rounded-b-md p-6 flex flex-col gap-6 dark:bg-gray-800 dark:border-gray-700">
              {mensaje && (
                <div className={`text-sm px-3 py-2 rounded border ${mensaje.tipo === 'ok' ? 'bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300' : 'bg-red-50 border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300'}`}>{mensaje.texto}</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Selección jerárquica */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Facultad</label>
                  <select
                    value={selectedFacultad}
                    onChange={e => setSelectedFacultad(e.target.value)}
                    className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                  >
                    <option value="">-- Seleccione --</option>
                    {loadingFacultades && <option>Cargando...</option>}
                    {!loadingFacultades && errorFacultades && <option>{errorFacultades}</option>}
                    {!loadingFacultades && !errorFacultades && facultades.map(f => (
                      <option key={f.facultad_id} value={f.facultad_id}>{f.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Carrera</label>
                  <select
                    value={selectedCarrera}
                    onChange={e => setSelectedCarrera(e.target.value)}
                    disabled={!selectedFacultad || loadingCarreras}
                    className="w-full border rounded px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                  >
                    <option value="">-- Seleccione --</option>
                    {loadingCarreras && <option>Cargando...</option>}
                    {!loadingCarreras && errorCarreras && <option>{errorCarreras}</option>}
                    {!loadingCarreras && !errorCarreras && carreras.map(c => (
                      <option key={c.carrera_id} value={c.carrera_id}>{c.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-1 lg:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Materia *</label>
                  {selectedCarrera && materias.length > 8 && (
                    <input
                      placeholder="Filtrar materias..."
                      value={filtro}
                      onChange={e => setFiltro(e.target.value)}
                      className="mb-1 w-full border rounded px-2 py-1 text-xs dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                    />
                  )}
                  <select
                    name="materia_id"
                    value={form.materia_id}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={!selectedCarrera || loadingMaterias}
                    className="w-full border rounded px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                  >
                    <option value="">-- Seleccione --</option>
                    {loadingMaterias && <option>Cargando...</option>}
                    {!loadingMaterias && errorMaterias && <option>{errorMaterias}</option>}
                    {!loadingMaterias && !errorMaterias && materiasFiltradas.map(m => (
                      <option key={m.materia_id} value={m.materia_id}>{m.nombre}</option>
                    ))}
                  </select>
                  {tocar.materia_id && errores.materia_id && <p className="text-red-600 text-xs mt-1">{errores.materia_id}</p>}
                </div>
                <div className="md:col-span-2 lg:col-span-4">
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Autor *</label>
                  <input name="autor" value={form.autor} onChange={onChange} onBlur={onBlur} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                  {tocar.autor && errores.autor && <p className="text-red-600 text-xs mt-1">{errores.autor}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Año *</label>
                  <input name="anio_publicacion" type="number" value={form.anio_publicacion} onChange={onChange} onBlur={onBlur} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                  {tocar.anio_publicacion && errores.anio_publicacion && <p className="text-red-600 text-xs mt-1">{errores.anio_publicacion}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">ISBN</label>
                  <input name="isbn" value={form.isbn} onChange={onChange} onBlur={onBlur} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                  {tocar.isbn && errores.isbn && <p className="text-red-600 text-xs mt-1">{errores.isbn}</p>}
                </div>
                <div className="md:col-span-2 lg:col-span-4">
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Título *</label>
                  <input name="titulo" value={form.titulo} onChange={onChange} onBlur={onBlur} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                  {tocar.titulo && errores.titulo && <p className="text-red-600 text-xs mt-1">{errores.titulo}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Editorial *</label>
                  <input name="editorial" value={form.editorial} onChange={onChange} onBlur={onBlur} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                  {tocar.editorial && errores.editorial && <p className="text-red-600 text-xs mt-1">{errores.editorial}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Lugar de publicación</label>
                  <input name="lugar_publicacion" value={form.lugar_publicacion} onChange={onChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                </div>
                <div className="md:col-span-2 lg:col-span-4 flex flex-col gap-2">
                  <label className="block text-gray-700 font-semibold dark:text-gray-200">Vista previa ficha</label>
                  <div className="text-xs bg-gray-50 dark:bg-gray-900 border rounded px-3 py-2 dark:border-gray-700 min-h-[46px] whitespace-pre-wrap">{ficha || '—'}</div>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button type="submit" disabled={enviando} className="bg-[#3578b3] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-10 py-2 rounded hover:bg-[#285a87] transition-colors dark:bg-blue-900 dark:hover:bg-blue-800">{enviando ? 'Guardando...' : 'Agregar'}</button>
                <button type="button" disabled={enviando} onClick={resetForm} className="border font-medium px-10 py-2 rounded hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed dark:hover:bg-gray-700 dark:border-gray-600">Limpiar</button>
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
        .custom-scrollbar::-webkit-scrollbar { width: 8px; background: #fff; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #fff; }
        @media (prefers-color-scheme: dark) {
          .custom-scrollbar::-webkit-scrollbar { background: #1a202c; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #2563eb; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #1a202c; }
        }
      `}</style>
    </div>
  );
};

export default LibrosRegistro;
