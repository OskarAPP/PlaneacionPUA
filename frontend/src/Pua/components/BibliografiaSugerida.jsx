import React, { useEffect, useState, useCallback } from "react";
import { usePuaModulo } from "../context/PuaDocumentoContext";
import { API_BASE_URL } from "../utils/api";

const MIN_SEARCH_LENGTH = 3;

// Props: materiaId (string|number)
const BibliografiaSugerida = ({ materiaId }) => {
  const [tipo, setTipo] = useState("Básica");
  const [moduloData, setModuloData] = usePuaModulo("bibliografia_sugerida", { agregados: [] });
  const agregados = moduloData.agregados || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [resultados, setResultados] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [buscando, setBuscando] = useState(false);
  const [busquedaError, setBusquedaError] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);

  const perPage = 10;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, 350);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchResultados = useCallback((term, page = 1, append = false) => {
    if (term.length < MIN_SEARCH_LENGTH) {
      setResultados([]);
      setMeta({ current_page: 1, last_page: 1, total: 0 });
      setBusquedaError('');
      return;
    }

    setBuscando(true);
    setBusquedaError('');

    const params = new URLSearchParams({
      q: term,
      page: String(page),
      per_page: String(perPage),
    });

    fetch(`${API_BASE_URL}/api/bibliografia/search?${params.toString()}`)
      .then(async res => {
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error(text || 'Respuesta no válida del servidor');
        }
        const body = await res.json();
        if (!res.ok || body.success === false) {
          throw new Error(body.message || 'Error durante la búsqueda');
        }
        return body;
      })
      .then(body => {
        setResultados(prev => append ? [...prev, ...body.data] : body.data);
        setMeta(body.meta || { current_page: page, last_page: page, total: body.data?.length || 0 });
        setBuscando(false);
      })
      .catch(err => {
        setBusquedaError(err.message || 'No se pudo completar la búsqueda');
        setBuscando(false);
      });
  }, []);

  useEffect(() => {
    if (debouncedTerm.length < MIN_SEARCH_LENGTH) {
      setResultados([]);
      setMeta({ current_page: 1, last_page: 1, total: 0 });
      return;
    }
    fetchResultados(debouncedTerm, 1, false);
  }, [debouncedTerm, fetchResultados]);

  const handleAgregar = e => {
    e.preventDefault();
    if (!selectedResult) return;
    const yaExiste = agregados.some(item => item.id === selectedResult.id && item.tipo === tipo);
    if (yaExiste) return;
    setModuloData(prev => {
      const lista = prev?.agregados || [];
      return {
        ...(prev || {}),
        agregados: [...lista, { ...selectedResult, tipo }],
      };
    });
  };

  const handleSelectResultado = (resultado) => {
    setSelectedResult(resultado);
  };

  const handleVerMas = () => {
    if (buscando) return;
    const siguiente = (meta.current_page || 1) + 1;
    if (siguiente > (meta.last_page || 1)) return;
    fetchResultados(debouncedTerm, siguiente, true);
  };
  const handleEliminar = idx => {
    setModuloData(prev => {
      const lista = prev?.agregados || [];
      return {
        ...(prev || {}),
        agregados: lista.filter((_, i) => i !== idx),
      };
    });
  };

  return (
    <div className="border rounded bg-gray-50 p-4">
      <form className="flex flex-col gap-4" onSubmit={handleAgregar}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 min-w-[240px]">
            <label className="block text-gray-700 font-semibold mb-1">Buscar en catálogo</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Título, autor, ISBN o ítem"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="mt-2 bg-white border rounded max-h-56 overflow-y-auto text-sm">
              {searchTerm.trim().length < MIN_SEARCH_LENGTH ? (
                <div className="px-3 py-2 text-gray-500">Escribe al menos {MIN_SEARCH_LENGTH} caracteres para buscar.</div>
              ) : buscando ? (
                <div className="px-3 py-2 text-gray-500">Buscando...</div>
              ) : busquedaError ? (
                <div className="px-3 py-2 text-red-600">{busquedaError}</div>
              ) : resultados.length === 0 ? (
                <div className="px-3 py-2 text-gray-500">Sin coincidencias.</div>
              ) : (
                resultados.map(resultado => {
                  const activo = selectedResult && selectedResult.id === resultado.id;
                  return (
                    <button
                      type="button"
                      key={resultado.id}
                      onClick={() => handleSelectResultado(resultado)}
                      className={`w-full text-left px-3 py-2 border-b last:border-b-0 hover:bg-blue-50 ${activo ? 'bg-blue-100' : ''}`}
                    >
                      <div className="font-semibold text-gray-800 leading-tight">{resultado.titulo}</div>
                      <div className="text-xs text-gray-600">
                        {resultado.autor || 'Autor desconocido'}{resultado.anio ? ` · ${resultado.anio}` : ''}{resultado.editorial ? ` · ${resultado.editorial}` : ''}
                      </div>
                      {resultado.isbn && (
                        <div className="text-xs text-gray-500">ISBN: {resultado.isbn}</div>
                      )}
                    </button>
                  );
                })
              )}
            </div>
            {meta.current_page < meta.last_page && resultados.length > 0 && (
              <button type="button" className="mt-2 text-sm text-blue-700 hover:underline" onClick={handleVerMas} disabled={buscando}>
                {buscando ? 'Cargando...' : 'Ver más resultados'}
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1 min-w-[150px]">
            <span className="text-gray-700 font-semibold">Clasificación</span>
            <label className="flex items-center gap-2">
              <input type="radio" name="tipo" value="Básica" checked={tipo === "Básica"} onChange={() => setTipo("Básica")} />
              Básica
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="tipo" value="Complementaria" checked={tipo === "Complementaria"} onChange={() => setTipo("Complementaria")} />
              Complementaria
            </label>
            <button type="submit" className="mt-4 border border-blue-700 text-blue-700 bg-white px-4 py-2 rounded hover:bg-blue-50 hover:border-blue-800 disabled:opacity-60" disabled={!selectedResult}>
              Agregar
            </button>
          </div>
        </div>
      </form>
      {/* Panel inferior: Bibliografía seleccionada */}
      <div className="mt-4">
        <div className="text-sm font-semibold text-gray-700 mb-2">Bibliografía seleccionada</div>
        <div className="bg-white border rounded p-2 min-h-[120px]">
          {/* Recuadro: solo elementos seleccionados por el usuario */}
            {agregados.length === 0 ? (
              <div className="text-sm text-gray-500 italic px-2 py-1">Sin elementos seleccionados</div>
            ) : (
              agregados.map((l, idx) => (
                <div key={`${l.id}-${idx}`} className="flex items-center justify-between px-2 py-1 border-b last:border-b-0 gap-2">
                  <div>
                    <div className="font-semibold text-gray-800 leading-tight">{l.titulo}</div>
                    <div className="text-sm text-gray-600 italic">
                      {l.autor || l.autores || 'Autor desconocido'}{l.editorial ? `, ${l.editorial}` : ''}{l.anio ? `, ${l.anio}` : ''}
                    </div>
                    {l.ficha && <div className="text-xs text-gray-500 mt-1">{l.ficha}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-500 text-white font-semibold">{l.tipo}</span>
                    <button type="button" className="text-gray-400 hover:text-red-600 ml-2" onClick={() => handleEliminar(idx)}>
                      ×
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BibliografiaSugerida;
