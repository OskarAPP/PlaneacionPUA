import React, { useState } from "react";
import { librosDisponibles } from "../constants/puaConstants";

const BibliografiaSugerida = () => {
  const [libroSeleccionado, setLibroSeleccionado] = useState(librosDisponibles[0].titulo);
  const [tipo, setTipo] = useState("Básica");
  const [agregados, setAgregados] = useState([
    { ...librosDisponibles[0], tipo: "Básica" },
    { ...librosDisponibles[0], tipo: "Básica" },
    { ...librosDisponibles[1], tipo: "Básica" }
  ]);

  const handleAgregar = e => {
    e.preventDefault();
    const libro = librosDisponibles.find(l => l.titulo === libroSeleccionado);
    if (!libro) return;
    setAgregados([...agregados, { ...libro, tipo }]);
  };
  const handleEliminar = idx => {
    setAgregados(agregados.filter((_, i) => i !== idx));
  };

  return (
    <div className="border rounded bg-gray-50 p-4">
      <form className="flex flex-col md:flex-row gap-4 items-start" onSubmit={handleAgregar}>
        <div className="flex flex-col gap-2 min-w-[200px]">
          <select
            className="border rounded px-2 py-1"
            value={libroSeleccionado}
            onChange={e => setLibroSeleccionado(e.target.value)}
          >
            {librosDisponibles.map(l => (
              <option key={l.titulo} value={l.titulo}>{l.titulo}</option>
            ))}
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
        <div className="flex-1 w-full">
          <div className="bg-white border rounded p-2 min-h-[120px]">
            {agregados.map((l, idx) => (
              <div key={idx} className="flex items-center justify-between px-2 py-1 border-b last:border-b-0 gap-2">
                <div>
                  <div className="font-semibold text-gray-800 leading-tight">{l.titulo}</div>
                  <div className="text-sm text-gray-600 italic">{l.autores}{l.editorial ? `, ${l.editorial}` : ''}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full bg-gray-400 text-white font-semibold`}>{l.tipo}</span>
                  <button type="button" className="text-gray-400 hover:text-red-600 ml-2" onClick={() => handleEliminar(idx)}>
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default BibliografiaSugerida;
