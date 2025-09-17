import React, { useState, useMemo } from 'react';

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
  const [form, setForm] = useState(camposIniciales);
  const [registros, setRegistros] = useState([]); // almacenamiento local
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
    if (tocar[name]) {
      setErrores(validar({ ...form, [name]: value }));
    }
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
    const nuevo = { ...form, id: Date.now(), ficha };
    setRegistros(prev => [nuevo, ...prev]);
    resetForm();
  };

  const filtrados = useMemo(() => {
    const term = filtro.toLowerCase();
    const base = registros.filter(r => (
      r.autor.toLowerCase().includes(term) ||
      r.titulo.toLowerCase().includes(term) ||
      (r.ficha || '').toLowerCase().includes(term)
    ));
    return base.sort((a,b) => {
      if (orden === 'reciente') return b.id - a.id;
      if (orden === 'antiguo') return a.id - b.id;
      return (a.titulo||'').localeCompare(b.titulo||'');
    });
  }, [registros, filtro, orden]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Registro Bibliográfico (Local)</h1>
      <form onSubmit={onAdd} className="grid gap-4 md:grid-cols-2 bg-white dark:bg-gray-800 p-4 rounded border dark:border-gray-700">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1">Autor *</label>
          <input name="autor" value={form.autor} onChange={onChange} onBlur={onBlur} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-600" />
          {tocar.autor && errores.autor && <p className="text-red-600 text-xs mt-1">{errores.autor}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Año *</label>
          <input name="anio_publicacion" type="number" value={form.anio_publicacion} onChange={onChange} onBlur={onBlur} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-600" />
          {tocar.anio_publicacion && errores.anio_publicacion && <p className="text-red-600 text-xs mt-1">{errores.anio_publicacion}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">ISBN</label>
          <input name="isbn" value={form.isbn} onChange={onChange} onBlur={onBlur} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-600" />
          {tocar.isbn && errores.isbn && <p className="text-red-600 text-xs mt-1">{errores.isbn}</p>}
        </div>
        <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Título *</label>
            <input name="titulo" value={form.titulo} onChange={onChange} onBlur={onBlur} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-600" />
            {tocar.titulo && errores.titulo && <p className="text-red-600 text-xs mt-1">{errores.titulo}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Editorial *</label>
          <input name="editorial" value={form.editorial} onChange={onChange} onBlur={onBlur} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-600" />
          {tocar.editorial && errores.editorial && <p className="text-red-600 text-xs mt-1">{errores.editorial}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Lugar de publicación</label>
          <input name="lugar_publicacion" value={form.lugar_publicacion} onChange={onChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-600" />
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="block text-sm font-semibold">Vista previa ficha</label>
          <div className="text-xs bg-gray-50 dark:bg-gray-900 border rounded px-3 py-2 dark:border-gray-700 min-h-[40px] whitespace-pre-wrap">{ficha || '—'}</div>
        </div>
        <div className="md:col-span-2 flex gap-3 mt-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">Agregar</button>
          <button type="button" onClick={resetForm} className="border px-4 py-2 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700">Limpiar</button>
        </div>
      </form>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Filtrar</label>
            <input value={filtro} onChange={e=>setFiltro(e.target.value)} placeholder="Autor, título o parte de ficha" className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Orden</label>
            <select value={orden} onChange={e=>setOrden(e.target.value)} className="border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-600">
              <option value="reciente">Más reciente</option>
              <option value="antiguo">Más antiguo</option>
              <option value="titulo">Título (A-Z)</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border px-2 py-1 dark:border-gray-700">#</th>
                <th className="border px-2 py-1 dark:border-gray-700">Autor</th>
                <th className="border px-2 py-1 dark:border-gray-700">Año</th>
                <th className="border px-2 py-1 dark:border-gray-700">Título</th>
                <th className="border px-2 py-1 dark:border-gray-700">Editorial</th>
                <th className="border px-2 py-1 dark:border-gray-700">Lugar</th>
                <th className="border px-2 py-1 dark:border-gray-700">ISBN</th>
                <th className="border px-2 py-1 dark:border-gray-700">Ficha</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length === 0 ? (
                <tr><td colSpan="8" className="text-center py-4 text-xs">Sin registros</td></tr>
              ) : filtrados.map((r,i)=>(
                <tr key={r.id} className="hover:bg-blue-50 dark:hover:bg-gray-700">
                  <td className="border px-2 py-1 dark:border-gray-700">{i+1}</td>
                  <td className="border px-2 py-1 dark:border-gray-700">{r.autor}</td>
                  <td className="border px-2 py-1 dark:border-gray-700">{r.anio_publicacion}</td>
                  <td className="border px-2 py-1 dark:border-gray-700">{r.titulo}</td>
                  <td className="border px-2 py-1 dark:border-gray-700">{r.editorial}</td>
                  <td className="border px-2 py-1 dark:border-gray-700">{r.lugar_publicacion || '—'}</td>
                  <td className="border px-2 py-1 dark:border-gray-700">{r.isbn || '—'}</td>
                  <td className="border px-2 py-1 dark:border-gray-700 max-w-[260px] whitespace-pre-wrap">{r.ficha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Nota futura */}
      <p className="text-xs text-gray-500 mt-6">
        Integración futura: enviar POST con estos campos al backend y reemplazar 'id' temporal por el generado en base de datos.
      </p>
    </div>
  );
};

export default LibrosRegistro;
