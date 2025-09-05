import React, { useState } from "react";

const PerfilAcademicoModal = ({ open, onClose, onAdd, titulo }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Perfil Académico</h2>
        <textarea
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Descripción del perfil académico"
          value={titulo}
          onChange={e => onAdd(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
          <button onClick={onAdd} className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default PerfilAcademicoModal;
