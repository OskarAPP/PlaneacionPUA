import React, { useEffect, useState } from "react";

// Props: materiaId (string|number)
const BibliografiaSugerida = ({ materiaId }) => {
  // Selección desde backend únicamente
  const [libroSeleccionado, setLibroSeleccionado] = useState("");
  const [tipo, setTipo] = useState("Básica");
  // Lista proveniente de backend (solo lectura)
  const [bibliografia, setBibliografia] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  // Lista seleccionada por el usuario (derivada solo de BD)
  const [agregados, setAgregados] = useState([]);

  useEffect(() => {
    if (!materiaId) {
      setBibliografia([]);
      setLibroSeleccionado("");
      return;
    }
    setCargando(true);
    setError("");
    fetch(`http://localhost:8000/api/bibliografia?materia_id=${materiaId}`)
      .then(r => r.ok ? r.json() : Promise.reject("Error al cargar bibliografía"))
      .then(data => {
        const arr = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
        setBibliografia(arr);
        setCargando(false);
      })
      .catch(() => {
        setError("No se pudo cargar la bibliografía de la materia seleccionada");
        setCargando(false);
      });
  }, [materiaId]);

  const handleAgregar = e => {
    e.preventDefault();
    if (!libroSeleccionado) return;
    // Las opciones del backend van como JSON en value
    let nuevo = null;
    try {
      const parsed = JSON.parse(libroSeleccionado);
      nuevo = {
        fuente: 'bd',
        id: parsed.id,
        titulo: parsed.titulo,
        autores: parsed.autor,
        editorial: parsed.editorial,
        anio: parsed.anio_publicacion,
        isbn: parsed.isbn,
      };
    } catch (_) {}
    if (!nuevo) return;
    setAgregados([...agregados, { ...nuevo, tipo }]);
  };
  const handleEliminar = idx => {
    setAgregados(agregados.filter((_, i) => i !== idx));
  };

  // Sin lista de BD en el recuadro; solo dropdown

  return (
    <div className="border rounded bg-gray-50 p-4">
      <form className="flex flex-col md:flex-row gap-4 items-start" onSubmit={handleAgregar}>
        <div className="flex flex-col gap-2 min-w-[200px]">
          <select
            className="border rounded px-2 py-1"
            value={libroSeleccionado}
            onChange={e => setLibroSeleccionado(e.target.value)}
          >
            <option value="" disabled>Seleccione bibliografía…</option>
            <optgroup label="Bibliografía (BD)">
              {bibliografia.length === 0 ? (
                <option value="" disabled>{cargando ? 'Cargando...' : 'Sin registros'}</option>
              ) : (
                bibliografia.map(b => (
                  <option key={b.id} value={JSON.stringify(b)}>
                    {b.titulo} {b.autor ? `— ${b.autor}` : ''}
                  </option>
                ))
              )}
            </optgroup>
          </select>
          <div className="flex flex-col gap-1 mt-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="tipo" value="Básica" checked={tipo === "Básica"} onChange={() => setTipo("Básica")}/>
              Básica
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="tipo" value="Complementaria" checked={tipo === "Complementaria"} onChange={() => setTipo("Complementaria")}/>
              Complementaria
            </label>
          </div>
        </div>
        <button type="submit" className="border border-blue-700 text-blue-700 bg-white px-4 py-2 rounded hover:bg-blue-50 hover:border-blue-800">
          <span className="fa fa-arrow-right" />
        </button>
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
              <div key={idx} className="flex items-center justify-between px-2 py-1 border-b last:border-b-0 gap-2">
                <div>
                  <div className="font-semibold text-gray-800 leading-tight">{l.titulo}</div>
                  <div className="text-sm text-gray-600 italic">{l.autores || ''}{l.editorial ? `, ${l.editorial}` : ''}{l.anio ? `, ${l.anio}` : ''}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full bg-gray-400 text-white font-semibold`}>{l.tipo}</span>
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
