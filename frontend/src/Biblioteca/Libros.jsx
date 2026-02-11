import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { API_BASE_URL } from "../utils/api";

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
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("az");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, per_page: 25, total: 0, from: 0, to: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [sheetOption, setSheetOption] = useState('A-GENERAL');
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const fileInputRef = useRef(null);

  const perPageOptions = [10, 25, 50, 100];

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

    const params = new URLSearchParams({
      page: String(page),
      per_page: String(perPage),
      order: sortOrder === 'az' ? 'asc' : 'desc',
    });
    if (debouncedSearch.trim()) {
      params.append('search', debouncedSearch.trim());
    }

    fetch(`${API_BASE_URL}/bibliografia?${params.toString()}`)
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
        const arr = Array.isArray(body?.data) ? body.data : [];
        setBibliografia(arr);
        setMeta(body.meta || { current_page: page, last_page: page, per_page: perPage, total: arr.length, from: arr.length ? 1 : 0, to: arr.length });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'No se pudo cargar la bibliografía');
        setLoading(false);
      });
  }, [page, perPage, debouncedSearch, sortOrder]);

  useEffect(() => {
    loadBibliografia();
  }, [loadBibliografia]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      setDebouncedSearch(searchTerm.trim());
    }, 350);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [perPage, sortOrder]);

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

    fetch(`${API_BASE_URL}/bibliografia/import`, {
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

  const handlePerPageChange = (event) => {
    setPerPage(Number(event.target.value));
  };

  const goToPage = (targetPage) => {
    const lastPage = meta?.last_page ?? 1;
    if (targetPage < 1 || targetPage > lastPage || targetPage === page) {
      return;
    }
    setPage(targetPage);
  };

  const renderImportSummary = (summary) => {
    if (!summary) return null;
    const skippedEntries = Object.entries(summary.skipped_rows || {});
    return (
      <div className="mt-3 text-xs bg-white/70 border border-blue-100 rounded p-3 space-y-2">
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

  const currentPage = meta?.current_page ?? page;
  const lastPage = Math.max(meta?.last_page ?? 1, 1);
  const totalRows = meta?.total ?? 0;
  const effectivePerPage = meta?.per_page ?? perPage;
  const rangeFrom = meta?.from ?? (totalRows === 0 ? 0 : (currentPage - 1) * effectivePerPage + 1);
  const rangeTo = meta?.to ?? (rangeFrom ? rangeFrom - 1 + bibliografia.length : bibliografia.length);
  const baseIndex = rangeFrom ? rangeFrom - 1 : (currentPage - 1) * effectivePerPage;
  const rangeLabel = bibliografia.length === 0 ? '0' : `${rangeFrom}-${rangeTo}`;

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
    <div className="min-h-screen w-screen flex bg-gray-100 text-gray-900 relative">
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
            {/* Barra de búsqueda y orden */}
            <div className="bg-[#3578b3] text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2">Buscar</div>
            <div className="bg-white border border-gray-200 rounded-b-md p-4 flex flex-col md:flex-row md:items-end gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1">Libro:</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-4-4m0 0A7 7 0 105 5a7 7 0 0012 12z' /></svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Nombre del libro"
                    className="pl-10 pr-3 py-2 border rounded w-full focus:outline-none bg-white border-gray-300 text-gray-900"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 md:max-w-xs">
                <label className="block text-gray-700 font-semibold mb-1">Ordenar alfabéticamente por:</label>
                <select className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                  <option value="az">A a Z</option>
                  <option value="za">Z a A</option>
                </select>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-md p-4 mb-6">
              <h3 className="text-base font-semibold text-gray-800 mb-3">Importar inventario bibliográfico</h3>
              <form onSubmit={handleImport} className="flex flex-col lg:flex-row lg:items-end gap-3">
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1">Archivo XLSX</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1">Hoja a importar</label>
                  <select
                    value={sheetOption}
                    onChange={e => setSheetOption(e.target.value)}
                    className="w-full border rounded px-3 py-2 bg-white border-gray-300 text-gray-900"
                  >
                    {sheetOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={importing}
                  className="px-6 py-2 bg-[#3578b3] text-white rounded font-semibold min-w-[140px] disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#285a87] transition-colors"
                >
                  {importing ? 'Importando...' : 'Importar' }
                </button>
              </form>
              {importResult && (
                <div className={`mt-3 text-sm px-3 py-2 rounded border ${importResult.type === 'ok' ? 'bg-green-50 border-green-300 text-green-700' : 'bg-red-50 border-red-300 text-red-700'}`}>
                  {importResult.message}
                  {renderImportSummary(importResult.summary)}
                </div>
              )}
            </div>
            {/* Lista de libros */}
            <div className="bg-[#d6edf9] text-[#1a3c5a] text-base font-semibold rounded-t-md px-4 py-2 text-center border border-[#b5d6ea]">Bibliografía</div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-4 text-center">Cargando bibliografía...</div>
              ) : error ? (
                <div className="p-4 text-center text-red-600">{error}</div>
              ) : (
                <table className="min-w-full border border-[#b5d6ea] text-sm">
                  <thead>
                    <tr className="bg-white">
                      <th className="border px-2 py-2">#</th>
                      <th className="border px-2 py-2">Autor</th>
                      <th className="border px-2 py-2">Título</th>
                      <th className="border px-2 py-2">Editorial</th>
                      <th className="border px-2 py-2">Edición</th>
                      <th className="border px-2 py-2">Clasificación</th>
                      <th className="border px-2 py-2">Cutter</th>
                      <th className="border px-2 py-2">Año</th>
                      <th className="border px-2 py-2">ISBN</th>
                      <th className="border px-2 py-2">Vol./Ejem.</th>
                      <th className="border px-2 py-2">Item</th>
                      <th className="border px-2 py-2">ISBN extra</th>
                      <th className="border px-2 py-2">Obsoletos</th>
                      <th className="border px-2 py-2">Vol. obsoletos</th>
                      <th className="border px-2 py-2">Cantidad total</th>
                      <th className="border px-2 py-2">Observación</th>
                      <th className="border px-2 py-2">Ficha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bibliografia.length === 0 ? (
                      <tr><td colSpan="17" className="text-center py-4">No hay registros.</td></tr>
                    ) : (
                      bibliografia.map((item, idx) => {
                        return (
                          <tr key={item.id} className="hover:bg-blue-50">
                            <td className="border px-2 py-1">{baseIndex + idx + 1}</td>
                            <td className="border px-2 py-1">{renderValue(item.autor)}</td>
                            <td className="border px-2 py-1">{renderValue(item.titulo)}</td>
                            <td className="border px-2 py-1">{renderValue(item.editorial)}</td>
                            <td className="border px-2 py-1">{renderValue(item.edicion)}</td>
                            <td className="border px-2 py-1">{renderValue(item.clasificacion)}</td>
                            <td className="border px-2 py-1">{renderValue(item.cutter)}</td>
                            <td className="border px-2 py-1">{renderValue(item.anio)}</td>
                            <td className="border px-2 py-1">{renderValue(item.isbn)}</td>
                            <td className="border px-2 py-1">{renderValue(item.vol_ejem)}</td>
                            <td className="border px-2 py-1">{renderValue(item.item)}</td>
                            <td className="border px-2 py-1">{renderValue(item.isbn_extra)}</td>
                            <td className="border px-2 py-1">{renderValue(item.ti_obsoletos)}</td>
                            <td className="border px-2 py-1">{renderValue(item.volum_obsol)}</td>
                            <td className="border px-2 py-1">{renderValue(item.cant_total)}</td>
                            <td className="border px-2 py-1">{renderValue(item.observacion)}</td>
                            <td className="border px-2 py-1 max-w-[260px] whitespace-pre-line">{construirFicha(item)}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              )}
            </div>
            {!loading && !error && (
              <div className="border border-t-0 border-[#b5d6ea] rounded-b-md px-4 py-3 flex flex-col gap-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm">
                  <span>Mostrando {rangeLabel} de {totalRows}</span>
                  <div className="flex items-center gap-2">
                    <span>Por página:</span>
                    <select value={perPage} onChange={handlePerPageChange} className="border rounded px-2 py-1 bg-white border-gray-300 text-gray-900">
                      {perPageOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="px-3 py-1 border rounded disabled:opacity-60 disabled:cursor-not-allowed border-gray-300"
                  >
                    Anterior
                  </button>
                  <span className="text-sm">Página {currentPage} de {lastPage}</span>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= lastPage}
                    className="px-3 py-1 border rounded disabled:opacity-60 disabled:cursor-not-allowed border-gray-300"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
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
    </div>
  );
}

export default Libros;