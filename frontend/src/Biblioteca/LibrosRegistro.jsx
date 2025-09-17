import React, { useState, useMemo, useRef } from 'react';
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

  // Validaciones simples
  const validar = (f) => {
    const e = {};
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
    // Ya no almacenamos en una lista; solo se podría enviar a backend en el futuro
    resetForm();
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                <button type="submit" className="bg-[#3578b3] text-white font-semibold px-10 py-2 rounded hover:bg-[#285a87] transition-colors dark:bg-blue-900 dark:hover:bg-blue-800">Agregar</button>
                <button type="button" onClick={resetForm} className="border font-medium px-10 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600">Limpiar</button>
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
