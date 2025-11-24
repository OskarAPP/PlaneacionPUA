import React from "react";

const ensureValue = (value = {}) => ({
  titulo: value.titulo || "",
  descripcion: value.descripcion || "",
  resultados: value.resultados || "",
  actividades: value.actividades || "",
  evidencias: value.evidencias || "",
  recursos: value.recursos || "",
  horasTeoricas: value.horasTeoricas || "",
  horasPracticas: value.horasPracticas || "",
});

const SubcompetenciaPanel = ({ index, value, onChange, onRemove }) => {
  const current = ensureValue(value);
  const update = (field, newValue) => {
    onChange?.({ ...current, [field]: newValue });
  };

  return (
    <div className="border rounded-xl p-4 w-full bg-white shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Subcompetencia {index + 1}</p>
          <input
            type="text"
            className="mt-1 w-full border rounded px-3 py-2 text-sm font-semibold text-gray-800"
            placeholder="Título de la subcompetencia"
            value={current.titulo}
            onChange={e => update("titulo", e.target.value)}
          />
        </div>
        <button
          type="button"
          className="text-xs text-red-600 hover:text-red-700"
          onClick={onRemove}
        >
          Eliminar
        </button>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Descripción</label>
        <textarea
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="Describe el propósito de la subcompetencia"
          value={current.descripcion}
          onChange={e => update("descripcion", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Horas teóricas</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2 text-sm"
            min="0"
            value={current.horasTeoricas}
            onChange={e => update("horasTeoricas", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Horas prácticas</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2 text-sm"
            min="0"
            value={current.horasPracticas}
            onChange={e => update("horasPracticas", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Resultados de aprendizaje</label>
        <textarea
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="Resultados o competencias específicas alcanzadas"
          value={current.resultados}
          onChange={e => update("resultados", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Actividades de aprendizaje</label>
        <textarea
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="Describe las actividades sugeridas"
          value={current.actividades}
          onChange={e => update("actividades", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Evidencias de evaluación</label>
          <textarea
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Productos, rúbricas o instrumentos"
            value={current.evidencias}
            onChange={e => update("evidencias", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Recursos / Materiales</label>
          <textarea
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Material bibliográfico, digital o infraestructura"
            value={current.recursos}
            onChange={e => update("recursos", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SubcompetenciaPanel;
