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
  const [selectedFile, setSelectedFile] = useState(null);
  const [sheetOption, setSheetOption] = useState('A-GENERAL');
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const fileInputRef = useRef(null);

  const sheetOptions = [
    { value: 'A-GENERAL', label: 'A-GENERAL' },
    { value: 'ACERVO GRAL. ACT. 1', label: 'ACERVO GRAL. ACT. 1' },
    { value: 'A-CONSULTA', label: 'A-CONSULTA' },
    { value: 'all', label: 'Todas las hojas' },
  ];

  const construirFicha = (item) => {
    if (!item) return "";
    if (item.ficha) return item.ficha;
    const autor = item.autor || "Autor desconocido";
    const anio = item.anio || "s.f.";
    const titulo = item.titulo || "Título";
    const editorial = item.editorial ? `${item.editorial}.` : "";
    const vol = item.vol_ejem ? `${item.vol_ejem}.` : "";
    const isbn = item.isbn || item.isbn_extra ? `ISBN: ${item.isbn || item.isbn_extra}.` : "";
    return `${autor} (${anio}). ${titulo}. ${editorial} ${vol} ${isbn}`.replace(/\s+/g,' ').trim();
  };

  const loadBibliografia = React.useCallback(() => {
    setLoading(true);
    setError('');
    fetch('http://localhost:8000/api/bibliografia')
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
          throw new Error(body.message || 'Error al cargar bibliografía');
        }
        const arr = Array.isArray(body?.data) ? body.data : Array.isArray(body) ? body : [];
        setBibliografia(arr);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'No se pudo cargar la bibliografía');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadBibliografia();
  }, [loadBibliografia]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleImport = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setImportResult({ type: 'error', message: 'Selecciona un archivo XLSX antes de importar.', summary: null });
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    if (sheetOption) {
      formData.append('sheet', sheetOption);
    }

    setImporting(true);
    setImportResult(null);

    fetch('http://localhost:8000/api/bibliografia/import', {
      method: 'POST',
      body: formData,
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
          throw new Error(body.message || 'No se pudo importar el archivo');
        }
        setImportResult({ type: 'ok', message: body.message || 'Importación finalizada', summary: body.summary || null });
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        loadBibliografia();
      })
      .catch(err => {
        setImportResult({ type: 'error', message: err.message || 'Error al importar', summary: null });
      })
      .finally(() => setImporting(false));
  };

  const renderImportSummary = (summary) => {
    if (!summary) return null;
    const skippedEntries = Object.entries(summary.skipped_rows || {});
    return (
      <div className="mt-3 text-xs bg-white/70 dark:bg-gray-900 border border-blue-100 dark:border-blue-700 rounded p-3 space-y-2">
        <div className="flex gap-4">
          <span><strong>Creado:</strong> {summary.created}</span>
          <span><strong>Actualizado:</strong> {summary.updated}</span>
        </div>
        {summary.processed_sheets?.length > 0 && (
          <div><strong>Hojas procesadas:</strong> {summary.processed_sheets.join(', ')}</div>
        )}
        {skippedEntries.length > 0 && (
          <div>
            <strong>Filas omitidas:</strong>
            <ul className="list-disc pl-5 space-y-1">
              {skippedEntries.map(([sheet, rows]) => (
                <li key={sheet}>
                  <span className="font-semibold">{sheet}:</span> {rows.map(r => `Fila ${r.row} (${r.motivo})`).join('; ')}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Filtrado y ordenamiento
  const filteredItems = bibliografia
    .filter(i => {
      const needle = searchTerm.toLowerCase();
      return (
        (i.titulo || "").toLowerCase().includes(needle) ||
        (i.autor || "").toLowerCase().includes(needle) ||
        (i.editorial || "").toLowerCase().includes(needle) ||
        (i.clasificacion || "").toLowerCase().includes(needle) ||
        (i.isbn || "").toLowerCase().includes(needle) ||
        (i.item || "").toLowerCase().includes(needle)
      );
    })
    .sort((a,b) => {
      const ta = (a.titulo||"").toLowerCase();
      const tb = (b.titulo||"").toLowerCase();
      return sortOrder === 'az' ? ta.localeCompare(tb) : tb.localeCompare(ta);
    });

  const renderValue = (value) => {
    if (value === null || value === undefined || value === '') return '—';
    return value;
  };

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
            <div className="bg-white border rounded-md p-4 mb-6 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-3">Importar inventario bibliográfico</h3>
              <form onSubmit={handleImport} className="flex flex-col lg:flex-row lg:items-end gap-3">
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Archivo XLSX</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1 dark:text-gray-200">Hoja a importar</label>
                  <select
                    value={sheetOption}
                    onChange={e => setSheetOption(e.target.value)}
                    className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                  >
                    {sheetOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={importing}
                  className="px-6 py-2 bg-[#3578b3] text-white rounded font-semibold min-w-[140px] disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#285a87] transition-colors dark:bg-blue-900 dark:hover:bg-blue-800"
                >
                  {importing ? 'Importando…' : 'Importar' }
                </button>
              </form>
              {importResult && (
                <div className={`mt-3 text-sm px-3 py-2 rounded border ${importResult.type === 'ok' ? 'bg-green-50 border-green-300 text-green-700 dark:bg-green-900/20 dark:border-green-700 dark:text-green-200' : 'bg-red-50 border-red-300 text-red-700 dark:bg-red-900/20 dark:border-red-700 dark:text-red-200'}`}>
                  {importResult.message}
                  {renderImportSummary(importResult.summary)}
                </div>
              )}
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
                      <th className="border px-2 py-2 dark:border-blue-900">Título</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Editorial</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Edición</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Clasificación</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Cutter</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Año</th>
                      <th className="border px-2 py-2 dark:border-blue-900">ISBN</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Vol./Ejem.</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Item</th>
                      <th className="border px-2 py-2 dark:border-blue-900">ISBN extra</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Obsoletos</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Vol. obsoletos</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Cantidad total</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Observación</th>
                      <th className="border px-2 py-2 dark:border-blue-900">Ficha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length === 0 ? (
                      <tr><td colSpan="17" className="text-center py-4">No hay registros.</td></tr>
                    ) : (
                      filteredItems.map((item, idx) => {
                        return (
                          <tr key={item.id} className="hover:bg-blue-50 dark:hover:bg-gray-700">
                            <td className="border px-2 py-1 dark:border-blue-900">{idx + 1}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{renderValue(item.autor)}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{renderValue(item.titulo)}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{renderValue(item.editorial)}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{renderValue(item.edicion)}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{renderValue(item.clasificacion)}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{renderValue(item.cutter)}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{renderValue(item.anio)}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{renderValue(item.isbn)}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{renderValue(item.vol_ejem)}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{renderValue(item.item)}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{renderValue(item.isbn_extra)}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{renderValue(item.ti_obsoletos)}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{renderValue(item.volum_obsol)}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{renderValue(item.cant_total)}</td>
                            <td className="border px-2 py-1 dark:border-blue-900">{renderValue(item.observacion)}</td>
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
    </div>
  );
}

export default Libros;