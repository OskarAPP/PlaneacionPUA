import React, { useState } from "react";

const defaultSubcompetencia = () => ({
  descripcion: "",
  notas: "",
});

const SubcompetenciaPanel = ({ nombre, idx, onRemove }) => {
  const [subcompetencia, setSubcompetencia] = useState(defaultSubcompetencia);

  const handleChange = (field, value) => {
    setSubcompetencia(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="border rounded-lg p-4 w-full bg-white shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-gray-700">{nombre}</div>
        <button
          type="button"
          className="text-xs text-red-600 hover:text-red-700"
          onClick={onRemove}
        >
          Eliminar
        </button>
      </div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">Descripción</label>
      <textarea
        className="w-full border rounded px-3 py-2 text-sm mb-3"
        placeholder="Describe la subcompetencia"
        value={subcompetencia.descripcion}
        onChange={e => handleChange("descripcion", e.target.value)}
      />
      <label className="block text-xs font-semibold text-gray-600 mb-1">Notas</label>
      <textarea
        className="w-full border rounded px-3 py-2 text-sm"
        placeholder="Agrega indicaciones o materiales"
        value={subcompetencia.notas}
        onChange={e => handleChange("notas", e.target.value)}
      />
    </div>
  );
};

export default SubcompetenciaPanel;
