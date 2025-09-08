import React from "react";

const DatosPuaForm = ({ materiaSeleccionada, planEstudio }) => (
  <form className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-100">
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Unidad de aprendizaje:</label>
      <input 
        type="text" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" 
        value={materiaSeleccionada?.nombre || ''} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Créditos:</label>
      <input 
        type="number" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" 
        value={materiaSeleccionada?.creditos_totales || ''} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Horas totales:</label>
      <input 
        type="number" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" 
        value={materiaSeleccionada?.horas_totales || ''} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Horas teóricas:</label>
      <input 
        type="number" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" 
        value={materiaSeleccionada?.horas_teoricas || ''} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Horas prácticas:</label>
      <input 
        type="number" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" 
        value={materiaSeleccionada?.horas_practicas || ''} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Área:</label>
      <input 
        type="text" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" 
        value={materiaSeleccionada?.area_nombre || ''} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Núcleo:</label>
      <input 
        type="text" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" 
        value={materiaSeleccionada?.nucleo_nombre || ''} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Tipo:</label>
      <input 
        type="text" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" 
        value={materiaSeleccionada?.tipo_materia_nombre || ''} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Art. 57 RGA:</label>
      <input 
        type="text" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" 
        value={materiaSeleccionada?.art57 || ''} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Plan de Estudio:</label>
      <input 
        type="text" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" 
        value={planEstudio?.nombre || ''} 
        readOnly 
      />
    </div>
  </form>
);

export default DatosPuaForm;