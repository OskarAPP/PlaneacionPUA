import React, { useState } from "react";
import NuevoTemaModal from "./modals/NuevoTemaModal";
import NuevoSubtemaModal from "./modals/NuevoSubtemaModal";
import NuevaBibliografiaModal from "./modals/NuevaBibliografiaModal";
import NuevoActividadModal from "./modals/NuevoActividadModal";
import { bibliosEjemplo } from "../constants/puaConstants";

const SubcompetenciaPanel = ({ nombre, idx, onRemove }) => {
  // ...código original, usando los modales y bibliosEjemplo importados...
  return (
    <div className="border rounded p-3 mb-2">
      <div className="font-semibold mb-2">{nombre}</div>
      <input
        type="text"
        className="w-full border rounded px-3 py-2 text-sm mb-2"
        placeholder="Descripción de la subcompetencia"
        value={subcompetencia.descripcion || ""}
        onChange={e => onChange({ ...subcompetencia, descripcion: e.target.value })}
      />
      {/* Aquí podrías agregar más campos si es necesario */}
    </div>
  );
};

export default SubcompetenciaPanel;
