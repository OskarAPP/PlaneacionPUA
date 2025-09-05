import React, { useState } from "react";

const EvaluacionFinal = () => {
  const [instrumentos, setInstrumentos] = useState([
    { nombre: '', porcentaje: '' },
    { nombre: '', porcentaje: '' },
    { nombre: '', porcentaje: '' },
    { nombre: '', porcentaje: '' },
  ]);

  const handleChange = (idx, field, value) => {
    setInstrumentos(instrumentos.map((ins, i) => i === idx ? { ...ins, [field]: value } : ins));
  };

  const handleGuardar = e => {
    e.preventDefault();
    // Aquí podrías manejar el guardado
  };

  return (
    <form className="space-y-3" onSubmit={handleGuardar}>
      {instrumentos.map((ins, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <input
            type="text"
            className="flex-1 border rounded px-3 py-2 text-sm"
            placeholder="Instrumentos de evaluacion final"
            value={ins.nombre}
            onChange={e => handleChange(idx, 'nombre', e.target.value)}
          />
          <div className="flex items-center border rounded overflow-hidden w-32">
            <input
              type="number"
              className="w-full px-2 py-2 text-sm border-0 focus:ring-0 focus:outline-none"
              placeholder=""
              value={ins.porcentaje}
              onChange={e => handleChange(idx, 'porcentaje', e.target.value)}
              min="0"
              max="100"
            />
            <span className="bg-gray-100 px-2 py-2 text-gray-600 text-xs border-l">%</span>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button type="submit" className="border border-blue-700 text-blue-700 bg-white px-4 py-2 rounded hover:bg-blue-50 hover:border-blue-800">Guardar</button>
      </div>
    </form>
  );
};

export default EvaluacionFinal;
