import React, { useEffect, useMemo } from "react";
import { usePuaModulo } from "../context/PuaDocumentoContext";

const DatosPuaForm = ({ materiaSeleccionada, planEstudio }) => {
  const [moduloData, setModuloData] = usePuaModulo("datos_pua", {
    materia: {},
    plan_estudio: {},
  });

  const materiaPersistida = useMemo(() => ({
    nombre: materiaSeleccionada?.nombre ?? moduloData?.materia?.nombre ?? "",
    creditos_totales: materiaSeleccionada?.creditos_totales ?? moduloData?.materia?.creditos_totales ?? "",
    horas_totales: materiaSeleccionada?.horas_totales ?? moduloData?.materia?.horas_totales ?? "",
    horas_teoricas: materiaSeleccionada?.horas_teoricas ?? moduloData?.materia?.horas_teoricas ?? "",
    horas_practicas: materiaSeleccionada?.horas_practicas ?? moduloData?.materia?.horas_practicas ?? "",
    area_nombre: materiaSeleccionada?.area_nombre ?? moduloData?.materia?.area_nombre ?? "",
    nucleo_nombre: materiaSeleccionada?.nucleo_nombre ?? moduloData?.materia?.nucleo_nombre ?? "",
    tipo_materia_nombre: materiaSeleccionada?.tipo_materia_nombre ?? moduloData?.materia?.tipo_materia_nombre ?? "",
    art57: materiaSeleccionada?.art57 ?? moduloData?.materia?.art57 ?? "",
  }), [materiaSeleccionada, moduloData?.materia]);

  const planPersistido = useMemo(() => ({
    nombre: planEstudio?.nombre ?? moduloData?.plan_estudio?.nombre ?? "",
  }), [planEstudio, moduloData?.plan_estudio]);

  useEffect(() => {
    if (!materiaSeleccionada && !planEstudio) return;

    const nextPayload = {
      materia: {
        nombre: materiaSeleccionada?.nombre ?? "",
        creditos_totales: materiaSeleccionada?.creditos_totales ?? "",
        horas_totales: materiaSeleccionada?.horas_totales ?? "",
        horas_teoricas: materiaSeleccionada?.horas_teoricas ?? "",
        horas_practicas: materiaSeleccionada?.horas_practicas ?? "",
        area_nombre: materiaSeleccionada?.area_nombre ?? "",
        nucleo_nombre: materiaSeleccionada?.nucleo_nombre ?? "",
        tipo_materia_nombre: materiaSeleccionada?.tipo_materia_nombre ?? "",
        art57: materiaSeleccionada?.art57 ?? "",
      },
      plan_estudio: {
        nombre: planEstudio?.nombre ?? "",
      },
      materia_id: materiaSeleccionada?.materia_id ?? null,
      carrera_id: materiaSeleccionada?.carrera_id ?? null,
    };

    const prevString = JSON.stringify(moduloData ?? {});
    const nextString = JSON.stringify(nextPayload);
    if (prevString === nextString) return;

    setModuloData(nextPayload);
  }, [materiaSeleccionada, planEstudio, moduloData, setModuloData]);

  return (
  <form className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-100">
    <div>
      <label className="block font-semibold text-gray-700 dark:text-blue-900 mb-1">Unidad de aprendizaje:</label>
      <input 
        type="text" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100 text-gray-900" 
        value={materiaPersistida.nombre} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 dark:text-blue-900 mb-1">Créditos:</label>
      <input 
        type="number" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100 text-gray-900" 
        value={materiaPersistida.creditos_totales} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 dark:text-blue-900 mb-1">Horas totales:</label>
      <input 
        type="number" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100 text-gray-900" 
        value={materiaPersistida.horas_totales} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 dark:text-blue-900 mb-1">Horas teóricas:</label>
      <input 
        type="number" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100 text-gray-900" 
        value={materiaPersistida.horas_teoricas} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 dark:text-blue-900 mb-1">Horas prácticas:</label>
      <input 
        type="number" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100 text-gray-900" 
        value={materiaPersistida.horas_practicas} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 dark:text-blue-900 mb-1">Área:</label>
      <input 
        type="text" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100 text-gray-900" 
        value={materiaPersistida.area_nombre} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 dark:text-blue-900 mb-1">Núcleo:</label>
      <input 
        type="text" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100 text-gray-900" 
        value={materiaPersistida.nucleo_nombre} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 dark:text-blue-900 mb-1">Tipo:</label>
      <input 
        type="text" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100 text-gray-900" 
        value={materiaPersistida.tipo_materia_nombre} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 dark:text-blue-900 mb-1">Art. 57 RGA:</label>
      <input 
        type="text" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100 text-gray-900" 
        value={materiaPersistida.art57} 
        readOnly 
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 dark:text-blue-900 mb-1">Plan de Estudio:</label>
      <input 
        type="text" 
        className="w-full max-w-full border rounded px-2 py-1 bg-gray-100 text-gray-900" 
        value={planPersistido.nombre} 
        readOnly 
      />
    </div>
  </form>
  );
};

export default DatosPuaForm;