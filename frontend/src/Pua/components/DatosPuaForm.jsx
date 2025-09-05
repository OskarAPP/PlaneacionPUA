import React from "react";

const DatosPuaForm = () => (
  <form className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-100">
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Unidad de aprendizaje:</label>
      <input type="text" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="Investigación de operaciones I" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Creditos:</label>
      <input type="number" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="3" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Horas totales:</label>
      <input type="number" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="3" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Horas teoricas:</label>
      <input type="number" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="2" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Horas practicas:</label>
      <input type="number" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="1" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Area:</label>
      <input type="text" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="Ciencias de la Ingeniería" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Núcleo:</label>
      <input type="text" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="Sustantivo" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Tipo:</label>
      <input type="text" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="Obligatorio" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Art. 57 RGA:</label>
      <input type="text" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="NO" />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 mb-1">Plan de Estudio:</label>
      <input type="text" className="w-full max-w-full border rounded px-2 py-1 bg-gray-100" placeholder="2009" />
    </div>
  </form>
);

export default DatosPuaForm;
