import React, { useState, useMemo, useRef, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';

const camposIniciales = {
  titulo: '',
  autor: '',
  editorial: '',
  edicion: '',
  clasificacion: '',
  cutter: '',
  anio: '',
  isbn: '',
  vol_ejem: '',
  item: '',
  isbn_extra: '',
  ti_obsoletos: '',
  volum_obsol: '',
  cant_total: '',
  observacion: '',
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
  const [errores, setErrores] = useState({});
  const [tocar, setTocar] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      [cuentaRef, docentesRef, carrerasRef, materiasRef, academiasRef, facultadRef, compeGenRef, compeEspecRef, bibliotecaRef].forEach(ref => {
        if (!ref.current) return;
        const key = ref.current.dataset?.key;
        if (key && !ref.current.contains(event.target)) {
          setDropdownOpen(prev => ({ ...prev, [key]: false }));
        }
      });
      if (cuentaRef.current && !cuentaRef.current.contains(event.target)) {
        setCuentaOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleSidebarClickOutside(event) {
      const sidebar = document.querySelector('aside');
      if (sidebarOpen && sidebar && !sidebar.contains(event.target)) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleSidebarClickOutside);
    return () => document.removeEventListener('mousedown', handleSidebarClickOutside);
  }, [sidebarOpen]);

  const validar = (f) => {
    const e = {};
    if (!f.autor.trim()) e.autor = 'Autor requerido';
    if (!f.titulo.trim()) e.titulo = 'Título requerido';
    if (f.anio) {
      const valor = Number(f.anio);
      const limiteSuperior = new Date().getFullYear() + 1;
      if (Number.isNaN(valor) || valor < 1901 || valor > limiteSuperior) {
        e.anio = 'Año inválido (≥1901)';
      }
    }
    if (f.cant_total) {
      const valor = Number(f.cant_total);
      if (Number.isNaN(valor) || valor < 0) {
        e.cant_total = 'Cantidad inválida';
      }
    }
    return e;
  };

  const ficha = useMemo(() => {
    if (!form.autor && !form.titulo) return '';
    const autor = form.autor || 'Autor desconocido';
    const anio = form.anio || 's.f.';
    const titulo = form.titulo ? `${form.titulo}.` : '';
    const editorial = form.editorial ? `${form.editorial}.` : '';
    const volumen = form.vol_ejem ? `${form.vol_ejem}.` : '';
    const isbn = form.isbn || form.isbn_extra ? `ISBN: ${form.isbn || form.isbn_extra}.` : '';
    return `${autor} (${anio}). ${titulo} ${editorial} ${volumen} ${isbn}`.replace(/\s+/g, ' ').trim();
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

  const sanitizePayload = () => {
    const payload = {};
    Object.entries(form).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      const trimmed = typeof value === 'string' ? value.trim() : value;
      if (trimmed === '') return;
      if (key === 'anio' || key === 'cant_total') {
        const numero = Number(trimmed);
        if (!Number.isNaN(numero)) payload[key] = numero;
        return;
      }
      payload[key] = trimmed;
    });
    return payload;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validar(form);
    setErrores(errs);
    if (Object.keys(errs).length > 0) return;
    setEnviando(true);
    setMensaje(null);
    const payload = sanitizePayload();
    fetch('http://localhost:8000/api/bibliografia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error(text || 'Respuesta no válida del servidor');
        }
        const body = await res.json();
        return { ok: res.ok, body };
      })
      .then(({ ok, body }) => {
        if (!ok || body.success === false) {
          throw new Error(body.message || 'No se pudo registrar');
        }
        setMensaje({ tipo: 'ok', texto: body.message || 'Registro creado correctamente' });
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
            <form onSubmit={onSubmit} className="bg-white border rounded-b-md p-6 flex flex-col gap-6 dark:bg-gray-800 dark:border-gray-700">
              {mensaje && (
                <div className={`text-sm px-3 py-2 rounded border ${mensaje.tipo === 'ok' ? 'bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300' : 'bg-red-50 border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300'}`}>{mensaje.texto}</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Autor *</label>
                  <input name="autor" value={form.autor} onChange={onChange} onBlur={onBlur} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                  {tocar.autor && errores.autor && <p className="text-red-600 text-xs mt-1">{errores.autor}</p>}
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Título *</label>
                  <input name="titulo" value={form.titulo} onChange={onChange} onBlur={onBlur} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                  {tocar.titulo && errores.titulo && <p className="text-red-600 text-xs mt-1">{errores.titulo}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Editorial</label>
                  <input name="editorial" value={form.editorial} onChange={onChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Edición</label>
                  <input name="edicion" value={form.edicion} onChange={onChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Clasificación</label>
                  <input name="clasificacion" value={form.clasificacion} onChange={onChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Cutter</label>
                  <input name="cutter" value={form.cutter} onChange={onChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Año</label>
                  <input name="anio" type="number" value={form.anio} onChange={onChange} onBlur={onBlur} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                  {tocar.anio && errores.anio && <p className="text-red-600 text-xs mt-1">{errores.anio}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">ISBN</label>
                  <input name="isbn" value={form.isbn} onChange={onChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Vol./Ejem.</label>
                  <input name="vol_ejem" value={form.vol_ejem} onChange={onChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Item</label>
                  <input name="item" value={form.item} onChange={onChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">ISBN extra</label>
                  <input name="isbn_extra" value={form.isbn_extra} onChange={onChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">TI. obsoletos</label>
                  <input name="ti_obsoletos" value={form.ti_obsoletos} onChange={onChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Vol. obsoletos</label>
                  <input name="volum_obsol" value={form.volum_obsol} onChange={onChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Cantidad total</label>
                  <input name="cant_total" type="number" value={form.cant_total} onChange={onChange} onBlur={onBlur} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                  {tocar.cant_total && errores.cant_total && <p className="text-red-600 text-xs mt-1">{errores.cant_total}</p>}
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Observación</label>
                  <textarea name="observacion" value={form.observacion} onChange={onChange} rows={3} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100" />
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Vista previa ficha</label>
                  <div className="text-xs bg-gray-50 dark:bg-gray-900 border rounded px-3 py-2 dark:border-gray-700 min-h-[46px] whitespace-pre-wrap">{ficha || '—'}</div>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button type="submit" disabled={enviando} className="bg-[#3578b3] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-10 py-2 rounded hover:bg-[#285a87] transition-colors dark:bg-blue-900 dark:hover:bg-blue-800">{enviando ? 'Guardando...' : 'Guardar'}</button>
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

    </div>
  );
};

export default LibrosRegistro;
