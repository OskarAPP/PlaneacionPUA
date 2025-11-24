import React from "react";
import { usePuaModulo } from "../context/PuaDocumentoContext";
import SubcompetenciaPanel from "./SubcompetenciaPanel";

const createEmptySubcompetencia = () => ({
  titulo: "",
  descripcion: "",
  resultados: "",
  actividades: "",
  evidencias: "",
  recursos: "",
  horasTeoricas: "",
  horasPracticas: "",
});

const SubcompetenciasModule = () => {
  const [moduloData, setModuloData, meta] = usePuaModulo("subcompetencias", { items: [] });
  const items = Array.isArray(moduloData?.items) ? moduloData.items : [];

  const updateItems = (nextItems) => {
    setModuloData(prev => ({
      ...(prev || {}),
      items: nextItems,
    }));
  };

  const handleAdd = () => {
    updateItems([...items, createEmptySubcompetencia()]);
  };

  const handleChange = (index, nextValue) => {
    const nextItems = items.map((item, idx) => (idx === index ? nextValue : item));
    updateItems(nextItems);
  };

  const handleRemove = (index) => {
    updateItems(items.filter((_, idx) => idx !== index));
  };

  const locked = meta.status === "listo" && !meta.isDirty;

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Registra cada subcompetencia con sus actividades, horas y evidencias para que aparezcan en el PDF institucional.
      </p>
      {items.length === 0 && (
        <div className="border border-dashed rounded-lg p-6 text-center text-sm text-gray-500">
          Aún no has creado subcompetencias. Usa el botón para agregar la primera.
        </div>
      )}
      <div className="space-y-4">
        {items.map((item, idx) => (
          <SubcompetenciaPanel
            key={`subcompetencia-${idx}`}
            index={idx}
            value={item}
            onChange={(next) => handleChange(idx, next)}
            onRemove={() => handleRemove(idx)}
          />
        ))}
      </div>
      <button
        type="button"
        className="border border-blue-700 text-blue-700 bg-white px-4 py-2 rounded hover:bg-blue-50 hover:border-blue-800 disabled:opacity-60"
        onClick={handleAdd}
        disabled={locked}
      >
        Agregar subcompetencia
      </button>
      {locked && (
        <div className="text-xs text-amber-600">
          Este módulo está marcado como listo. Pulsa "Editar" en el acordeón para habilitar cambios.
        </div>
      )}
    </div>
  );
};

export default SubcompetenciasModule;
